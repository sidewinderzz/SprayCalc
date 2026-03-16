import React, { useRef, useEffect } from 'react';
import { SavedMix, MixData, colors } from '../types';

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
  settingsFeedback: string;
  showTips: boolean;
  setShowTips: (val: boolean) => void;
  showThreeDotMenu: boolean;
  setShowThreeDotMenu: (val: boolean) => void;
  threeDotRef: React.RefObject<HTMLDivElement>;
  mixNameInputRef: React.RefObject<HTMLInputElement>;
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
  settingsFeedback,
  showTips,
  setShowTips,
  showThreeDotMenu,
  setShowThreeDotMenu,
  threeDotRef,
  mixNameInputRef
}: HeaderProps) {
  // Focus mix name input when dialog opens
  useEffect(() => {
    if (showSaveMixDialog && mixNameInputRef.current) {
      mixNameInputRef.current.focus();
    }
  }, [showSaveMixDialog, mixNameInputRef]);

  return (
    <>
      {/* Save Mix Dialog Modal */}
      {showSaveMixDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
          onClick={(e) => { if (e.target === e.currentTarget) setShowSaveMixDialog(false); }}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm"
            style={{border: `2px solid ${colors.primary}`}}
          >
            <h3 className="text-lg font-bold mb-1" style={{color: colors.primaryDark}}>Save Mix</h3>
            <p className="text-sm mb-4" style={{color: colors.lightText + '99'}}>
              Enter a name to save the current mix settings for quick recall.
            </p>
            <input
              ref={mixNameInputRef}
              type="text"
              value={mixNameInput}
              onChange={(e) => setMixNameInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') saveMix(); if (e.key === 'Escape') setShowSaveMixDialog(false); }}
              placeholder="e.g. Corn Herbicide Mix"
              className="w-full p-3 border-2 rounded-lg text-black mb-4 text-base"
              style={{borderColor: colors.primary + '60'}}
            />
            {savedMixes.find(m => m.name === mixNameInput.trim()) && (
              <p className="text-xs mb-3 px-2 py-1 rounded" style={{backgroundColor: colors.secondary + '30', color: colors.secondaryDark}}>
                A mix with this name already exists — it will be overwritten.
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveMixDialog(false)}
                className="flex-1 py-3 rounded-lg font-medium border"
                style={{borderColor: colors.primary + '50', color: colors.primaryDark}}
              >
                Cancel
              </button>
              <button
                onClick={saveMix}
                disabled={!mixNameInput.trim()}
                className="flex-1 py-3 rounded-lg font-medium text-white"
                style={{
                  backgroundColor: mixNameInput.trim() ? colors.primary : colors.primaryLight,
                  opacity: mixNameInput.trim() ? 1 : 0.6
                }}
              >
                Save Mix
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header bar */}
      <div className="flex justify-between items-center mb-6 gap-2">
        <h1 className="text-xl font-bold whitespace-nowrap" style={{color: colors.primary}}>Spray Calc</h1>

        <div className="flex items-center gap-2">
          {/* Feedback toast */}
          {settingsFeedback && (
            <div
              className="px-3 py-1.5 text-sm rounded-lg font-medium"
              style={{backgroundColor: colors.secondaryLight, color: colors.primaryDark}}
            >
              {settingsFeedback}
            </div>
          )}

          {/* Clear Button */}
          <button
            onClick={clearSettings}
            className="h-9 px-4 rounded-lg text-sm font-medium whitespace-nowrap"
            style={{
              backgroundColor: 'transparent',
              color: colors.primaryDark,
              border: `1px solid ${colors.primary}50`
            }}
            title="Clear all inputs"
          >
            Clear
          </button>

          {/* Save Mix Button */}
          <button
            onClick={openSaveMixDialog}
            className="h-9 px-4 rounded-lg text-sm font-medium text-white whitespace-nowrap"
            style={{backgroundColor: colors.primary}}
            title="Save this mix for quick recall"
          >
            Save Mix
          </button>

          {/* 3-dot Menu */}
          <div className="relative" ref={threeDotRef}>
            <button
              onClick={() => setShowThreeDotMenu(!showThreeDotMenu)}
              className="flex items-center justify-center w-9 h-9 rounded-lg"
              style={{
                backgroundColor: showThreeDotMenu ? colors.primary + '20' : 'transparent',
                color: colors.primaryDark
              }}
              title="More options"
              aria-label="More options"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <circle cx="12" cy="5" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="19" r="2"/>
              </svg>
            </button>

            {/* 3-dot Dropdown Menu */}
            {showThreeDotMenu && (
              <div
                className="absolute right-0 mt-2 rounded-xl shadow-xl border z-40 overflow-hidden"
                style={{
                  backgroundColor: 'white',
                  borderColor: colors.primary + '30',
                  minWidth: '260px',
                  maxWidth: '90vw'
                }}
              >
                {/* Saved Mixes Section */}
                <div className="px-4 pt-3 pb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{color: colors.primaryLight}}>
                    Saved Mixes
                  </p>
                  {savedMixes.length === 0 ? (
                    <p className="text-sm py-2" style={{color: colors.lightText + '80'}}>
                      No saved mixes yet. Hit "Save Mix" to save your first one.
                    </p>
                  ) : (
                    <div className="space-y-1 max-h-60 overflow-y-auto">
                      {savedMixes.map((mix) => (
                        <div
                          key={mix.name}
                          className="flex items-center gap-2 rounded-lg px-2 py-2"
                          style={{backgroundColor: colors.primary + '08'}}
                        >
                          <button
                            onClick={() => loadMix(mix.data)}
                            className="flex-1 text-left text-sm font-medium truncate"
                            style={{color: colors.primaryDark}}
                          >
                            {mix.name}
                          </button>
                          <button
                            onClick={() => deleteMix(mix.name)}
                            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-100 hover:text-red-600"
                            style={{color: colors.primaryLight}}
                            title={`Delete "${mix.name}"`}
                          >
                            <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{borderTop: `1px solid ${colors.primary}20`}} />

                {/* Menu Actions */}
                <div className="py-1">
                  <button
                    onClick={() => { setShowTips(!showTips); setShowThreeDotMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left"
                    style={{color: colors.lightText}}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {showTips ? 'Hide Tips' : 'Show Tips'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
