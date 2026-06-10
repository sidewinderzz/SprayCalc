import React, { useRef, useEffect, useState } from 'react';
import { SavedMix, MixData, MixHistoryEntry, colors } from '../types';
import { formatRelativeTime } from '../utils/relativeTime';
import { useScrollDirection } from '../hooks/useScrollDirection';

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
  onShowTour: () => void;
  activeTab: 'tank' | 'field';
  setActiveTab: (val: 'tank' | 'field') => void;
  // Account/sync (only rendered when Firebase is configured)
  authEnabled: boolean;
  authUser: { displayName: string | null; email: string | null; photoURL: string | null } | null;
  onSignIn: () => void;
  onSignOut: () => void;
  // Scan Recommendations (Claude API key)
  apiKey: string;
  scanEnabled: boolean;
  setScanEnabled: (v: boolean) => void;
  keyInput: string;
  setKeyInput: (v: string) => void;
  onSaveApiKey: (key: string) => void;
  onClearApiKey: () => void;
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
  onShowTour,
  activeTab,
  setActiveTab,
  authEnabled,
  authUser,
  onSignIn,
  onSignOut,
  apiKey,
  scanEnabled,
  setScanEnabled,
  keyInput,
  setKeyInput,
  onSaveApiKey,
  onClearApiKey,
}: HeaderProps) {
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Track scroll position/direction so the header can hide-on-scroll-down,
  // reveal-on-scroll-up, and switch to its translucent/compact "stuck" look.
  const { isNearTop, isHidden } = useScrollDirection({
    topThreshold: 8,
    hideAfter: 80,
  });
  const isStuck = !isNearTop;

  // While any header dropdown or the save-mix dialog is open, freeze the
  // header in its visible position so menus stay anchored to their button.
  const isMenuOpen = showOverflowMenu || showSaveMixDialog;
  const shouldHide = isHidden && !isMenuOpen;

  // Reset the "clear history" confirmation when the overflow menu closes
  useEffect(() => {
    if (!showOverflowMenu) setConfirmClearHistory(false);
  }, [showOverflowMenu]);

  // Focus mix name input when dialog opens
  useEffect(() => {
    if (showSaveMixDialog && mixNameInputRef.current) {
      mixNameInputRef.current.focus();
    }
  }, [showSaveMixDialog, mixNameInputRef]);

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
        className={`header-shell sticky z-30 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 mb-4 px-4 sm:px-6 rounded-t-2xl${
          isStuck ? ' header-shell--stuck' : ''
        }`}
        style={{
          // Sticky pins to viewport top (y=0). With viewport-fit=cover, that
          // is *under* the status bar / notch, so the white/translucent
          // surface naturally extends behind the inset. The padding-top
          // below adds the inset back so the actual header content lands
          // below the notch — no clipping, no awkward white sliver.
          top: 0,
          paddingTop: `calc(env(safe-area-inset-top) + ${
            isStuck ? '0.625rem' : '1rem'
          })`,
          paddingBottom: isStuck ? '0.5rem' : '0.75rem',
          backgroundColor: isStuck ? 'rgba(255,255,255,0.78)' : '#ffffff',
          backdropFilter: isStuck ? 'saturate(180%) blur(12px)' : 'none',
          WebkitBackdropFilter: isStuck ? 'saturate(180%) blur(12px)' : 'none',
          boxShadow: isStuck
            ? '0 1px 0 rgba(73,138,90,0.10), 0 4px 14px rgba(73,138,90,0.06)'
            : 'none',
          transform: shouldHide ? 'translateY(-100%)' : 'translateY(0)',
          transition:
            'transform 200ms ease, background-color 200ms ease, ' +
            'backdrop-filter 200ms ease, -webkit-backdrop-filter 200ms ease, ' +
            'padding 200ms ease, box-shadow 200ms ease',
          willChange: 'transform',
        }}
      >
        <div className="flex justify-between items-center gap-2">
          <h1
            className={`${
              isStuck ? 'text-base xs:text-lg' : 'text-lg xs:text-xl'
            } font-bold whitespace-nowrap`}
            style={{
              color: colors.primary,
              transition: 'font-size 200ms ease',
            }}
          >
            <span className="text-[24px]" style={{ color: '#1c291f' }}>Spray</span><span className="text-[24px]" style={{ color: colors.primary }}>Calc</span>
          </h1>

          <div className="flex items-center gap-2">
            {/* Overflow menu (contains Mixes + settings) */}
            <div className="relative" ref={overflowMenuRef}>
              <button
                onClick={() => {
                  setShowOverflowMenu(!showOverflowMenu);
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
                  className="absolute right-0 mt-2 rounded-xl shadow-xl border z-40"
                  style={{
                    backgroundColor: 'white',
                    borderColor: colors.primary + '30',
                    width: 'min(320px, calc(100vw - 16px))',
                    maxHeight: 'calc(100vh - 120px)',
                    overflowY: 'auto',
                  }}
                  role="menu"
                >
                  {/* Account / cloud sync */}
                  {authEnabled && (
                    <>
                      {authUser ? (
                        <div className="px-4 py-3 flex items-center gap-3">
                          {authUser.photoURL ? (
                            <img
                              src={authUser.photoURL}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                          ) : (
                            <div
                              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white"
                              style={{ backgroundColor: colors.primary }}
                            >
                              {(authUser.displayName || authUser.email || '?').charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: colors.primaryDark }}>
                              {authUser.displayName || authUser.email}
                            </p>
                            <p className="text-xs truncate" style={{ color: colors.lightText + '80' }}>
                              Mixes sync to your account
                            </p>
                          </div>
                          <button
                            onClick={onSignOut}
                            className="flex-shrink-0 text-xs font-semibold"
                            style={{ color: colors.lightText + '99' }}
                          >
                            Sign out
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setShowOverflowMenu(false);
                            onSignIn();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left font-medium hover:bg-black/5"
                          style={{ color: colors.primaryDark }}
                          role="menuitem"
                        >
                          <svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true">
                            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z" />
                            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.32A9 9 0 0 0 9 18z" />
                            <path fill="#FBBC05" d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.96H.96a9 9 0 0 0 0 8.08l3.01-2.32z" />
                            <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.96l3.01 2.32C4.68 5.16 6.66 3.58 9 3.58z" />
                          </svg>
                          <span>
                            Sign in with Google
                            <span className="block text-xs font-normal" style={{ color: colors.lightText + '80' }}>
                              Sync saved mixes across devices
                            </span>
                          </span>
                        </button>
                      )}
                      <div style={{ borderTop: `1px solid ${colors.primary}20` }} />
                    </>
                  )}

                  {/* Save current mix action */}
                  <button
                    onClick={() => {
                      setShowOverflowMenu(false);
                      openSaveMixDialog();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left font-medium hover:bg-black/5"
                    style={{ color: colors.primaryDark }}
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
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    Save current mix…
                  </button>
                  <div style={{ borderTop: `1px solid ${colors.primary}20` }} />

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
                        No saved mixes yet. Use "Save current mix…" above to save your first one.
                      </p>
                    ) : (
                      <div className="space-y-1">
                        {savedMixes.map((mix) => (
                          <div
                            key={mix.name}
                            className="flex items-center gap-2 rounded-lg px-2 py-2"
                            style={{ backgroundColor: colors.primary + '08' }}
                          >
                            <button
                              onClick={() => { loadMix(mix.data); setShowOverflowMenu(false); }}
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
                              <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
                              onClick={() => { clearHistory(); setConfirmClearHistory(false); }}
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
                      <div className="space-y-1">
                        {historyEntries.map((entry) => (
                          <div
                            key={entry.id}
                            className="flex items-center gap-2 rounded-lg px-2 py-2"
                            style={{ backgroundColor: colors.primary + '08' }}
                          >
                            <button
                              onClick={() => { loadHistoryEntry(entry.data); setShowOverflowMenu(false); }}
                              className="flex-1 text-left min-w-0"
                            >
                              <div className="text-sm font-medium truncate" style={{ color: colors.primaryDark }}>
                                {entry.summary}
                              </div>
                              <div className="text-xs mt-0.5 truncate" style={{ color: colors.lightText + '80' }}>
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
                              <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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

                  {/* Settings actions */}
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
                  <button
                    onClick={() => {
                      setShowOverflowMenu(false);
                      onShowTour();
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
                      <path d="M12 2a10 10 0 1 0 10 10" />
                      <polyline points="22 4 12 14 9 11" />
                    </svg>
                    Replay tour
                  </button>
                  <div style={{ borderTop: `1px solid ${colors.primary}20` }} />

                  {/* Scan Recommendations */}
                  <div className="px-4 pt-3 pb-3">
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: colors.primaryLight }}
                    >
                      Scan Recommendations{' '}
                      <span className="normal-case font-normal opacity-60">Beta</span>
                    </p>
                    {apiKey ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono" style={{ color: colors.lightText + '80' }}>
                            sk-ant-••••••••
                          </span>
                          <button
                            onClick={onClearApiKey}
                            className="text-xs hover:underline"
                            style={{ color: '#b91c1c' }}
                          >
                            Remove
                          </button>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <button
                            role="switch"
                            aria-checked={scanEnabled}
                            onClick={() => setScanEnabled(!scanEnabled)}
                            className="relative flex-shrink-0 w-8 h-5 rounded-full transition-colors focus:outline-none"
                            style={{ backgroundColor: scanEnabled ? colors.primary : `${colors.primaryLight}50` }}
                          >
                            <span
                              className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
                              style={{ transform: scanEnabled ? 'translateX(12px)' : 'translateX(0)' }}
                            />
                          </button>
                          <span className="text-sm" style={{ color: colors.lightText }}>
                            Show scan button
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-xs leading-relaxed" style={{ color: colors.lightText + '70' }}>
                          Add your Claude API key to scan spray recs and auto-fill products.
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            value={keyInput}
                            onChange={e => setKeyInput(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' && keyInput.trim()) onSaveApiKey(keyInput);
                            }}
                            placeholder="sk-ant-..."
                            className="flex-1 min-w-0 text-xs px-2 py-1.5 rounded-lg border"
                            style={{
                              borderColor: `${colors.primary}40`,
                              color: colors.lightText,
                              backgroundColor: 'white',
                            }}
                          />
                          <button
                            onClick={() => keyInput.trim() && onSaveApiKey(keyInput)}
                            disabled={!keyInput.trim()}
                            className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-opacity"
                            style={{
                              backgroundColor: colors.primary,
                              opacity: keyInput.trim() ? 1 : 0.5,
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

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

        {/* Mode toggle: Tank-first vs Field-first workflow */}
        <div
          role="tablist"
          aria-label="Calculator mode"
          data-tour-id="mode-tabs"
          className="mt-2 flex items-stretch"
          style={{ borderBottom: `1px solid ${colors.primary}25` }}
        >
          {(['tank', 'field'] as const).map((mode) => {
            const isActive = activeTab === mode;
            const label = mode === 'tank' ? 'Tank Mix' : 'Field Mix';
            const subtitle = mode === 'tank' ? 'per-tank inputs' : 'whole-field inputs';
            return (
              <button
                key={mode}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(mode)}
                title={subtitle}
                aria-label={`${label} (${subtitle})`}
                className="relative bg-transparent border-0 px-4 py-2 transition-colors"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: isActive ? colors.primaryDark : '#7c867c',
                }}
              >
                {label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 10,
                      right: 10,
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
      </div>
    </>
  );
}
