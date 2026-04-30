import React from 'react';
import { colors } from '../types';

interface FieldOperationsSectionProps {
  fillVolume: number;
  applicationRate: number;
  acresPerFill: number;
  fieldSize: number;
  implementWidth: number;
  speed: number;
  fillTime: number;
  setFieldSize: (val: number) => void;
  setImplementWidth: (val: number) => void;
  setSpeed: (val: number) => void;
  setFillTime: (val: number) => void;
  currentTime: Date;
  showFieldOps: boolean;
  setShowFieldOps: (val: boolean) => void;
}

interface FieldOpsEstimates {
  acresPerHour: number;
  effectiveAcresPerHour: number;
  mixesNeeded: number;
  totalGallons: number;
  sprayHours: number;
  totalFillTimeHours: number;
  totalJobHours: number;
  completionTime: Date;
}

function computeFieldOps(
  fillVolume: number,
  applicationRate: number,
  acresPerFill: number,
  fieldSize: number,
  implementWidth: number,
  speed: number,
  fillTime: number,
  currentTime: Date
): FieldOpsEstimates | null {
  if (!fillVolume || !applicationRate) return null;
  if (!speed || !implementWidth || !fieldSize || !acresPerFill) return null;

  const acresPerHour = speed * implementWidth * 0.1212;
  const mixesNeeded = fieldSize / acresPerFill;
  const sprayHours = fieldSize / acresPerHour;
  const totalFillTimeHours = (fillTime / 60) * mixesNeeded;
  const totalJobHours = sprayHours + totalFillTimeHours;
  const effectiveAcresPerHour = fieldSize / totalJobHours;
  const totalGallons = fieldSize * applicationRate;
  const completionTime = new Date(currentTime.getTime() + totalJobHours * 60 * 60 * 1000);

  return {
    acresPerHour,
    effectiveAcresPerHour,
    mixesNeeded,
    totalGallons,
    sprayHours,
    totalFillTimeHours,
    totalJobHours,
    completionTime
  };
}

