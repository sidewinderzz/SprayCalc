import React, { useEffect, useRef } from 'react';
import { colors } from './types';
import { useCalculatorState } from './hooks/useCalculatorState';
import { useMixStorage } from './hooks/useMixStorage';
import { useMixHistory } from './hooks/useMixHistory';
import { Header } from './components/Header';
import { SettingsToast } from './components/SettingsToast';
import { TipsSection } from './components/TipsSection';
import { MixSettings } from './components/MixSettings';
import { ProductsSection } from './components/ProductsSection';
import { SummarySection } from './components/SummarySection';
import { FieldQuantities } from './components/FieldQuantities';
import { FieldOperationsSection } from './components/FieldOperationsSection';
import { OnboardingTour, TOUR_STEPS } from './components/OnboardingTour';
import { readMixFromCurrentURL, clearMixParamFromURL } from './utils/mixLink';

const TOUR_SEEN_KEY = 'agSprayCalcTourSeen';

const AgSprayCalculator = () => {
  const state = useCalculatorState();

  // Header menu state
  const [showMixesMenu, setShowMixesMenu] = React.useState(false);
  const [showOverflowMenu, setShowOverflowMenu] = React.useState(false);
  const mixesMenuRef = useRef<HTMLDivElement>(null);
  const overflowMenuRef = useRef<HTMLDivElement>(null);
  const mixNameInputRef = useRef<HTMLInputElement>(null);

  const closeHeaderMenus = () => {
    setShowMixesMenu(false);
    setShowOverflowMenu(false);
  };

  const mixStorage = useMixStorage(
    state.applyMixData,
    state.setSettingsFeedback,
    closeHeaderMenus
  );

  const mixHistory = useMixHistory();

  const [showTour, setShowTour] = React.useState(false);

  const closeTour = () => {
    setShowTour(false);
    try { localStorage.setItem(TOUR_SEEN_KEY, '1'); } catch (_) {}
  };

  const startTour = () => {
    closeHeaderMenus();
    setShowTour(true);
  };

  // Load saved settings, mixes, and history on component mount.
  // If the URL carries a shared mix link (?m=...), apply it instead of the
  // last auto-saved settings, then strip the param so reloads don't re-apply.
  useEffect(() => {
    const sharedMix = readMixFromCurrentURL();
    if (sharedMix) {
      state.applyMixData(sharedMix);
      clearMixParamFromURL();
      state.setSettingsFeedback('Mix loaded from link');
      setTimeout(() => state.setSettingsFeedback(''), 2500);
    } else {
      state.loadSettings();
    }
    mixStorage.loadAllMixes();
    mixHistory.loadHistory();
    setTimeout(() => { state.hasLoaded.current = true; }, 300);

    // Auto-launch the onboarding tour for first-time visitors.
    try {
      if (!localStorage.getItem(TOUR_SEEN_KEY)) {
        // Wait briefly for the layout to settle so spotlight targets exist.
        setTimeout(() => setShowTour(true), 600);
      }
    } catch (_) { /* localStorage unavailable */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close header menus when clicking outside their respective triggers/panels.
  useEffect(() => {
    if (!showMixesMenu && !showOverflowMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        showMixesMenu &&
        mixesMenuRef.current &&
        !mixesMenuRef.current.contains(target)
      ) {
        setShowMixesMenu(false);
      }
      if (
        showOverflowMenu &&
        overflowMenuRef.current &&
        !overflowMenuRef.current.contains(target)
      ) {
        setShowOverflowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMixesMenu, showOverflowMenu]);

  const getCurrentMixData = () => ({
    fillVolume: state.fillVolume,
    applicationRate: state.applicationRate,
    products: state.products,
    fieldSize: state.fieldSize,
    implementWidth: state.implementWidth,
    speed: state.speed,
    fillTime: state.fillTime
  });

  // Wraps the Save Mix flow so an intent-to-save (non-empty name) also
  // logs the current mix to recent history.
  const handleSaveMix = () => {
    if (mixStorage.mixNameInput.trim()) {
      mixHistory.addToHistory(getCurrentMixData());
    }
    mixStorage.saveMix(getCurrentMixData);
  };

  // Snapshot the current mix into recent history (used by Copy and PDF
  // actions in SummarySection).
  const handleMixSnapshot = () => {
    mixHistory.addToHistory(getCurrentMixData());
  };

  return (
    <div className="min-h-screen pt-0 sm:pt-8 pb-4 sm:pb-8">
      <div
        className="rounded-2xl sm:rounded-2xl rounded-t-none mx-auto p-4 sm:p-6"
        style={{
          backgroundColor: 'white',
          color: colors.lightText,
          maxWidth: "min(100%, 1000px)",
          boxShadow: '0 4px 24px 0 rgba(73,138,90,0.08), 0 1px 4px 0 rgba(0,0,0,0.06)'
        }}
      >
        <Header
          savedMixes={mixStorage.savedMixes}
          showSaveMixDialog={mixStorage.showSaveMixDialog}
          setShowSaveMixDialog={mixStorage.setShowSaveMixDialog}
          mixNameInput={mixStorage.mixNameInput}
          setMixNameInput={mixStorage.setMixNameInput}
          saveMix={handleSaveMix}
          deleteMix={mixStorage.deleteMix}
          openSaveMixDialog={mixStorage.openSaveMixDialog}
          loadMix={mixStorage.loadMix}
          clearSettings={state.clearSettings}
          showTips={state.showTips}
          setShowTips={state.setShowTips}
          showMixesMenu={showMixesMenu}
          setShowMixesMenu={setShowMixesMenu}
          mixesMenuRef={mixesMenuRef}
          showOverflowMenu={showOverflowMenu}
          setShowOverflowMenu={setShowOverflowMenu}
          overflowMenuRef={overflowMenuRef}
          mixNameInputRef={mixNameInputRef}
          historyEntries={mixHistory.historyEntries}
          loadHistoryEntry={mixStorage.loadMix}
          deleteHistoryEntry={mixHistory.deleteHistoryEntry}
          clearHistory={mixHistory.clearHistory}
          onShowTour={startTour}
        />

        <TipsSection
          show={state.showTips}
          onClose={() => state.setShowTips(false)}
        />

        <MixSettings
          fillVolume={state.fillVolume}
          applicationRate={state.applicationRate}
          acresPerFill={state.acresPerFill}
          acresPerFillInput={state.acresPerFillInput}
          onFillVolumeChange={state.handleFillVolumeChange}
          onApplicationRateChange={state.handleApplicationRateChange}
          onAcresPerFillInputChange={state.handleAcresPerFillInputChange}
          onAcresPerFillBlur={state.handleAcresPerFillBlur}
        />

        <ProductsSection
          products={state.products}
          onProductChange={state.handleProductChange}
          onToggleFormatMenu={state.toggleFormatMenu}
          onSelectFormat={state.selectFormat}
          openFormatMenuId={state.openFormatMenuId}
          onAddProduct={state.addNewProduct}
          onRemoveProduct={state.removeProduct}
          pendingFocusId={state.pendingFocusId}
          onClearPendingFocusId={state.clearPendingFocusId}
        />

        <SummarySection
          fillVolume={state.fillVolume}
          applicationRate={state.applicationRate}
          acresPerFill={state.acresPerFill}
          products={state.products}
          fieldSize={state.fieldSize}
          implementWidth={state.implementWidth}
          speed={state.speed}
          fillTime={state.fillTime}
          currentTime={state.currentTime}
          copyFeedback={state.copyFeedback}
          setCopyFeedback={state.setCopyFeedback}
          onMixSnapshot={handleMixSnapshot}
        />

        <FieldQuantities
          products={state.products}
          fieldSize={state.fieldSize}
          acresPerFill={state.acresPerFill}
          applicationRate={state.applicationRate}
          fillVolume={state.fillVolume}
          showQuantities={state.showQuantities}
          setShowQuantities={state.setShowQuantities}
        />

        <FieldOperationsSection
          fillVolume={state.fillVolume}
          applicationRate={state.applicationRate}
          acresPerFill={state.acresPerFill}
          fieldSize={state.fieldSize}
          implementWidth={state.implementWidth}
          speed={state.speed}
          fillTime={state.fillTime}
          setFieldSize={state.setFieldSize}
          setImplementWidth={state.setImplementWidth}
          setSpeed={state.setSpeed}
          setFillTime={state.setFillTime}
          currentTime={state.currentTime}
          showFieldOps={state.showFieldOps}
          setShowFieldOps={state.setShowFieldOps}
        />

        <div className="mt-4 text-xs opacity-60" style={{color: colors.primaryDark}}>
          <p>Always verify calculations against product labels and follow all safety guidelines.</p>
        </div>
      </div>

      {/* Floating snackbar for settings feedback (Saved/Loaded/etc.) */}
      <SettingsToast message={state.settingsFeedback} />

      <OnboardingTour
        open={showTour}
        steps={TOUR_STEPS}
        onClose={closeTour}
        onComplete={closeTour}
      />
    </div>
  );
};

export default AgSprayCalculator;
