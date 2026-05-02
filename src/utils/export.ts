import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import { MixData, Product } from '../types';
import {
  calculateFieldAmount,
  calculateMixPlanning,
  formatOutput,
  formatPurchaseAmount,
  calculateAmount
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
  products.forEach((product, idx) => {
    text += `${displayProductName(product.name, idx)}: ${formatOutput(product.tankAmount, product.outputFormat, product.unit, product.jugSize ?? 128)}\n`;
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
        products.forEach((product, idx) => {
          const partialAmount = calculateAmount(
            product.rate,
            product.unit,
            mixPlanning.remainingSpray,
            applicationRate
          );
          text += `${displayProductName(product.name, idx)}: ${formatOutput(partialAmount, product.outputFormat, product.unit, product.jugSize ?? 128)}\n`;
        });
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
  };
}

// ---------- PDF generation ----------

// Theme colors (sourced from src/types.ts colors)
const C = {
  primary: [73, 138, 90] as [number, number, number],
  primaryDark: [45, 104, 64] as [number, number, number],
  primaryLight: [118, 168, 134] as [number, number, number],
  primaryBg: [232, 243, 235] as [number, number, number],
  secondary: [209, 195, 67] as [number, number, number],
  secondaryDark: [178, 165, 41] as [number, number, number],
  secondaryBg: [247, 241, 196] as [number, number, number],
  border: [200, 222, 206] as [number, number, number],
  text: [28, 41, 31] as [number, number, number],
  muted: [118, 168, 134] as [number, number, number],
  divider: [220, 230, 222] as [number, number, number],
};

// Letter portrait, mm units
const PAGE_W = 215.9;
const PAGE_H = 279.4;
const MARGIN_X = 14;
const MARGIN_TOP = 16;
const FOOTER_HEIGHT = 36; // reserved at bottom for QR/footer
const CONTENT_BOTTOM = PAGE_H - FOOTER_HEIGHT;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

function setFillRGB(doc: jsPDF, c: [number, number, number]) {
  doc.setFillColor(c[0], c[1], c[2]);
}
function setDrawRGB(doc: jsPDF, c: [number, number, number]) {
  doc.setDrawColor(c[0], c[1], c[2]);
}
function setTextRGB(doc: jsPDF, c: [number, number, number]) {
  doc.setTextColor(c[0], c[1], c[2]);
}

function ensureSpace(doc: jsPDF, cursorY: number, needed: number): number {
  if (cursorY + needed > CONTENT_BOTTOM) {
    doc.addPage();
    return MARGIN_TOP;
  }
  return cursorY;
}

function drawSectionHeading(doc: jsPDF, cursorY: number, title: string): number {
  cursorY = ensureSpace(doc, cursorY, 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  setTextRGB(doc, C.primaryDark);
  doc.text(title.toUpperCase(), MARGIN_X, cursorY);
  // underline
  setDrawRGB(doc, C.primary);
  doc.setLineWidth(0.6);
  doc.line(MARGIN_X, cursorY + 1.4, MARGIN_X + CONTENT_W, cursorY + 1.4);
  return cursorY + 6;
}

interface KpiBox {
  label: string;
  value: string;
}

function drawKpiRow(doc: jsPDF, cursorY: number, boxes: KpiBox[]): number {
  const gap = 4;
  const w = (CONTENT_W - gap * (boxes.length - 1)) / boxes.length;
  const h = 16;
  cursorY = ensureSpace(doc, cursorY, h);
  boxes.forEach((box, i) => {
    const x = MARGIN_X + i * (w + gap);
    setFillRGB(doc, C.primaryBg);
    setDrawRGB(doc, C.border);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, cursorY, w, h, 1.6, 1.6, 'FD');
    setTextRGB(doc, C.primaryDark);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(box.label.toUpperCase(), x + 3, cursorY + 5);
    setTextRGB(doc, C.text);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(box.value, x + 3, cursorY + 12);
  });
  return cursorY + h + 4;
}

function drawHeader(doc: jsPDF, generatedAt: Date): number {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  setTextRGB(doc, C.primary);
  doc.text('SprayCalc Mix Report', MARGIN_X, MARGIN_TOP);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  setTextRGB(doc, C.muted);
  doc.text(`Generated ${generatedAt.toLocaleString()}`, MARGIN_X, MARGIN_TOP + 5);

  // accent bar
  setFillRGB(doc, C.primary);
  doc.rect(MARGIN_X, MARGIN_TOP + 8, CONTENT_W, 0.8, 'F');

  return MARGIN_TOP + 13;
}

function drawRatesAsEntered(doc: jsPDF, cursorY: number, products: Product[]): number {
  if (!products.length) return cursorY;
  cursorY = ensureSpace(doc, cursorY, 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  setTextRGB(doc, C.muted);
  doc.text('RATES AS ENTERED', MARGIN_X, cursorY);
  cursorY += 4;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  setTextRGB(doc, C.text);

  const lineHeight = 4.2;
  let x = MARGIN_X;
  let y = cursorY;
  products.forEach((p, i) => {
    const name = displayProductName(p.name, i);
    const rateStr = `${p.rate} ${p.unit}`;
    const segment = `${name} — ${rateStr}`;
    const w = doc.getTextWidth(segment) + 6;
    if (x + w > MARGIN_X + CONTENT_W) {
      x = MARGIN_X;
      y += lineHeight;
      y = ensureSpace(doc, y, lineHeight);
    }
    doc.setFont('helvetica', 'bold');
    setTextRGB(doc, C.text);
    doc.text(name, x, y);
    const nameW = doc.getTextWidth(name);
    doc.setFont('helvetica', 'normal');
    setTextRGB(doc, C.muted);
    doc.text(' — ', x + nameW, y);
    setTextRGB(doc, C.primary);
    doc.text(rateStr, x + nameW + doc.getTextWidth(' — '), y);
    x += w;
  });
  return y + 6;
}

function runAutoTable(
  doc: jsPDF,
  cursorY: number,
  head: string[][],
  body: (string | number)[][],
  options: {
    headFill?: [number, number, number];
    columnStyles?: Record<number, { halign?: 'left' | 'center' | 'right'; cellWidth?: number | 'auto' | 'wrap' }>;
  } = {}
): number {
  const headFill = options.headFill ?? C.primary;
  autoTable(doc, {
    startY: cursorY,
    head,
    body: body as (string | number)[][],
    margin: { left: MARGIN_X, right: MARGIN_X, bottom: FOOTER_HEIGHT },
    styles: {
      font: 'helvetica',
      fontSize: 9,
      cellPadding: 2.2,
      textColor: C.text,
      lineColor: C.border,
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: headFill,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5,
      halign: 'left',
    },
    alternateRowStyles: { fillColor: [248, 251, 249] },
    columnStyles: options.columnStyles,
    theme: 'grid',
  });
  // @ts-expect-error - lastAutoTable is added at runtime by jspdf-autotable
  return doc.lastAutoTable.finalY + 5;
}

function drawProductsPerMix(doc: jsPDF, cursorY: number, products: Product[]): number {
  cursorY = drawSectionHeading(doc, cursorY, 'Products Per Mix');
  const body = products.map((p, i) => {
    const name = displayProductName(p.name, i);
    const amount = formatOutput(p.tankAmount, p.outputFormat, p.unit, p.jugSize ?? 128);
    return [name, `${p.rate} ${p.unit}`, amount];
  });
  return runAutoTable(doc, cursorY, [['Product', 'Rate', 'Per Mix Amount']], body, {
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 45 },
      2: { cellWidth: 'auto', halign: 'right' },
    },
  });
}

