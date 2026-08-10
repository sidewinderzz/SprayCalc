import type { Firestore } from 'firebase/firestore';
import { getDb, isFirebaseConfigured } from './firebase';

// Shared plumbing for every Firestore write the app makes.
//
// The previous implementation swallowed all cloud errors into console.error,
// so a permission-denied write (the usual symptom of unpublished security
// rules) looked identical to a successful save. Everything here exists to make
// that impossible:
//
//   1. Errors are normalised into a human-readable message and surfaced to the
//      UI through the status bus below, instead of only the console.
//   2. Writes are given a hard timeout. A Firestore write promise settles only
//      when the server acknowledges it, so on a dead or WebChannel-blocked
//      connection it hangs forever — no resolve, no reject, no error.
//   3. Anything that fails is persisted to a retry queue and re-attempted on
//      reconnect, on sign-in, and on the next page load, so a failed write is
//      never lost.

// ─── Status bus ────────────────────────────────────────────────────────────
// A tiny module-level store so the mixes hook, the API-key hook and the header
// all report through one status without threading props between them.

export type SyncState = 'disabled' | 'signedOut' | 'syncing' | 'ok' | 'error';

export interface SyncStatus {
  state: SyncState;
  /** Human-readable detail, shown in the account section of the header. */
  message: string;
  /** Firestore error code (e.g. 'permission-denied') when state is 'error'. */
  code?: string;
  /** Number of writes waiting in the retry queue. */
  pending: number;
  /** Timestamp (ms) of the last write the server acknowledged. */
  lastSyncedAt?: number;
}

let status: SyncStatus = {
  state: isFirebaseConfigured() ? 'signedOut' : 'disabled',
  message: isFirebaseConfigured() ? 'Not signed in' : 'Cloud sync not configured',
  pending: 0,
};

const listeners = new Set<(s: SyncStatus) => void>();

export function getSyncStatus(): SyncStatus {
  return status;
}

export function subscribeSyncStatus(fn: (s: SyncStatus) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function setStatus(patch: Partial<SyncStatus>) {
  status = { ...status, ...patch };
  listeners.forEach(fn => fn(status));
}

export function reportSyncState(state: SyncState, message: string, code?: string) {
  setStatus({ state, message, code });
}

// ─── Error normalisation ───────────────────────────────────────────────────

export interface CloudErrorInfo {
  code: string;
  message: string;
  /** True when retrying later could plausibly succeed. */
  retryable: boolean;
}

const RULES_HINT =
  'Firestore rejected the write. Publish firestore.rules (npm run deploy:rules) — until then nothing reaches the database.';

export function describeCloudError(err: unknown): CloudErrorInfo {
  const code = String((err as { code?: unknown } | null)?.code ?? '').replace(/^firestore\//, '');
  const raw = (err as { message?: unknown } | null)?.message;
  const rawMessage = typeof raw === 'string' ? raw : String(err);

  switch (code) {
    case 'permission-denied':
      return { code, message: RULES_HINT, retryable: false };
    case 'unauthenticated':
      return { code, message: 'Signed out of Firebase — sign in again to sync.', retryable: false };
    case 'not-found':
      return {
        code,
        message: 'No Firestore database found for this Firebase project. Create one in the console.',
        retryable: false,
      };
    case 'failed-precondition':
      return { code, message: 'Firestore is not ready for this request.', retryable: false };
    case 'invalid-argument':
      return { code, message: `Firestore rejected the data: ${rawMessage}`, retryable: false };
    case 'not-configured':
      return {
        code,
        message: 'Cloud sync is not configured in this build (VITE_FIREBASE_* env vars missing).',
        retryable: false,
      };
    case 'unavailable':
    case 'deadline-exceeded':
    case 'resource-exhausted':
    case 'aborted':
    case 'internal':
    case 'cancelled':
      return { code, message: 'Could not reach Firestore — will retry.', retryable: true };
    case 'timeout':
      return { code, message: 'Firestore did not respond — will retry.', retryable: true };
    default:
      return { code: code || 'unknown', message: rawMessage, retryable: true };
  }
}

// ─── Write timeout ─────────────────────────────────────────────────────────

const WRITE_TIMEOUT_MS = 15000;

class TimeoutError extends Error {
  code = 'timeout';
  constructor() {
    super('Firestore request timed out');
  }
}

export function withTimeout<T>(promise: Promise<T>, ms = WRITE_TIMEOUT_MS): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new TimeoutError()), ms);
    promise.then(
      value => {
        clearTimeout(timer);
        resolve(value);
      },
      err => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

// ─── Value sanitising ──────────────────────────────────────────────────────

// Firestore throws on `undefined` anywhere in a document, and the whole write
// is rejected — one stray optional field is enough to lose a mix. Strip them
// (and any non-finite numbers, which are meaningless here) before writing.
export function sanitizeForFirestore<T>(value: T): T {
  return sanitizeValue(value) as T;
}

function sanitizeValue(value: unknown): unknown {
  if (value === null) return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (Array.isArray(value)) {
    return value.map(v => (v === undefined ? null : sanitizeValue(v)));
  }
  if (typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === undefined || typeof v === 'function') continue;
      out[k] = sanitizeValue(v);
    }
    return out;
  }
  if (typeof value === 'function' || typeof value === 'symbol') return null;
  return value;
}

