import React from 'react';
import { Product, colors } from '../types';
import { calculateAmount, calculateMixPlanning, formatOutput } from '../utils/calculations';
import { displayProductName } from '../utils/productName';

interface TankBreakdownProps {
  products: Product[];
  fieldSize: number;
  applicationRate: number;
  fillVolume: number;
  splitMode: 'fullPlusPartial' | 'even';
}

interface TankLoad {
  label: string;
  volume: number;
  acres: number;
  isPartial: boolean;
}

function buildTanks(
  fieldSize: number,
  applicationRate: number,
  fillVolume: number,
  splitMode: 'fullPlusPartial' | 'even'
): TankLoad[] {
  const planning = calculateMixPlanning(fieldSize, applicationRate, fillVolume);
  if (!planning || planning.totalSprayNeeded <= 0) return [];

  if (splitMode === 'fullPlusPartial') {
    const tanks: TankLoad[] = [];
    for (let i = 0; i < planning.fullMixes; i++) {
      tanks.push({
        label: `Tank ${i + 1}`,
        volume: fillVolume,
        acres: fillVolume / applicationRate,
        isPartial: false,
      });
    }
    if (planning.hasPartialMix) {
      tanks.push({
        label: `Tank ${planning.fullMixes + 1} (partial)`,
        volume: planning.remainingSpray,
        acres: planning.remainingAcres,
        isPartial: true,
      });
    }
    return tanks;
  }

  // Even loads
  const numTanks = Math.ceil(planning.totalSprayNeeded / fillVolume);
  if (numTanks <= 0) return [];
  const perTankVolume = planning.totalSprayNeeded / numTanks;
  const perTankAcres = perTankVolume / applicationRate;
  return Array.from({ length: numTanks }, (_, i) => ({
    label: `Tank ${i + 1}`,
    volume: perTankVolume,
    acres: perTankAcres,
    isPartial: false,
  }));
}

export function TankBreakdown({
  products,
  fieldSize,
  applicationRate,
  fillVolume,
  splitMode,
}: TankBreakdownProps) {
  if (fieldSize <= 0 || applicationRate <= 0 || fillVolume <= 0) {
    return (
      <div
        className="p-4 rounded-xl mb-6 text-sm"
        style={{
          backgroundColor: `${colors.primary}08`,
          border: `1px dashed ${colors.primary}40`,
          color: `${colors.lightText}cc`,
        }}
      >
        Enter total acres, GPA, and tank capacity above to see the per-tank breakdown.
      </div>
    );
  }

  const tanks = buildTanks(fieldSize, applicationRate, fillVolume, splitMode);
  if (tanks.length === 0) return null;

  return (
    <div
      className="p-4 rounded-xl mb-6"
      style={{
        backgroundColor: `${colors.primary}08`,
        border: `1px solid ${colors.primary}25`,
      }}
    >
      <div className="flex justify-between items-center mb-3 gap-2 flex-wrap">
        <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: colors.primaryDark }}>
          Per-Tank Breakdown
        </h2>
        <span className="text-xs" style={{ color: `${colors.primaryDark}aa` }}>
          {tanks.length} tank load{tanks.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tanks.map((tank, i) => {
          const cardBg = tank.isPartial ? `${colors.secondary}14` : `${colors.primary}08`;
          const accent = tank.isPartial ? colors.secondary : colors.primary;
          return (
            <div
              key={i}
              className="rounded-lg overflow-hidden border bg-white"
              style={{ borderColor: `${colors.primary}25` }}
            >
              <div className="px-3 py-2 flex gap-2 items-stretch" style={{ backgroundColor: cardBg }}>
                <div className="w-1 rounded-full" style={{ backgroundColor: accent }} />
                <div className="min-w-0">
                  <p className="font-bold text-sm" style={{ color: colors.primaryDark }}>
                    {tank.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: `${colors.lightText}cc` }}>
                    {tank.volume.toFixed(1)} gal · {tank.acres.toFixed(2)} acres
                  </p>
                </div>
              </div>
              <div className="px-3 py-2 space-y-1.5">
                {products.map((product, idx) => {
                  const amount = calculateAmount(product.rate, product.unit, tank.volume, applicationRate);
                  return (
                    <div key={product.id} className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate mr-2" style={{ color: colors.lightText }}>
                        {displayProductName(product.name, idx)}
                      </span>
                      <span className="font-bold flex-shrink-0" style={{ color: colors.primaryDark }}>
                        {formatOutput(amount, product.outputFormat, product.unit, product.jugSize ?? 128)}
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
