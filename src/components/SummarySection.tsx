import React from 'react';
import { MixSplit, Product, colors } from '../types';
import { calculateAmount, formatOutputParts } from '../utils/calculations';
import { displayProductName } from '../utils/productName';
import { ExportState } from '../utils/export';
import { MixExportToolbar } from './MixExportToolbar';

interface SummarySectionProps {
  fillVolume: number;
  applicationRate: number;
  acresPerFill: number;
  products: Product[];
  fieldSize: number;
  implementWidth: number;
  speed: number;
  fillTime: number;
  splitMode: 'fullPlusPartial' | 'even';
  splits: MixSplit[];
  activeTab: 'tank' | 'field';
  currentTime: Date;
  copyFeedback: string;
  setCopyFeedback: (val: string) => void;
  onMixSnapshot?: () => void;
}

export function SummarySection({
  fillVolume,
  applicationRate,
  acresPerFill,
  products,
  fieldSize,
  implementWidth,
  speed,
  fillTime,
  splitMode,
  splits,
  activeTab,
  currentTime,
  copyFeedback,
  setCopyFeedback,
  onMixSnapshot,
}: SummarySectionProps) {
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
    splits,
    activeTab,
    currentTime,
  });

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
        <p className="mb-1">For a <strong>{fillVolume} gallon</strong> mix at <strong>{applicationRate} GPA</strong>:</p>
        <p className="mb-1">• This mix will cover <strong>{acresPerFill.toFixed(2)} acres</strong></p>
        <p className="mb-3">• Add the following to your mix:</p>
        <ul className="list-disc pl-6 space-y-1">
          {products.map((product, idx) => {
            // Derived, not read from product.tankAmount — see the note in
            // export.ts: that stored field can lag the inputs it came from.
            const amount = calculateAmount(product.rate, product.unit, fillVolume, applicationRate);
            const parts = formatOutputParts(amount, product.outputFormat, product.unit, product.jugSize ?? 128);
            return (
              <li key={product.id}>
                <strong>{displayProductName(product.name, idx)}:</strong> <strong>{parts.primary}</strong>
                {parts.jugBreakdown && (
                  <div className="text-xs leading-tight" style={{ color: `${colors.lightText}99` }}>
                    {parts.jugBreakdown}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
