import React from 'react';
import { Product, colors } from '../types';
import { calculateMixPlanning, calculateFieldAmount, formatPurchaseAmount, calculateAmount, formatOutput } from '../utils/calculations';

interface FieldQuantitiesProps {
  products: Product[];
  fieldSize: number;
  acresPerFill: number;
  applicationRate: number;
  fillVolume: number;
  showQuantities: boolean;
  setShowQuantities: (val: boolean) => void;
}

export function FieldQuantities({
  products,
  fieldSize,
  acresPerFill,
  applicationRate,
  fillVolume,
  showQuantities,
  setShowQuantities
}: FieldQuantitiesProps) {
  if (fieldSize <= 0) return null;

  const mixPlanning = calculateMixPlanning(fieldSize, applicationRate, fillVolume);
  if (!mixPlanning) return null;

  return (
    <div className="mt-4 rounded-lg overflow-hidden border" style={{borderColor: colors.primary + '30'}}>
      {/* Toggle header */}
      <button
        onClick={() => setShowQuantities(!showQuantities)}
        className="w-full flex items-center justify-between px-4 py-3"
        style={{backgroundColor: colors.primary + '12'}}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm" style={{color: colors.primaryDark}}>Field Quantities</span>
          {/* Compact stats chips */}
          <span className="hidden sm:flex items-center gap-2 text-xs" style={{color: colors.primaryDark + 'aa'}}>
            <span className="px-2 py-0.5 rounded-full" style={{backgroundColor: colors.primary + '18'}}>{fieldSize} ac</span>
            <span className="px-2 py-0.5 rounded-full" style={{backgroundColor: colors.primary + '18'}}>{mixPlanning.totalSprayNeeded.toFixed(0)} gal</span>
            <span className="px-2 py-0.5 rounded-full" style={{backgroundColor: colors.primary + '18'}}>{mixPlanning.fullMixes} full{mixPlanning.hasPartialMix ? ' + 1 partial' : ''}</span>
          </span>
        </div>
        <svg
          viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{color: colors.primaryDark, transform: showQuantities ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s'}}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {showQuantities && (
        <div className="p-4 space-y-5">

          {/* ── What to Buy ──────────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full" style={{backgroundColor: colors.secondary}}/>
              <h3 className="font-bold text-sm" style={{color: colors.primaryDark}}>What to Buy</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {products.map((product) => {
                const totalAmount = calculateFieldAmount(product.rate, product.unit, fieldSize, applicationRate);
                const purchaseInfo = formatPurchaseAmount(totalAmount);
                return (
                  <div
                    key={`purchase-${product.id}`}
                    className="rounded-lg overflow-hidden border"
                    style={{borderColor: colors.secondary + '80'}}
                  >
                    <div className="px-3 py-2" style={{backgroundColor: colors.secondary + '25'}}>
                      <p className="font-bold text-sm truncate" style={{color: colors.primaryDark}}>{product.name}</p>
                      <p className="text-xl font-bold mt-0.5" style={{color: colors.primaryDark}}>{purchaseInfo.display}</p>
                    </div>
                    {purchaseInfo.containers.length > 0 && (
                      <div className="px-3 py-2 space-y-1.5">
                        {purchaseInfo.containers.slice(0, 2).map((option, index) => (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <span className={index === 0 ? 'font-semibold' : 'opacity-70'} style={{color: colors.lightText}}>
                              {index === 0 && <span className="mr-1" style={{color: colors.secondary}}>★</span>}
                              {option.display}
                            </span>
                            <span className="opacity-60">{option.wastePercent.toFixed(0)}% waste</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div style={{borderTop: `1px solid ${colors.primary}20`}}/>

          {/* ── Per Mix Amounts ───────────────────────────────────── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full" style={{backgroundColor: colors.primary}}/>
              <h3 className="font-bold text-sm" style={{color: colors.primaryDark}}>Per Mix Amounts</h3>
            </div>
            <div className={`grid gap-3 ${mixPlanning.hasPartialMix ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
              {/* Full Mix card */}
              <div className="rounded-lg overflow-hidden border" style={{borderColor: colors.primary + '60'}}>
                <div className="px-3 py-2" style={{backgroundColor: colors.primary + '15'}}>
                  <p className="font-bold text-sm" style={{color: colors.primary}}>Full Mix × {mixPlanning.fullMixes}</p>
                  <p className="text-xs opacity-70 mt-0.5">{fillVolume} gal · {acresPerFill.toFixed(2)} acres each</p>
                </div>
                <div className="px-3 py-2 space-y-1.5">
                  {products.map(product => (
                    <div key={`full-${product.id}`} className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate mr-2" style={{color: colors.lightText}}>{product.name}</span>
                      <span className="font-bold flex-shrink-0" style={{color: colors.primaryDark}}>{formatOutput(product.tankAmount, product.outputFormat)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partial Mix card */}
              {mixPlanning.hasPartialMix && (
                <div className="rounded-lg overflow-hidden border" style={{borderColor: colors.secondary + '80'}}>
                  <div className="px-3 py-2" style={{backgroundColor: colors.secondary + '20'}}>
                    <p className="font-bold text-sm" style={{color: colors.secondaryDark}}>Partial Mix × 1</p>
                    <p className="text-xs opacity-70 mt-0.5">{mixPlanning.remainingSpray.toFixed(1)} gal · {mixPlanning.remainingAcres.toFixed(2)} acres</p>
                  </div>
                  <div className="px-3 py-2 space-y-1.5">
                    {products.map(product => {
                      const partialAmount = calculateAmount(product.rate, product.unit, mixPlanning.remainingSpray, applicationRate);
                      return (
                        <div key={`partial-${product.id}`} className="flex items-center justify-between text-sm">
                          <span className="font-medium truncate mr-2" style={{color: colors.lightText}}>{product.name}</span>
                          <span className="font-bold flex-shrink-0" style={{color: colors.secondaryDark}}>{formatOutput(partialAmount, product.outputFormat)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
