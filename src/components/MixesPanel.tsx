import React, { useEffect, useMemo, useState } from 'react';
import { SavedMix, MixData, MixHistoryEntry, colors } from '../types';
import { formatRelativeTime } from '../utils/relativeTime';

// The saved mixes and the auto-logged history used to share one scrolling
// column inside the ⋮ menu, which grew past the height of a phone screen the
// moment a few mixes were saved. They live here instead: one sheet, two tabs,
// so "the mix I named" and "the mix I happened to run last Tuesday" are never
// the same list.

interface MixesPanelProps {
  open: boolean;
  onClose: () => void;
  savedMixes: SavedMix[];
  historyEntries: MixHistoryEntry[];
  loadMix: (data: MixData) => void;
  deleteMix: (name: string) => void;
  deleteHistoryEntry: (id: string) => void;
  clearHistory: () => void;
  openSaveMixDialog: () => void;
}

type Tab = 'saved' | 'recent';

// Above this many rows a list is worth filtering rather than scrolling.
const SEARCH_THRESHOLD = 5;

function summarizeSavedMix(data: MixData): string {
  const parts: string[] = [];
  if (data.fillVolume) parts.push(`${data.fillVolume} gal`);
  if (data.applicationRate) parts.push(`${data.applicationRate} GPA`);
  const count = data.products?.length ?? 0;
  parts.push(`${count} product${count === 1 ? '' : 's'}`);
  if (data.fieldSize) parts.push(`${data.fieldSize} ac`);
  const splitCount = (data.splits ?? []).filter(s => s.acres > 0).length;
  if (splitCount >= 2) parts.push(`${splitCount}-way split`);
  return parts.join(' · ');
}

function DeleteButton({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
      style={{ color: colors.primaryLight }}
      title={title}
      aria-label={title}
    >
      <svg
        viewBox="0 0 14 14"
        width="11"
        height="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <line x1="1" y1="1" x2="13" y2="13" />
        <line x1="13" y1="1" x2="1" y2="13" />
      </svg>
    </button>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-sm text-center py-10 px-6 leading-relaxed"
      style={{ color: `${colors.lightText}90` }}
    >
      {children}
    </p>
  );
}

