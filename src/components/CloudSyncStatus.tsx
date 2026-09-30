import React from 'react';
import { colors, alpha } from '../types';
import type { DiagnosticsResult, SyncStatus } from '../utils/cloudSync';
import { formatRelativeTime } from '../utils/relativeTime';

interface CloudSyncStatusProps {
  status: SyncStatus;
  diagnostics: DiagnosticsResult | null;
  onRunDiagnostics: () => void;
  running: boolean;
}

const TONE: Record<SyncStatus['state'], { dot: string; label: string }> = {
  disabled: { dot: colors.subtle, label: 'Cloud sync off' },
  signedOut: { dot: colors.subtle, label: 'This device only' },
  syncing: { dot: colors.secondaryDark, label: 'Syncing…' },
  ok: { dot: colors.primary, label: 'Synced to your account' },
  error: { dot: colors.danger, label: 'Not syncing' },
};

// Shows, in plain language, whether saves are actually reaching Firestore.
// Cloud failures used to be console-only, which made a permission-denied write
// indistinguishable from a successful one from inside the app.
export function CloudSyncStatus({ status, diagnostics, onRunDiagnostics, running }: CloudSyncStatusProps) {
  const tone = TONE[status.state];
  const isError = status.state === 'error';

  return (
    <div className="px-4 pb-3 -mt-1">
      <div className="flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: tone.dot }}
          aria-hidden="true"
        />
        <span className="text-xs font-medium" style={{ color: isError ? colors.danger : alpha(colors.lightText, 'aa') }}>
          {tone.label}
        </span>
        {status.pending > 0 && (
          <span
            className="text-xs px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: `${alpha(colors.secondary, '40')}`, color: colors.primaryDark }}
          >
            {status.pending} pending
          </span>
        )}
        <button
          onClick={onRunDiagnostics}
          disabled={running}
          className="ml-auto text-xs hover:underline disabled:opacity-50"
          style={{ color: colors.primaryLight }}
        >
          {running ? 'Checking…' : 'Check'}
        </button>
      </div>

      {(isError || status.state === 'ok') && status.message && (
        <p className="text-xs mt-1 leading-relaxed" style={{ color: isError ? colors.danger : alpha(colors.lightText, '70') }}>
          {status.message}
          {status.code && isError ? ` (${status.code})` : ''}
        </p>
      )}

      {status.state === 'ok' && status.lastSyncedAt && (
        <p className="text-xs mt-0.5" style={{ color: alpha(colors.lightText, '60') }}>
          Last write {formatRelativeTime(status.lastSyncedAt)}
        </p>
      )}

      {diagnostics && (
        <div
          className="mt-2 p-2 rounded-lg text-xs leading-relaxed"
          style={{
            backgroundColor: diagnostics.canWrite && diagnostics.canRead ? `${alpha(colors.primary, '12')}` : alpha(colors.danger, '10'),
            color: alpha(colors.lightText, 'cc'),
          }}
        >
          <p className="font-medium mb-1" style={{ color: colors.primaryDark }}>
            Cloud check
          </p>
          <p>Configured: {diagnostics.configured ? 'yes' : 'no'}</p>
          <p>Signed in: {diagnostics.signedIn ? 'yes' : 'no'}</p>
          <p>Write to database: {diagnostics.canWrite ? 'yes' : 'no'}</p>
          <p>Read back: {diagnostics.canRead ? 'yes' : 'no'}</p>
          {diagnostics.pending > 0 && <p>Queued writes: {diagnostics.pending}</p>}
          <p className="mt-1">{diagnostics.message}</p>
        </div>
      )}
    </div>
  );
}
