import React, { useEffect, useRef } from 'react';
import { colors } from './types';
import { useCalculatorState } from './hooks/useCalculatorState';
import { useMixStorage } from './hooks/useMixStorage';
import { Header } from './components/Header';
import { TipsSection } from './components/TipsSection';
import { MixSettings } from './components/MixSettings';
import { ProductsSection } from './components/ProductsSection';
import { SummarySection } from './components/SummarySection';
import { FieldQuantities } from './components/FieldQuantities';
import { FieldOperationsSection } from './components/FieldOperationsSection';

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

  // Load saved settings and mixes on component mount
  useEffect(() => {
    state.loadSettings();
    mixStorage.loadAllMixes();
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="rounded-lg mx-auto p-4 sm:p-6 shadow-md"
        style={{
          backgroundColor: 'white',
          color: colors.lightText,
          maxWidth: "min(100%, 1000px)"
        }}
      >
        <Header
          savedMixes={mixStorage.savedMixes}
          showSaveMixDialog={mixStorage.showSaveMixDialog}
          setShowSaveMixDialog={mixStorage.setShowSaveMixDialog}
          mixNameInput={mixStorage.mixNameInput}
          setMixNameInput={mixStorage.setMixNameInput}
          saveMix={() => mixStorage.saveMix(getCurrentMixData)}
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
        />

        <div className="mt-4 text-xs opacity-60" style={{color: colors.primaryDark}}>
          <p>Always verify calculations against product labels and follow all safety guidelines.</p>
        </div>
      </div>
    </div>
  );
};

export default AgSprayCalculator;
