import React, { useEffect } from 'react';
import { useBackHandler } from '../hooks/useBackHandler';
import { colors } from '../types';
import { ExportState } from '../utils/export';
import {
  calculateMixPlanning,
  calculateAmount,
  formatOutput,
  calculateFieldAmount,
  formatPurchaseAmount,
} from '../utils/calculations';
import { displayProductName } from '../utils/productName';

interface MixPreviewModalProps {
  state: ExportState;
  onClose: () => void;
}

function formatHours(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours} hr ${minutes} min`;
}

function formatETA(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  const m = minutes < 10 ? `0${minutes}` : minutes;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.toDateString() === today.toDateString()) return `Today ${h}:${m} ${ampm}`;
  if (date.toDateString() === tomorrow.toDateString()) return `Tomorrow ${h}:${m} ${ampm}`;
  return `${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][date.getDay()]} ${h}:${m} ${ampm}`;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline py-1.5 border-b last:border-0" style={{ borderColor: `${colors.primary}20` }}>
      <span className="text-sm" style={{ color: '#6b7280' }}>{label}</span>
      <span className="text-sm font-semibold ml-4 text-right" style={{ color: colors.lightText }}>{value}</span>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mt-5 mb-2 px-1">
      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.primaryDark }}>{title}</span>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl px-4 py-1" style={{ backgroundColor: '#f9fafb', border: `1px solid ${colors.primary}25` }}>
      {children}
    </div>
  );
}

export function MixPreviewModal({ state, onClose }: MixPreviewModalProps) {
  const {
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
  } = state;

  // Android back button is this modal's Escape key.
  useBackHandler(true, onClose);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const mixPlanning = fieldSize ? calculateMixPlanning(fieldSize, applicationRate, fillVolume) : null;

  // Even-load split
  const isEven = splitMode === 'even';
  const numEvenTanks = mixPlanning ? Math.ceil(mixPlanning.totalSprayNeeded / fillVolume) : 0;
  const evenTankVol = mixPlanning && numEvenTanks ? mixPlanning.totalSprayNeeded / numEvenTanks : 0;
  const evenTankAcres = evenTankVol ? evenTankVol / applicationRate : 0;

  // Field ops
  let fieldOps: null | {
    acresPerHour: number;
    effectiveRate: number;
    tanksNeeded: number;
    sprayHours: number;
    totalFillHours: number;
    totalJobHours: number;
    finishTime: Date;
  } = null;
  if (fieldSize && implementWidth && speed) {
    const acresPerHour = speed * implementWidth * 0.1212;
    const tanksNeeded = fieldSize / acresPerFill;
    const sprayHours = fieldSize / acresPerHour;
    const totalFillHours = (fillTime / 60) * tanksNeeded;
    const totalJobHours = sprayHours + totalFillHours;
    const effectiveRate = fieldSize / totalJobHours;
    const finishTime = new Date(currentTime.getTime() + totalJobHours * 3600000);
    fieldOps = { acresPerHour, effectiveRate, tanksNeeded, sprayHours, totalFillHours, totalJobHours, finishTime };
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Sheet */}
      <div
        className="relative flex flex-col w-full max-w-lg mx-auto mt-auto rounded-t-2xl"
        style={{ backgroundColor: '#ffffff', maxHeight: '92vh' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#d1d5db' }} />
        </div>

        {/* Fixed header */}
        <div className="flex items-center justify-between px-4 pb-3 pt-1">
          <div>
            <span className="text-lg font-bold" style={{ color: colors.primaryDark }}>SprayCalc</span>
            <span className="ml-2 text-xs" style={{ color: '#9ca3af' }}>Mix Preview</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
            aria-label="Close preview"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div style={{ borderBottom: `1px solid ${colors.primary}20` }} />

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-4 pb-8">

          {/* Setup summary */}
          <SectionHeader title="Mix Setup" />
          <Card>
            <Row label="Fill Volume" value={`${fillVolume} gal`} />
            <Row label="Application Rate" value={`${applicationRate} GPA`} />
            <Row label="Acres / Fill" value={acresPerFill.toFixed(2)} />
            {fieldSize > 0 && <Row label="Field Size" value={`${fieldSize} ac`} />}
            {mixPlanning && (
              <Row label="Total Spray Volume" value={`${mixPlanning.totalSprayNeeded.toFixed(0)} gal`} />
            )}
          </Card>

          {/* Full tank mix */}
          <SectionHeader title={isEven && mixPlanning ? `Full Mix (${numEvenTanks} × ${evenTankVol.toFixed(1)} gal, ${evenTankAcres.toFixed(2)} ac)` : 'Full Tank Mix'} />
          <Card>
            {products.map((product, idx) => {
              const amt = isEven && evenTankVol
                ? calculateAmount(product.rate, product.unit, evenTankVol, applicationRate)
                : product.tankAmount;
              return (
                <Row
                  key={idx}
                  label={displayProductName(product.name, idx)}
                  value={formatOutput(amt, product.outputFormat, product.unit, product.jugSize ?? 128)}
                />
              );
            })}
          </Card>

          {/* Partial mix (fullPlusPartial mode only) */}
          {!isEven && mixPlanning?.hasPartialMix && (
            <>
              <SectionHeader title={`Partial Mix (${mixPlanning.remainingSpray.toFixed(1)} gal · ${mixPlanning.remainingAcres.toFixed(2)} ac)`} />
              <Card>
                {products.map((product, idx) => {
                  const amt = calculateAmount(product.rate, product.unit, mixPlanning.remainingSpray, applicationRate);
                  return (
                    <Row
                      key={idx}
                      label={displayProductName(product.name, idx)}
                      value={formatOutput(amt, product.outputFormat, product.unit, product.jugSize ?? 128)}
                    />
                  );
                })}
              </Card>
            </>
          )}

          {/* Total quantities */}
          {fieldSize > 0 && (
            <>
              <SectionHeader title="Total Product Needed" />
              <Card>
                {products.map((product, idx) => {
                  const totalAmt = calculateFieldAmount(product.rate, product.unit, fieldSize, applicationRate);
                  const info = formatPurchaseAmount(totalAmt, product.unit, product.jugSize ?? 128);
                  return (
                    <Row
                      key={idx}
                      label={displayProductName(product.name, idx)}
                      value={info.display}
                    />
                  );
                })}
              </Card>
            </>
          )}

          {/* Field operations */}
          {fieldOps && (
            <>
              <SectionHeader title="Field Operations" />
              <Card>
                <Row label="Working Rate" value={`${fieldOps.acresPerHour.toFixed(1)} ac/hr`} />
                <Row label="Effective Rate" value={`${fieldOps.effectiveRate.toFixed(1)} ac/hr`} />
                <Row label="Mixes Needed" value={`${Math.ceil(fieldOps.tanksNeeded)} (${fieldOps.tanksNeeded.toFixed(1)})`} />
                <Row label="Spray Time" value={formatHours(fieldOps.sprayHours)} />
                <Row label="Total Fill Time" value={formatHours(fieldOps.totalFillHours)} />
                <Row label="Total Job" value={formatHours(fieldOps.totalJobHours)} />
                <Row label="Est. Finish" value={formatETA(fieldOps.finishTime)} />
              </Card>
            </>
          )}

          <p className="text-center text-xs mt-5 px-4" style={{ color: '#9ca3af' }}>
            SprayCalc — Always read and follow label directions.
          </p>
        </div>
      </div>
    </div>
  );
}
