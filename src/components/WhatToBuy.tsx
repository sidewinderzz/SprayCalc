import React from 'react';
import { Product, colors } from '../types';
import { calculateMixPlanning, calculateFieldAmount, formatPurchaseAmount } from '../utils/calculations';
import { displayProductName } from '../utils/productName';

interface WhatToBuyProps {
  products: Product[];
  fieldSize: number;
  applicationRate: number;
  fillVolume: number;
  showQuantities: boolean;
  setShowQuantities: (val: boolean) => void;
}

export function WhatToBuy({
  products,
  fieldSize,
  applicationRate,
  fillVolume,
  showQuantities,
  setShowQuantities,
}: WhatToBuyProps) {
  if (fieldSize <= 0) return null;

  const mixPlanning = calculateMixPlanning(fieldSize, applicationRate, fillVolume);
  if (!mixPlanning) return null;

  return (
    <div className="rounded-xl overflow-hidden border mb-6" style={{ borderColor: colors.primary + '25' }}>
      <button
        onClick={() => setShowQuantities(!showQuantities)}
        className="w-full flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: colors.primary + '08' }}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm uppercase tracking-wide" style={{ color: colors.primaryDark }}>
            What to Buy
          </span>
          <span className="hidden sm:flex items-center gap-2 text-xs" style={{ color: colors.primaryDark + 'aa' }}>
            <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.primary + '12' }}>
              {fieldSize} ac
            </span>
            <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.primary + '12' }}>
              {mixPlanning.totalSprayNeeded.toFixed(0)} gal
            </span>
          </span>
        </div>
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            color: colors.primaryDark,
            transform: showQuantities ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {showQuantities && (
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((product, idx) => {
              const totalAmount = calculateFieldAmount(product.rate, product.unit, fieldSize, applicationRate);
              const purchaseInfo = formatPurchaseAmount(totalAmount, product.unit, product.jugSize ?? 128);
              return (
                <div
                  key={`purchase-${product.id}`}
                  className="rounded-lg overflow-hidden border bg-white"
                  style={{ borderColor: colors.primary + '25' }}
                >
                  <div className="px-3 py-2" style={{ backgroundColor: colors.secondary + '14' }}>
                    <p className="text-xs font-semibold uppercase tracking-wide truncate" style={{ color: colors.primaryDark }}>
                      {displayProductName(product.name, idx)}
                    </p>
                    <p className="text-xl font-bold mt-0.5" style={{ color: colors.primaryDark }}>
                      {purchaseInfo.display}
                    </p>
                  </div>
                  {purchaseInfo.containers.length > 0 && (
                    <div className="px-3 py-2 space-y-1.5">
                      {purchaseInfo.containers.slice(0, 3).map((option, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span
                            className={index === 0 ? 'font-semibold' : ''}
                            style={{ color: index === 0 ? colors.lightText : colors.lightText + 'cc' }}
                          >
                            {option.display}
                          </span>
                          <span style={{ color: colors.lightText + 'cc' }}>
                            {option.wastePercent.toFixed(0)}% waste
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