function drawFieldOverview(
  doc: jsPDF,
  cursorY: number,
  state: ExportState
): number {
  const planning = calculateMixPlanning(state.fieldSize, state.applicationRate, state.fillVolume);
  if (!planning) return cursorY;

  cursorY = drawSectionHeading(doc, cursorY, 'Field Overview');

  const chips = [
    `${state.fieldSize} acres`,
    `${planning.totalSprayNeeded.toFixed(0)} gal total`,
    `${planning.fullMixes} full mix${planning.fullMixes !== 1 ? 'es' : ''}`,
  ];
  if (planning.hasPartialMix) {
    chips.push(`1 partial (${planning.remainingSpray.toFixed(1)} gal / ${planning.remainingAcres.toFixed(2)} ac)`);
  } else {
    chips.push('No partial mix');
  }

  const chipH = 7;
  cursorY = ensureSpace(doc, cursorY, chipH);
  let x = MARGIN_X;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  chips.forEach((label, i) => {
    const padX = 4;
    const w = doc.getTextWidth(label) + padX * 2;
    const isPartial = i === 3 && planning.hasPartialMix;
    const fill = isPartial ? C.secondaryBg : C.primaryBg;
    const stroke = isPartial ? C.secondary : C.border;
    const textCol = isPartial ? C.secondaryDark : C.primaryDark;
    if (x + w > MARGIN_X + CONTENT_W) {
      x = MARGIN_X;
      cursorY += chipH + 1;
      cursorY = ensureSpace(doc, cursorY, chipH);
    }
    setFillRGB(doc, fill);
    setDrawRGB(doc, stroke);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, cursorY, w, chipH, 2, 2, 'FD');
    setTextRGB(doc, textCol);
    doc.text(label, x + padX, cursorY + chipH - 2.2);
    x += w + 3;
  });
  return cursorY + chipH + 5;
}

