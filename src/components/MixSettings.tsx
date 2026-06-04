import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../types';

interface MixSettingsProps {
  fillVolume: number;
  applicationRate: number;
  acresPerFill: number;
  acresPerFillInput: string;
  onFillVolumeChange: (value: string) => void;
  onApplicationRateChange: (value: string) => void;
  onAcresPerFillInputChange: (value: string) => void;
  onAcresPerFillBlur: () => void;
}

const formatNumber = (value: number, maximumFractionDigits = 1) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(value);

export function MixSettings({
  fillVolume,
  applicationRate,
  acresPerFill,
  acresPerFillInput,
  onFillVolumeChange,
  onApplicationRateChange,
  onAcresPerFillInputChange,
  onAcresPerFillBlur
}: MixSettingsProps) {
  const isComplete = fillVolume > 0 && applicationRate > 0 && acresPerFill > 0;
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
    backgroundColor: 'white'
  };

  const acresValue = acresPerFillInput
    ? parseFloat(acresPerFillInput) || acresPerFill
    : acresPerFill;

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
        aria-label="Edit mix information"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: colors.primaryDark }}
            >
              Tank Mix
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full border bg-white px-3 py-1 text-sm font-semibold text-gray-800" style={{ borderColor: `${colors.primary}25` }}>
                {formatNumber(fillVolume)} gal
              </span>
              <span className="rounded-full border bg-white px-3 py-1 text-sm font-semibold text-gray-800" style={{ borderColor: `${colors.primary}25` }}>
                {formatNumber(applicationRate, 2)} GPA
              </span>
              <span className="rounded-full border bg-white px-3 py-1 text-sm font-semibold text-gray-800" style={{ borderColor: `${colors.primary}25` }}>
                {formatNumber(acresValue)} acres/fill
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
        border: `1px solid ${colors.primary}25`
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: colors.primaryDark }}>
          Mix Information
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
            Fill Volume (gallons)
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
            Acres Per Fill
          </label>
          <input
            type="number"
            inputMode="decimal"
            value={acresPerFillInput}
            onChange={(e) => onAcresPerFillInputChange(e.target.value)}
            onBlur={onAcresPerFillBlur}
            className="w-full p-3 border rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2"
            style={{ ...inputStyle, color: acresPerFillInput ? undefined : '#9ca3af' }}
            min="0"
            step="0.1"
            placeholder="Auto-calculated"
          />
        </div>
      </div>
    </div>
  );
}
