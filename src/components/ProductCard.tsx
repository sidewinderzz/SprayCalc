import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  KeyboardEvent,
  useState,
  useEffect
} from 'react';
import { Product, colors, outputFormats } from '../types';
import { formatOutputParts, isWeightUnit } from '../utils/calculations';

// ─── Unit helpers ─────────────────────────────────────────────────────────────

// All units are available for both /acre and /100 gal modes. Order shown in
// the UI: liquid units first, then weight units.
const ALL_PILLS = ['fl oz', 'pt', 'qt', 'gal', 'oz', 'lb', 'g'];

function deriveMode(unit: string): 'acre' | '100gal' {
  return unit.includes('per 100 gal') ? '100gal' : 'acre';
}

function derivePill(unit: string, mode: 'acre' | '100gal'): string {
  const raw = mode === 'acre'
    ? unit.replace('/acre', '').trim()
    : unit.replace(' per 100 gal', '').trim();
  return ALL_PILLS.includes(raw) ? raw : ALL_PILLS[0];
}

function makeUnit(mode: 'acre' | '100gal', pill: string): string {
  return mode === 'acre' ? `${pill}/acre` : `${pill} per 100 gal`;
}

// ─── Unit Mode Toggle (inline with Rate input) ────────────────────────────────

interface UnitModeToggleProps {
  unit: string;
  onChange: (unit: string) => void;
}

function UnitModeToggle({ unit, onChange }: UnitModeToggleProps) {
  const mode = deriveMode(unit);
  const pill = derivePill(unit, mode);

  const handleModeChange = (newMode: 'acre' | '100gal') => {
    if (newMode === mode) return;
    onChange(makeUnit(newMode, pill));
  };

  return (
    <div
      className="flex rounded-lg overflow-hidden flex-shrink-0 text-xs font-semibold"
      style={{ backgroundColor: `${colors.primary}10` }}
    >
      {(['acre', '100gal'] as const).map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => handleModeChange(m)}
          className="px-2.5 py-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0"
          style={
            mode === m
              ? { backgroundColor: colors.primary, color: '#fff' }
              : { color: colors.primaryDark }
          }
          aria-pressed={mode === m}
        >
          {m === 'acre' ? '/ Acre' : '/ 100 gal'}
        </button>
      ))}
    </div>
  );
}

// ─── Unit Pill Selector ───────────────────────────────────────────────────────

interface UnitPillSelectorProps {
  unit: string;
  onChange: (unit: string) => void;
}

