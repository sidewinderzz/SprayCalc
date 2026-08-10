import { useEffect, useRef, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  deleteCloudApiKey,
  fetchCloudApiKey,
  reconcileApiKey,
  saveCloudApiKey,
} from '../utils/cloudSettings';
import { describeCloudError, flushQueue, reportSyncState } from '../utils/cloudSync';

const LS_KEY = 'scApiKey';
const LS_SCAN_ENABLED = 'scScanEnabled';
const LS_UPDATED_AT = 'scApiKeyUpdatedAt';

// Manages the user-supplied Claude API key for the Scan Recommendations
// feature. The key is stored in localStorage and, when signed in, mirrored to
// Firestore at users/{uid}/settings/claudeApiKey.
//
// The reconciliation below is deliberately two-way. The previous version only
// ever pulled from the cloud on sign-in, which meant a key entered while
// signed out — or during the second or so before onAuthStateChanged resolves
// on a page load — was never uploaded at all. It lived in localStorage and
// looked saved, right up until the browser cache was cleared.
//
// Requires this block in firestore.rules (it is NOT covered by the mixes rule):
//   match /users/{uid}/settings/{docId} {
//     allow read, write: if request.auth != null && request.auth.uid == uid;
//   }

function readLocalUpdatedAt(): number {
  try {
    const raw = localStorage.getItem(LS_UPDATED_AT);
    const parsed = raw ? Number(raw) : 0;
    return Number.isFinite(parsed) ? parsed : 0;
  } catch {
    return 0;
  }
}

function writeLocal(key: string, scanEnabled: boolean, updatedAt: number) {
  try {
    if (key) localStorage.setItem(LS_KEY, key);
    else localStorage.removeItem(LS_KEY);
    localStorage.setItem(LS_SCAN_ENABLED, String(scanEnabled));
    localStorage.setItem(LS_UPDATED_AT, String(updatedAt));
  } catch {
    /* localStorage unavailable (private mode / quota) */
  }
}

export function useApiKey(user: User | null, onFeedback?: (msg: string) => void) {
  const [apiKey, setApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem(LS_KEY) ?? '';
    } catch {
      return '';
    }
  });

  const [scanEnabled, setScanEnabledState] = useState<boolean>(() => {
    try {
      const v = localStorage.getItem(LS_SCAN_ENABLED);
      return v === null ? false : v === 'true';
    } catch {
      return false;
    }
  });

  const [keyInput, setKeyInput] = useState('');

  // Mirrors of the current values so the sign-in reconciliation can read the
  // latest state without re-running whenever the key or toggle changes.
  const apiKeyRef = useRef(apiKey);
  const scanEnabledRef = useRef(scanEnabled);
  useEffect(() => {
    apiKeyRef.current = apiKey;
  }, [apiKey]);
  useEffect(() => {
    scanEnabledRef.current = scanEnabled;
  }, [scanEnabled]);

  const flash = (msg: string) => {
    if (!onFeedback) return;
    onFeedback(msg);
    setTimeout(() => onFeedback(''), 3500);
  };

  const setScanEnabled = (v: boolean) => {
    setScanEnabledState(v);
    const now = Date.now();
    writeLocal(apiKeyRef.current, v, now);
    if (user && apiKeyRef.current) {
      saveCloudApiKey(user.uid, { key: apiKeyRef.current, scanEnabled: v, updatedAt: now }).catch(err =>
        console.error('Failed to sync scan toggle:', err)
      );
    }
  };

  // On sign-in, reconcile the local key with the cloud copy in BOTH
  // directions: adopt the cloud key when it is newer or when there is nothing
  // local, and upload the local key whenever the cloud has none or an older
  // one. This is what makes a key entered before signing in persist.
  useEffect(() => {
    if (!user) return;
    const uid = user.uid;
    let cancelled = false;

    (async () => {
      try {
        // Retry anything that failed to reach the database earlier.
        await flushQueue(uid);

        const cloud = await fetchCloudApiKey(uid);
        if (cancelled) return;

        const decision = reconcileApiKey(
          {
            key: apiKeyRef.current,
            scanEnabled: scanEnabledRef.current,
            updatedAt: readLocalUpdatedAt(),
          },
          cloud
        );

        if (decision.action === 'adopt-cloud') {
          setApiKey(decision.key);
          setScanEnabledState(decision.scanEnabled);
          writeLocal(decision.key, decision.scanEnabled, decision.updatedAt);
          reportSyncState('ok', 'All changes saved');
          return;
        }

        if (decision.action === 'push-local') {
          await saveCloudApiKey(uid, {
            key: decision.key,
            scanEnabled: scanEnabledRef.current,
            updatedAt: decision.updatedAt,
          });
          if (cancelled) return;
          writeLocal(decision.key, scanEnabledRef.current, decision.updatedAt);
          flash('API key saved to your account');
        }
      } catch (err) {
        if (cancelled) return;
        const info = describeCloudError(err);
        console.error('API key sync failed:', err);
        flash(`API key not synced: ${info.message}`);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const saveApiKey = async (key: string) => {
    const trimmed = key.trim();
    const now = Date.now();
    const enabled = trimmed ? true : scanEnabledRef.current;

    setApiKey(trimmed);
    setKeyInput('');
    if (trimmed) setScanEnabledState(true);
    writeLocal(trimmed, enabled, now);

    if (!trimmed) return;

    if (!user) {
      // Not signed in yet — the key is on this device only. Say so plainly
      // rather than implying it is backed up; the sign-in effect above will
      // upload it as soon as the user signs in.
      flash('Key saved on this device. Sign in to back it up to your account.');
      return;
    }

    try {
      await saveCloudApiKey(user.uid, { key: trimmed, scanEnabled: true, updatedAt: now });
      flash('API key saved to your account');
    } catch (err) {
      const info = describeCloudError(err);
      console.error('Failed to save API key to cloud:', err);
      flash(`Saved on this device only — ${info.message}`);
    }
  };

  const clearApiKey = async () => {
    const now = Date.now();
    setApiKey('');
    setKeyInput('');
    setScanEnabledState(false);
    try {
      localStorage.removeItem(LS_KEY);
      localStorage.removeItem(LS_SCAN_ENABLED);
      localStorage.setItem(LS_UPDATED_AT, String(now));
    } catch {
      /* localStorage unavailable */
    }
    if (!user) return;
    try {
      await deleteCloudApiKey(user.uid);
    } catch (err) {
      const info = describeCloudError(err);
      console.error('Failed to delete cloud API key:', err);
      flash(`Removed here, but not from your account — ${info.message}`);
    }
  };

  return { apiKey, scanEnabled, setScanEnabled, keyInput, setKeyInput, saveApiKey, clearApiKey };
}
