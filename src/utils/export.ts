import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { MixData, Product } from '../types';
import {
  buildFieldLoads,
  calculateFieldAmount,
  calculateMixPlanning,
  formatOutput,
  formatPurchaseAmount,
  calculateAmount,
  isWeightUnit,
  mixLoadLabel,
} from './calculations';
import { displayProductName } from './productName';
import { buildMixLink } from './mixLink';

export interface ExportState {
  fillVolume: number;
  applicationRate: number;
  acresPerFill: number;
  fieldSize: number;
  implementWidth: number;
  speed: number;
  fillTime: number;
  products: Product[];
  splitMode: 'fullPlusPartial' | 'even';
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
    splitMode,
    currentTime
  } = state;

  let text = `AG SPRAY MIX CALCULATOR SUMMARY\n`;
  text += `=============================\n\n`;
  text += `MIX INFORMATION:\n`;
  text += `Fill Volume: ${fillVolume} gallons\n`;
  text += `Application Rate: ${applicationRate} GPA\n`;
  text += `Acres Per Fill: ${acresPerFill.toFixed(2)}\n\n`;

  // One block per load actually being mixed. Reading product.tankAmount here
  // would always report a full tank, which is wrong whenever the job ends on
  // a partial — and flatly wrong when the whole job is smaller than one tank.
  const loads = fieldSize
    ? buildFieldLoads(fieldSize, applicationRate, fillVolume, splitMode)
    : [];

  if (loads.length === 0) {
    text += `PRODUCTS TO ADD PER MIX:\n`;
    products.forEach((product, idx) => {
      text += `${displayProductName(product.name, idx)}: ${formatOutput(product.tankAmount, product.outputFormat, product.unit, product.jugSize ?? 128)}\n`;
    });
  } else {
    loads.forEach(load => {
      text += `PRODUCTS TO ADD — ${mixLoadLabel(load).toUpperCase()} (${load.volume.toFixed(1)} gal · ${load.acres.toFixed(2)} ac${load.count > 1 ? ' each' : ''}):\n`;
      products.forEach((product, idx) => {
        const amt = calculateAmount(product.rate, product.unit, load.volume, applicationRate);
        text += `${displayProductName(product.name, idx)}: ${formatOutput(amt, product.outputFormat, product.unit, product.jugSize ?? 128)}\n`;
      });
      text += `\n`;
    });
  }

  if (fieldSize) {
    const mixPlanning = calculateMixPlanning(fieldSize, applicationRate, fillVolume);
    if (mixPlanning) {
      text += `\nFIELD MIX PLANNING:\n`;
      text += `Field Size: ${fieldSize} acres\n`;
      text += `Total Spray Volume: ${mixPlanning.totalSprayNeeded.toFixed(0)} gallons\n`;

      if (splitMode === 'even') {
        const numTanks = Math.ceil(mixPlanning.totalSprayNeeded / fillVolume);
        const perTankVol = mixPlanning.totalSprayNeeded / numTanks;
        const perTankAcres = perTankVol / applicationRate;
        text += `Even Loads: ${numTanks} × ${perTankVol.toFixed(1)} gallons (${perTankAcres.toFixed(2)} acres each)\n`;
      } else {
        text += `Full Mixes Needed: ${mixPlanning.fullMixes}\n`;
        if (mixPlanning.hasPartialMix) {
          text += `Partial Mix: ${mixPlanning.remainingSpray.toFixed(1)} gallons for ${mixPlanning.remainingAcres.toFixed(2)} acres\n`;
        }
      }
    }

    text += `\nTOTAL PRODUCT QUANTITIES REQUIRED:\n`;
    products.forEach((product, idx) => {
      const totalAmount = calculateFieldAmount(product.rate, product.unit, fieldSize, applicationRate);
      const purchaseInfo = formatPurchaseAmount(totalAmount, product.unit, product.jugSize ?? 128);
      text += `${displayProductName(product.name, idx)}: ${purchaseInfo.display}\n`;
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

    text += `Working Rate: ${acresPerHour.toFixed(1)} acres/hour\n`;
    text += `Effective Rate (with filling): ${effectiveAcresPerHour.toFixed(1)} acres/hour\n`;
    text += `Mixes Needed: ${Math.ceil(tanksNeeded)} (${tanksNeeded.toFixed(1)})\n`;
    text += `Spray Time: ${formatHours(sprayHours)}\n`;
    text += `Total Fill Time: ${formatHours(totalFillTimeHours)}\n`;
    text += `Estimated Job Completion: ${formatHours(totalJobHours)}\n`;
    text += `Estimated Finish Time: ${formatETAText(completionTime)}\n`;
  }

  return text;
}

function formatHours(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours} hr ${minutes} min`;
}

function formatETAText(date: Date): string {
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
}

// Build a MixData object from an ExportState (used for the PDF re-load link)
export function exportStateToMixData(state: ExportState): MixData {
  return {
    fillVolume: state.fillVolume,
    applicationRate: state.applicationRate,
    products: state.products,
    fieldSize: state.fieldSize,
    implementWidth: state.implementWidth,
    speed: state.speed,
    fillTime: state.fillTime,
    splitMode: state.splitMode,
  };
}

// ---------- PDF generation (V3 refined: field-mixing reference sheet) ----------

const C = {
  primary: [73, 138, 90] as [number, number, number],
  primaryDark: [45, 104, 64] as [number, number, number],
  ink: [28, 41, 31] as [number, number, number],
  ink2: [68, 80, 74] as [number, number, number],
  muted: [141, 150, 141] as [number, number, number],
  lineStrong: [167, 176, 167] as [number, number, number],
  line: [215, 221, 215] as [number, number, number],
  divider: [237, 240, 237] as [number, number, number],
  noteBg: [246, 248, 245] as [number, number, number],
};

// Letter portrait, mm units
const PAGE_W = 215.9;
const PAGE_H = 279.4;
const MARGIN_X = 13;
const MARGIN_TOP = 13;
const FOOTER_HEIGHT = 22;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

// Application Record sits just above the footer; Field Operations sits just
// above the Application Record. Both are pinned to the bottom of the page.
const OPS_BOX_HEIGHT = 14;
const OPS_TOTAL_HEIGHT = OPS_BOX_HEIGHT + 5; // label + box
const APP_RECORD_HEIGHT = 8;
const APP_RECORD_TOP = PAGE_H - FOOTER_HEIGHT - APP_RECORD_HEIGHT - 1;
const OPS_TOP = APP_RECORD_TOP - OPS_TOTAL_HEIGHT - 4;

function setFillRGB(doc: jsPDF, c: [number, number, number]) { doc.setFillColor(c[0], c[1], c[2]); }
function setDrawRGB(doc: jsPDF, c: [number, number, number]) { doc.setDrawColor(c[0], c[1], c[2]); }
function setTextRGB(doc: jsPDF, c: [number, number, number]) { doc.setTextColor(c[0], c[1], c[2]); }

function formatNum(n: number): string {
  if (n === 0) return '0';
  if (Math.abs(n) < 0.1) return n.toFixed(2);
  if (Math.abs(n - Math.round(n)) < 0.05) return String(Math.round(n));
  return n.toFixed(1);
}

function formatWeightPdf(oz: number): string {
  if (oz >= 16) return `${formatNum(oz / 16)} lb`;
  return `${formatNum(oz)} oz`;
}

function formatJugSub(amountOz: number, jugSizeOz: number): string | null {
  if (jugSizeOz <= 0 || amountOz <= 0 || amountOz < jugSizeOz) return null;
  const jugGal = jugSizeOz / 128;
  const sizeLabel = `${formatNum(jugGal)} gal`;
  const fullJugs = Math.floor(amountOz / jugSizeOz);
  const remainder = parseFloat((amountOz % jugSizeOz).toFixed(1));
  if (remainder === 0) {
    if (fullJugs === 1) return `1 full jug (${sizeLabel})`;
    return `${fullJugs} full jugs (${sizeLabel} each)`;
  }
  const jugLabel = fullJugs === 1 ? 'jug' : 'jugs';
  return `${fullJugs} full ${jugLabel} (${sizeLabel}) + 1 partial (${remainder} fl oz)`;
}

// Clean primary amount + optional jug/bag sub-line for the V3 mix tables.
function formatV3(
  amountOz: number,
  format: string,
  unit: string,
  jugSizeOz: number,
): { primary: string; sub: string | null } {
  if (amountOz === 0) {
    return { primary: unit && isWeightUnit(unit) ? '0 oz' : '0 fl oz', sub: null };
  }
  if (unit && isWeightUnit(unit)) {
    return { primary: formatWeightPdf(amountOz), sub: null };
  }
  const totalGal = amountOz / 128;
  let primary: string;
  switch (format) {
    case 'floz':
      primary = `${formatNum(amountOz)} fl oz`;
      break;
    case 'gal':
      primary = `${formatNum(totalGal)} gal`;
      break;
    case 'gal_oz': {
      const g = Math.floor(amountOz / 128);
      const ozR = parseFloat((amountOz % 128).toFixed(1));
      primary = ozR === 0 ? `${g} gal` : `${g} gal ${ozR} fl oz`;
      break;
    }
    case 'qt':
      primary = `${formatNum(amountOz / 32)} qt`;
      break;
    case 'pt':
      primary = `${formatNum(amountOz / 16)} pt`;
      break;
    case 'cups':
      primary = `${formatNum(amountOz / 8)} cups`;
      break;
    case 'auto':
    default: {
      if (amountOz < 256) {
        primary = `${formatNum(amountOz)} fl oz`;
      } else {
        const g = Math.floor(amountOz / 128);
        const ozR = parseFloat((amountOz % 128).toFixed(1));
        primary = ozR === 0 ? `${g} gal` : `${g} gal ${ozR} fl oz`;
      }
    }
  }
  return { primary, sub: formatJugSub(amountOz, jugSizeOz) };
}

function formatGeneratedDate(d: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} · ${h}:${m} ${ampm}`;
}

