import { SavedMix, MixData } from '../types';
import { getDb } from './firebase';

// ─── Firestore security rules ──────────────────────────────────────────────
// Add these rules in the Firebase Console → Firestore Database → Rules.
// They allow each signed-in user to read/write only their own data.
//
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{database}/documents {
//       match /users/{uid}/mixes/{mixId} {
//         allow read, write: if request.auth != null && request.auth.uid == uid;
//       }
//       // Required for the Scan Recommendations (Claude API key) feature:
//       match /users/{uid}/settings/{docId} {
//         allow read, write: if request.auth != null && request.auth.uid == uid;
//       }
//     }
//   }
// ───────────────────────────────────────────────────────────────────────────

// Saved mixes live at users/{uid}/mixes/{docId}. The mix name doubles as the
// document id (URI-encoded so names with slashes or other reserved characters
// are valid Firestore ids).
function mixDocId(name: string): string {
  return encodeURIComponent(name);
}

// Firestore is loaded on demand so it stays out of the main bundle.
async function getFirestoreDeps() {
  const db = await getDb();
  if (!db) return null;
  const fs = await import('firebase/firestore');
  return { db, fs };
}

export async function fetchCloudMixes(uid: string): Promise<SavedMix[]> {
  const deps = await getFirestoreDeps();
  if (!deps) return [];
  const { db, fs } = deps;
  const snap = await fs.getDocs(fs.collection(db, 'users', uid, 'mixes'));
  const mixes: SavedMix[] = [];
  snap.forEach(d => {
    const raw = d.data() as { name?: string; data?: MixData; updatedAt?: number };
    if (raw && typeof raw.name === 'string' && raw.data) {
      mixes.push({ name: raw.name, data: raw.data, updatedAt: raw.updatedAt });
    }
  });
  return mixes;
}

export async function uploadCloudMix(uid: string, mix: SavedMix): Promise<void> {
  const deps = await getFirestoreDeps();
  if (!deps) return;
  const { db, fs } = deps;
  await fs.setDoc(fs.doc(db, 'users', uid, 'mixes', mixDocId(mix.name)), {
    name: mix.name,
    data: mix.data,
    updatedAt: mix.updatedAt ?? Date.now(),
  });
}

export async function deleteCloudMix(uid: string, name: string): Promise<void> {
  const deps = await getFirestoreDeps();
  if (!deps) return;
  const { db, fs } = deps;
  await fs.deleteDoc(fs.doc(db, 'users', uid, 'mixes', mixDocId(name)));
}
