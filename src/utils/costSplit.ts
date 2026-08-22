import { MixSplit, Product, SUPPLIED_BY_EACH } from '../types';
import { calculateFieldAmount, formatOutputParts } from './calculations';
import { displayProductName } from './productName';

// The split answers "how much of this went on whose acres", so amounts are
// shown bare. The jug/container breakdown belongs to What to Buy — repeating
// it here would push every cell of a four-party table off the page.
function amountLabel(
  amountOz: number,
  format: string,
  unit: string,
  jugSizeOz: number,
): string {
  return formatOutputParts(amountOz, format, unit, jugSizeOz, false).primary;
}

// ─── Cost split ────────────────────────────────────────────────────────────
// One tank can cover more than one party's ground — a farmer's field plus our
// own, say — and the chemicals in it are not always paid for by the same
// person: one party can furnish one chemical and another party a second,
// so afterwards somebody has to work out how much of whose chemical went
// where.
//
// Everything here is apportioned by acres, which is the only thing that
// actually splits a shared load: a party spraying 100 of 150 acres took two
// thirds of every product in the tank, whoever paid for it.

export interface SplitProductLine {
  productId: number;
  name: string;
  /** Amount of this product attributable to the party's acres, in oz. */
  amountOz: number;
  /** Formatted using the product's own output format / jug size. */
  display: string;
  /** Party id that furnished it, or `'each'`. */
  suppliedBy: string;
  /** Name of the supplying party — null when each party covers their own. */
  suppliedByName: string | null;
  /** True when this party is the one who furnished the product. */
  isSupplier: boolean;
  /**
   * On the supplier's own line, the whole amount they furnished for the load
   * (their acres plus everyone else's). Null on every other line.
   */
  furnishedDisplay: string | null;
}

export interface SplitPartyBreakdown {
  split: MixSplit;
  /** Party name, falling back to "Party N" using its row position. */
  name: string;
  /** Share of the total acreage, 0–1. */
  fraction: number;
  /** Share of total spray volume, in gallons. */
  gallons: number;
  lines: SplitProductLine[];
}

export interface SettlementLine {
  /** Party that furnished the product. */
  fromName: string;
  /** Party whose acres it was sprayed on. */
  toName: string;
  productName: string;
  amountOz: number;
  display: string;
}

export interface CostSplitReport {
  parties: SplitPartyBreakdown[];
  /** Sum of every party's acres — not necessarily the field total. */
  totalAcres: number;
  /** Who owes whom, one line per product per borrowing party. */
  settlements: SettlementLine[];
}

/** Splits worth reporting on: named or not, they need acres to divide by. */
export function hasUsableSplits(splits: MixSplit[] | undefined): boolean {
  return !!splits && splits.filter(s => s.acres > 0).length >= 2;
}

export function splitDisplayName(split: MixSplit, index: number): string {
  return split.name && split.name.trim() ? split.name.trim() : `Party ${index + 1}`;
}

export function makeSplitId(): string {
  return `s${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Total acres across every party, ignoring blank rows. */
export function totalSplitAcres(splits: MixSplit[] | undefined): number {
  return (splits ?? []).reduce((sum, s) => sum + (s.acres > 0 ? s.acres : 0), 0);
}

/**
 * Per-party product amounts plus the settle-up ledger. Returns null unless at
 * least two parties have acres — a one-party "split" is just the mix itself.
 */
export function buildCostSplit(
  products: Product[],
  splits: MixSplit[] | undefined,
  applicationRate: number,
): CostSplitReport | null {
  const active = (splits ?? []).filter(s => s.acres > 0);
  if (active.length < 2 || applicationRate <= 0) return null;

  const totalAcres = active.reduce((sum, s) => sum + s.acres, 0);
  if (totalAcres <= 0) return null;

  // Index by id against the *original* list so display names stay stable when
  // a blank row sits between two filled ones.
  const nameById = new Map<string, string>();
  (splits ?? []).forEach((s, i) => nameById.set(s.id, splitDisplayName(s, i)));

  const parties: SplitPartyBreakdown[] = active.map(split => {
    const lines: SplitProductLine[] = products.map((product, idx) => {
      const amountOz = calculateFieldAmount(
        product.rate,
        product.unit,
        split.acres,
        applicationRate,
      );
      const suppliedBy = product.suppliedBy ?? SUPPLIED_BY_EACH;
      // A supplier that has since been deleted falls back to "each" rather
      // than pointing the ledger at a party that no longer exists.
      const supplierExists = suppliedBy !== SUPPLIED_BY_EACH && nameById.has(suppliedBy);
      const isSupplier = supplierExists && suppliedBy === split.id;
      return {
        productId: product.id,
        name: displayProductName(product.name, idx),
        amountOz,
        display: amountLabel(amountOz, product.outputFormat, product.unit, product.jugSize ?? 128),
        suppliedBy: supplierExists ? suppliedBy : SUPPLIED_BY_EACH,
        suppliedByName: supplierExists ? nameById.get(suppliedBy)! : null,
        isSupplier,
        furnishedDisplay: isSupplier
          ? amountLabel(
              calculateFieldAmount(product.rate, product.unit, totalAcres, applicationRate),
              product.outputFormat,
              product.unit,
              product.jugSize ?? 128,
            )
          : null,
      };
    });
    return {
      split,
      name: nameById.get(split.id) ?? split.name,
      fraction: split.acres / totalAcres,
      gallons: split.acres * applicationRate,
      lines,
    };
  });

  const settlements: SettlementLine[] = [];
  for (const party of parties) {
    for (const line of party.lines) {
      if (line.suppliedBy === SUPPLIED_BY_EACH) continue;
      if (line.isSupplier) continue;
      if (line.amountOz <= 0) continue;
      settlements.push({
        fromName: line.suppliedByName!,
        toName: party.name,
        productName: line.name,
        amountOz: line.amountOz,
        display: line.display,
      });
    }
  }

  return { parties, totalAcres, settlements };
}

/** Plain-text cost split block for the clipboard / share summary. */
export function costSplitText(report: CostSplitReport): string {
  let text = `\nCHEMICAL SPLIT BY PARTY (${report.totalAcres.toFixed(2)} acres total):\n`;
  report.parties.forEach(party => {
    text += `\n${party.name} — ${party.split.acres} ac (${(party.fraction * 100).toFixed(0)}% of load, ${party.gallons.toFixed(1)} gal):\n`;
    party.lines.forEach(line => {
      let tag = '';
      if (line.isSupplier) tag = ` [supplies all ${line.furnishedDisplay}]`;
      else if (line.suppliedByName) tag = ` [supplied by ${line.suppliedByName}]`;
      text += `  ${line.name}: ${line.display}${tag}\n`;
    });
  });
  if (report.settlements.length > 0) {
    text += `\nSETTLE UP:\n`;
    report.settlements.forEach(s => {
      text += `  ${s.toName} owes ${s.fromName}: ${s.display} of ${s.productName}\n`;
    });
  }
  return text;
}
