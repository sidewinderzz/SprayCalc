import { MixPlanning } from '../types';

// Convert any rate to oz based on unit type.
// Note: returns fluid oz for liquid units (fl oz, pt, qt, gal) and weight oz
// for weight units (oz, lb, g). Order matters — "fl oz" must be checked before
// "oz", and "gal" before "g".
export function convertToOz(rate: number, unit: string): number {
  if (unit.startsWith('fl oz')) return rate;
  if (unit.startsWith('pt')) return rate * 16;
  if (unit.startsWith('qt')) return rate * 32;
  if (unit.startsWith('gal')) return rate * 128;
  if (unit.startsWith('oz')) return rate;
  if (unit.startsWith('lb')) return rate * 16;
  if (unit.startsWith('g')) return rate * 0.033814;
  return rate;
}

// Calculate amount for a single product
export function calculateAmount(
  rate: number,
  unit: string,
  fillVolume: number,
  applicationRate: number
): number {
  if (!rate || rate === 0) return 0;

  let amount = 0;
  const currentAcresPerFill = applicationRate > 0 ? fillVolume / applicationRate : 0;

  if (unit.includes('per') && unit.includes('gal')) {
    const gallonsMatch = unit.match(/per (\d+) gal/);
    if (gallonsMatch && gallonsMatch[1]) {
      const gallonsReferenced = parseInt(gallonsMatch[1]);
      const rateInOz = convertToOz(rate, unit);
      amount = (rateInOz * fillVolume) / gallonsReferenced;
    }
  } else if (unit.includes('/acre')) {
    const rateInOz = convertToOz(rate, unit);
    amount = rateInOz * currentAcresPerFill;
  }

  return amount;
}

// Calculate total product needed for entire field
export function calculateFieldAmount(
  rate: number,
  unit: string,
  totalAcres: number,
  applicationRate: number
): number {
  if (!rate || rate === 0 || !totalAcres) return 0;

  let amount = 0;

  if (unit.includes('per') && unit.includes('gal')) {
    const totalSprayVolume = totalAcres * applicationRate;
    const gallonsMatch = unit.match(/per (\d+) gal/);
    if (gallonsMatch && gallonsMatch[1]) {
      const gallonsReferenced = parseInt(gallonsMatch[1]);
      const rateInOz = convertToOz(rate, unit);
      amount = (rateInOz * totalSprayVolume) / gallonsReferenced;
    }
  } else if (unit.includes('/acre')) {
    const rateInOz = convertToOz(rate, unit);
    amount = rateInOz * totalAcres;
  }

  return amount;
}

// Calculate mix planning for the field
export function calculateMixPlanning(
  fieldSize: number,
  applicationRate: number,
  fillVolume: number
): MixPlanning | null {
  if (!fieldSize || !applicationRate || !fillVolume) return null;

  const totalSprayNeeded = fieldSize * applicationRate;
  const fullMixes = Math.floor(totalSprayNeeded / fillVolume);
  const remainingSpray = totalSprayNeeded - fullMixes * fillVolume;
  const remainingAcres = remainingSpray / applicationRate;

  return {
    totalSprayNeeded,
    fullMixes,
    remainingSpray,
    remainingAcres,
    hasPartialMix: remainingSpray > 0
  };
}

// ─── Mix loads ─────────────────────────────────────────────────────────────
// One entry per distinct tank load the operator will actually mix.
//
// Field Mix mode is acreage-driven: the loads are whatever it takes to finish
// the field, so a job smaller than one tank is a single *partial* load, not a
// full one. Tank Mix mode is capacity-driven: the load is the tank.
//
// This exists because product amounts used to be read straight off
// `product.tankAmount`, which is always computed from full tank capacity. In
// Field Mix mode that overstates the dose whenever the last (or only) load is
// a partial — 172 ac at 1.5 fl oz/ac in a 500 gal tank showed 375 fl oz where
// the 344 gal load needs 258, a 45% overdose. Every surface that shows a
// per-load amount should derive it from these loads instead.

