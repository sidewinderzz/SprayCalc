import React, { useRef, useEffect, useState } from 'react';
import { SavedMix, MixData, MixHistoryEntry, colors } from '../types';
import { formatRelativeTime } from '../utils/relativeTime';

interface HeaderProps {
  savedMixes: SavedMix[];
  showSaveMixDialog: boolean;
  setShowSaveMixDialog: (val: boolean) => void;
  mixNameInput: string;
  setMixNameInput: (val: string) => void;
  saveMix: () => void;
  deleteMix: (name: string) => void;
  openSaveMixDialog: () => void;
  loadMix: (data: MixData) => void;
  clearSettings: () => void;
  showTips: boolean;
  setShowTips: (val: boolean) => void;
  showMixesMenu: boolean;
  setShowMixesMenu: (val: boolean) => void;
  mixesMenuRef: React.RefObject<HTMLDivElement | null>;
  showOverflowMenu: boolean;
  setShowOverflowMenu: (val: boolean) => void;
  overflowMenuRef: React.RefObject<HTMLDivElement | null>;
  mixNameInputRef: React.RefObject<HTMLInputElement | null>;
  historyEntries: MixHistoryEntry[];
  loadHistoryEntry: (data: MixData) => void;
  deleteHistoryEntry: (id: string) => void;
  clearHistory: () => void;
}