export function MixesPanel({
  open,
  onClose,
  savedMixes,
  historyEntries,
  loadMix,
  deleteMix,
  deleteHistoryEntry,
  clearHistory,
  openSaveMixDialog,
}: MixesPanelProps) {
  const [tab, setTab] = useState<Tab>('saved');
  const [query, setQuery] = useState('');
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);

  // Reset transient UI each time the sheet is opened so it never reappears
  // mid-filter or with a stale "are you sure?" pending.
  useEffect(() => {
    if (!open) return;
    setQuery('');
    setConfirmClearHistory(false);
  }, [open]);

  useEffect(() => {
    setQuery('');
    setConfirmClearHistory(false);
  }, [tab]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const needle = query.trim().toLowerCase();

  const filteredSaved = useMemo(() => {
    const sorted = [...savedMixes].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
    if (!needle) return sorted;
    return sorted.filter(
      m =>
        m.name.toLowerCase().includes(needle) ||
        (m.data.products ?? []).some(p => (p.name ?? '').toLowerCase().includes(needle)),
    );
  }, [savedMixes, needle]);

  const filteredHistory = useMemo(() => {
    if (!needle) return historyEntries;
    return historyEntries.filter(
      e =>
        e.summary.toLowerCase().includes(needle) ||
        (e.data.products ?? []).some(p => (p.name ?? '').toLowerCase().includes(needle)),
    );
  }, [historyEntries, needle]);

  if (!open) return null;

  const activeCount = tab === 'saved' ? savedMixes.length : historyEntries.length;
  const showSearch = activeCount > SEARCH_THRESHOLD;

  const tabs: Array<{ id: Tab; label: string; count: number }> = [
    { id: 'saved', label: 'Saved', count: savedMixes.length },
    { id: 'recent', label: 'Recent', count: historyEntries.length },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mixes"
        className="relative flex flex-col w-full sm:max-w-md mx-auto mt-auto sm:my-auto rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'white',
          maxHeight: '88vh',
          boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <h2 className="text-lg font-bold" style={{ color: colors.primaryDark }}>
            Mixes
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
            aria-label="Close mixes"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Mix lists"
          className="flex items-stretch px-4"
          style={{ borderBottom: `1px solid ${colors.primary}25` }}
        >
          {tabs.map(t => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(t.id)}
                className="relative bg-transparent border-0 pr-5 py-2 text-sm font-semibold"
                style={{ color: isActive ? colors.primaryDark : '#7c867c' }}
              >
                {t.label}
                <span
                  className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: isActive ? `${colors.primary}18` : '#f3f4f6',
                    color: isActive ? colors.primaryDark : '#9ca3af',
                  }}
                >
                  {t.count}
                </span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 20,
                      bottom: -1,
                      height: 2.5,
                      borderRadius: 2,
                      backgroundColor: colors.primary,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        {showSearch && (
          <div className="px-4 pt-3">
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={tab === 'saved' ? 'Search saved mixes…' : 'Search recent mixes…'}
              className="w-full p-2.5 border rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2"
              style={{ borderColor: `${colors.primary}30`, backgroundColor: 'white' }}
              aria-label="Search mixes"
            />
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {tab === 'saved' ? (
            savedMixes.length === 0 ? (
              <EmptyState>
                No saved mixes yet. Save the mix you're working on and it will show up
                here for one-tap recall.
              </EmptyState>
            ) : filteredSaved.length === 0 ? (
              <EmptyState>No saved mix matches “{query.trim()}”.</EmptyState>
            ) : (
              <div className="space-y-2">
                {filteredSaved.map(mix => (
                  <div
                    key={mix.name}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5"
                    style={{
                      backgroundColor: `${colors.primary}08`,
                      border: `1px solid ${colors.primary}18`,
                    }}
                  >
                    <button
                      onClick={() => {
                        loadMix(mix.data);
                        onClose();
                      }}
                      className="flex-1 text-left min-w-0"
                    >
                      <div
                        className="text-sm font-semibold truncate"
                        style={{ color: colors.primaryDark }}
                      >
                        {mix.name}
                      </div>
                      <div
                        className="text-xs mt-0.5 truncate"
                        style={{ color: `${colors.lightText}90` }}
                      >
                        {summarizeSavedMix(mix.data)}
                        {mix.updatedAt ? ` · ${formatRelativeTime(mix.updatedAt)}` : ''}
                      </div>
                    </button>
                    <DeleteButton
                      title={`Delete "${mix.name}"`}
                      onClick={() => deleteMix(mix.name)}
                    />
                  </div>
                ))}
              </div>
            )
          ) : historyEntries.length === 0 ? (
            <EmptyState>
              No recent mixes yet. Saving, copying, sharing, or exporting a mix logs it
              here automatically.
            </EmptyState>
          ) : filteredHistory.length === 0 ? (
            <EmptyState>No recent mix matches “{query.trim()}”.</EmptyState>
          ) : (
            <div className="space-y-2">
              {filteredHistory.map(entry => (
                <div
                  key={entry.id}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5"
                  style={{
                    backgroundColor: `${colors.primary}08`,
                    border: `1px solid ${colors.primary}18`,
                  }}
                >
                  <button
                    onClick={() => {
                      loadMix(entry.data);
                      onClose();
                    }}
                    className="flex-1 text-left min-w-0"
                  >
                    <div
                      className="text-sm font-medium truncate"
                      style={{ color: colors.primaryDark }}
                    >
                      {entry.summary}
                    </div>
                    <div
                      className="text-xs mt-0.5 truncate"
                      style={{ color: `${colors.lightText}90` }}
                    >
                      {formatRelativeTime(entry.timestamp)}
                    </div>
                  </button>
                  <DeleteButton
                    title="Remove from history"
                    onClick={() => deleteHistoryEntry(entry.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer action, specific to the visible tab */}
        <div
          className="px-4 py-3 flex items-center justify-between gap-3"
          style={{ borderTop: `1px solid ${colors.primary}20` }}
        >
          {tab === 'saved' ? (
            <button
              onClick={() => {
                onClose();
                openSaveMixDialog();
              }}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: colors.primary }}
            >
              Save current mix…
            </button>
          ) : historyEntries.length === 0 ? (
            <span className="text-xs" style={{ color: `${colors.lightText}70` }}>
              The last 25 mixes are kept on this device.
            </span>
          ) : confirmClearHistory ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  clearHistory();
                  setConfirmClearHistory(false);
                }}
                className="text-sm font-semibold"
                style={{ color: '#b91c1c' }}
              >
                Clear all history
              </button>
              <button
                onClick={() => setConfirmClearHistory(false)}
                className="text-sm"
                style={{ color: `${colors.lightText}99` }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <span className="text-xs" style={{ color: `${colors.lightText}70` }}>
                The last 25 mixes are kept on this device.
              </span>
              <button
                onClick={() => setConfirmClearHistory(true)}
                className="flex-shrink-0 text-sm font-medium"
                style={{ color: `${colors.lightText}99` }}
              >
                Clear history
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