// ----- header: brand + setup line + generated date + heavy underline -----
function drawHeader(
  doc: jsPDF,
  state: ExportState,
  planning: ReturnType<typeof calculateMixPlanning>,
  generatedAt: Date,
): number {
  const baseY = MARGIN_TOP + 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  setTextRGB(doc, C.ink);
  doc.text('Spray', MARGIN_X, baseY);
  const wSpray = doc.getTextWidth('Spray');
  setTextRGB(doc, C.primary);
  doc.text('Calc', MARGIN_X + wSpray, baseY);
  const wCalc = doc.getTextWidth('Calc');
  setTextRGB(doc, C.ink);
  doc.text(' Mix Report', MARGIN_X + wSpray + wCalc, baseY);

  // The setup line: tank / GPA / ac-per-fill / field / total — the V3 idea
  // is that these numbers live ONCE, here, not in a redundant band below.
  const subBits: string[] = [
    `${formatNum(state.fillVolume)} gal tank`,
    `${formatNum(state.applicationRate)} GPA`,
  ];
  if (state.acresPerFill > 0) subBits.push(`${formatNum(state.acresPerFill)} ac/fill`);
  if (state.fieldSize > 0) {
    subBits.push(`${formatNum(state.fieldSize)} ac field`);
    if (planning) subBits.push(`${formatNum(planning.totalSprayNeeded)} gal total`);
  }
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  setTextRGB(doc, C.ink2);
  doc.text(subBits.join(' · '), MARGIN_X, baseY + 4.8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  setTextRGB(doc, C.muted);
  doc.text('Generated', PAGE_W - MARGIN_X, baseY - 2, { align: 'right' });
  doc.text(formatGeneratedDate(generatedAt), PAGE_W - MARGIN_X, baseY + 1.5, { align: 'right' });

  setDrawRGB(doc, C.ink);
  doc.setLineWidth(0.6);
  doc.line(MARGIN_X, baseY + 7.8, PAGE_W - MARGIN_X, baseY + 7.8);

  return baseY + 12;
}

function drawSeclabel(
  doc: jsPDF,
  x: number,
  y: number,
  label: string,
  smallText?: string,
  color: [number, number, number] = C.primaryDark,
): void {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  setTextRGB(doc, color);
  const upper = label.toUpperCase();
  doc.text(upper, x, y);
  if (smallText) {
    const w = doc.getTextWidth(upper);
    doc.setFont('courier', 'normal');
    doc.setFontSize(7.5);
    setTextRGB(doc, C.muted);
    doc.text(smallText, x + w + 2.5, y);
  }
}

// ----- mix table: product / [rate] / amount, with jug sub-line under the amount -----
function drawMixTable(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  products: Product[],
  showRate: boolean,
  amountFor: (p: Product) => { primary: string; sub: string | null },
): number {
  let colA: number;
  let colR: number;
  let colP: number;
  if (showRate) {
    colA = Math.min(40, width * 0.34);
    colR = Math.min(26, width * 0.22);
    colP = width - colA - colR;
  } else {
    colA = Math.min(38, width * 0.46);
    colR = 0;
    colP = width - colA;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  setTextRGB(doc, C.muted);
  doc.text('PRODUCT', x + 2, y);
  if (showRate) doc.text('RATE', x + colP + 2, y);
  doc.text(showRate ? 'PER MIX' : 'AMOUNT', x + width - 2, y, { align: 'right' });

  setDrawRGB(doc, C.lineStrong);
  doc.setLineWidth(0.4);
  doc.line(x, y + 1.5, x + width, y + 1.5);
  y += 4.5;

  products.forEach((p, i) => {
    const parts = amountFor(p);
    const nameLines = doc.splitTextToSize(displayProductName(p.name, i), colP - 4) as string[];
    const nameLineCount = Math.min(nameLines.length, 2);
    const nameH = nameLineCount * 3.5 + 2.5;
    const amtH = parts.sub ? 8.5 : 5.5;
    const rowH = Math.max(nameH, amtH);
    const rowTop = y;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    setTextRGB(doc, C.ink);
    nameLines.slice(0, 2).forEach((ln, lnIdx) => {
      doc.text(ln, x + 2, rowTop + 3.5 + lnIdx * 3.5);
    });

    if (showRate) {
      doc.setFont('courier', 'normal');
      doc.setFontSize(7.5);
      setTextRGB(doc, C.ink2);
      doc.text(`${p.rate} ${p.unit}`, x + colP + 2, rowTop + 3.5);
    }

    doc.setFont('courier', 'bold');
    doc.setFontSize(10);
    setTextRGB(doc, C.primaryDark);
    doc.text(parts.primary, x + width - 2, rowTop + 3.5, { align: 'right' });

    if (parts.sub) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      setTextRGB(doc, C.muted);
      doc.text(parts.sub, x + width - 2, rowTop + 7, { align: 'right' });
    }

    y = rowTop + rowH;

    if (i < products.length - 1) {
      setDrawRGB(doc, C.divider);
      doc.setLineWidth(0.15);
      doc.line(x, y - 0.4, x + width, y - 0.4);
    }
  });
  return y;
}

function drawNoPartialNote(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  fullMixes: number,
): number {
  const padY = 4;
  const padX = 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const text = `Field divides evenly into ${fullMixes} full mix${fullMixes === 1 ? '' : 'es'} — no partial tank needed.`;
  const lines = doc.splitTextToSize(text, width - padX * 2) as string[];
  const h = padY * 2 + lines.length * 4;
  setFillRGB(doc, C.noteBg);
  setDrawRGB(doc, C.lineStrong);
  doc.setLineWidth(0.3);
  doc.setLineDashPattern([1.2, 1.2], 0);
  doc.roundedRect(x, y, width, h, 1, 1, 'FD');
  doc.setLineDashPattern([], 0);
  setTextRGB(doc, C.ink2);
  lines.forEach((line, i) => {
    doc.text(line, x + padX, y + padY + 3 + i * 4);
  });
  return y + h;
}

function drawApplicationRecord(doc: jsPDF): void {
  const y = APP_RECORD_TOP;
  drawSeclabel(doc, MARGIN_X, y, 'Application record');
  const lineY = y + 5;
  const fields = ['Applicator', 'Date applied', 'Wind / weather'];
  const gap = 9;
  const colW = (CONTENT_W - gap * (fields.length - 1)) / fields.length;
  fields.forEach((label, i) => {
    const x = MARGIN_X + i * (colW + gap);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    setTextRGB(doc, C.muted);
    doc.text(label, x, lineY + 4);
    const lblW = doc.getTextWidth(label);
    setDrawRGB(doc, C.line);
    doc.setLineWidth(0.3);
    doc.line(x + lblW + 2.5, lineY + 4.5, x + colW, lineY + 4.5);
  });
}

// ----- pinned bottom strip: field operations as quiet, secondary numbers -----
function drawFieldOpsStrip(doc: jsPDF, state: ExportState): void {
  const { fieldSize, implementWidth, speed, fillTime, acresPerFill, currentTime } = state;
  if (!(fieldSize && implementWidth && speed)) return;

  const acresPerHour = speed * implementWidth * 0.1212;
  const tanksNeeded = acresPerFill > 0 ? fieldSize / acresPerFill : 0;
  const sprayHours = fieldSize / acresPerHour;
  const totalFillTimeHours = (fillTime / 60) * tanksNeeded;
  const totalJobHours = sprayHours + totalFillTimeHours;
  const completionTime = new Date(currentTime.getTime() + totalJobHours * 60 * 60 * 1000);

  const cells: Array<{ k: string; v: string; green?: boolean }> = [
    { k: 'Working rate', v: `${acresPerHour.toFixed(1)} ac/hr` },
    { k: 'Mixes needed', v: `${Math.ceil(tanksNeeded)} (${tanksNeeded.toFixed(1)})` },
    { k: 'Spray time', v: formatHours(sprayHours) },
    { k: 'Total job', v: formatHours(totalJobHours), green: true },
    { k: 'Finish (est.)', v: formatETAText(completionTime) },
  ];

  drawSeclabel(doc, MARGIN_X, OPS_TOP, 'Field operations', undefined, C.ink2);

  const boxY = OPS_TOP + 3;
  setDrawRGB(doc, C.line);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN_X, boxY, CONTENT_W, OPS_BOX_HEIGHT, 1, 1, 'D');

  const cellW = CONTENT_W / cells.length;
  cells.forEach((cell, i) => {
    const cx = MARGIN_X + i * cellW;
    if (i > 0) {
      setDrawRGB(doc, C.line);
      doc.setLineWidth(0.3);
      doc.line(cx, boxY, cx, boxY + OPS_BOX_HEIGHT);
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    setTextRGB(doc, C.muted);
    doc.text(cell.k.toUpperCase(), cx + 3, boxY + 4);
    doc.setFont('courier', 'bold');
    doc.setFontSize(9);
    setTextRGB(doc, cell.green ? C.primaryDark : C.ink);
    const valLines = doc.splitTextToSize(cell.v, cellW - 4) as string[];
    doc.text(valLines[0] ?? cell.v, cx + 3, boxY + 10.5);
  });
}

// ----- footer: disclaimer + QR (no printed URL) -----
function drawFooter(doc: jsPDF, qrDataUrl: string | null, tooLarge: boolean): void {
  const footerTop = PAGE_H - FOOTER_HEIGHT + 2;
  setDrawRGB(doc, C.line);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_X, footerTop, PAGE_W - MARGIN_X, footerTop);

  const qrSize = 13;
  const qrX = PAGE_W - MARGIN_X - qrSize;
  const qrY = footerTop + 3;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  setTextRGB(doc, C.muted);
  const disc = 'Always verify calculations against product labels and follow all safety guidelines. SprayCalc is a planning tool only.';
  const capW = 22;
  const discMaxW = qrX - MARGIN_X - capW - 6;
  const discLines = doc.splitTextToSize(disc, discMaxW) as string[];
  discLines.slice(0, 3).forEach((ln, i) => {
    doc.text(ln, MARGIN_X, footerTop + 5.5 + i * 3);
  });

  if (qrDataUrl && !tooLarge) {
    try {
      doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
    } catch (err) {
      // ignore
    }
  } else if (tooLarge) {
    setDrawRGB(doc, C.lineStrong);
    doc.setLineWidth(0.3);
    doc.rect(qrX, qrY, qrSize, qrSize, 'D');
    doc.setFontSize(6);
    setTextRGB(doc, C.muted);
    doc.text('mix too large', qrX + qrSize / 2, qrY + qrSize / 2 + 1, { align: 'center' });
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  setTextRGB(doc, C.primaryDark);
  const caption = 'Scan to re-open\nthis mix';
  caption.split('\n').forEach((ln, i) => {
    doc.text(ln, qrX - 2, qrY + 4 + i * 3, { align: 'right' });
  });
}

function buildFilename(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  return `SprayCalc-${yyyy}-${mm}-${dd}-${hh}${mi}.pdf`;
}

// Export summary as a real PDF download
export async function exportPDF(state: ExportState): Promise<void> {
  const doc = new jsPDF({ unit: 'mm', format: 'letter', orientation: 'portrait' });

  const link = buildMixLink(exportStateToMixData(state));
  let qrDataUrl: string | null = null;
  if (!link.tooLarge) {
    try {
      qrDataUrl = await QRCode.toDataURL(link.url, {
        margin: 1,
        scale: 6,
        errorCorrectionLevel: 'M',
        color: { dark: '#1c291f', light: '#ffffff' },
      });
    } catch (err) {
      console.warn('Failed to generate QR code:', err);
    }
  }

  const planning = state.fieldSize
    ? calculateMixPlanning(state.fieldSize, state.applicationRate, state.fillVolume)
    : null;

  let y = drawHeader(doc, state, planning, new Date());
  y += 4;

  if (state.products.length > 0) {
    if (planning && state.splitMode !== 'even') {
      if (planning.fullMixes === 0 && planning.hasPartialMix) {
        // Only a partial tank needed — render a single full-width partial mix table
        const partialSmall = `× 1 · ${formatNum(planning.remainingSpray)} gal · ${planning.remainingAcres.toFixed(1)} ac`;
        drawSeclabel(doc, MARGIN_X, y, 'Partial mix', partialSmall);
        y += 5;
        y = drawMixTable(doc, MARGIN_X, y, CONTENT_W, state.products, false, (p) => {
          const amt = calculateAmount(p.rate, p.unit, planning.remainingSpray, state.applicationRate);
          return formatV3(amt, p.outputFormat, p.unit, p.jugSize ?? 128);
        });
        y += 8;
      } else {
        // Side-by-side full + partial mix tables
        const gap = 7;
        const leftW = (CONTENT_W - gap) * 0.6;
        const rightW = (CONTENT_W - gap) - leftW;
        const leftX = MARGIN_X;
        const rightX = MARGIN_X + leftW + gap;

        drawSeclabel(
          doc,
          leftX,
          y,
          'Full mix',
          `× ${planning.fullMixes} · ${formatNum(state.fillVolume)} gal each`,
        );
        const partialSmall = planning.hasPartialMix
          ? `× 1 · ${formatNum(planning.remainingSpray)} gal · ${planning.remainingAcres.toFixed(1)} ac`
          : '';
        drawSeclabel(doc, rightX, y, 'Partial mix', partialSmall);
        y += 5;

        const leftEnd = drawMixTable(doc, leftX, y, leftW, state.products, true, (p) =>
          formatV3(p.tankAmount, p.outputFormat, p.unit, p.jugSize ?? 128),
        );

        let rightEnd: number;
        if (planning.hasPartialMix) {
          rightEnd = drawMixTable(doc, rightX, y, rightW, state.products, false, (p) => {
            const amt = calculateAmount(p.rate, p.unit, planning.remainingSpray, state.applicationRate);
            return formatV3(amt, p.outputFormat, p.unit, p.jugSize ?? 128);
          });
        } else {
          rightEnd = drawNoPartialNote(doc, rightX, y, rightW, planning.fullMixes);
        }

        y = Math.max(leftEnd, rightEnd) + 8;
      }
    } else if (planning && state.splitMode === 'even') {
      const numTanks = Math.ceil(planning.totalSprayNeeded / state.fillVolume);
      const perTankVol = planning.totalSprayNeeded / numTanks;
      const perTankAc = perTankVol / state.applicationRate;
      drawSeclabel(
        doc,
        MARGIN_X,
        y,
        'Mix',
        `× ${numTanks} · ${formatNum(perTankVol)} gal · ${perTankAc.toFixed(1)} ac each`,
      );
      y += 5;
      y = drawMixTable(doc, MARGIN_X, y, CONTENT_W, state.products, true, (p) => {
        const amt = calculateAmount(p.rate, p.unit, perTankVol, state.applicationRate);
        return formatV3(amt, p.outputFormat, p.unit, p.jugSize ?? 128);
      });
      y += 8;
    } else {
      // Tank-only mode: no field, just per-mix amounts
      drawSeclabel(doc, MARGIN_X, y, 'Full mix', `${formatNum(state.fillVolume)} gal`);
      y += 5;
      y = drawMixTable(doc, MARGIN_X, y, CONTENT_W, state.products, true, (p) =>
        formatV3(p.tankAmount, p.outputFormat, p.unit, p.jugSize ?? 128),
      );
      y += 8;
    }
  }

  drawFieldOpsStrip(doc, state);

  drawApplicationRecord(doc);

  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    drawFooter(doc, qrDataUrl, link.tooLarge);
  }

  doc.save(buildFilename(new Date()));
}

// Build a shareable payload for the share button — caller decides how to use
export function buildSharePayload(state: ExportState): { title: string; text: string; url: string; tooLarge: boolean } {
  const link = buildMixLink(exportStateToMixData(state));
  const text = generateSummaryText(state);
  return {
    title: 'SprayCalc Mix',
    text,
    url: link.url,
    tooLarge: link.tooLarge,
  };
}
