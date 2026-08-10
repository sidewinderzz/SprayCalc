import { performWrite, requireFirestore, sanitizeForFirestore, withTimeout } from './cloudSync';

// Per-user app settings live at users/{uid}/settings/{docId}.
//
// The Claude API key used by Scan Recommendations is stored here so it
// survives a cleared browser cache and follows the user to another device.
// This path needs its own match block in firestore.rules — it is NOT covered
// by the mixes rule, and when it is missing the key silently saves to
// localStorage only and disappears the next time the cache is cleared.

const API_KEY_DOC = 'claudeApiKey';

export interface CloudApiKey {
  key: string;
  scanEnabled?: boolean;
  updatedAt?: number;
}

function apiKeyPath(uid: string): string[] {
  return ['users', uid, 'settings', API_KEY_DOC];
}

export async function fetchCloudApiKey(uid: string): Promise<CloudApiKey | null> {
  const { db, fs } = await requireFirestore();
  const snap = await withTimeout(fs.getDoc(fs.doc(db, 'users', uid, 'settings', API_KEY_DOC)));
  if (!snap.exists()) return null;
  const raw = snap.data() as Partial<CloudApiKey>;
  if (typeof raw?.key !== 'string') return null;
  return {
    key: raw.key,
    scanEnabled: typeof raw.scanEnabled === 'boolean' ? raw.scanEnabled : undefined,
    updatedAt: typeof raw.updatedAt === 'number' ? raw.updatedAt : undefined,
  };
}

export async function saveCloudApiKey(uid: string, value: CloudApiKey): Promise<void> {
  await performWrite(uid, {
    type: 'doc.set',
    path: apiKeyPath(uid),
    data: sanitizeForFirestore({
      key: value.key,
      scanEnabled: value.scanEnabled ?? Boolean(value.key),
      updatedAt: value.updatedAt ?? Date.now(),
    }),
    queuedAt: Date.now(),
  });
}

// ─── Two-way reconciliation ────────────────────────────────────────────────

export type ApiKeyReconciliation =
  | { action: 'adopt-cloud'; key: string; scanEnabled: boolean; updatedAt: number }
  | { action: 'push-local'; key: string; updatedAt: number }
  | { action: 'none' };

export interface LocalApiKeyState {
  key: string;
  scanEnabled: boolean;
  updatedAt: number;
}

/**
 * Decides what to do with the local and cloud copies of the API key when a
 * user signs in.
 *
 * The bug this replaces: the old implementation only ever pulled. A key
 * entered while signed out — or during the second or so before
 * onAuthStateChanged resolves on a page load — was never uploaded, so it lived
 * in localStorage alone and disappeared with the browser cache.
 */
export function reconcileApiKey(local: LocalApiKeyState, cloud: CloudApiKey | null): ApiKeyReconciliation {
  const cloudKey = cloud?.key ?? '';
  const cloudUpdatedAt = cloud?.updatedAt ?? 0;

  if (cloudKey === local.key) {
    // Same key both places. Push only if the cloud copy predates a local
    // change (e.g. the scan toggle) so the timestamps converge.
    return local.key && local.updatedAt > cloudUpdatedAt
      ? { action: 'push-local', key: local.key, updatedAt: local.updatedAt }
      : { action: 'none' };
  }

  // Cloud has a key and the local copy is not strictly newer: adopt it.
  // Legacy cloud documents carry no updatedAt and still win over a local copy
  // that has none either, since the cloud copy is the shared one.
  if (cloudKey && cloudUpdatedAt >= local.updatedAt) {
    return {
      action: 'adopt-cloud',
      key: cloudKey,
      scanEnabled: cloud?.scanEnabled ?? true,
      updatedAt: cloudUpdatedAt || Date.now(),
    };
  }

  // Local has a key the cloud lacks, or a newer one: upload it.
  if (local.key) {
    return { action: 'push-local', key: local.key, updatedAt: local.updatedAt || Date.now() };
  }

  return { action: 'none' };
}

export async function deleteCloudApiKey(uid: string): Promise<void> {
  await performWrite(uid, {
    type: 'doc.delete',
    path: apiKeyPath(uid),
    queuedAt: Date.now(),
  });
}
