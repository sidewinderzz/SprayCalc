import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { getDb } from '../utils/firebase';

const LS_KEY = 'scApiKey';
const LS_SCAN_ENABLED = 'scScanEnabled';

// Manages the user-supplied Claude API key for the Scan Recommendations feature.
// Key is stored in localStorage and, when signed in, synced to Firestore at:
//   users/{uid}/settings/claudeApiKey
//
// IMPORTANT — add this Firestore security rule alongside the mixes rule:
//   match /users/{uid}/settings/{docId} {
//     allow read, write: if request.auth != null && request.auth.uid == uid;
//   }

export function useApiKey(user: User | null) {
  const [apiKey, setApiKey] = useState<string>(() => {
    try { return localStorage.getItem(LS_KEY) ?? ''; } catch { return ''; }
  });

  const [scanEnabled, setScanEnabledState] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem(LS_SCAN_ENABLED);
      return v === null ? false : v === 'true';
    } catch { return false; }
  });

  const [keyInput, setKeyInput] = useState('');

  const setScanEnabled = (v: boolean) => {
    setScanEnabledState(v);
    try { localStorage.setItem(LS_SCAN_ENABLED, String(v)); } catch {}
  };

  // On sign-in: pull cloud key; if present and local is empty, populate local.
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const db = await getDb();
        if (!db) return;
        const { doc, getDoc } = await import('firebase/firestore');
        const snap = await getDoc(doc(db, 'users', user.uid, 'settings', 'claudeApiKey'));
        if (snap.exists()) {
          const cloudKey = ((snap.data() as { key?: string }).key) ?? '';
          if (cloudKey && !localStorage.getItem(LS_KEY)) {
            setApiKey(cloudKey);
            try { localStorage.setItem(LS_KEY, cloudKey); } catch {}
          }
        }
      } catch (e) {
        console.error('Failed to fetch cloud API key:', e);
      }
    })();
  }, [user?.uid]);

  const saveApiKey = async (key: string) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    setKeyInput('');
    try { localStorage.setItem(LS_KEY, trimmed); } catch {}
    if (trimmed) setScanEnabled(true);
    if (user) {
      try {
        const db = await getDb();
        if (!db) return;
        const { doc, setDoc } = await import('firebase/firestore');
        await setDoc(doc(db, 'users', user.uid, 'settings', 'claudeApiKey'), { key: trimmed });
      } catch (e) {
        console.error('Failed to save API key to cloud:', e);
      }
    }
  };

  const clearApiKey = async () => {
    setApiKey('');
    setKeyInput('');
    setScanEnabled(false);
    try {
      localStorage.removeItem(LS_KEY);
      localStorage.removeItem(LS_SCAN_ENABLED);
    } catch {}
    if (user) {
      try {
        const db = await getDb();
        if (!db) return;
        const { doc, deleteDoc } = await import('firebase/firestore');
        await deleteDoc(doc(db, 'users', user.uid, 'settings', 'claudeApiKey'));
      } catch (e) {
        console.error('Failed to delete cloud API key:', e);
      }
    }
  };

  return { apiKey, scanEnabled, setScanEnabled, keyInput, setKeyInput, saveApiKey, clearApiKey };
}
