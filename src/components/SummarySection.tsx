import React from 'react';
import { Product, colors } from '../types';
import { formatOutput } from '../utils/calculations';
import { generateSummaryText, exportPDF } from '../utils/export';

interface SummarySectionProps {
  fillVolume: number;
  applicationRate: number;
  acresPerFill: number;
  products: Product[];
  fieldSize: number;
  implementWidth: number;
  speed: number;
  fillTime: number;
  currentTime: Date;
  copyFeedback: string;
  setCopyFeedback: (val: string) => void;
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
  currentTime,
  copyFeedback,
  setCopyFeedback
}: SummarySectionProps) {
  const buildExportState = () => ({
    fillVolume,
    applicationRate,
    acresPerFill,
    fieldSize,
    implementWidth,
    speed,
    fillTime,
    products,
    currentTime
  });

  const handleCopyToClipboard = async () => {
    const text = generateSummaryText(buildExportState());
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback('Copied!');
    } catch (_err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopyFeedback('Copied!');
    }
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const handleShareSummary = async () => {
    const text = generateSummaryText(buildExportState());
    if (navigator.share) {
      try {
        await navigator.share({ title: 'SprayCalc Mix', text });
        return;
      } catch (_) {}
    }
    // Fallback: copy to clipboard
    try { await navigator.clipboard.writeText(text); } catch (_) {}
    setCopyFeedback('Copied!');
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const handleExportPDF = () => {
    exportPDF(buildExportState());
  };

  return (
    <div
      className="p-4 rounded-lg"
      style={{backgroundColor: colors.secondaryLight + '20'}}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold" style={{color: colors.primaryDark}}>Summary</h2>
        <div className="flex items-center gap-2">
          {copyFeedback && (
            <span className="text-sm font-medium" style={{color: colors.primary}}>
              {copyFeedback}
            </span>
          )}
          {/* Copy */}
          <button
            onClick={handleCopyToClipboard}
            className="p-2.5 rounded-lg flex items-center justify-center"
            style={{backgroundColor: colors.primary + '18', border: `1px solid ${colors.primary}30`}}
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={colors.primary} viewBox="0 0 16 16">
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>
          </button>
          {/* Share */}
          <button
            onClick={handleShareSummary}
            className="p-2.5 rounded-lg flex items-center justify-center"
            style={{backgroundColor: colors.primary + '18', border: `1px solid ${colors.primary}30`}}
            title="Share"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
          {/* PDF */}
          <button
            onClick={handleExportPDF}
            className="px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-medium"
            style={{backgroundColor: colors.primary, color: 'white'}}
            title="Export PDF"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            PDF
          </button>
        </div>
      </div>
      <div>
        <p className="mb-1">For a <strong>{fillVolume} gallon</strong> mix at <strong>{applicationRate} GPA</strong>:</p>
        <p className="mb-1">• This mix will cover <strong>{acresPerFill.toFixed(2)} acres</strong></p>
        <p className="mb-3">• Add the following to your mix:</p>
        <ul className="list-disc pl-6 space-y-1">
          {products.map(product => (
            <li key={product.id}>
              <strong>{product.name}:</strong> {formatOutput(product.tankAmount, product.outputFormat)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
