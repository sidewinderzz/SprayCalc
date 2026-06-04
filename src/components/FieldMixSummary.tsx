import React from 'react';
import { Product, colors } from '../types';
import { calculateMixPlanning } from '../utils/calculations';
import { ExportState } from '../utils/export';
import { MixExportToolbar } from './MixExportToolbar';

interface FieldMixSummaryProps {
  fillVolume: number;
  applicationRate: number;
  acresPerFill: number;
  products: Product[];
  fieldSize: number;
  implementWidth: number;
  speed: number;
  fillTime: number;
  splitMode: 'fullPlusPartial' | 'even';
  currentTime: Date;
  copyFeedback: string;
  setCopyFeedback: (val: string) => void;
  onMixSnapshot?: () => void;
}

export function FieldMixSummary({
  fillVolume,
  applicationRate,
  acresPerFill,
  products,
  fieldSize,
  implementWidth,
  speed,
  fillTime,
  splitMode,
  currentTime,
  copyFeedback,
  setCopyFeedback,
  onMixSnapshot,
}: FieldMixSummaryProps) {
  const buildExportState = (): ExportState => ({
    fillVolume,
    applicationRate,
    acresPerFill,
    fieldSize,
    implementWidth,
    speed,
    fillTime,
    products,
    splitMode,
    currentTime,
  });

  const planning = calculateMixPlanning(fieldSize, applicationRate, fillVolume);
  const totalGallons = fieldSize > 0 && applicationRate > 0 ? fieldSize * applicationRate : 0;
  const hasInputs = fieldSize > 0 && applicationRate > 0 && fillVolume > 0;

  let tankLine: React.ReactNode = null;
  if (hasInputs && planning) {
    if (splitMode === 'fullPlusPartial') {
      const parts: string[] = [];
      if (planning.fullMixes > 0) parts.push(`${planning.fullMixes} full tank${planning.fullMixes === 1 ? '' : 's'} of ${fillVolume} gal`);
      if (planning.hasPartialMix) parts.push(`1 partial of ${planning.remainingSpray.toFixed(1)} gal`);
      tankLine = parts.join(' + ');
    } else {
      const numTanks = Math.ceil(planning.totalSprayNeeded / fillVolume);
      const perTankVol = planning.totalSprayNeeded / numTanks;
      tankLine = `${numTanks} even loads of ${perTankVol.toFixed(1)} gal`;
    }
  }

  return (
    <div
      data-tour-id="summary"
      className="p-4 rounded-xl mb-6"
      style={{
        backgroundColor: `${colors.primary}08`,
        border: `1px solid ${colors.primary}25`,
      }}
    >
      <div className="flex justify-between items-center mb-3 gap-2 flex-wrap">
        <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: colors.primaryDark }}>
          Mix Summary
        </h2>
        <MixExportToolbar
          buildExportState={buildExportState}
          copyFeedback={copyFeedback}
          setCopyFeedback={setCopyFeedback}
          onMixSnapshot={onMixSnapshot}
        />
      </div>
      <div style={{ color: colors.lightText }}>
        {hasInputs ? (
          <>
            <p className="mb-1">
              For <strong>{fieldSize} acres</strong> at <strong>{applicationRate} GPA</strong>:
            </p>
            <p className="mb-1">
              • Total mix volume: <strong>{totalGallons.toFixed(1)} gal</strong>
            </p>
            {tankLine && (
              <p className="mb-1">
                • Tank loads: <strong>{tankLine}</strong>
              </p>
            )}
            <p className="text-sm opacity-70 mt-2">
              See Per Mix below for product amounts in each tank, and What to Buy at the bottom for field totals.
            </p>
          </>
        ) : (
          <p className="text-sm opacity-70">
            Enter total acres, GPA, and tank capacity above to see your mix plan.
          </p>
        )}
      </div>
    </div>
  );
}