function formatTime(hours: number) {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours} hr ${minutes} min`;
}

function formatETA(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let dayPrefix = '';

  if (date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()) {
    dayPrefix = 'Today at ';
  } else if (date.getDate() === tomorrow.getDate() &&
            date.getMonth() === tomorrow.getMonth() &&
            date.getFullYear() === tomorrow.getFullYear()) {
    dayPrefix = 'Tomorrow at ';
  } else {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dayPrefix = `${days[date.getDay()]} at `;
  }

  return `${dayPrefix}${formattedHours}:${formattedMinutes} ${ampm}`;
}

function renderEstimates(
  fillVolume: number,
  applicationRate: number,
  estimates: FieldOpsEstimates | null
): React.ReactNode {
  const emptyStateStyle = {
    backgroundColor: `${colors.primary}10`,
    border: `1px solid ${colors.primary}25`,
    color: colors.lightText
  };

  if (!fillVolume || !applicationRate) {
    return (
      <div className="p-3 rounded-lg" style={emptyStateStyle}>
        <p><strong>Important:</strong> Please enter your fill volume and application rate in the Mix Information section above.</p>
      </div>
    );
  }

  if (!estimates) {
    return (
      <div className="p-3 rounded-lg" style={emptyStateStyle}>
        <p>Please fill in all field operation values above to see estimates.</p>
        <p className="text-sm mt-2">These calculations will show:</p>
        <ul className="list-disc pl-6 text-sm mt-1">
          <li>Working rate (acres/hour)</li>
          <li>Effective rate with filling time</li>
          <li>Number of mixes needed</li>
          <li>Total gallons required</li>
          <li>Estimated spray and fill times</li>
          <li>Estimated completion time (ETA)</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      <p>• Working rate: <strong>{estimates.acresPerHour.toFixed(1)} acres/hour</strong></p>
      <p>• Effective rate (with filling): <strong>{estimates.effectiveAcresPerHour.toFixed(1)} acres/hour</strong></p>
      <p>• Mixes needed: <strong>{Math.ceil(estimates.mixesNeeded)} mixes</strong> ({estimates.mixesNeeded.toFixed(1)})</p>
      <p>• Total gallons: <strong>{estimates.totalGallons.toFixed(0)} gallons</strong></p>
      <p>• Spray time: <strong>{formatTime(estimates.sprayHours)}</strong></p>
      <p>• Total fill time: <strong>{formatTime(estimates.totalFillTimeHours)}</strong></p>
      <p>• Estimated job completion time: <strong>{formatTime(estimates.totalJobHours)}</strong></p>
      <p>• Estimated completion: <strong>{formatETA(estimates.completionTime)}</strong></p>
    </div>
  );
}

export function FieldOperationsSection({
  fillVolume,
  applicationRate,
  acresPerFill,
  fieldSize,
  implementWidth,
  speed,
  fillTime,
  setFieldSize,
  setImplementWidth,
  setSpeed,
  setFillTime,
  currentTime,
  showFieldOps,
  setShowFieldOps
}: FieldOperationsSectionProps) {
  const inputStyle = {
    borderColor: `${colors.primary}30`,
    backgroundColor: 'white'
  };
  const labelStyle = {
    color: colors.lightText,
    opacity: 0.7
  };

  const estimates = computeFieldOps(
    fillVolume, applicationRate, acresPerFill,
    fieldSize, implementWidth, speed, fillTime, currentTime
  );

  const chipStyle = { backgroundColor: colors.primary + '12' };

  return (
    <div className="rounded-xl overflow-hidden border mb-6" style={{ borderColor: colors.primary + '25' }}>
      {/* Toggle header */}
      <button
        onClick={() => setShowFieldOps(!showFieldOps)}
        className="w-full flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: colors.primary + '08' }}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm uppercase tracking-wide" style={{ color: colors.primaryDark }}>
            Field Operations
          </span>
          {/* Compact stats chips */}
          <span className="hidden sm:flex items-center gap-2 text-xs" style={{ color: colors.primaryDark + 'aa' }}>
            {fieldSize > 0 && (
              <span className="px-2 py-0.5 rounded-full" style={chipStyle}>{fieldSize} ac</span>
            )}
            {implementWidth > 0 && (
              <span className="px-2 py-0.5 rounded-full" style={chipStyle}>{implementWidth} ft</span>
            )}
            {speed > 0 && (
              <span className="px-2 py-0.5 rounded-full" style={chipStyle}>{speed} mph</span>
            )}
            {estimates && (
              <span className="px-2 py-0.5 rounded-full" style={chipStyle}>
                {estimates.effectiveAcresPerHour.toFixed(1)} ac/hr
              </span>
            )}
          </span>
        </div>
        <svg
          viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{
            color: colors.primaryDark,
            transform: showFieldOps ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {showFieldOps && (
        <div className="p-4 space-y-5">
          {/* Inputs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide mb-1" style={labelStyle}>
                Field Size (acres)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={fieldSize || ''}
                onChange={(e) => setFieldSize(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2"
                style={inputStyle}
                min="0"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide mb-1" style={labelStyle}>
                Width (feet)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={implementWidth || ''}
                onChange={(e) => setImplementWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2"
                style={inputStyle}
                min="0"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide mb-1" style={labelStyle}>
                Speed (mph)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={speed || ''}
                onChange={(e) => setSpeed(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2"
                style={inputStyle}
                min="0"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide mb-1" style={labelStyle}>
                Fill Time (min)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={fillTime || ''}
                onChange={(e) => setFillTime(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2"
                style={inputStyle}
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: `1px solid ${colors.primary}20` }} />

          {/* Estimates subsection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 rounded-full" style={{ backgroundColor: colors.primary }} />
              <h3 className="font-bold text-sm" style={{ color: colors.primaryDark }}>
                Field Operations Estimates
              </h3>
            </div>
            {renderEstimates(fillVolume, applicationRate, estimates)}
          </div>
        </div>
      )}
    </div>
  );
}