export interface MixLoad {
  /** Short name for the load, without the count ("Full Mix", "Partial Mix"). */
  label: string;
  /** How many identical loads of this kind. Never 0. */
  count: number;
  /** Spray volume in this single load, in gallons. */
  volume: number;
  /** Acres this single load covers. */
  acres: number;
  isPartial: boolean;
}

function fullTankLoad(fillVolume: number, applicationRate: number): MixLoad {
  return {
    label: 'Full Mix',
    count: 1,
    volume: fillVolume,
    acres: applicationRate > 0 ? fillVolume / applicationRate : 0,
    isPartial: false,
  };
}

/**
 * The loads needed to finish `fieldSize` acres. Returns [] when the inputs
 * aren't complete enough to plan. A full-tank group is omitted entirely when
 * the job doesn't fill a tank, so callers never render "Full Mix × 0".
 */
export function buildFieldLoads(
  fieldSize: number,
  applicationRate: number,
  fillVolume: number,
  splitMode: 'fullPlusPartial' | 'even'
): MixLoad[] {
  const planning = calculateMixPlanning(fieldSize, applicationRate, fillVolume);
  if (!planning || planning.totalSprayNeeded <= 0) return [];

  if (splitMode === 'even') {
    const numTanks = Math.ceil(planning.totalSprayNeeded / fillVolume);
    if (numTanks <= 0) return [];
    const perTankVol = planning.totalSprayNeeded / numTanks;
    return [
      {
        label: 'Mix',
        count: numTanks,
        volume: perTankVol,
        acres: perTankVol / applicationRate,
        // Even loads are all the same size; none is a leftover.
        isPartial: false,
      },
    ];
  }

  const loads: MixLoad[] = [];
  if (planning.fullMixes > 0) {
    loads.push({
      label: 'Full Mix',
      count: planning.fullMixes,
      volume: fillVolume,
      acres: fillVolume / applicationRate,
      isPartial: false,
    });
  }
  if (planning.hasPartialMix) {
    loads.push({
      label: 'Partial Mix',
      count: 1,
      volume: planning.remainingSpray,
      acres: planning.remainingAcres,
      isPartial: true,
    });
  }
  return loads;
}

/**
 * The loads to display for the active tab. Tank Mix mode is always a single
 * full tank. Field Mix mode plans against the acreage, falling back to the
 * full tank only while the field inputs are still incomplete.
 */
export function buildMixLoads(
  activeTab: 'tank' | 'field',
  fieldSize: number,
  applicationRate: number,
  fillVolume: number,
  splitMode: 'fullPlusPartial' | 'even'
): MixLoad[] {
  if (activeTab === 'tank') return [fullTankLoad(fillVolume, applicationRate)];
  const loads = buildFieldLoads(fieldSize, applicationRate, fillVolume, splitMode);
  return loads.length > 0 ? loads : [fullTankLoad(fillVolume, applicationRate)];
}

/** "Full Mix × 3" / "Partial Mix" — the count is dropped when it is 1. */
export function mixLoadLabel(load: MixLoad): string {
  return load.count > 1 ? `${load.label} × ${load.count}` : load.label;
}

// Returns true for units where the calculated amount is in weight oz (not fl oz).
// Weight units: lb, weight oz, and g. "fl oz" is explicitly fluid.
export function isWeightUnit(unit: string): boolean {
  if (unit.startsWith('fl oz')) return false;
  return (
    unit.startsWith('lb') ||
    unit.startsWith('oz/') ||
    unit.startsWith('oz per') ||
    unit.startsWith('g/') ||
    unit.startsWith('g per')
  );
}

function formatWeightOz(oz: number): string {
  if (oz >= 16) return `${(oz / 16).toFixed(2)} lbs`;
  return `${oz.toFixed(1)} oz`;
}

