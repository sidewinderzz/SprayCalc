import { Product } from '../types';

// Show "Product N" as a fallback when the user hasn't typed a name.
export function displayProductName(name: string | undefined, index: number): string {
  return name && name.trim() ? name : `Product ${index + 1}`;
}

// Migrate legacy unit strings stored before "fl oz" was distinguished from
// weight oz. Older data used "oz/acre" / "oz per 100 gal" to mean fluid oz;
// after this change those literals mean weight oz, so rewrite them.
export function migrateLegacyUnit(unit: string | undefined): string {
  if (!unit) return 'fl oz/acre';
  if (unit === 'oz/acre') return 'fl oz/acre';
  if (unit === 'oz per 100 gal') return 'fl oz per 100 gal';
  return unit;
}

export function migrateProductUnits<T extends Product>(products: T[]): T[] {
  return products.map(p => ({ ...p, unit: migrateLegacyUnit(p.unit) }));
}
