import { useRef, useState } from 'react';
import './_group.css';

import { colors, type Product, type SavedMix } from '@app/types';
import { Header } from '@app/components/Header';
import { TipsSection } from '@app/components/TipsSection';
import { MixSettings } from '@app/components/MixSettings';
import { ProductsSection } from '@app/components/ProductsSection';
import { SummarySection } from '@app/components/SummarySection';
import { FieldQuantities } from '@app/components/FieldQuantities';
import { FieldOperationsSection } from '@app/components/FieldOperationsSection';

const noop = () => {};

const initialProducts: Product[] = [
  { id: 1, name: 'Roundup PowerMax', rate: 32, unit: 'oz/acre', tankAmount: 1706.67, outputFormat: 'auto', jugSize: 320 },
  { id: 2, name: '2,4-D Amine',      rate: 16, unit: 'oz/acre', tankAmount: 853.33,  outputFormat: 'auto', jugSize: 128 },
];

export function Current() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [openFormatMenuId, setOpenFormatMenuId] = useState<number | null>(null);
  const [pendingFocusId, setPendingFocusId] = useState<number | null>(null);
  const [showQuantities, setShowQuantities] = useState(true);
  const [showTips, setShowTips] = useState(false);
  const [showSaveMixDialog, setShowSaveMixDialog] = useState(false);
  const [mixNameInput, setMixNameInput] = useState('');
  const [showThreeDotMenu, setShowThreeDotMenu] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [savedMixes] = useState<SavedMix[]>([]);

  const threeDotRef = useRef<HTMLDivElement>(null);
  const mixNameInputRef = useRef<HTMLInputElement>(null);

  const handleProductChange = (id: number, field: keyof Product, value: string | number) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, [field]: value } as Product : p)));
  };
  const toggleFormatMenu = (id: number) =>
    setOpenFormatMenuId(prev => (prev === id ? null : id));
  const selectFormat = (id: number, fmt: string) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, outputFormat: fmt } : p)));
    setOpenFormatMenuId(null);
  };

  const fillVolume = 800;
  const applicationRate = 15;
  const acresPerFill = 53.33;
  const fieldSize = 240;
  const implementWidth = 70;
  const speed = 12;
  const fillTime = 8;
  const currentTime = new Date('2026-04-29T09:00:00');

  return (
    <div className="spray-calc-root min-h-screen py-4 sm:py-8" style={{ backgroundColor: '#fff' }}>
      <div
        className="rounded-2xl mx-auto p-4 sm:p-6"
        style={{
          backgroundColor: 'white',
          color: colors.lightText,
          maxWidth: 'min(100%, 1000px)',
          boxShadow: '0 4px 24px 0 rgba(73,138,90,0.08), 0 1px 4px 0 rgba(0,0,0,0.06)',
        }}
      >
        <Header
          savedMixes={savedMixes}
          showSaveMixDialog={showSaveMixDialog}
          setShowSaveMixDialog={setShowSaveMixDialog}
          mixNameInput={mixNameInput}
          setMixNameInput={setMixNameInput}
          saveMix={noop}
          deleteMix={noop}
          openSaveMixDialog={noop}
          loadMix={noop}
          clearSettings={noop}
          settingsFeedback=""
          showTips={showTips}
          setShowTips={setShowTips}
          showThreeDotMenu={showThreeDotMenu}
          setShowThreeDotMenu={setShowThreeDotMenu}
          threeDotRef={threeDotRef}
          mixNameInputRef={mixNameInputRef}
        />

        <TipsSection show={showTips} onClose={() => setShowTips(false)} />

        <MixSettings
          fillVolume={fillVolume}
          applicationRate={applicationRate}
          acresPerFill={acresPerFill}
          acresPerFillInput={acresPerFill.toFixed(2)}
          onFillVolumeChange={noop}
          onApplicationRateChange={noop}
          onAcresPerFillInputChange={noop}
          onAcresPerFillBlur={noop}
        />

        <ProductsSection
          products={products}
          onProductChange={handleProductChange}
          onToggleFormatMenu={toggleFormatMenu}
          onSelectFormat={selectFormat}
          openFormatMenuId={openFormatMenuId}
          onAddProduct={noop}
          onRemoveProduct={noop}
          pendingFocusId={pendingFocusId}
          onClearPendingFocusId={() => setPendingFocusId(null)}
        />

        <SummarySection
          fillVolume={fillVolume}
          applicationRate={applicationRate}
          acresPerFill={acresPerFill}
          products={products}
          fieldSize={fieldSize}
          implementWidth={implementWidth}
          speed={speed}
          fillTime={fillTime}
          currentTime={currentTime}
          copyFeedback={copyFeedback}
          setCopyFeedback={setCopyFeedback}
        />

        <FieldQuantities
          products={products}
          fieldSize={fieldSize}
          acresPerFill={acresPerFill}
          applicationRate={applicationRate}
          fillVolume={fillVolume}
          showQuantities={showQuantities}
          setShowQuantities={setShowQuantities}
        />

        <FieldOperationsSection
          fillVolume={fillVolume}
          applicationRate={applicationRate}
          acresPerFill={acresPerFill}
          fieldSize={fieldSize}
          implementWidth={implementWidth}
          speed={speed}
          fillTime={fillTime}
          setFieldSize={noop}
          setImplementWidth={noop}
          setSpeed={noop}
          setFillTime={noop}
          currentTime={currentTime}
        />

        <div className="mt-4 text-xs opacity-60" style={{ color: colors.primaryDark }}>
          <p>Always verify calculations against product labels and follow all safety guidelines.</p>
        </div>
      </div>
    </div>
  );
}
