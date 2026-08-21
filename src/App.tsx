import React, { useEffect, useRef } from 'react';
import { colors, ScannedProduct, Product } from './types';
import { useCalculatorState } from './hooks/useCalculatorState';
import { useAuth } from './hooks/useAuth';
import { useMixStorage } from './hooks/useMixStorage';
import { useMixHistory } from './hooks/useMixHistory';
import { useApiKey } from './hooks/useApiKey';
import { useCloudSyncStatus } from './hooks/useCloudSyncStatus';
import { Header } from './components/Header';
import { MixesPanel } from './components/MixesPanel';
import { SettingsToast } from './components/SettingsToast';
import { TipsSection } from './components/TipsSection';
import { MixSettings } from './components/MixSettings';
import { FieldMixSettings } from './components/FieldMixSettings';
import { ProductsSection } from './components/ProductsSection';
import { ScanButton } from './components/ScanButton';
import { ScanReviewModal } from './components/ScanReviewModal';
import { SummarySection } from './components/SummarySection';
import { FieldMixSummary } from './components/FieldMixSummary';
import { PerMixBreakdown } from './components/PerMixBreakdown';
import { WhatToBuy } from './components/WhatToBuy';
import { CostSplitSection } from './components/CostSplitSection';
import { FieldOperationsSection } from './components/FieldOperationsSection';
import { OnboardingTour, TOUR_STEPS } from './components/OnboardingTour';
import { readMixFromCurrentURL, clearMixParamFromURL } from './utils/mixLink';
import { trackEvent, trackPageView } from './utils/analytics';
import { buildMixLoads, calculateAmount } from './utils/calculations';

const TOUR_SEEN_KEY = 'agSprayCalcTourSeen';