function drawWhatToBuy(
  doc: jsPDF,
  cursorY: number,
  state: ExportState
): number {
  if (!state.fieldSize) return cursorY;
  cursorY = drawSectionHeading(doc, cursorY, 'What to Buy (Field Total)');

  const body = state.products.map((p, i) => {
    const totalOz = calculateFieldAmount(p.rate, p.unit, state.fieldSize, state.applicationRate);
    const info = formatPurchaseAmount(totalOz, p.unit, p.jugSize ?? 128);
    const best = info.containers[0];
    const alts = info.containers.slice(1, 3).map(c => `${c.display} (${c.wastePercent.toFixed(0)}% waste)`).join('\n');
    return [
      displayProductName(p.name, i),
      info.display,
      best ? `${best.display}\n${best.wastePercent.toFixed(0)}% waste` : '—',
      alts || '—',
    ];
  });
  return runAutoTable(doc, cursorY, [['Product', 'Total Needed', 'Best Buy', 'Alternates']], body, {
    headFill: C.secondaryDark,
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 40 },
      2: { cellWidth: 50 },
      3: { cellWidth: 'auto' },
    },
  });
}

function drawPerMixAmounts(doc: jsPDF, cursorY: number, state: ExportState): number {
  const planning = calculateMixPlanning(state.fieldSize, state.applicationRate, state.fillVolume);
  if (!planning) return cursorY;

  // Full mix table
  cursorY = drawSectionHeading(
    doc,
    cursorY,
    `Full Mix x ${planning.fullMixes}  (${state.fillVolume} gal · ${state.acresPerFill.toFixed(2)} ac each)`
  );
  const fullBody = state.products.map((p, i) => [
    displayProductName(p.name, i),
    formatOutput(p.tankAmount, p.outputFormat, p.unit, p.jugSize ?? 128),
  ]);
  cursorY = runAutoTable(doc, cursorY, [['Product', 'Amount']], fullBody, {
    columnStyles: { 0: { cellWidth: 110 }, 1: { cellWidth: 'auto', halign: 'right' } },
  });

  if (planning.hasPartialMix) {
    cursorY = drawSectionHeading(
      doc,
      cursorY,
      `Partial Mix x 1  (${planning.remainingSpray.toFixed(1)} gal · ${planning.remainingAcres.toFixed(2)} ac)`
    );
    const partialBody = state.products.map((p, i) => {
      const amt = calculateAmount(p.rate, p.unit, planning.remainingSpray, state.applicationRate);
      return [
        displayProductName(p.name, i),
        formatOutput(amt, p.outputFormat, p.unit, p.jugSize ?? 128),
      ];
    });
    cursorY = runAutoTable(doc, cursorY, [['Product', 'Amount']], partialBody, {
      headFill: C.secondaryDark,
      columnStyles: { 0: { cellWidth: 110 }, 1: { cellWidth: 'auto', halign: 'right' } },
    });
  }
  return cursorY;
}

function drawFieldOperations(doc: jsPDF, cursorY: number, state: ExportState): number {
  const { fieldSize, implementWidth, speed, fillTime, acresPerFill, currentTime } = state;
  if (!(fieldSize && implementWidth && speed)) return cursorY;

  const acresPerHour = speed * implementWidth * 0.1212;
  const tanksNeeded = acresPerFill > 0 ? fieldSize / acresPerFill : 0;
  const sprayHours = fieldSize / acresPerHour;
  const totalFillTimeHours = (fillTime / 60) * tanksNeeded;
  const totalJobHours = sprayHours + totalFillTimeHours;
  const effectiveAcresPerHour = totalJobHours > 0 ? fieldSize / totalJobHours : 0;
  const completionTime = new Date(currentTime.getTime() + totalJobHours * 60 * 60 * 1000);

  cursorY = drawSectionHeading(doc, cursorY, 'Field Operations');
  const body: [string, string][] = [
    ['Implement Width', `${implementWidth} ft`],
    ['Speed', `${speed} mph`],
    ['Fill Time', `${fillTime} min`],
    ['Working Rate', `${acresPerHour.toFixed(1)} ac/hr`],
    ['Effective Rate (with filling)', `${effectiveAcresPerHour.toFixed(1)} ac/hr`],
    ['Mixes Needed', `${Math.ceil(tanksNeeded)} (${tanksNeeded.toFixed(1)})`],
    ['Spray Time', formatHours(sprayHours)],
    ['Total Fill Time', formatHours(totalFillTimeHours)],
    ['Estimated Job Completion', formatHours(totalJobHours)],
    ['Estimated Finish Time', formatETAText(completionTime)],
  ];
  return runAutoTable(doc, cursorY, [['Metric', 'Value']], body, {
    columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 'auto' } },
  });
}

