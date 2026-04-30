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
  jugSizeOz = 128
): { primary: string; jugBreakdown: string | null } {
  if (value === 0) {
    return { primary: (unit && isWeightUnit(unit)) ? '0 oz' : '0 fl oz', jugBreakdown: null };
  }

  if (unit && isWeightUnit(unit)) {
    return { primary: formatWeightOz(value), jugBreakdown: null };
  }

  const hasBreakdown = value >= jugSizeOz;

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

        if (is25GallonMultiple) {
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

  const gallons = Math.floor(totalOunces / 128);
  const ozRemainder = parseFloat((totalOunces % 128).toFixed(1));
  let totalDisplay: string;
  if (totalOunces < 128) {
    totalDisplay = `${totalOunces.toFixed(1)} fl oz`;
  } else if (ozRemainder === 0) {
    totalDisplay = `${gallons} gal`;
  } else {
    totalDisplay = `${gallons} gal ${ozRemainder} fl oz`;
  }

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