// ─── Document ids ──────────────────────────────────────────────────────────

// Mix names double as document ids. encodeURIComponent covers the common cases
// (notably '/'), and existing cloud documents already use it, so it stays the
// primary encoding. It does not cover every Firestore constraint though: ids
// may not be '.' or '..', may not be empty, and may not exceed 1500 bytes.
// Those fall back to a stable hash so the write succeeds instead of throwing.
const MAX_DOC_ID_BYTES = 1200;

export function safeDocId(name: string): string {
  const encoded = encodeURIComponent(name);
  const tooLong = new TextEncoder().encode(encoded).length > MAX_DOC_ID_BYTES;
  if (!encoded || encoded === '.' || encoded === '..' || tooLong) {
    return `h_${hashString(name)}`;
  }
  return encoded;
}

function hashString(input: string): string {
  // FNV-1a — deterministic across sessions and devices, which is all this
  // needs (it is a document id, not a security primitive).
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(36) + input.length.toString(36);
}

// ─── Firestore module loading ──────────────────────────────────────────────

export interface FirestoreDeps {
  db: Firestore;
  fs: typeof import('firebase/firestore');
}

let depsPromise: Promise<FirestoreDeps | null> | null = null;

export function getFirestoreDeps(): Promise<FirestoreDeps | null> {
  if (!depsPromise) {
    depsPromise = (async () => {
      const db = await getDb();
      if (!db) return null;
      const fs = await import('firebase/firestore');
      return { db, fs };
    })().catch(err => {
      depsPromise = null;
      throw err;
    });
  }
  return depsPromise;
}

/** Throws a descriptive error rather than no-oping when Firebase is absent. */
export async function requireFirestore(): Promise<FirestoreDeps> {
  const deps = await getFirestoreDeps();
  if (!deps) {
    const err = new Error(
      'Firebase is not configured for this build — set the VITE_FIREBASE_* env vars.'
    ) as Error & { code: string };
    err.code = 'not-configured';
    throw err;
  }
  return deps;
}

// ─── Pending write queue ───────────────────────────────────────────────────

export type PendingOp =
  | { type: 'doc.set'; path: string[]; data: Record<string, unknown>; queuedAt: number }
  | { type: 'doc.delete'; path: string[]; queuedAt: number };

const QUEUE_PREFIX = 'scPendingCloudWrites:';
const MAX_QUEUE = 200;

function queueKey(uid: string): string {
  return `${QUEUE_PREFIX}${uid}`;
}

