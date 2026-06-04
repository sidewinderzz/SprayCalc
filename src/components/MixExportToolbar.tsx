import React from 'react';
import { colors } from '../types';
import { generateSummaryText, exportPDF, buildSharePayload, ExportState } from '../utils/export';
import { trackEvent } from '../utils/analytics';

interface MixExportToolbarProps {
  buildExportState: () => ExportState;
  copyFeedback: string;
  setCopyFeedback: (val: string) => void;
  onMixSnapshot?: () => void;
}

export function MixExportToolbar({
  buildExportState,
  copyFeedback,
  setCopyFeedback,
  onMixSnapshot,
}: MixExportToolbarProps) {
  const handleCopyToClipboard = async () => {
    onMixSnapshot?.();
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
    const state = buildExportState();
    const payload = buildSharePayload(state);
    trackEvent('share_mix', {
      product_count: state.products.length,
      fill_volume: state.fillVolume,
      application_rate: state.applicationRate,
      method: typeof navigator.share === 'function' ? 'web_share' : 'clipboard',
      too_large: payload.tooLarge,
    });
    const shortText = `${payload.text.split('\n').slice(0, 6).join('\n')}\n\nOpen this mix in SprayCalc:`;
    const isAbort = (err: unknown): boolean =>
      !!err && typeof err === 'object' && 'name' in err && (err as { name?: string }).name === 'AbortError';

    if (navigator.share) {
      if (!payload.tooLarge) {
        try {
          await navigator.share({ title: payload.title, text: shortText, url: payload.url });
          return;
        } catch (err) {
          if (isAbort(err)) return;
        }
      }
      try {
        await navigator.share({ title: payload.title, text: payload.text });
        return;
      } catch (err) {
        if (isAbort(err)) return;
      }
    }

    const clipboardText = payload.tooLarge ? payload.text : `${shortText} ${payload.url}`;
    try {
      await navigator.clipboard.writeText(clipboardText);
      setCopyFeedback(payload.tooLarge ? 'Copied!' : 'Link copied!');
    } catch (_) {
      setCopyFeedback('Copy failed');
    }
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const handleExportPDF = async () => {
    onMixSnapshot?.();
    const state = buildExportState();
    trackEvent('export_pdf', {
      product_count: state.products.length,
      fill_volume: state.fillVolume,
      application_rate: state.applicationRate,
    });
    try {
      await exportPDF(state);
    } catch (err) {
      console.error('PDF export failed:', err);
      setCopyFeedback('PDF failed');
      setTimeout(() => setCopyFeedback(''), 2500);
    }
  };

  const ghostButtonStyle = {
    backgroundColor: 'transparent',
    color: colors.primaryDark,
    border: `1px solid ${colors.primary}50`,
  };

  return (
    <div className="flex items-center gap-2">
      {copyFeedback && (
        <span className="text-sm font-medium" style={{ color: colors.primary }}>
          {copyFeedback}
        </span>
      )}
      <button
        onClick={handleCopyToClipboard}
        className="h-9 w-9 rounded-lg flex items-center justify-center"
        style={ghostButtonStyle}
        title="Copy to clipboard"
        aria-label="Copy to clipboard"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
      </button>
      <button
        onClick={handleShareSummary}
        className="h-9 w-9 rounded-lg flex items-center justify-center"
        style={ghostButtonStyle}
        title="Share"
        aria-label="Share"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
      </button>
      <button
        onClick={handleExportPDF}
        className="h-9 px-4 rounded-lg flex items-center gap-1.5 text-sm font-medium text-white whitespace-nowrap"
        style={{ backgroundColor: colors.primary }}
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
  );
}
