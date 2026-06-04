import React, { useEffect, useRef, useState } from 'react';
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

const formatNumber = (value: number, maximumFractionDigits = 1) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(value);

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
  const isComplete = fieldSize > 0 && applicationRate > 0 && fillVolume > 0;
  const [isExpanded, setIsExpanded] = useState(!isComplete);
  const wasComplete = useRef(isComplete);

  useEffect(() => {
    if (!isComplete) {
      setIsExpanded(true);
    } else if (!wasComplete.current) {
      setIsExpanded(false);
    }

    wasComplete.current = isComplete;
  }, [isComplete]);

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
        ? `${planning.fullMixes} full × ${formatNumber(fillVolume)} gal`
        : '';
      const partialPart = planning.hasPartialMix
        ? `1 partial × ${formatNumber(planning.remainingSpray)} gal`
        : '';
      tankSummary = [fullPart, partialPart].filter(Boolean).join(' + ') || '—';
    } else {
      const numTanks = Math.ceil(planning.totalSprayNeeded / fillVolume);
      if (numTanks > 0) {
        const perTank = planning.totalSprayNeeded / numTanks;
        tankSummary = `${numTanks} × ${formatNumber(perTank)} gal`;
      }
    }
  }

  if (isComplete && !isExpanded) {
    return (
      <button
        type="button"
        data-tour-id="mix-information"
        onClick={() => setIsExpanded(true)}
        className="w-full mb-6 rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}12, ${colors.primary}04)`,
          borderColor: `${colors.primary}30`,
          boxShadow: '0 8px 22px rgba(73,138,90,0.08)',
        }}
        aria-label="Edit field mix information"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: colors.primaryDark }}
            >
              Field Mix
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full border bg-white px-3 py-1 text-sm font-semibold text-gray-800" style={{ borderColor: `${colors.primary}25` }}>
                {formatNumber(fieldSize)} acres
              </span>
              <span className="rounded-full border bg-white px-3 py-1 text-sm font-semibold text-gray-800" style={{ borderColor: `${colors.primary}25` }}>
                {formatNumber(applicationRate, 2)} GPA
              </span>
              <span className="rounded-full border bg-white px-3 py-1 text-sm font-semibold text-gray-800" style={{ borderColor: `${colors.primary}25` }}>
                {formatNumber(totalGallons)} gal total
              </span>
              <span className="rounded-full border bg-white px-3 py-1 text-sm font-semibold text-gray-800" style={{ borderColor: `${colors.primary}25` }}>
                {tankSummary}
              </span>
            </div>
          </div>
          <span
            className="inline-flex shrink-0 items-center justify-center rounded-full px-4 py-2 text-sm font-bold text-white"
            style={{ backgroundColor: colors.primary }}
          >
            Edit
          </span>
        </div>
      </button>
    );
  }

  return (
    <div
      data-tour-id="mix-information"
      className="p-4 rounded-xl mb-6"
      style={{
        backgroundColor: `${colors.primary}08`,
        border: `1px solid ${colors.primary}25`,
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2
          className="font-bold text-sm uppercase tracking-wide"
          style={{ color: colors.primaryDark }}
        >
          Field Mix Information
        </h2>
        {isComplete && (
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="rounded-full px-3 py-1.5 text-xs font-bold transition-colors hover:bg-white"
            style={{ color: colors.primaryDark, border: `1px solid ${colors.primary}30` }}
          >
            Done
          </button>
        )}
      </div>
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
      <div className="mt-4 flex items-center gap-3">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: colors.primaryDark }}
        >
          Tank split
        </span>
        <div
          role="radiogroup"
          aria-label="Tank split mode"
          className="inline-flex items-stretch rounded-lg overflow-hidden"
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
                title={opt.sub}
                className="text-sm font-medium transition-colors"
                style={{
                  padding: '6px 13px',
                  backgroundColor: isActive ? colors.primary : 'transparent',
                  color: isActive ? 'white' : colors.primaryDark,
                }}
              >
                {opt.label}
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
          Total mix: <strong style={{ color: colors.primaryDark }}>{formatNumber(totalGallons)} gal</strong>
        </span>
        <span className="opacity-50">·</span>
        <span>
          Tanks: <strong style={{ color: colors.primaryDark }}>{tankSummary}</strong>
        </span>
      </div>
    </div>
  );
}