function jugSizeLabel(jugSizeOz: number): string {
  const gal = jugSizeOz / 128;
  return `${parseFloat(gal.toFixed(2))} gal`;
}

function formatJugBreakdown(oz: number, jugSizeOz = 128): string {
  const fullJugs = Math.floor(oz / jugSizeOz);
  const remainder = parseFloat((oz % jugSizeOz).toFixed(1));
  const sizeLabel = jugSizeLabel(jugSizeOz);

  if (remainder === 0) {
    if (fullJugs === 1) return `1 full jug (${sizeLabel})`;
    return `${fullJugs} full jugs (${sizeLabel} each)`;
  } else {
    const jugLabel = fullJugs === 1 ? 'jug' : 'jugs';
    return `${fullJugs} full ${jugLabel} (${sizeLabel}) + 1 partial jug (${remainder} fl oz)`;
  }
}

// Format the output amount split into primary value and optional jug breakdown line
export function formatOutputParts(
  value: number,
  format: string,
  unit?: string,
  jugSizeOz = 128,
  // Container hints ("5 × 2.5 gal jugs") help when planning what to pour, but
  // they double the length of the string. Surfaces with narrow columns — the
  // cost-split table — turn them off and show the bare quantity.
  includeContainerHints = true
): { primary: string; jugBreakdown: string | null } {
  if (value === 0) {
    return { primary: (unit && isWeightUnit(unit)) ? '0 oz' : '0 fl oz', jugBreakdown: null };
  }

  if (unit && isWeightUnit(unit)) {
    return { primary: formatWeightOz(value), jugBreakdown: null };
  }

  const hasBreakdown = includeContainerHints && jugSizeOz > 0 && value >= jugSizeOz;

  switch (format) {
    case 'floz':
      return {
        primary: `${value.toFixed(1)} fl oz`,
        jugBreakdown: hasBreakdown ? formatJugBreakdown(value, jugSizeOz) : null
      };

    case 'gal': {
      const gallonsOnly = (value / 128).toFixed(2);
      return { primary: `${gallonsOnly} gal`, jugBreakdown: null };
    }

    case 'gal_oz': {
      const gallons = Math.floor(value / 128);
      const ozRemaining = (value % 128).toFixed(1);
      if (parseFloat(ozRemaining) === 0) {
        return { primary: `${gallons} gal`, jugBreakdown: null };
      } else {
        return { primary: `${gallons} gal ${ozRemaining} fl oz`, jugBreakdown: null };
      }
    }

    case 'qt': {
      const quarts = (value / 32).toFixed(2);
      return { primary: `${quarts} qt`, jugBreakdown: null };
    }

    case 'pt': {
      const pints = (value / 16).toFixed(2);
      return { primary: `${pints} pt`, jugBreakdown: null };
    }

    case 'cups': {
      const cups = (value / 8).toFixed(2);
      return { primary: `${cups} cups`, jugBreakdown: null };
    }

    case 'auto':
    default:
      if (value < 256) {
        return {
          primary: `${value.toFixed(1)} fl oz`,
          jugBreakdown: hasBreakdown ? formatJugBreakdown(value, jugSizeOz) : null
        };
      } else {
        const gallonsAuto = Math.floor(value / 128);
        const ozRemainingAuto = (value % 128).toFixed(1);

        const totalGallons = value / 128;
        const is25GallonMultiple =
          Math.abs(totalGallons / 2.5 - Math.round(totalGallons / 2.5)) < 0.01;

        let primary = '';
        if (parseFloat(ozRemainingAuto) === 0) {
          primary = `${gallonsAuto} gal`;
        } else {
          primary = `${gallonsAuto} gal ${ozRemainingAuto} fl oz`;
        }

        if (is25GallonMultiple && includeContainerHints) {
          const jugs = Math.round(totalGallons / 2.5);
          primary += ` (${jugs} × 2.5 gal jugs)`;
        }

        return {
          primary,
          jugBreakdown: hasBreakdown ? formatJugBreakdown(value, jugSizeOz) : null
        };
      }
  }
}

