import React from 'react';
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
  return (
    <div
      className="p-4 rounded-lg mb-6"
      style={{backgroundColor: colors.primaryLight + '30'}}
    >
      <h2 className="font-bold mb-3" style={{color: colors.primaryDark}}>Mix Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fill Volume (gallons)</label>
          <input
            type="number"
            inputMode="decimal"
            value={fillVolume || ''}
            onChange={(e) => onFillVolumeChange(e.target.value)}
            className="w-full p-3 border rounded-lg text-black text-base"
            min="0"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Application Rate (GPA)</label>
          <input
            type="number"
            inputMode="decimal"
            value={applicationRate || ''}
            onChange={(e) => onApplicationRateChange(e.target.value)}
            className="w-full p-3 border rounded-lg text-black text-base"
            min="0"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Acres Per Fill</label>
          <input
            type="number"
            inputMode="decimal"
            value={acresPerFillInput}
            onChange={(e) => onAcresPerFillInputChange(e.target.value)}
            onBlur={onAcresPerFillBlur}
            className="w-full p-3 border rounded-lg text-black text-base"
            min="0"
            step="0.1"
            placeholder="Auto-calculated"
          />
        </div>
      </div>
    </div>
  );
}