function UnitPillSelector({ unit, onChange }: UnitPillSelectorProps) {
  const mode  = deriveMode(unit);
  const pill  = derivePill(unit, mode);

  const handlePillChange = (newPill: string) => {
    onChange(makeUnit(mode, newPill));
  };

  return (
    <div className="flex flex-wrap gap-1">
      {ALL_PILLS.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => handlePillChange(p)}
          className="rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2"
          style={
            pill === p
              ? { backgroundColor: colors.primary, color: '#fff' }
              : {
                  backgroundColor: `${colors.primary}10`,
                  color: colors.primaryDark
                }
          }
          aria-pressed={pill === p}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

// ─── Jug Size Pill Selector ───────────────────────────────────────────────────

const JUG_PRESETS = [
  { label: '2.5 gal', oz: 320 },
  { label: '1 gal',   oz: 128 },
];

interface JugSizePillSelectorProps {
  jugSize: number;
  onChange: (oz: number) => void;
}

function JugSizePillSelector({ jugSize, onChange }: JugSizePillSelectorProps) {
  const isPreset = JUG_PRESETS.some(p => p.oz === jugSize);
  const [showCustom, setShowCustom] = useState(!isPreset);
  const [customInput, setCustomInput] = useState(() =>
    !isPreset ? String(parseFloat((jugSize / 128).toFixed(2))) : ''
  );

  // Resync when jugSize changes externally (e.g. after loading from localStorage)
  useEffect(() => {
    const nowPreset = JUG_PRESETS.some(p => p.oz === jugSize);
    if (nowPreset) {
      setShowCustom(false);
      setCustomInput('');
    } else {
      setShowCustom(true);
      setCustomInput(String(parseFloat((jugSize / 128).toFixed(2))));
    }
  }, [jugSize]);

  const handlePreset = (oz: number) => {
    setShowCustom(false);
    setCustomInput('');
    onChange(oz);
  };

  const handleOpenCustom = () => {
    setShowCustom(true);
    setCustomInput(jugSize > 0 ? String(parseFloat((jugSize / 128).toFixed(2))) : '');
  };

  const handleCustomCommit = () => {
    const gal = parseFloat(customInput);
    if (gal > 0) {
      onChange(Math.round(gal * 128 * 100) / 100);
    }
  };

  const isCustomActive = showCustom;

  const pillStyle = (active: boolean) =>
    active
      ? { backgroundColor: colors.primary, color: '#fff' }
      : { backgroundColor: `${colors.primary}10`, color: colors.primaryDark };

  return (
    <div className="flex flex-wrap items-center gap-1">
      {JUG_PRESETS.map(preset => (
        <button
          key={preset.oz}
          type="button"
          onClick={() => handlePreset(preset.oz)}
          className="rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2"
          style={pillStyle(!isCustomActive && jugSize === preset.oz)}
          aria-pressed={!isCustomActive && jugSize === preset.oz}
        >
          {preset.label}
        </button>
      ))}
      <button
        type="button"
        onClick={handleOpenCustom}
        className="rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2"
        style={pillStyle(isCustomActive)}
        aria-pressed={isCustomActive}
      >
        Custom
      </button>
      {isCustomActive && (
        <div className="flex items-center gap-1 mt-1 w-full">
          <input
            type="number"
            inputMode="decimal"
            min="0.01"
            step="0.01"
            placeholder="e.g. 2.5"
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            onBlur={handleCustomCommit}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleCustomCommit(); } }}
            autoFocus
            className="w-24 px-2 py-1 border rounded-lg text-xs font-medium text-gray-800 focus:outline-none focus:ring-2"
            style={{ borderColor: `${colors.primary}1f`, backgroundColor: `${colors.primary}06` }}
          />
          <span className="text-xs" style={{ color: `${colors.lightText}80` }}>gal</span>
        </div>
      )}
    </div>
  );
}

// ─── Inline icons ─────────────────────────────────────────────────────────────

// ─── ProductCard ─────────────────────────────────────────────────────────────

export interface ProductCardHandle {
  focusName(): void;
}

interface ProductCardProps {
  product: Product;
  index: number;
  onProductChange: (id: number, field: string, value: string | number) => void;
  onToggleFormatMenu: (productId: number) => void;
  onSelectFormat: (productId: number, format: string) => void;
  onRemoveProduct: (id: number) => void;
  openFormatMenuId: number | null;
  onEnterFromLastField: () => void;
}

