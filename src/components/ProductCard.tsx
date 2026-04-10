import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  KeyboardEvent,
  FocusEvent
} from 'react';
import { Product, colors, outputFormats, unitOptions } from '../types';
import { formatOutput } from '../utils/calculations';

// ─── UnitCombobox ────────────────────────────────────────────────────────────

interface UnitComboboxProps {
  value: string;
  onChange: (unit: string) => void;
  onConfirm: () => void;
}

const UnitCombobox = forwardRef<HTMLInputElement, UnitComboboxProps>(
  ({ value, onChange, onConfirm }, ref) => {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [highlighted, setHighlighted] = useState(0);
    const listRef = useRef<HTMLDivElement>(null);

    const filtered = unitOptions.filter(u =>
      u.toLowerCase().includes(query.toLowerCase())
    );
    const safeIdx = Math.min(highlighted, Math.max(filtered.length - 1, 0));

    const confirmSelection = (unit: string) => {
      onChange(unit);
      setOpen(false);
      setQuery('');
      onConfirm();
    };

    const handleFocus = () => {
      setQuery('');
      setHighlighted(0);
      setOpen(true);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      // Keep open if focus moves into the dropdown list
      if (listRef.current?.contains(e.relatedTarget as Node)) return;
      setOpen(false);
      setQuery('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlighted(h => Math.min(h + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlighted(h => Math.max(h - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[safeIdx]) confirmSelection(filtered[safeIdx]);
      } else if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
      }
    };

    return (
      <div className="relative">
        <input
          ref={ref}
          type="text"
          value={open ? query : value}
          placeholder={value}
          onChange={e => { setQuery(e.target.value); setHighlighted(0); }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full p-2.5 border rounded-lg text-black text-sm"
          autoComplete="off"
        />
        {open && filtered.length > 0 && (
          <div
            ref={listRef}
            className="absolute z-20 mt-1 w-full border rounded-lg shadow-lg overflow-hidden"
            style={{ backgroundColor: 'white', borderColor: colors.primary + '50' }}
          >
            {filtered.map((unit, i) => (
              <div
                key={unit}
                className="px-3 py-2.5 cursor-pointer text-sm"
                style={{
                  backgroundColor: i === safeIdx ? colors.primary + '20' : 'transparent',
                  fontWeight: unit === value ? '600' : 'normal'
                }}
                onMouseDown={e => { e.preventDefault(); confirmSelection(unit); }}
              >
                {unit}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

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
  const unitRef = useRef<HTMLInputElement>(null);

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
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: 'white',
        borderColor: colors.primary + '70'
      }}
    >
      <div className="flex justify-between items-center mb-3 gap-2">
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
          className="flex-1 min-w-0 p-2 border rounded-lg text-black font-bold text-sm"
          placeholder="Product Name"
        />
        <button
          onClick={() => onRemoveProduct(product.id)}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-500 hover:text-white transition-colors"
          title="Remove Product"
          style={{color: colors.primaryDark, border: `1px solid ${colors.primary}30`}}
        >
          <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <label className="block text-xs font-medium mb-1">Rate</label>
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
                unitRef.current?.focus();
                scrollCenter(unitRef.current);
              }
            }}
            className="w-full p-2.5 border rounded-lg text-black text-sm"
            min="0"
            step="0.01"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Unit</label>
          <UnitCombobox
            ref={unitRef}
            value={product.unit}
            onChange={(unit) => onProductChange(product.id, 'unit', unit)}
            onConfirm={onEnterFromLastField}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Amount for Tank</label>
        <div className="relative">
          <div
            className="w-full p-2.5 border rounded-lg font-bold cursor-pointer text-sm select-none"
            style={{
              backgroundColor: colors.primary + '18',
              borderColor: colors.primary + '50'
            }}
            onClick={() => onToggleFormatMenu(product.id)}
          >
            {formatOutput(product.tankAmount, product.outputFormat, product.unit)}
            <span className="float-right opacity-40 mt-0.5">
              <svg viewBox="0 0 12 8" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1,1 6,7 11,1"/>
              </svg>
            </span>
          </div>

          {openFormatMenuId === product.id && (
            <div
              className="absolute z-10 mt-1 w-full border rounded-lg shadow-lg overflow-hidden"
              style={{
                backgroundColor: 'white',
                borderColor: colors.primary + '50'
              }}
            >
              {outputFormats.map(format => (
                <div
                  key={format.value}
                  className="px-3 py-2.5 cursor-pointer text-sm hover:bg-gray-50 active:bg-gray-100"
                  style={{
                    backgroundColor: product.outputFormat === format.value
                      ? colors.primary + '20'
                      : 'transparent',
                    fontWeight: product.outputFormat === format.value ? '600' : 'normal'
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