function drawApplicationRecord(doc: jsPDF, cursorY: number): number {
  // Approx 32mm needed for the section + 4 lines
  cursorY = ensureSpace(doc, cursorY, 36);
  cursorY = drawSectionHeading(doc, cursorY, 'Application Record');
  const labels = ['Applicator', 'Date Applied', 'Wind / Weather', 'Notes'];
  const rowH = 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  labels.forEach((label) => {
    setTextRGB(doc, C.primaryDark);
    doc.text(`${label}:`, MARGIN_X, cursorY + rowH - 2);
    const labelW = doc.getTextWidth(`${label}:`) + 3;
    setDrawRGB(doc, C.divider);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_X + labelW, cursorY + rowH - 1.5, MARGIN_X + CONTENT_W, cursorY + rowH - 1.5);
    cursorY += rowH;
  });
  return cursorY + 2;
}

interface FooterContext {
  qrDataUrl: string | null;
  url: string;
  tooLarge: boolean;
}

function drawFooterOnAllPages(doc: jsPDF, ctx: FooterContext) {
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawFooterForCurrentPage(doc, ctx, i, totalPages);
  }
}

function drawFooterForCurrentPage(doc: jsPDF, ctx: FooterContext, page: number, total: number) {
  const footerTop = PAGE_H - FOOTER_HEIGHT + 2;

  // Divider line above footer
  setDrawRGB(doc, C.border);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_X, footerTop, MARGIN_X + CONTENT_W, footerTop);

  const qrSize = 26;
  const qrX = PAGE_W - MARGIN_X - qrSize;
  const qrY = footerTop + 3;

  // QR (or fallback note) on the right
  if (ctx.qrDataUrl && !ctx.tooLarge) {
    try {
      doc.addImage(ctx.qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
      doc.setFontSize(7);
      setTextRGB(doc, C.primaryDark);
      doc.text('Scan to load this mix', qrX + qrSize / 2, qrY + qrSize + 3, { align: 'center' });
    } catch (err) {
      // ignore — we'll still print the URL on the left
    }
  } else if (ctx.tooLarge) {
    setTextRGB(doc, C.muted);
    doc.setFontSize(7);
    doc.text('(mix too large for QR)', qrX + qrSize / 2, qrY + qrSize / 2, { align: 'center' });
  }

  // Left side: link + disclaimer + page number
  const leftX = MARGIN_X;
  const leftMaxW = qrX - leftX - 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  setTextRGB(doc, C.primaryDark);
  doc.text('Re-open this mix:', leftX, footerTop + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  setTextRGB(doc, C.primary);
  const urlLines = doc.splitTextToSize(ctx.url, leftMaxW) as string[];
  // limit to 3 lines so the footer doesn't overflow
  const shownUrl = urlLines.slice(0, 3);
  shownUrl.forEach((line, i) => {
    doc.text(line, leftX, footerTop + 9 + i * 3.5);
  });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  setTextRGB(doc, C.muted);
  const disclaimer = 'Always verify calculations against product labels and follow all safety guidelines. SprayCalc is a planning tool only.';
  const discLines = doc.splitTextToSize(disclaimer, leftMaxW) as string[];
  const discBaseY = PAGE_H - 8;
  discLines.slice(0, 2).forEach((line, i) => {
    doc.text(line, leftX, discBaseY - (discLines.length - 1 - i) * 3);
  });

  // Page number
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  setTextRGB(doc, C.muted);
  doc.text(`Page ${page} of ${total}`, PAGE_W - MARGIN_X, PAGE_H - 4, { align: 'right' });
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

  // Build mix re-load link + QR data URL up front
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

  // Header
  let y = drawHeader(doc, new Date());

  // Mix Information
  y = drawSectionHeading(doc, y, 'Mix Information');
  y = drawKpiRow(doc, y, [
    { label: 'Fill Volume', value: `${state.fillVolume} gal` },
    { label: 'Application Rate', value: `${state.applicationRate} GPA` },
    { label: 'Acres Per Fill', value: `${state.acresPerFill.toFixed(2)} ac` },
  ]);

  // Rates as entered
  y = drawRatesAsEntered(doc, y, state.products);

  // Products per mix
  if (state.products.length > 0) {
    y = drawProductsPerMix(doc, y, state.products);
  }

  // Field overview / what to buy / per-mix amounts
  if (state.fieldSize) {
    y = drawFieldOverview(doc, y, state);
    y = drawWhatToBuy(doc, y, state);
    y = drawPerMixAmounts(doc, y, state);
  }

  // Field operations
  y = drawFieldOperations(doc, y, state);

  // Application record
  y = drawApplicationRecord(doc, y);

  // Draw footer (with QR + URL + page numbers) on every page
  drawFooterOnAllPages(doc, {
    qrDataUrl,
    url: link.url,
    tooLarge: link.tooLarge,
  });

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
