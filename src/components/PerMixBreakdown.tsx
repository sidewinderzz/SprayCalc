import React from 'react';
import { Product, colors } from '../types';
import { calculateAmount, calculateMixPlanning, formatOutput } from '../utils/calculations';
import { displayProductName } from '../utils/productName';

interface PerMixBreakdownProps {
  products: Product[];
  fillVolume: number;
  applicationRate: number;
  acresPerFill: number;
  fieldSize: number;
  splitMode: 'fullPlusPartial' | 'even';
}

interface MixGroup {
  label: string;
  volume: number;
  acres: number;
  count: number;
  isPartial: boolean;
}

function buildGroups(
  fieldSize: number,
  applicationRate: number,
  fillVolume: number,
  splitMode: 'fullPlusPartial' | 'even'
): MixGroup[] {
  const planning = calculateMixPlanning(fieldSize, applicationRate, fillVolume);
  if (!planning || planning.totalSprayNeeded <= 0) return [];

  if (splitMode === 'fullPlusPartial') {
    const groups: MixGroup[] = [];
    if (planning.fullMixes > 0) {
      groups.push({
        label: `Full Mix × ${planning.fullMixes}`,
        volume: fillVolume,
        acres: fillVolume / applicationRate,
        count: planning.fullMixes,
        isPartial: false,
      });
    }
    if (planning.hasPartialMix) {
      groups.push({
        label: 'Partial Mix × 1',
        volume: planning.remainingSpray,
        acres: planning.remainingAcres,
        count: 1,
        isPartial: true,
      });
    }
    return groups;
  }

  const numTanks = Math.ceil(planning.totalSprayNeeded / fillVolume);
  if (numTanks <= 0) return [];
  const perTankVol = planning.totalSprayNeeded / numTanks;
  return [
    {
      label: `Mix × ${numTanks}`,
      volume: perTankVol,
      acres: perTankVol / applicationRate,
      count: numTanks,
      isPartial: false,
    },
  ];
}

export function PerMixBreakdown({
  products,
  fillVolume,
  applicationRate,
  fieldSize,
  splitMode,
}: PerMixBreakdownProps) {
  if (fieldSize <= 0 || fillVolume <= 0 || applicationRate <= 0) return null;

  const groups = buildGroups(fieldSize, applicationRate, fillVolume, splitMode);
  if (groups.length === 0) return null;

  const gridCols =
    groups.length === 1
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2';

  return (
    <div
      className="p-4 rounded-xl mb-6"
      style={{
        backgroundColor: `${colors.primary}08`,
        border: `1px solid ${colors.primary}25`,
      }}
    >
      <h2
        className="font-bold text-sm uppercase tracking-wide mb-3"
        style={{ color: colors.primaryDark }}
      >
        Per Mix
      </h2>
      <div className={`grid gap-3 ${gridCols}`}>
        {groups.map((group, i) => {
          const accent = group.isPartial ? colors.secondary : colors.primary;
          const headerBg = group.isPartial ? `${colors.secondary}14` : `${colors.primary}08`;
          return (
            <div
              key={i}
              className="rounded-lg overflow-hidden border bg-white"
              style={{ borderColor: `${colors.primary}25` }}
            >
              <div
                className="px-3 py-2 flex gap-2 items-stretch"
                style={{ backgroundColor: headerBg }}
              >
                <div className="w-1 rounded-full" style={{ backgroundColor: accent }} />
                <div className="min-w-0">
                  <p className="font-bold text-sm" style={{ color: colors.primaryDark }}>
                    {group.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: `${colors.lightText}cc` }}>
                    {group.volume.toFixed(1)} gal · {group.acres.toFixed(2)} acres
                    {group.count > 1 ? ' each' : ''}
                  </p>
                </div>
              </div>
              <div className="px-3 py-2 space-y-1.5">
                {products.map((product, idx) => {
                  const amount = calculateAmount(
                    product.rate,
                    product.unit,
                    group.volume,
                    applicationRate
                  );
                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span
                        className="font-medium truncate mr-2"
                        style={{ color: colors.lightText }}
                      >
                        {displayProductName(product.name, idx)}
                      </span>
                      <span
                        className="font-bold flex-shrink-0"
                        style={{ color: colors.primaryDark }}
                      >
                        {formatOutput(
                          amount,
                          product.outputFormat,
                          product.unit,
                          product.jugSize ?? 128
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
