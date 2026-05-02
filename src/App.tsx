import React, { useEffect, useRef } from 'react';
import { colors } from './types';
import { useCalculatorState } from './hooks/useCalculatorState';
import { useMixStorage } from './hooks/useMixStorage';
import { useMixHistory } from './hooks/useMixHistory';
import { Header } from './components/Header';
import { TipsSection } from './components/TipsSection';
import { MixSettings } from './components/MixSettings';
import { ProductsSection } from './components/ProductsSection';
import { SummarySection } from './components/SummarySection';
import { FieldQuantities } from './components/FieldQuantities';
import { FieldOperationsSection } from './components/FieldOperationsSection';
import { readMixFromCurrentURL, clearMixParamFromURL } from './utils/mixLink';

const AgSprayCalculator = () => {
  const state = useCalculatorState();

  // 3-dot menu state
  const [showThreeDotMenu, setShowThreeDotMenu] = React.useState(false);
  const threeDotRef = useRef<HTMLDivElement>(null);
  const mixNameInputRef = useRef<HTMLInputElement>(null);

  const mixStorage = useMixStorage(
    state.applyMixData,
    state.setSettingsFeedback,
    () => setShowThreeDotMenu(false)
  );

  const mixHistory = useMixHistory();

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close 3-dot menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (threeDotRef.current && !threeDotRef.current.contains(e.target as Node)) {
        setShowThreeDotMenu(false);
      }
    };
    if (showThreeDotMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showThreeDotMenu]);

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
    <div className="min-h-screen py-4 sm:py-8">
      <div
        className="rounded-2xl mx-auto p-4 sm:p-6"
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
          settingsFeedback={state.settingsFeedback}
          showTips={state.showTips}
          setShowTips={state.setShowTips}
          showThreeDotMenu={showThreeDotMenu}
          setShowThreeDotMenu={setShowThreeDotMenu}
          threeDotRef={threeDotRef}
          mixNameInputRef={mixNameInputRef}
          historyEntries={mixHistory.historyEntries}
          loadHistoryEntry={mixStorage.loadMix}
          deleteHistoryEntry={mixHistory.deleteHistoryEntry}
          clearHistory={mixHistory.clearHistory}
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
    </div>
  );
};

export default AgSprayCalculator;
