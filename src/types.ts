export interface Product {
  id: number;
  name: string;
  rate: number;
  unit: string;
  tankAmount: number;
  outputFormat: string;
  jugSize: number;
  /**
   * Who furnishes (and pays for) this product when one load is shared between
   * several parties. `'each'` — the default — means every party covers the
   * product for their own acres. A split id means that one party supplies the
   * whole product and the others owe them for the acres it went on.
   */
  suppliedBy?: string;
}

/**
 * One party sharing a tank load — a client's field, or your own. Acres are
 * what the chemical is apportioned by, so a bait spray covering a farmer's
 * 100 ac and your 50 ac splits two-thirds / one-third.
 */
export interface MixSplit {
  id: string;
  name: string;
  acres: number;
}

/** Sentinel `Product.suppliedBy` value: each party covers their own acres. */
export const SUPPLIED_BY_EACH = 'each';

export interface SavedMix {
  name: string;
  data: MixData;
  // Last-saved timestamp (ms). Used to resolve conflicts when merging
  // localStorage mixes with cloud-synced mixes; absent on legacy saves.
  updatedAt?: number;
}

export interface MixHistoryEntry {
  id: string;
  timestamp: number;
  data: MixData;
  summary: string;
}

export interface MixData {
  fillVolume: number;
  applicationRate: number;
  products: Product[];
  fieldSize: number;
  implementWidth: number;
  speed: number;
  fillTime: number;
  activeTab?: 'tank' | 'field';
  splitMode?: 'fullPlusPartial' | 'even';
  /** Parties sharing this load. Empty or absent means a single-client mix. */
  splits?: MixSplit[];
}

export interface MixPlanning {
  totalSprayNeeded: number;
  fullMixes: number;
  remainingSpray: number;
  remainingAcres: number;
  hasPartialMix: boolean;
}

export const colors = {
  primary: '#498a5a',
  secondary: '#d1c343',
  primaryLight: '#76a886',
  primaryDark: '#2d6840',
  secondaryLight: '#e4d97b',
  secondaryDark: '#b2a529',
  lightText: '#1c291f'
};

export const outputFormats = [
  {value: 'auto', label: 'Auto (Default)'},
  {value: 'floz', label: 'Fluid Ounces Only'},
  {value: 'gal', label: 'Gallons (Decimal)'},
  {value: 'gal_oz', label: 'Gallons & Ounces'},
  {value: 'qt', label: 'Quarts'},
  {value: 'pt', label: 'Pints'},
  {value: 'cups', label: 'Cups'}
];

export interface ScannedProduct {
  name: string;
  rate: number;
  unit: string;
}

export const unitOptions = [
  'fl oz/acre',
  'pt/acre',
  'qt/acre',
  'gal/acre',
  'oz/acre',
  'lb/acre',
  'g/acre',
  'fl oz per 100 gal',
  'pt per 100 gal',
  'qt per 100 gal',
  'gal per 100 gal',
  'oz per 100 gal',
  'lb per 100 gal',
  'g per 100 gal'
];
