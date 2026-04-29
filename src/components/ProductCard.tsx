import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  KeyboardEvent
} from 'react';
import { Product, colors, outputFormats } from '../types';
import { formatOutput } from '../utils/calculations';

// ─── Unit Pill Selector ───────────────────────────────────────────────────────

const ACRE_PILLS = ['oz', 'pt', 'qt', 'gal', 'lb', 'g'];
const GAL_PILLS  = ['oz', 'pt', 'qt', 'lb'];

function deriveMode(unit: string): 'acre' | '100gal' {
  return unit.includes('per 100 gal') ? '100gal' : 'acre';
}

function derivePill(unit: string, mode: 'acre' | '100gal'): string {
  const raw = mode === 'acre'
    ? unit.replace('/acre', '').trim()
    : unit.replace(' per 100 gal', '').trim();
  const pills = mode === 'acre' ? ACRE_PILLS : GAL_PILLS;
  return pills.includes(raw) ? raw : pills[0];
}

function makeUnit(mode: 'acre' | '100gal', pill: string): string {
  return mode === 'acre' ? `${pill}/acre` : `${pill} per 100 gal`;
}

interface UnitPillSelectorProps {
  unit: string;
  onChange: (unit: string) => void;
}

function UnitPillSelector({ unit, onChange }: UnitPillSelectorProps) {
  const mode  = deriveMode(unit);
  const pill  = derivePill(unit, mode);
  const pills = mode === 'acre' ? ACRE_PILLS : GAL_PILLS;

  const handleModeChange = (newMode: 'acre' | '100gal') => {
    const newPills = newMode === 'acre' ? ACRE_PILLS : GAL_PILLS;
    const nextPill = newPills.includes(pill) ? pill : newPills[0];
    onChange(makeUnit(newMode, nextPill));
  };

  const handlePillChange = (newPill: string) => {
    onChange(makeUnit(mode, newPill));
  };

  return (
    <div className="space-y-2">
      {/* Mode toggle */}
      <div
        className="flex rounded-lg overflow-hidden"
        style={{ border: `1px solid ${colors.primary}40` }}
      >
        {(['acre', '100gal'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => handleModeChange(m)}
            className="flex-1 py-1.5 text-xs font-semibold transition-colors"
            style={
              mode === m
                ? { backgroundColor: colors.primary, color: '#fff' }
                : { backgroundColor: `${colors.primary}10`, color: colors.primaryDark }
            }
          >
            {m === 'acre' ? '/ Acre' : '/ 100 gal'}
          </button>
        ))}
      </div>

      {/* Unit pills */}
      <div className="flex flex-wrap gap-1.5">
        {pills.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handlePillChange(p)}
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors"
            style={
              pill === p
                ? { backgroundColor: colors.primary, color: '#fff' }
                : {
                    backgroundColor: `${colors.primary}10`,
                    color: colors.primaryDark,
                    border: `1px solid ${colors.primary}35`
                  }
            }
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ProductCard ─────────────────────────────────────────────────────────────

export interface ProductCardHandle {
  focusName(): void;
}

interface ProductCardProps {
  product: Product;
  onProductChange: (id: number, field: string, value: string | number) => void;
  onToggleFormatMenu: (productId: number) => void;
  onSelectFormat: (productId: number, format: string) => void;
  onRemoveProduct: (id: number) => void;
  openFormatMenuId: number | null;
  onEnterFromLastField: () => void;
}

export const ProductCard = forwardRef<ProductCardHandle, ProductCardProps>(({
  product,
  onProductChange,
  onToggleFormatMenu,
  onSelectFormat,
  onRemoveProduct,
  openFormatMenuId,
  onEnterFromLastField
}, ref) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const rateRef = useRef<HTMLInputElement>(null);

  const scrollCenter = (el: HTMLElement | null) =>
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  useImperativeHandle(ref, () => ({
    focusName: () => {
      nameRef.current?.focus();
      scrollCenter(nameRef.current);
    }
  }));

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        backgroundColor: 'white',
        border: `1.5px solid ${colors.primary}30`,
        boxShadow: `0 2px 8px 0 ${colors.primary}0d, 0 1px 3px 0 rgba(0,0,0,0.05)`
      }}
    >
      {/* Product name + remove button */}
      <div className="flex items-center gap-2 mb-3">
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
          className="flex-1 min-w-0 px-2.5 py-2 border rounded-lg text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2"
          style={{
            borderColor: `${colors.primary}30`,
            backgroundColor: '#fafafa'
          }}
          placeholder="Product Name"
        />
        <button
          onClick={() => onRemoveProduct(product.id)}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-red-50 hover:text-red-500"
          title="Remove Product"
          style={{ color: `${colors.primaryLight}`, border: `1px solid ${colors.primary}25` }}
        >
          <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
          </svg>
        </button>
      </div>

      {/* Rate input */}
      <div className="mb-3">
        <label className="block text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: `${colors.lightText}80` }}>
          Rate
        </label>
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
          className="w-full px-3 py-2.5 border rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:ring-2"
          style={{
            borderColor: `${colors.primary}30`,
            backgroundColor: '#fafafa'
          }}
          min="0"
          step="0.01"
          placeholder="0"
        />
      </div>

      {/* Unit pill selector */}
      <div className="mb-3">
        <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: `${colors.lightText}80` }}>
          Unit
        </label>
        <UnitPillSelector
          unit={product.unit}
          onChange={(unit) => onProductChange(product.id, 'unit', unit)}
        />
      </div>

      {/* Amount for Tank */}
      <div>
        <label className="block text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: `${colors.lightText}80` }}>
          Amount for Tank
        </label>
        <div className="relative">
          <div
            className="w-full px-3 py-2.5 rounded-lg font-bold cursor-pointer text-sm select-none flex items-center justify-between"
            style={{
              backgroundColor: `${colors.primary}12`,
              border: `1px solid ${colors.primary}35`,
              color: colors.primaryDark
            }}
            onClick={() => onToggleFormatMenu(product.id)}
          >
            <span>{formatOutput(product.tankAmount, product.outputFormat, product.unit)}</span>
            <svg viewBox="0 0 12 8" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
              <polyline points="1,1 6,7 11,1"/>
            </svg>
          </div>

          {openFormatMenuId === product.id && (
            <div
              className="absolute z-10 mt-1 w-full border rounded-lg shadow-lg overflow-hidden"
              style={{
                backgroundColor: 'white',
                borderColor: `${colors.primary}40`
              }}
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
                >
                  {format.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
