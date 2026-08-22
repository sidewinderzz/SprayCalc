import React, { useEffect, useRef, useState } from 'react';
import { ScannedProduct, unitOptions, colors } from '../types';
import { extractProductsFromImage } from '../utils/ocr';
import { getPdfPageCount, renderPdfPageToBase64 } from '../utils/pdfToImage';

interface ScanReviewModalProps {
  imageBase64: string;
  mimeType: string;
  apiKey: string;
  onApply: (products: ScannedProduct[], sprayVolume?: number) => void;
  onClose: () => void;
}

export function ScanReviewModal({
  imageBase64,
  mimeType,
  apiKey,
  onApply,
  onClose,
}: ScanReviewModalProps) {
  const isPdf = mimeType === 'application/pdf';

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [products, setProducts] = useState<ScannedProduct[]>([]);
  const [sprayVolume, setSprayVolume] = useState<number | undefined>(undefined);
  const [applySprayVolume, setApplySprayVolume] = useState(true);
  // Rows the scan returned that failed validation. Surfaced rather than
  // dropped silently — a missing product is as dangerous as an extra one.
  const [discarded, setDiscarded] = useState(0);

  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [renderedImageBase64, setRenderedImageBase64] = useState<string>('');
  const [pdfReady, setPdfReady] = useState(!isPdf);

  const runRef = useRef(false);

  const initPdf = async () => {
    try {
      const count = await getPdfPageCount(imageBase64);
      setTotalPages(count);
      const img = await renderPdfPageToBase64(imageBase64, 1);
      setRenderedImageBase64(img);
      setPdfReady(true);
    } catch (e: any) {
      setErrorMsg(e?.message ?? 'Failed to read PDF.');
      setStatus('error');
    }
  };

  const renderPage = async (page: number) => {
    try {
      const img = await renderPdfPageToBase64(imageBase64, page);
      setRenderedImageBase64(img);
    } catch {
    }
  };

  useEffect(() => {
    if (isPdf) {
      initPdf();
    }
  }, []);

  const run = async (page?: number) => {
    setStatus('loading');
    setErrorMsg('');
    setDiscarded(0);
    try {
      let base64: string;
      let mime: string;
      if (isPdf) {
        const p = page ?? selectedPage;
        base64 = renderedImageBase64 || await renderPdfPageToBase64(imageBase64, p);
        mime = 'image/png';
      } else {
        base64 = imageBase64;
        mime = mimeType;
      }
      const result = await extractProductsFromImage(base64, mime, apiKey);
      if (result.products.length === 0) {
        setErrorMsg(
          isPdf
            ? "No products found — try a different page or a clearer PDF."
            : "No products found — try a clearer photo of the product table."
        );
        setStatus('error');
      } else {
        setProducts(result.products);
        setSprayVolume(result.sprayVolume);
        setApplySprayVolume(result.sprayVolume !== undefined);
        setDiscarded(result.discarded);
        setStatus('success');
      }
    } catch (e: any) {
      setErrorMsg(e?.message ?? 'Failed to read recommendation.');
      setStatus('error');
    }
  };

  useEffect(() => {
    if (!isPdf && !runRef.current) {
      runRef.current = true;
      run();
    }
  }, []);

  useEffect(() => {
    if (isPdf && pdfReady && !runRef.current) {
      runRef.current = true;
      run(selectedPage);
    }
  }, [pdfReady]);

  const handlePageChange = async (page: number) => {
    setSelectedPage(page);
    await renderPage(page);
    runRef.current = true;
    run(page);
  };

  const updateProduct = (idx: number, field: keyof ScannedProduct, value: string | number) => {
    setProducts(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const removeProduct = (idx: number) => {
    setProducts(prev => prev.filter((_, i) => i !== idx));
  };

  const addRow = () => {
    setProducts(prev => [...prev, { name: '', rate: 0, unit: 'fl oz/acre' }]);
  };

  const validProducts = products.filter(p => p.name.trim() && p.rate > 0);

  const thumbnailSrc = isPdf
    ? (renderedImageBase64 ? `data:image/png;base64,${renderedImageBase64}` : '')
    : `data:${mimeType};base64,${imageBase64}`;

  const handleApply = () => {
    onApply(validProducts, applySprayVolume ? sprayVolume : undefined);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-white w-full sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          border: `1.5px solid ${colors.primary}30`,
          maxWidth: 520,
          maxHeight: '92dvh',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
          <div>
            <h3 className="text-base font-bold" style={{ color: colors.primaryDark }}>
              Scanned Products
            </h3>
            {status === 'success' && (
              <p className="text-xs mt-0.5" style={{ color: colors.lightText + '80' }}>
                Review and edit before applying
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5"
            style={{ color: colors.lightText + '80' }}
            aria-label="Close"
          >
            <svg viewBox="0 0 14 14" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-5">

          {/* Thumbnail */}
          <div
            className="mb-3 rounded-lg overflow-hidden border flex items-center justify-center"
            style={{ borderColor: `${colors.primary}20`, minHeight: 80, maxHeight: 140, backgroundColor: `${colors.primary}05` }}
          >
            {thumbnailSrc ? (
              <img
                src={thumbnailSrc}
                alt={isPdf ? `PDF page ${selectedPage}` : 'Scanned recommendation'}
                className="w-full object-cover object-top"
                style={{ maxHeight: 140 }}
              />
            ) : (
              <div className="flex items-center justify-center py-6">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke={colors.primary + '60'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
            )}
          </div>

          {/* PDF page picker */}
          {isPdf && totalPages > 1 && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium flex-shrink-0" style={{ color: colors.lightText + 'a0' }}>
                Page
              </span>
              <div className="flex gap-1 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    disabled={status === 'loading'}
                    className="w-7 h-7 rounded text-xs font-medium transition-colors"
                    style={
                      p === selectedPage
                        ? { backgroundColor: colors.primary, color: '#fff' }
                        : {
                            backgroundColor: `${colors.primary}12`,
                            color: colors.primaryDark,
                            border: `1px solid ${colors.primary}30`,
                          }
                    }
                  >
                    {p}
                  </button>
                ))}
              </div>
              <span className="text-xs ml-auto flex-shrink-0" style={{ color: colors.lightText + '60' }}>
                {totalPages} pages
              </span>
            </div>
          )}

          {/* Loading */}
          {status === 'loading' && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div
                className="w-8 h-8 rounded-full border-2 animate-spin"
                style={{
                  borderColor: `${colors.primary}30`,
                  borderTopColor: colors.primary,
                }}
              />
              <p className="text-sm" style={{ color: colors.lightText + '80' }}>
                {isPdf && !pdfReady ? 'Loading PDF…' : 'Reading recommendation…'}
              </p>
            </div>
          )}

          {/* Error */}
          {status === 'error' && (
            <div className="flex flex-col items-center py-6 gap-4 text-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#fee2e2' }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <p className="text-sm max-w-xs" style={{ color: '#b91c1c' }}>{errorMsg}</p>
              <button
                onClick={() => { runRef.current = true; run(); }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Try again
              </button>
            </div>
          )}

          {status === 'success' && discarded > 0 && (
            <div
              className="mb-3 px-3 py-2 rounded-lg text-xs leading-relaxed"
              style={{ backgroundColor: `${colors.secondary}25`, color: colors.secondaryDark }}
            >
              {discarded} row{discarded === 1 ? '' : 's'} could not be read reliably and{' '}
              {discarded === 1 ? 'was' : 'were'} left out. Check the printed rec and add{' '}
              {discarded === 1 ? 'it' : 'them'} by hand if needed.
            </div>
          )}

          {/* Success — editable product list */}
          {status === 'success' && (
            <div className="space-y-2 mb-3">
              {products.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-lg"
                  style={{
                    backgroundColor: `${colors.primary}08`,
                    border: `1px solid ${colors.primary}15`,
                  }}
                >
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <input
                      type="text"
                      value={p.name}
                      onChange={e => updateProduct(idx, 'name', e.target.value)}
                      placeholder="Product name"
                      className="w-full text-base px-2 py-1.5 rounded border bg-white"
                      style={{ borderColor: `${colors.primary}30`, color: colors.lightText }}
                    />
                    <div className="flex gap-1.5">
                      <input
                        type="number"
                        value={p.rate || ''}
                        onChange={e => updateProduct(idx, 'rate', parseFloat(e.target.value) || 0)}
                        placeholder="Rate"
                        className="w-20 text-base px-2 py-1.5 rounded border bg-white"
                        style={{ borderColor: `${colors.primary}30`, color: colors.lightText }}
                        min="0"
                        step="any"
                      />
                      <select
                        value={p.unit}
                        onChange={e => updateProduct(idx, 'unit', e.target.value)}
                        className="flex-1 text-xs px-1.5 py-1.5 rounded border bg-white"
                        style={{ borderColor: `${colors.primary}30`, color: colors.lightText }}
                      >
                        {unitOptions.map(u => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => removeProduct(idx)}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md mt-0.5 hover:bg-red-100 hover:text-red-600"
                    style={{ color: colors.primaryLight }}
                    aria-label="Remove product"
                  >
                    <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={addRow}
                className="w-full py-2 text-sm rounded-lg transition-colors hover:bg-black/5"
                style={{
                  color: colors.primary,
                  border: `1.5px dashed ${colors.primary}50`,
                }}
              >
                + Add row
              </button>

              {/* Spray volume row */}
              {sprayVolume !== undefined && (
                <button
                  type="button"
                  onClick={() => setApplySprayVolume(v => !v)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                  style={{
                    backgroundColor: applySprayVolume ? `${colors.primary}12` : `${colors.primary}06`,
                    border: `1px solid ${applySprayVolume ? colors.primary + '40' : colors.primary + '18'}`,
                  }}
                >
                  {/* Checkbox */}
                  <div
                    className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: applySprayVolume ? colors.primary : 'white',
                      border: `1.5px solid ${applySprayVolume ? colors.primary : colors.primary + '50'}`,
                    }}
                  >
                    {applySprayVolume && (
                      <svg viewBox="0 0 10 8" width="9" height="7" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 3.5 6.5 9 1" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-medium" style={{ color: colors.primaryDark }}>
                      Set application rate to{' '}
                      <span className="font-bold">{sprayVolume} GPA</span>
                    </span>
                    <span className="block text-xs mt-0.5" style={{ color: colors.lightText + '70' }}>
                      Spray volume from the rec
                    </span>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {status !== 'loading' && (
          <div
            className="flex gap-3 px-5 py-4 flex-shrink-0"
            style={{ borderTop: `1px solid ${colors.primary}15` }}
          >
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium border"
              style={{ borderColor: `${colors.primary}40`, color: colors.primaryDark }}
            >
              Cancel
            </button>
            {status === 'success' && (
              <button
                onClick={handleApply}
                disabled={validProducts.length === 0}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity"
                style={{
                  backgroundColor: colors.primary,
                  opacity: validProducts.length === 0 ? 0.5 : 1,
                }}
              >
                Apply {validProducts.length} Product{validProducts.length !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
