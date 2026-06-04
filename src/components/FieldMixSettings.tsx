import React from 'react';
import { colors } from '../types';
import { calculateMixPlanning } from '../utils/calculations';

interface FieldMixSettingsProps {
  fieldSize: number;
  applicationRate: number;
  fillVolume: number;
  splitMode: 'fullPlusPartial' | 'even';
  onFieldSizeChange: (value: string) => void;
  onApplicationRateChange: (value: string) => void;
  onFillVolumeChange: (value: string) => void;
  onSplitModeChange: (mode: 'fullPlusPartial' | 'even') => void;
}

export function FieldMixSettings({
  fieldSize,
  applicationRate,
  fillVolume,
  splitMode,
  onFieldSizeChange,
  onApplicationRateChange,
  onFillVolumeChange,
  onSplitModeChange,
}: FieldMixSettingsProps) {
  const inputStyle = {
    borderColor: `${colors.primary}30`,
    backgroundColor: 'white',
  };

  const totalGallons = fieldSize > 0 && applicationRate > 0 ? fieldSize * applicationRate : 0;
  const planning = calculateMixPlanning(fieldSize, applicationRate, fillVolume);

  let tankSummary = '—';
  if (planning && fillVolume > 0) {
    if (splitMode === 'fullPlusPartial') {
      const fullPart = planning.fullMixes > 0
        ? `${planning.fullMixes} full × ${fillVolume} gal`
        : '';
      const partialPart = planning.hasPartialMix
        ? `1 partial × ${planning.remainingSpray.toFixed(1)} gal`
        : '';
      tankSummary = [fullPart, partialPart].filter(Boolean).join(' + ') || '—';
    } else {
      const numTanks = Math.ceil(planning.totalSprayNeeded / fillVolume);
      if (numTanks > 0) {
        const perTank = planning.totalSprayNeeded / numTanks;
        tankSummary = `${numTanks} × ${perTank.toFixed(1)} gal`;
      }
    }
  }

  return (
    <div
      className="p-4 rounded-xl mb-6"
      style={{
        backgroundColor: `${colors.primary}08`,
        border: `1px solid ${colors.primary}25`,
      }}
    >
      <h2
        className="font-bold mb-3 text-sm uppercase tracking-wide"
        style={{ color: colors.primaryDark }}
      >
        Field Mix Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
            Total Acres
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={fieldSize || ''}
            onChange={(e) => onFieldSizeChange(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2"
            style={inputStyle}
            min="0"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
            Application Rate (GPA)
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={applicationRate || ''}
            onChange={(e) => onApplicationRateChange(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2"
            style={inputStyle}
            min="0"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>
            Tank Capacity (gallons)
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={fillVolume || ''}
            onChange={(e) => onFillVolumeChange(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2"
            style={inputStyle}
            min="0"
            placeholder="0"
          />
        </div>
      </div>

      {/* Split mode toggle */}
      <div className="mt-4">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: colors.primaryDark }}
        >
          Tank Split
        </p>
        <div
          role="radiogroup"
          aria-label="Tank split mode"
          className="flex items-stretch rounded-lg overflow-hidden"
          style={{ border: `1px solid ${colors.primary}40`, backgroundColor: 'white' }}
        >
          {([
            { value: 'fullPlusPartial' as const, label: 'Full + partial', sub: 'fill tanks; last is leftover' },
            { value: 'even' as const, label: 'Even loads', sub: 'split evenly across tanks' },
          ]).map((opt) => {
            const isActive = splitMode === opt.value;
            return (
              <button
                key={opt.value}
                role="radio"
                aria-checked={isActive}
                onClick={() => onSplitModeChange(opt.value)}
                className="flex-1 py-2 px-3 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? colors.primary : 'transparent',
                  color: isActive ? 'white' : colors.primaryDark,
                }}
              >
                <span className="block leading-tight">{opt.label}</span>
                <span
                  className="block text-[10px] leading-tight"
                  style={{ opacity: isActive ? 0.85 : 0.6 }}
                >
                  {opt.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live summary */}
      <div
        className="mt-4 p-3 rounded-lg flex flex-wrap items-center gap-x-4 gap-y-1 text-sm"
        style={{ backgroundColor: 'white', border: `1px solid ${colors.primary}20`, color: colors.lightText }}
      >
        <span>
          Total mix: <strong style={{ color: colors.primaryDark }}>{totalGallons.toFixed(1)} gal</strong>
        </span>
        <span className="opacity-50">·</span>
        <span>
          Tanks: <strong style={{ color: colors.primaryDark }}>{tankSummary}</strong>
        </span>
      </div>
    </div>
  );
}
