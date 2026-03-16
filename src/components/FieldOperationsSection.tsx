import React from 'react';
import { Product, colors } from '../types';

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
}

function calculateFieldOperations(
  fillVolume: number,
  applicationRate: number,
  acresPerFill: number,
  fieldSize: number,
  implementWidth: number,
  speed: number,
  fillTime: number,
  currentTime: Date
): React.ReactNode {
  if (!fillVolume || !applicationRate) {
    return (
      <div className="p-3 rounded" style={{backgroundColor: colors.secondaryLight + '30'}}>
        <p><strong>Important:</strong> Please enter your fill volume and application rate in the Mix Information section above.</p>
      </div>
    );
  }

  if (!speed || !implementWidth || !fieldSize || !acresPerFill) {
    return (
      <div className="p-3 rounded" style={{backgroundColor: colors.secondaryLight + '30'}}>
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

  const acresPerHour = speed * implementWidth * 0.1212;
  const mixesNeeded = fieldSize / acresPerFill;
  const sprayHours = fieldSize / acresPerHour;
  const totalFillTimeHours = (fillTime / 60) * mixesNeeded;
  const totalJobHours = sprayHours + totalFillTimeHours;
  const effectiveAcresPerHour = fieldSize / totalJobHours;
  const totalGallons = fieldSize * applicationRate;

  const completionTime = new Date(currentTime.getTime() + totalJobHours * 60 * 60 * 1000);

  const formatTime = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours} hr ${minutes} min`;
  };

  const formatETA = (date: Date) => {
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
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <p>• Working rate: <strong>{acresPerHour.toFixed(1)} acres/hour</strong></p>
      <p>• Effective rate (with filling): <strong>{effectiveAcresPerHour.toFixed(1)} acres/hour</strong></p>
      <p>• Mixes needed: <strong>{Math.ceil(mixesNeeded)} mixes</strong> ({mixesNeeded.toFixed(1)})</p>
      <p>• Total gallons: <strong>{totalGallons.toFixed(0)} gallons</strong></p>
      <p>• Spray time: <strong>{formatTime(sprayHours)}</strong></p>
      <p>• Total fill time: <strong>{formatTime(totalFillTimeHours)}</strong></p>
      <p>• Estimated job completion time: <strong>{formatTime(totalJobHours)}</strong></p>
      <p>• Estimated completion: <strong>{formatETA(completionTime)}</strong></p>
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
  currentTime
}: FieldOperationsSectionProps) {
  return (
    <div
      className="p-4 rounded-lg mt-6"
      style={{backgroundColor: colors.primaryLight + '15'}}
    >
      <h2 className="font-bold mb-4" style={{color: colors.primaryDark}}>Field Operations</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-xs font-medium mb-1">Field Size (acres)</label>
          <input
            type="number"
            inputMode="decimal"
            value={fieldSize || ''}
            onChange={(e) => setFieldSize(parseFloat(e.target.value) || 0)}
            className="w-full p-3 border rounded-lg text-black text-base"
            min="0"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Width (feet)</label>
          <input
            type="number"
            inputMode="decimal"
            value={implementWidth || ''}
            onChange={(e) => setImplementWidth(parseFloat(e.target.value) || 0)}
            className="w-full p-3 border rounded-lg text-black text-base"
            min="0"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Speed (mph)</label>
          <input
            type="number"
            inputMode="decimal"
            value={speed || ''}
            onChange={(e) => setSpeed(parseFloat(e.target.value) || 0)}
            className="w-full p-3 border rounded-lg text-black text-base"
            min="0"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Fill Time (min)</label>
          <input
            type="number"
            inputMode="decimal"
            value={fillTime || ''}
            onChange={(e) => setFillTime(parseFloat(e.target.value) || 0)}
            className="w-full p-3 border rounded-lg text-black text-base"
            min="0"
            placeholder="0"
          />
        </div>
      </div>

      <div
        className="p-3 rounded-lg"
        style={{
          backgroundColor: 'white',
          borderLeft: `4px solid ${colors.primary}`
        }}
      >
        <h3 className="font-bold mb-2" style={{color: colors.primary}}>Field Operations Estimates</h3>
        {calculateFieldOperations(fillVolume, applicationRate, acresPerFill, fieldSize, implementWidth, speed, fillTime, currentTime)}
      </div>
    </div>
  );
}