export function Header({
  savedMixes,
  showSaveMixDialog,
  setShowSaveMixDialog,
  mixNameInput,
  setMixNameInput,
  saveMix,
  deleteMix,
  openSaveMixDialog,
  loadMix,
  clearSettings,
  showTips,
  setShowTips,
  showMixesMenu,
  setShowMixesMenu,
  mixesMenuRef,
  showOverflowMenu,
  setShowOverflowMenu,
  overflowMenuRef,
  mixNameInputRef,
  historyEntries,
  loadHistoryEntry,
  deleteHistoryEntry,
  clearHistory,
}: HeaderProps) {
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Reset the "clear history" confirmation when the Mixes menu closes
  useEffect(() => {
    if (!showMixesMenu) setConfirmClearHistory(false);
  }, [showMixesMenu]);

  // Focus mix name input when dialog opens
  useEffect(() => {
    if (showSaveMixDialog && mixNameInputRef.current) {
      mixNameInputRef.current.focus();
    }
  }, [showSaveMixDialog, mixNameInputRef]);

  // Detect when the sticky header has pinned to the top of the viewport so
  // we can elevate it with a subtle shadow.
  useEffect(() => {
    const node = stickyRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(entry.intersectionRatio < 1),
      { threshold: [1], rootMargin: '-1px 0px 0px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Escape closes any open header menu
  useEffect(() => {
    if (!showMixesMenu && !showOverflowMenu) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showMixesMenu) setShowMixesMenu(false);
        if (showOverflowMenu) setShowOverflowMenu(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [showMixesMenu, showOverflowMenu, setShowMixesMenu, setShowOverflowMenu]);

  return (
    <>
      {/* Save Mix Dialog Modal */}
      {showSaveMixDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSaveMixDialog(false);
          }}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm"
            style={{ border: `2px solid ${colors.primary}` }}
          >
            <h3 className="text-lg font-bold mb-1" style={{ color: colors.primaryDark }}>Save Mix</h3>
            <p className="text-sm mb-4" style={{ color: colors.lightText + '99' }}>
              Enter a name to save the current mix settings for quick recall.
            </p>
            <input
              ref={mixNameInputRef}
              type="text"
              value={mixNameInput}
              onChange={(e) => setMixNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveMix();
                if (e.key === 'Escape') setShowSaveMixDialog(false);
              }}
              placeholder="e.g. Corn Herbicide Mix"
              className="w-full p-3 border-2 rounded-lg text-black mb-4 text-base"
              style={{ borderColor: colors.primary + '60' }}
            />
            {savedMixes.find((m) => m.name === mixNameInput.trim()) && (
              <p
                className="text-xs mb-3 px-2 py-1 rounded"
                style={{ backgroundColor: colors.secondary + '30', color: colors.secondaryDark }}
              >
                A mix with this name already exists — it will be overwritten.
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveMixDialog(false)}
                className="flex-1 py-3 rounded-lg font-medium border"
                style={{ borderColor: colors.primary + '50', color: colors.primaryDark }}
              >
                Cancel
              </button>
              <button
                onClick={saveMix}
                disabled={!mixNameInput.trim()}
                className="flex-1 py-3 rounded-lg font-medium text-white"
                style={{
                  backgroundColor: mixNameInput.trim() ? colors.primary : colors.primaryLight,
                  opacity: mixNameInput.trim() ? 1 : 0.6,
                }}
              >
                Save Mix
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky header shell — extends to the card's edges and pins to the
          top of the viewport. Pulls itself out of the parent card padding
          using negative margins so the white background runs full-width. */}
      <div
        ref={stickyRef}
        className="sticky top-0 z-30 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 mb-4 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 rounded-t-2xl"
        style={{
          backgroundColor: 'white',
          boxShadow: isStuck
            ? '0 2px 8px rgba(73,138,90,0.10), 0 1px 2px rgba(0,0,0,0.04)'
            : 'none',
          transition: 'box-shadow 200ms ease',
        }}
      >
        <div className="flex justify-between items-center gap-2">
          <h1
            className="text-lg xs:text-xl font-bold whitespace-nowrap"
            style={{ color: colors.primary }}
          >
            Spray Calc
          </h1>

          <div className="flex items-center gap-2">
            {/* Mixes button + dropdown */}
            <div className="relative" ref={mixesMenuRef}>
              <button
                onClick={() => {
                  setShowMixesMenu(!showMixesMenu);
                  if (!showMixesMenu) setShowOverflowMenu(false);
                }}
                className="h-11 w-11 xs:h-9 xs:w-auto xs:px-3 flex items-center justify-center xs:gap-1.5 rounded-lg text-sm font-medium whitespace-nowrap"
                style={{
                  backgroundColor: showMixesMenu ? colors.primary + '15' : 'transparent',
                  color: colors.primaryDark,
                  border: `1px solid ${colors.primary}50`,
                }}
                title="Saved & Recent Mixes"
                aria-label="Saved and Recent Mixes"
                aria-expanded={showMixesMenu}
                aria-haspopup="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="12 2 22 8.5 12 15 2 8.5 12 2" />
                  <polyline points="2 15.5 12 22 22 15.5" />
                  <polyline points="2 12 12 18.5 22 12" />
                </svg>
                <span className="hidden xs:inline">Mixes</span>
              </button>

              {showMixesMenu && (
                <div
                  className="absolute right-0 mt-2 rounded-xl shadow-xl border z-40 overflow-hidden"
                  style={{
                    backgroundColor: 'white',
                    borderColor: colors.primary + '30',
                    minWidth: '260px',
                    width: 'max-content',
                    maxWidth: 'calc(100vw - 16px)',
                  }}
                  role="menu"
                >
                  {/* Saved Mixes Section */}
                  <div className="px-4 pt-3 pb-2">
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: colors.primaryLight }}
                    >
                      Saved Mixes
                    </p>
                    {savedMixes.length === 0 ? (
                      <p className="text-sm py-2" style={{ color: colors.lightText + '80' }}>
                        No saved mixes yet. Hit "Save Mix" to save your first one.
                      </p>
                    ) : (
                      <div className="space-y-1 max-h-60 overflow-y-auto">
                        {savedMixes.map((mix) => (
                          <div
                            key={mix.name}
                            className="flex items-center gap-2 rounded-lg px-2 py-2"
                            style={{ backgroundColor: colors.primary + '08' }}
                          >
                            <button
                              onClick={() => loadMix(mix.data)}
                              className="flex-1 text-left text-sm font-medium truncate"
                              style={{ color: colors.primaryDark }}
                            >
                              {mix.name}
                            </button>
                            <button
                              onClick={() => deleteMix(mix.name)}
                              className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-100 hover:text-red-600"
                              style={{ color: colors.primaryLight }}
                              title={`Delete "${mix.name}"`}
                              aria-label={`Delete saved mix ${mix.name}`}
                            >
                              <svg
                                viewBox="0 0 14 14"
                                width="11"
                                height="11"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              >
                                <line x1="1" y1="1" x2="13" y2="13" />
                                <line x1="13" y1="1" x2="1" y2="13" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ borderTop: `1px solid ${colors.primary}20` }} />

                  {/* Recent Mixes Section */}
                  <div className="px-4 pt-3 pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: colors.primaryLight }}
                      >
                        Recent Mixes
                      </p>
                      {historyEntries.length > 0 &&
                        (confirmClearHistory ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                clearHistory();
                                setConfirmClearHistory(false);
                              }}
                              className="text-xs font-semibold"
                              style={{ color: '#b91c1c' }}
                            >
                              Confirm
                            </button>
                            <span className="text-xs" style={{ color: colors.lightText + '60' }}>·</span>
                            <button
                              onClick={() => setConfirmClearHistory(false)}
                              className="text-xs"
                              style={{ color: colors.lightText + '99' }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmClearHistory(true)}
                            className="text-xs font-medium"
                            style={{ color: colors.lightText + '99' }}
                            title="Clear recent mixes history"
                          >
                            Clear history
                          </button>
                        ))}
                    </div>
                    {historyEntries.length === 0 ? (
                      <p className="text-sm py-2" style={{ color: colors.lightText + '80' }}>
                        No recent mixes yet. Saving, copying, or exporting a mix will log it here.
                      </p>
                    ) : (
                      <div className="space-y-1 max-h-60 overflow-y-auto">
                        {historyEntries.map((entry) => (
                          <div
                            key={entry.id}
                            className="flex items-center gap-2 rounded-lg px-2 py-2"
                            style={{ backgroundColor: colors.primary + '08' }}
                          >
                            <button
                              onClick={() => loadHistoryEntry(entry.data)}
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
                                style={{ color: colors.lightText + '80' }}
                              >
                                {formatRelativeTime(entry.timestamp)}
                              </div>
                            </button>
                            <button
                              onClick={() => deleteHistoryEntry(entry.id)}
                              className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-100 hover:text-red-600"
                              style={{ color: colors.primaryLight }}
                              title="Remove from history"
                              aria-label="Remove from history"
                            >
                              <svg
                                viewBox="0 0 14 14"
                                width="11"
                                height="11"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              >
                                <line x1="1" y1="1" x2="13" y2="13" />
                                <line x1="13" y1="1" x2="1" y2="13" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Save Mix primary button */}
            <button
              onClick={openSaveMixDialog}
              className="h-11 w-11 xs:h-9 xs:w-auto xs:px-4 flex items-center justify-center xs:gap-1.5 rounded-lg text-sm font-medium text-white whitespace-nowrap"
              style={{ backgroundColor: colors.primary }}
              title="Save this mix for quick recall"
              aria-label="Save Mix"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              <span className="hidden xs:inline">Save Mix</span>
            </button>

            {/* Overflow menu */}
            <div className="relative" ref={overflowMenuRef}>
              <button
                onClick={() => {
                  setShowOverflowMenu(!showOverflowMenu);
                  if (!showOverflowMenu) setShowMixesMenu(false);
                }}
                className="h-11 w-11 xs:h-9 xs:w-9 flex items-center justify-center rounded-lg"
                style={{
                  backgroundColor: showOverflowMenu ? colors.primary + '20' : 'transparent',
                  color: colors.primaryDark,
                }}
                title="More options"
                aria-label="More options"
                aria-expanded={showOverflowMenu}
                aria-haspopup="true"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>

              {showOverflowMenu && (
                <div
                  className="absolute right-0 mt-2 rounded-xl shadow-xl border z-40 overflow-hidden"
                  style={{
                    backgroundColor: 'white',
                    borderColor: colors.primary + '30',
                    minWidth: '220px',
                    maxWidth: 'calc(100vw - 16px)',
                  }}
                  role="menu"
                >
                  <button
                    onClick={() => {
                      setShowTips(!showTips);
                      setShowOverflowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-black/5"
                    style={{ color: colors.lightText }}
                    role="menuitem"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {showTips ? 'Hide Tips' : 'Show Tips'}
                  </button>
                  <div style={{ borderTop: `1px solid ${colors.primary}20` }} />
                  <button
                    onClick={() => {
                      clearSettings();
                      setShowOverflowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-red-50"
                    style={{ color: '#b91c1c' }}
                    role="menuitem"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                    </svg>
                    Clear all inputs
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