const AgSprayCalculator = () => {
  const state = useCalculatorState();

  // Header menu state
  const [showMixesPanel, setShowMixesPanel] = React.useState(false);
  const [showOverflowMenu, setShowOverflowMenu] = React.useState(false);
  const overflowMenuRef = useRef<HTMLDivElement>(null);
  const mixNameInputRef = useRef<HTMLInputElement>(null);

  const closeHeaderMenus = () => {
    setShowMixesPanel(false);
    setShowOverflowMenu(false);
  };

  const auth = useAuth(state.setSettingsFeedback);
  const apiKeyState = useApiKey(auth.user, state.setSettingsFeedback);
  const cloudSync = useCloudSyncStatus(auth.user);

  const [scanModal, setScanModal] = React.useState<{ imageBase64: string; mimeType: string } | null>(null);

  const handleScanApply = (scanned: ScannedProduct[], sprayVolume?: number) => {
    if (sprayVolume && sprayVolume > 0) {
      state.handleApplicationRateChange(String(sprayVolume));
    }
    const gpa = (sprayVolume && sprayVolume > 0) ? sprayVolume : state.applicationRate;
    const newProducts: Product[] = scanned.map(sp => ({
      id: Date.now() + Math.random(),
      name: sp.name,
      rate: sp.rate,
      unit: sp.unit,
      tankAmount: calculateAmount(sp.rate, sp.unit, state.fillVolume, gpa),
      outputFormat: 'auto' as const,
      jugSize: 0,
    }));
    const onlyOneEmpty =
      state.products.length === 1 &&
      !state.products[0].name &&
      !state.products[0].rate;
    if (onlyOneEmpty) {
      state.setProducts(newProducts);
    } else {
      state.setProducts([...state.products, ...newProducts]);
    }
    const gpaNote = sprayVolume && sprayVolume > 0 ? ` · ${sprayVolume} GPA set` : '';
    state.setSettingsFeedback(`${newProducts.length} product${newProducts.length !== 1 ? 's' : ''} added from scan${gpaNote}`);
    setTimeout(() => state.setSettingsFeedback(''), 2500);
  };

  const mixStorage = useMixStorage(
    state.applyMixData,
    state.setSettingsFeedback,
    closeHeaderMenus,
    auth.user
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
      trackPageView('/?shared=1', 'Ag Spray Calculator — Shared Mix');
      trackEvent('view_shared_mix', {
        product_count: Array.isArray(sharedMix.products) ? sharedMix.products.length : 0,
      });
    } else {
      state.loadSettings();
      trackPageView();
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

  // Close the overflow menu when clicking outside it. (The Mixes sheet is a
  // modal and closes itself on backdrop click.)
  useEffect(() => {
    if (!showOverflowMenu) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (overflowMenuRef.current && !overflowMenuRef.current.contains(target)) {
        setShowOverflowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOverflowMenu]);

  // The tank loads the operator will actually mix. Field Mix mode plans these
  // from the acreage, so a job that doesn't fill a tank is a single partial
  // load rather than a hypothetical full one.
  const mixLoads = buildMixLoads(
    state.activeTab,
    state.fieldSize,
    state.applicationRate,
    state.fillVolume,
    state.activeTab === 'field' ? state.splitMode : 'fullPlusPartial'
  );

  const getCurrentMixData = () => ({
    fillVolume: state.fillVolume,
    applicationRate: state.applicationRate,
    products: state.products,
    fieldSize: state.fieldSize,
    implementWidth: state.implementWidth,
    speed: state.speed,
    fillTime: state.fillTime,
    activeTab: state.activeTab,
    splitMode: state.splitMode,
    splits: state.splits
  });

  // Wraps the Save Mix flow so an intent-to-save (non-empty name) also
  // logs the current mix to recent history.
  const handleSaveMix = () => {
    if (mixStorage.mixNameInput.trim()) {
      mixHistory.addToHistory(getCurrentMixData());
      const data = getCurrentMixData();
      trackEvent('save_mix', {
        product_count: data.products.length,
        fill_volume: data.fillVolume,
        application_rate: data.applicationRate,
      });
    }
    void mixStorage.saveMix(getCurrentMixData);
  };

  // Fire a debounced `calculate_mix` event after the user has settled on inputs
  // that produce a real result (≥1 product with a rate, plus fill/app rate).
  useEffect(() => {
    if (!state.hasLoaded.current) return;
    const hasValidProduct = state.products.some(p => (p.rate ?? 0) > 0);
    if (!hasValidProduct || state.fillVolume <= 0 || state.applicationRate <= 0) return;
    const t = setTimeout(() => {
      trackEvent('calculate_mix', {
        product_count: state.products.length,
        fill_volume: state.fillVolume,
        application_rate: state.applicationRate,
      });
    }, 1500);
    return () => clearTimeout(t);
  }, [state.products, state.fillVolume, state.applicationRate]);

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
          openSaveMixDialog={mixStorage.openSaveMixDialog}
          clearSettings={state.clearSettings}
          showTips={state.showTips}
          setShowTips={state.setShowTips}
          onOpenMixes={() => setShowMixesPanel(true)}
          mixesCount={mixStorage.savedMixes.length + mixHistory.historyEntries.length}
          showOverflowMenu={showOverflowMenu}
          setShowOverflowMenu={setShowOverflowMenu}
          overflowMenuRef={overflowMenuRef}
          mixNameInputRef={mixNameInputRef}
          onShowTour={startTour}
          activeTab={state.activeTab}
          setActiveTab={state.setActiveTab}
          authEnabled={auth.enabled}
          authUser={auth.user}
          onSignIn={auth.signInWithGoogle}
          onSignOut={auth.signOutUser}
          syncStatus={cloudSync.status}
          diagnostics={cloudSync.diagnostics}
          onRunDiagnostics={cloudSync.runDiagnostics}
          runningDiagnostics={cloudSync.runningDiagnostics}
          apiKey={apiKeyState.apiKey}
          scanEnabled={apiKeyState.scanEnabled}
          setScanEnabled={apiKeyState.setScanEnabled}
          keyInput={apiKeyState.keyInput}
          setKeyInput={apiKeyState.setKeyInput}
          onSaveApiKey={apiKeyState.saveApiKey}
          onClearApiKey={apiKeyState.clearApiKey}
        />

        <TipsSection
          show={state.showTips}
          onClose={() => state.setShowTips(false)}
        />

        {state.activeTab === 'tank' ? (
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
        ) : (
          <FieldMixSettings
            fieldSize={state.fieldSize}
            applicationRate={state.applicationRate}
            fillVolume={state.fillVolume}
            splitMode={state.splitMode}
            onFieldSizeChange={(v) => state.setFieldSize(parseFloat(v) || 0)}
            onApplicationRateChange={state.handleApplicationRateChange}
            onFillVolumeChange={state.handleFillVolumeChange}
            onSplitModeChange={state.setSplitMode}
          />
        )}

        <ProductsSection
          loads={mixLoads}
          applicationRate={state.applicationRate}
          products={state.products}
          onProductChange={state.handleProductChange}
          onToggleFormatMenu={state.toggleFormatMenu}
          onSelectFormat={state.selectFormat}
          openFormatMenuId={state.openFormatMenuId}
          onAddProduct={state.addNewProduct}
          onRemoveProduct={state.removeProduct}
          pendingFocusId={state.pendingFocusId}
          onClearPendingFocusId={state.clearPendingFocusId}
          scanButton={
            apiKeyState.apiKey && apiKeyState.scanEnabled ? (
              <ScanButton onImageSelected={(base64, mime) => setScanModal({ imageBase64: base64, mimeType: mime })} />
            ) : undefined
          }
        />

        {state.activeTab === 'tank' ? (
          <SummarySection
            fillVolume={state.fillVolume}
            applicationRate={state.applicationRate}
            acresPerFill={state.acresPerFill}
            products={state.products}
            fieldSize={state.fieldSize}
            implementWidth={state.implementWidth}
            speed={state.speed}
            fillTime={state.fillTime}
            splitMode="fullPlusPartial"
            splits={state.splits}
            currentTime={state.currentTime}
            copyFeedback={state.copyFeedback}
            setCopyFeedback={state.setCopyFeedback}
            onMixSnapshot={handleMixSnapshot}
          />
        ) : (
          <FieldMixSummary
            fillVolume={state.fillVolume}
            applicationRate={state.applicationRate}
            acresPerFill={state.acresPerFill}
            products={state.products}
            fieldSize={state.fieldSize}
            implementWidth={state.implementWidth}
            speed={state.speed}
            fillTime={state.fillTime}
            splitMode={state.splitMode}
            splits={state.splits}
            currentTime={state.currentTime}
            copyFeedback={state.copyFeedback}
            setCopyFeedback={state.setCopyFeedback}
            onMixSnapshot={handleMixSnapshot}
          />
        )}

        <PerMixBreakdown
          products={state.products}
          fillVolume={state.fillVolume}
          applicationRate={state.applicationRate}
          acresPerFill={state.acresPerFill}
          fieldSize={state.fieldSize}
          splitMode={state.activeTab === 'field' ? state.splitMode : 'fullPlusPartial'}
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
          hideFieldSizeInput={state.activeTab === 'field'}
        />

        <WhatToBuy
          products={state.products}
          fieldSize={state.fieldSize}
          applicationRate={state.applicationRate}
          fillVolume={state.fillVolume}
          showQuantities={state.showQuantities}
          setShowQuantities={state.setShowQuantities}
        />

        <CostSplitSection
          products={state.products}
          splits={state.splits}
          setSplits={state.setSplits}
          onProductChange={state.handleProductChange}
          applicationRate={state.applicationRate}
          fieldSize={state.fieldSize}
          setFieldSize={state.setFieldSize}
          showCostSplit={state.showCostSplit}
          setShowCostSplit={state.setShowCostSplit}
        />

        <div className="mt-4 text-xs opacity-60" style={{color: colors.primaryDark}}>
          <p>Always verify calculations against product labels and follow all safety guidelines.</p>
        </div>
      </div>

      <MixesPanel
        open={showMixesPanel}
        onClose={() => setShowMixesPanel(false)}
        savedMixes={mixStorage.savedMixes}
        historyEntries={mixHistory.historyEntries}
        loadMix={mixStorage.loadMix}
        deleteMix={mixStorage.deleteMix}
        deleteHistoryEntry={mixHistory.deleteHistoryEntry}
        clearHistory={mixHistory.clearHistory}
        openSaveMixDialog={mixStorage.openSaveMixDialog}
      />

      {/* Floating snackbar for settings feedback (Saved/Loaded/etc.) */}
      <SettingsToast message={state.settingsFeedback} />

      <OnboardingTour
        open={showTour}
        steps={TOUR_STEPS}
        onClose={closeTour}
        onComplete={closeTour}
      />

      {scanModal && (
        <ScanReviewModal
          imageBase64={scanModal.imageBase64}
          mimeType={scanModal.mimeType}
          apiKey={apiKeyState.apiKey}
          onApply={handleScanApply}
          onClose={() => setScanModal(null)}
        />
      )}
    </div>
  );
};

export default AgSprayCalculator;
