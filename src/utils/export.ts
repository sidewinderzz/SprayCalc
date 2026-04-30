import { Product } from '../types';
import {
  calculateFieldAmount,
  calculateMixPlanning,
  formatOutput,
  formatPurchaseAmount,
  calculateAmount
} from './calculations';

export interface ExportState {
  fillVolume: number;
  applicationRate: number;
  acresPerFill: number;
  fieldSize: number;
  implementWidth: number;
  speed: number;
  fillTime: number;
  products: Product[];
  currentTime: Date;
}

// Generate summary text for clipboard / share
export function generateSummaryText(state: ExportState): string {
  const {
    fillVolume,
    applicationRate,
    acresPerFill,
    fieldSize,
    implementWidth,
    speed,
    fillTime,
    products,
    currentTime
  } = state;

  let text = `AG SPRAY MIX CALCULATOR SUMMARY\n`;
  text += `=============================\n\n`;
  text += `MIX INFORMATION:\n`;
  text += `Fill Volume: ${fillVolume} gallons\n`;
  text += `Application Rate: ${applicationRate} GPA\n`;
  text += `Acres Per Fill: ${acresPerFill.toFixed(2)}\n\n`;

  text += `PRODUCTS TO ADD PER MIX:\n`;
  products.forEach(product => {
    text += `${product.name}: ${formatOutput(product.tankAmount, product.outputFormat, product.unit, product.jugSize ?? 128)}\n`;
  });

  if (fieldSize) {
    const mixPlanning = calculateMixPlanning(fieldSize, applicationRate, fillVolume);
    if (mixPlanning) {
      text += `\nFIELD MIX PLANNING:\n`;
      text += `Field Size: ${fieldSize} acres\n`;
      text += `Total Spray Volume: ${mixPlanning.totalSprayNeeded.toFixed(0)} gallons\n`;
      text += `Full Mixes Needed: ${mixPlanning.fullMixes}\n`;

      if (mixPlanning.hasPartialMix) {
        text += `Partial Mix: ${mixPlanning.remainingSpray.toFixed(1)} gallons for ${mixPlanning.remainingAcres.toFixed(2)} acres\n`;
        text += `\nPRODUCTS FOR PARTIAL MIX:\n`;
        products.forEach(product => {
          const partialAmount = calculateAmount(
            product.rate,
            product.unit,
            mixPlanning.remainingSpray,
            applicationRate
          );
          text += `${product.name}: ${formatOutput(partialAmount, product.outputFormat, product.unit, product.jugSize ?? 128)}\n`;
        });
      }
    }

    text += `\nTOTAL PRODUCT QUANTITIES REQUIRED:\n`;
    products.forEach(product => {
      const totalAmount = calculateFieldAmount(product.rate, product.unit, fieldSize, applicationRate);
      const purchaseInfo = formatPurchaseAmount(totalAmount, product.unit, product.jugSize ?? 128);
      text += `${product.name}: ${purchaseInfo.display}\n`;
      if (purchaseInfo.containers.length > 0) {
        text += `  Suggested: ${purchaseInfo.containers[0].display}\n`;
      }
    });
  }

  if (fieldSize && implementWidth && speed) {
    text += `\nFIELD OPERATIONS:\n`;
    text += `Implement Width: ${implementWidth} ft\n`;
    text += `Speed: ${speed} mph\n`;
    text += `Fill Time: ${fillTime} minutes\n\n`;

    const acresPerHour = speed * implementWidth * 0.1212;
    const tanksNeeded = fieldSize / acresPerFill;
    const sprayHours = fieldSize / acresPerHour;
    const totalFillTimeHours = (fillTime / 60) * tanksNeeded;
    const totalJobHours = sprayHours + totalFillTimeHours;
    const effectiveAcresPerHour = fieldSize / totalJobHours;

    const completionTime = new Date(currentTime.getTime() + totalJobHours * 60 * 60 * 1000);

    const formatTime = (hours: number) => {
      const wholeHours = Math.floor(hours);
      const minutes = Math.round((hours - wholeHours) * 60);
      return `${wholeHours} hr ${minutes} min`;
    };

    const formatETAText = (date: Date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      let dayPrefix = '';

      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        dayPrefix = 'Today at ';
      } else if (
        date.getDate() === tomorrow.getDate() &&
        date.getMonth() === tomorrow.getMonth() &&
        date.getFullYear() === tomorrow.getFullYear()
      ) {
        dayPrefix = 'Tomorrow at ';
      } else {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        dayPrefix = `${days[date.getDay()]} at `;
      }

      return `${dayPrefix}${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    text += `Working Rate: ${acresPerHour.toFixed(1)} acres/hour\n`;
    text += `Effective Rate (with filling): ${effectiveAcresPerHour.toFixed(1)} acres/hour\n`;
    text += `Mixes Needed: ${Math.ceil(tanksNeeded)} (${tanksNeeded.toFixed(1)})\n`;
    text += `Spray Time: ${formatTime(sprayHours)}\n`;
    text += `Total Fill Time: ${formatTime(totalFillTimeHours)}\n`;
    text += `Estimated Job Completion: ${formatTime(totalJobHours)}\n`;
    text += `Estimated Finish Time: ${formatETAText(completionTime)}\n`;
  }

  return text;
}

// Escape user-controlled values before interpolating into the print HTML
function escapeHtml(value: string | number): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Export summary as PDF via print dialog
export function exportPDF(state: ExportState): void {
  const {
    fillVolume,
    applicationRate,
    acresPerFill,
    fieldSize,
    products
  } = state;

  const mixPlanning = calculateMixPlanning(fieldSize, applicationRate, fillVolume);

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>SprayCalc Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; color: #1c291f; padding: 24px; }
    h1 { font-size: 20px; color: #498a5a; margin-bottom: 4px; }
    .meta { font-size: 11px; color: #76a886; margin-bottom: 20px; }
    section { margin-bottom: 18px; }
    h2 { font-size: 13px; font-weight: 700; color: #2d6840; border-bottom: 2px solid #498a5a; padding-bottom: 4px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em; }
    h3 { font-size: 12px; font-weight: 700; color: #498a5a; margin-bottom: 6px; }
    .grid { display: grid; gap: 10px; }
    .grid-2 { grid-template-columns: 1fr 1fr; }
    .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
    .card { border: 1px solid #c8dece; border-radius: 6px; overflow: hidden; }
    .card-header { background: #e8f3eb; padding: 6px 10px; }
    .card-header.yellow { background: #f7f1c4; border-color: #d1c343; }
    .card-body { padding: 6px 10px; }
    .row { display: flex; justify-content: space-between; align-items: center; padding: 2px 0; border-bottom: 1px solid #f0f0f0; }
    .row:last-child { border-bottom: none; }
    .label { color: #2d6840; }
    .value { font-weight: 700; color: #1c291f; }
    .big-value { font-size: 17px; font-weight: 700; color: #1c291f; }
    .sub { font-size: 11px; color: #76a886; margin-top: 2px; }
    .chip { display: inline-block; background: #e8f3eb; border-radius: 20px; padding: 2px 8px; font-size: 11px; margin-right: 4px; }
    .star { color: #b2a529; }
    .option-row { font-size: 11px; display: flex; justify-content: space-between; padding: 1px 0; }
    .best { font-weight: 600; }
    .footer { margin-top: 24px; font-size: 10px; color: #76a886; border-top: 1px solid #c8dece; padding-top: 8px; }
    .rates-strip { margin-top: -8px; margin-bottom: 18px; }
    .rates-strip .strip-heading { font-size: 10px; font-weight: 600; color: #76a886; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
    .rates-strip ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 4px 14px; font-size: 11px; color: #2d6840; }
    .rates-strip li { display: inline-flex; align-items: baseline; gap: 4px; }
    .rates-strip li .name { font-weight: 600; color: #1c291f; }
    .rates-strip li .rate { color: #498a5a; }
    @media print { body { padding: 12px; } }
  </style>
</head>
<body>
  <h1>Spray Calc Report</h1>
  <div class="meta">Generated ${new Date().toLocaleString()}</div>

  <section>
    <h2>Mix Information</h2>
    <div class="grid grid-3">
      <div class="card"><div class="card-header"><div class="label">Fill Volume</div><div class="big-value">${fillVolume} gal</div></div></div>
      <div class="card"><div class="card-header"><div class="label">Application Rate</div><div class="big-value">${applicationRate} GPA</div></div></div>
      <div class="card"><div class="card-header"><div class="label">Acres Per Fill</div><div class="big-value">${acresPerFill.toFixed(2)} ac</div></div></div>
    </div>
  </section>

  ${products.length > 0 ? `
  <section class="rates-strip">
    <div class="strip-heading">Rates As Entered</div>
    <ul>
      ${products.map(p => `<li><span class="name">${escapeHtml(p.name)}</span><span>—</span><span class="rate">${escapeHtml(p.rate)} ${escapeHtml(p.unit)}</span></li>`).join('')}
    </ul>
  </section>
  ` : ''}

  <section>
    <h2>Products Per Mix</h2>
    <div class="grid grid-3">
      ${products.map(p => `<div class="card"><div class="card-header"><div class="label">${escapeHtml(p.name)}</div><div class="big-value">${escapeHtml(formatOutput(p.tankAmount, p.outputFormat, p.unit, p.jugSize ?? 128))}</div></div></div>`).join('')}
    </div>
  </section>

  ${mixPlanning ? `
  <section>
    <h2>Field Overview</h2>
    <div style="margin-bottom:10px">
      <span class="chip">${fieldSize} acres</span>
      <span class="chip">${mixPlanning.totalSprayNeeded.toFixed(0)} gal total</span>
      <span class="chip">${mixPlanning.fullMixes} full mix${mixPlanning.fullMixes !== 1 ? 'es' : ''}</span>
      ${mixPlanning.hasPartialMix ? `<span class="chip">1 partial (${mixPlanning.remainingSpray.toFixed(1)} gal / ${mixPlanning.remainingAcres.toFixed(2)} ac)</span>` : '<span class="chip" style="background:#e8f3eb;color:#498a5a">✓ No partial mix</span>'}
    </div>
  </section>

  <section>
    <h2>What to Buy</h2>
    <div class="grid grid-3">
      ${products.map(p => {
        const totalOz = calculateFieldAmount(p.rate, p.unit, fieldSize, applicationRate);
        const info = formatPurchaseAmount(totalOz, p.unit, p.jugSize ?? 128);
        return `<div class="card">
          <div class="card-header yellow"><div class="label">${escapeHtml(p.name)}</div><div class="big-value">${escapeHtml(info.display)}</div></div>
          <div class="card-body">
            ${info.containers.slice(0,2).map((c,i) => `<div class="option-row ${i===0?'best':''}"><span>${i===0?'<span class="star">★</span> ':''}${escapeHtml(c.display)}</span><span>${c.wastePercent.toFixed(0)}% waste</span></div>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>
  </section>

  <section>
    <h2>Per Mix Amounts</h2>
    <div class="grid grid-2">
      <div class="card">
        <div class="card-header"><h3>Full Mix × ${mixPlanning.fullMixes}</h3><div class="sub">${fillVolume} gal · ${acresPerFill.toFixed(2)} acres each</div></div>
        <div class="card-body">
          ${products.map(p => `<div class="row"><span class="label">${escapeHtml(p.name)}</span><span class="value">${escapeHtml(formatOutput(p.tankAmount, p.outputFormat, p.unit, p.jugSize ?? 128))}</span></div>`).join('')}
        </div>
      </div>
      ${mixPlanning.hasPartialMix ? `
      <div class="card">
        <div class="card-header yellow"><h3 style="color:#b2a529">Partial Mix × 1</h3><div class="sub">${mixPlanning.remainingSpray.toFixed(1)} gal · ${mixPlanning.remainingAcres.toFixed(2)} acres</div></div>
        <div class="card-body">
          ${products.map(p => { const amt = calculateAmount(p.rate, p.unit, mixPlanning.remainingSpray, applicationRate); return `<div class="row"><span class="label">${escapeHtml(p.name)}</span><span class="value">${escapeHtml(formatOutput(amt, p.outputFormat, p.unit, p.jugSize ?? 128))}</span></div>`; }).join('')}
        </div>
      </div>` : ''}
    </div>
  </section>
  ` : ''}

  <div class="footer">Always verify calculations against product labels and follow all safety guidelines. SprayCalc — planning tool only.</div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); }, 400);
}
