import { useCallback, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import {
  DiagnosticsResult,
  SyncStatus,
  getSyncStatus,
  runCloudDiagnostics,
  subscribeSyncStatus,
} from '../utils/cloudSync';

// Exposes the shared cloud-sync status (written to by the mixes and API-key
// hooks) plus a manual diagnostics run, so the header can tell the user
// whether their data is actually reaching Firestore instead of leaving them to
// guess.
export function useCloudSyncStatus(user: User | null) {
  const [status, setStatus] = useState<SyncStatus>(getSyncStatus);
  const [diagnostics, setDiagnostics] = useState<DiagnosticsResult | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => subscribeSyncStatus(setStatus), []);

  // A previous run describes a different account once the user switches.
  useEffect(() => {
    setDiagnostics(null);
  }, [user?.uid]);

  const runDiagnostics = useCallback(async () => {
    setRunning(true);
    try {
      setDiagnostics(await runCloudDiagnostics(user?.uid ?? null));
    } finally {
      setRunning(false);
    }
  }, [user?.uid]);

  return { status, diagnostics, runDiagnostics, runningDiagnostics: running };
}
