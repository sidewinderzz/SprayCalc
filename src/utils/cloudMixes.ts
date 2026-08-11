import { SavedMix, MixData } from '../types';
import {
  performWrite,
  requireFirestore,
  safeDocId,
  sanitizeForFirestore,
  withTimeout,
} from './cloudSync';

// Saved mixes live at users/{uid}/mixes/{docId}. The mix name doubles as the
// document id (see safeDocId).
//
// Security rules for this path live in firestore.rules at the repo root and
// must be published (`npm run deploy:rules`) before any of this works — an
// unpublished ruleset rejects every write with `permission-denied`.

function mixPath(uid: string, name: string): string[] {
  return ['users', uid, 'mixes', safeDocId(name)];
}

export async function fetchCloudMixes(uid: string): Promise<SavedMix[]> {
  const { db, fs } = await requireFirestore();
  const snap = await withTimeout(fs.getDocs(fs.collection(db, 'users', uid, 'mixes')));
  const mixes: SavedMix[] = [];
  snap.forEach(d => {
    const raw = d.data() as { name?: string; data?: MixData; updatedAt?: number };
    if (raw && typeof raw.name === 'string' && raw.data) {
      mixes.push({ name: raw.name, data: raw.data, updatedAt: raw.updatedAt });
    }
  });
  return mixes;
}

/**
 * Uploads a mix and waits for the server to acknowledge it. Rejects (after
 * queueing the write for retry) if the write does not land, so callers can
 * tell the user rather than assuming success.
 */
export async function uploadCloudMix(uid: string, mix: SavedMix): Promise<void> {
  await performWrite(uid, {
    type: 'doc.set',
    path: mixPath(uid, mix.name),
    data: sanitizeForFirestore({
      name: mix.name,
      data: mix.data,
      updatedAt: mix.updatedAt ?? Date.now(),
    }),
    queuedAt: Date.now(),
  });
}

export async function deleteCloudMix(uid: string, name: string): Promise<void> {
  await performWrite(uid, {
    type: 'doc.delete',
    path: mixPath(uid, name),
    queuedAt: Date.now(),
  });
}