export const ProductCard = forwardRef<ProductCardHandle, ProductCardProps>(({
  product,
  index,
  onProductChange,
  onToggleFormatMenu,
  onSelectFormat,
  onRemoveProduct,
  openFormatMenuId,
  onEnterFromLastField
}, ref) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const rateRef = useRef<HTMLInputElement>(null);
  const showJugSelector = !isWeightUnit(product.unit);
  const jugSize = product.jugSize ?? 128;
  const tankAmountParts = formatOutputParts(product.tankAmount, product.outputFormat, product.unit, jugSize);
  const hasTankAmount = product.tankAmount > 0;

  const scrollCenter = (el: HTMLElement | null) =>
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  useImperativeHandle(ref, () => ({
    focusName: () => {
      nameRef.current?.focus();
      scrollCenter(nameRef.current);
    }
  }));

  const inputBaseStyle = {
    borderColor: `${colors.primary}22`,
    backgroundColor: `${colors.primary}06`
  };

  return (
    <div
      className="rounded-xl flex flex-col"
      style={{
        backgroundColor: 'white',
        border: `1px solid ${colors.primary}22`,
        boxShadow: `0 1px 3px 0 rgba(0,0,0,0.04)`
      }}
    >
      <div className="p-4 flex flex-col gap-4">
        {/* ── Identity ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1">
          <input
            ref={nameRef}
            type="text"
            value={product.name}
            onChange={(e) => onProductChange(product.id, 'name', e.target.value)}
            onFocus={(e) => scrollCenter(e.currentTarget)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                rateRef.current?.focus();
                scrollCenter(rateRef.current);
              }
            }}
            className="flex-1 min-w-0 px-2.5 py-1.5 border rounded-lg text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2"
            style={inputBaseStyle}
            placeholder={`Product ${index + 1}`}
          />
          <button
            onClick={() => onRemoveProduct(product.id)}
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors"
            title="Remove Product"
            aria-label="Remove Product"
          >
            <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
            </svg>
          </button>
        </div>

        {/* ── Inputs ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2">
          {/* Rate row: numeric input + mode toggle inline */}
          <div className="flex items-stretch gap-2">
            <div className="relative flex-1 min-w-0">
              <input
                ref={rateRef}
                type="number"
                inputMode="decimal"
                value={product.rate || ''}
                onChange={(e) => onProductChange(product.id, 'rate', parseFloat(e.target.value) || 0)}
                onFocus={(e) => scrollCenter(e.currentTarget)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onEnterFromLastField();
                  }
                }}
                className="w-full px-2.5 py-1.5 border rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:ring-2"
                style={inputBaseStyle}
                min="0"
                step="0.01"
                placeholder="Rate"
                aria-label="Rate"
              />
            </div>
            <UnitModeToggle
              unit={product.unit}
              onChange={(unit) => onProductChange(product.id, 'unit', unit)}
            />
          </div>

          {/* Unit pills */}
          <UnitPillSelector
            unit={product.unit}
            onChange={(unit) => onProductChange(product.id, 'unit', unit)}
          />

          {/* Jug Size — only for liquid units */}
          {showJugSelector && (
            <div className="flex flex-col gap-1 pt-1">
              <div
                className="text-xs font-medium"
                style={{ color: `${colors.lightText}80` }}
              >
                Jug Size
              </div>
              <JugSizePillSelector
                jugSize={jugSize}
                onChange={(oz) => onProductChange(product.id, 'jugSize', oz)}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Result footer ─────────────────────────────────────────────── */}
      <div
        className="relative px-4 py-3 mt-auto rounded-b-xl"
        style={{
          backgroundColor: `${colors.primary}0c`,
          borderTop: `1px solid ${colors.primary}1f`
        }}
      >
        <button
          type="button"
          onClick={() => onToggleFormatMenu(product.id)}
          className="w-full flex items-center justify-between gap-2 text-left rounded-md focus:outline-none focus:ring-2"
          aria-haspopup="listbox"
          aria-expanded={openFormatMenuId === product.id}
        >
          <div className="flex flex-col min-w-0">
            <span
              className="text-[10px] uppercase tracking-wider font-semibold"
              style={{ color: `${colors.primaryDark}99` }}
            >
              Amount for Tank
            </span>
            <span
              className="font-bold leading-tight mt-0.5"
              style={{
                color: colors.primaryDark,
                fontSize: '1.05rem',
                opacity: hasTankAmount ? 1 : 0.55
              }}
            >
              {tankAmountParts.primary}
            </span>
            {tankAmountParts.jugBreakdown && (
              <span
                className="text-xs leading-tight font-normal mt-1"
                style={{ color: `${colors.primaryDark}aa` }}
              >
                {tankAmountParts.jugBreakdown}
              </span>
            )}
          </div>
          <span
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md transition-colors"
            style={{ color: colors.primaryDark }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 12 8" width="11" height="8" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
              <polyline points="1,1 6,7 11,1"/>
            </svg>
          </span>
        </button>

        {openFormatMenuId === product.id && (
          <div
            className="absolute left-2 right-2 z-10 mt-1 border rounded-lg shadow-lg overflow-hidden"
            style={{
              backgroundColor: 'white',
              borderColor: `${colors.primary}40`
            }}
            role="listbox"
          >
            {outputFormats.map(format => (
              <div
                key={format.value}
                className="px-3 py-2.5 cursor-pointer text-sm hover:bg-gray-50 active:bg-gray-100"
                style={{
                  backgroundColor: product.outputFormat === format.value
                    ? `${colors.primary}18`
                    : 'transparent',
                  fontWeight: product.outputFormat === format.value ? '600' : 'normal',
                  color: colors.lightText
                }}
                onClick={() => onSelectFormat(product.id, format.value)}
                role="option"
                aria-selected={product.outputFormat === format.value}
              >
                {format.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
