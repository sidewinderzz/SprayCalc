export interface Product {
  id: number;
  name: string;
  rate: number;
  unit: string;
  tankAmount: number;
  outputFormat: string;
  jugSize: number;
}

export interface SavedMix {
  name: string;
  data: MixData;
}

export interface MixData {
  fillVolume: number;
  applicationRate: number;
  products: Product[];
  fieldSize: number;
  implementWidth: number;
  speed: number;
  fillTime: number;
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

export const unitOptions = [
  'oz/acre',
  'pt/acre',
  'qt/acre',
  'gal/acre',
  'lb/acre',
  'g/acre',
  'oz per 100 gal',
  'pt per 100 gal',
  'qt per 100 gal',
  'lb per 100 gal'
];
