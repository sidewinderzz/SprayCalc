import React from 'react';
import { Product, colors, outputFormats, unitOptions } from '../types';
import { formatOutput } from '../utils/calculations';

interface ProductCardProps {
  product: Product;
  onProductChange: (id: number, field: string, value: string | number) => void;
  onToggleFormatMenu: (productId: number) => void;
  onSelectFormat: (productId: number, format: string) => void;
  onRemoveProduct: (id: number) => void;
  openFormatMenuId: number | null;
}

export function ProductCard({
  product,
  onProductChange,
  onToggleFormatMenu,
  onSelectFormat,
  onRemoveProduct,
  openFormatMenuId
}: ProductCardProps) {
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
          type="text"
          value={product.name}
          onChange={(e) => onProductChange(product.id, 'name', e.target.value)}
          className="flex-1 min-w-0 p-2 border rounded-lg text-black font-bold text-sm"
          placeholder="Product Name"
        />
        <button
          onClick={() => onRemoveProduct(product.id)}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-500 hover:text-white transition-colors"
          title="Remove Product"
          style={{color: colors.primaryDark, border: `1px solid ${colors.primary}30`}}
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <label className="block text-xs font-medium mb-1">Rate</label>
          <input
            type="number"
            inputMode="decimal"
            value={product.rate || ''}
            onChange={(e) => onProductChange(product.id, 'rate', parseFloat(e.target.value) || 0)}
            className="w-full p-2.5 border rounded-lg text-black text-sm"
            min="0"
            step="0.01"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Unit</label>
          <select
            value={product.unit}
            onChange={(e) => onProductChange(product.id, 'unit', e.target.value)}
            className="w-full p-2.5 border rounded-lg text-black text-sm"
          >
            {unitOptions.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
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
            {formatOutput(product.tankAmount, product.outputFormat)}
            <span className="float-right text-xs opacity-50 mt-0.5">▼</span>
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
}