export function readQueue(uid: string): PendingOp[] {
  try {
    const raw = localStorage.getItem(queueKey(uid));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as PendingOp[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(uid: string, ops: PendingOp[]) {
  const capped = ops.slice(-MAX_QUEUE);
  try {
    if (capped.length === 0) localStorage.removeItem(queueKey(uid));
    else localStorage.setItem(queueKey(uid), JSON.stringify(capped));
  } catch (err) {
    console.error('Failed to persist pending cloud writes:', err);
  }
  setStatus({ pending: capped.length });
}

// Ops are keyed by target document: a later write to the same path supersedes
// an earlier queued one, so a mix edited five times offline uploads once.
function opKey(op: PendingOp): string {
  return op.path.join('/');
}

export function enqueue(uid: string, op: PendingOp) {
  const ops = readQueue(uid).filter(existing => opKey(existing) !== opKey(op));
  ops.push(op);
  writeQueue(uid, ops);
}

function dequeue(uid: string, op: PendingOp) {
  const ops = readQueue(uid);
  const remaining = ops.filter(
    existing => !(opKey(existing) === opKey(op) && existing.queuedAt === op.queuedAt)
  );
  // Most writes succeed first try and were never queued — skip the storage
  // write and status churn in that case.
  if (remaining.length !== ops.length) writeQueue(uid, remaining);
}

export function pendingCount(uid: string | null): number {
  return uid ? readQueue(uid).length : 0;
}

// ─── Write primitives ──────────────────────────────────────────────────────

async function runOp(deps: FirestoreDeps, op: PendingOp): Promise<void> {
  const { db, fs } = deps;
  const ref = fs.doc(db, op.path[0], ...op.path.slice(1));
  if (op.type === 'doc.set') {
    await withTimeout(fs.setDoc(ref, op.data));
  } else {
    await withTimeout(fs.deleteDoc(ref));
  }
}

/**
 * Performs a write, and on failure queues it for retry. Rethrows so callers can
 * report the failure — the queue is a safety net, not a way to hide errors.
 */
export async function performWrite(uid: string, op: PendingOp): Promise<void> {
  try {
    const deps = await requireFirestore();
    await runOp(deps, op);
    dequeue(uid, op);
    const stillQueued = pendingCount(uid);
    setStatus({
      state: 'ok',
      message: stillQueued > 0 ? `Saved — ${stillQueued} earlier change(s) still pending` : 'All changes saved',
      code: undefined,
      lastSyncedAt: Date.now(),
    });
  } catch (err) {
    const info = describeCloudError(err);
    // Non-retryable failures still get queued when they are configuration
    // problems (permission-denied clears the moment the rules are published),
    // but not when the data itself is the problem — that would retry forever.
    if (info.code !== 'invalid-argument' && info.code !== 'not-configured') enqueue(uid, op);
    setStatus({ state: 'error', message: info.message, code: info.code });
    throw err;
  }
}

export function queueWrite(uid: string, op: PendingOp) {
  enqueue(uid, op);
  setStatus({ state: 'error', message: 'Waiting to sync', code: 'queued' });
}

// ─── Queue flushing ────────────────────────────────────────────────────────

let flushing = false;

/** Retries every queued write. Safe to call repeatedly; concurrent calls no-op. */
export async function flushQueue(uid: string): Promise<{ flushed: number; failed: number }> {
  if (flushing) return { flushed: 0, failed: 0 };
  const ops = readQueue(uid);
  if (ops.length === 0) return { flushed: 0, failed: 0 };

  flushing = true;
  setStatus({ state: 'syncing', message: `Syncing ${ops.length} pending change${ops.length === 1 ? '' : 's'}…` });

  let flushed = 0;
  let failed = 0;
  let lastError: CloudErrorInfo | null = null;

  try {
    const deps = await requireFirestore();
    for (const op of ops) {
      try {
        await runOp(deps, op);
        dequeue(uid, op);
        flushed++;
      } catch (err) {
        lastError = describeCloudError(err);
        failed++;
        // A hard failure (rules not published, offline) will hit every
        // remaining op the same way — stop rather than burn through them.
        if (!lastError.retryable) break;
      }
    }
  } catch (err) {
    lastError = describeCloudError(err);
    failed = ops.length;
  } finally {
    flushing = false;
  }

  if (failed > 0 && lastError) {
    setStatus({ state: 'error', message: lastError.message, code: lastError.code });
  } else if (flushed > 0) {
    setStatus({ state: 'ok', message: 'All changes saved', code: undefined, lastSyncedAt: Date.now() });
  }
  return { flushed, failed };
}

// Retry as soon as the browser regains connectivity. Registered once, at
// module load; the active uid is set by the auth-aware hooks below.
let activeUid: string | null = null;

export function setActiveUid(uid: string | null) {
  activeUid = uid;
  setStatus({ pending: pendingCount(uid) });
  if (!uid) {
    reportSyncState(
      isFirebaseConfigured() ? 'signedOut' : 'disabled',
      isFirebaseConfigured() ? 'Not signed in — mixes save on this device only' : 'Cloud sync not configured'
    );
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    if (activeUid) flushQueue(activeUid).catch(() => {});
  });
}

// ─── Diagnostics ───────────────────────────────────────────────────────────

export interface DiagnosticsResult {
  configured: boolean;
  signedIn: boolean;
  canWrite: boolean;
  canRead: boolean;
  pending: number;
  code?: string;
  message: string;
}

/**
 * End-to-end check that a signed-in user can actually round-trip a document.
 * This is the answer to "did it hit the database or not?" — it writes a small
 * probe document, reads it back, and deletes it, reporting the exact Firestore
 * error code on failure.
 */
export async function runCloudDiagnostics(uid: string | null): Promise<DiagnosticsResult> {
  const base: DiagnosticsResult = {
    configured: isFirebaseConfigured(),
    signedIn: Boolean(uid),
    canWrite: false,
    canRead: false,
    pending: pendingCount(uid),
    message: '',
  };

  if (!base.configured) {
    return { ...base, message: 'Firebase is not configured in this build (VITE_FIREBASE_* env vars missing).' };
  }
  if (!uid) {
    return { ...base, message: 'Sign in with Google to test cloud sync.' };
  }

  try {
    const { db, fs } = await requireFirestore();
    const ref = fs.doc(db, 'users', uid, 'diagnostics', 'probe');
    await withTimeout(fs.setDoc(ref, { checkedAt: Date.now() }));
    base.canWrite = true;

    const snap = await withTimeout(fs.getDoc(ref));
    base.canRead = snap.exists();

    await withTimeout(fs.deleteDoc(ref)).catch(() => {});

    const ok = base.canWrite && base.canRead;
    setStatus(
      ok
        ? { state: 'ok', message: 'All changes saved', code: undefined, lastSyncedAt: Date.now() }
        : { state: 'error', message: 'Wrote to Firestore but could not read it back.', code: 'read-back-failed' }
    );
    return {
      ...base,
      message: ok
        ? 'Cloud sync is working — Firestore accepted a write and read it back.'
        : 'Wrote to Firestore but could not read it back.',
    };
  } catch (err) {
    const info = describeCloudError(err);
    setStatus({ state: 'error', message: info.message, code: info.code });
    return { ...base, code: info.code, message: info.message };
  }
}