// Format the output amount in appropriate units (single string — used for export/clipboard)
export function formatOutput(value: number, format: string, unit?: string, jugSizeOz = 128): string {
  const { primary, jugBreakdown } = formatOutputParts(value, format, unit, jugSizeOz);
  return jugBreakdown ? `${primary} — ${jugBreakdown}` : primary;
}

// Format product amounts for purchase planning.
// When `preferredJugSizeOz` is provided, that container appears first
// (the primary/starred suggestion) regardless of waste, with the
// remaining standard sizes shown as alternatives.
export function formatPurchaseAmount(
  totalOunces: number,
  unit?: string,
  preferredJugSizeOz?: number
): {
  display: string;
  containers: Array<{
    count: number;
    size: string;
    totalVolume: number;
    waste: number;
    wastePercent: number;
    display: string;
  }>;
} {
  if (totalOunces === 0) return { display: (unit && isWeightUnit(unit)) ? '0 oz' : '0 fl oz', containers: [] };

  // Weight products: show weight total, no container suggestions
  if (unit && isWeightUnit(unit)) {
    return { display: formatWeightOz(totalOunces), containers: [] };
  }

  const totalGallons = totalOunces / 128;

  // Build the display string up-front so the jug-disabled branch can reuse it.
  const displayGallons = Math.floor(totalOunces / 128);
  const displayOzRemainder = parseFloat((totalOunces % 128).toFixed(1));
  let displayString: string;
  if (totalOunces < 128) {
    displayString = `${totalOunces.toFixed(1)} fl oz`;
  } else if (displayOzRemainder === 0) {
    displayString = `${displayGallons} gal`;
  } else {
    displayString = `${displayGallons} gal ${displayOzRemainder} fl oz`;
  }

  // Explicit 0 means the user disabled jug suggestions — show the total but
  // no container recommendations. (Undefined means "no preference"; falls
  // through to the standard waste-sorted list below.)
  if (preferredJugSizeOz === 0) {
    return { display: displayString, containers: [] };
  }

  const totalDisplay = displayString;

  const containerSizes = [
    { size: 2.5, name: '2.5 gal jug' },
    { size: 1, name: '1 gal jug' },
    { size: 0.5, name: '0.5 gal (64 fl oz)' },
    { size: 0.25, name: '1 qt (32 fl oz)' },
    { size: 0.125, name: '1 pt (16 fl oz)' }
  ];

  const buildSuggestion = (sizeGal: number, name: string) => {
    const containerCount = Math.ceil(totalGallons / sizeGal);
    const totalContainerVolume = containerCount * sizeGal * 128;
    const wasteOz = totalContainerVolume - totalOunces;
    const wastePercent = (wasteOz / totalContainerVolume) * 100;
    return {
      count: containerCount,
      size: name,
      totalVolume: totalContainerVolume,
      waste: wasteOz,
      wastePercent,
      display: `${containerCount} × ${name}`
    };
  };

  const suggestions = containerSizes.map(c => buildSuggestion(c.size, c.name));
  suggestions.sort((a, b) => a.wastePercent - b.wastePercent);

  // If the user has chosen a preferred jug size, surface it first.
  if (preferredJugSizeOz && preferredJugSizeOz > 0) {
    const preferredGal = preferredJugSizeOz / 128;
    const matchedStandard = containerSizes.find(c => c.size === preferredGal);
    const preferredName = matchedStandard
      ? matchedStandard.name
      : `${jugSizeLabel(preferredJugSizeOz)} jug`;
    const primary = buildSuggestion(preferredGal, preferredName);
    const others = suggestions.filter(s => s.size !== primary.size);
    return {
      display: totalDisplay,
      containers: [primary, ...others].slice(0, 3)
    };
  }

  return {
    display: totalDisplay,
    containers: suggestions.slice(0, 3)
  };
}
