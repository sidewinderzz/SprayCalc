/**
 * Progressive fill for the product cards so a long mix stays scannable:
 * the first card is plain surface, and each card after it takes a slightly darker
 * tint of the brand green. Past six products the hue swings to the brand
 * yellow-green so the steps keep separating instead of flattening out.
 *
 * Inputs on tinted cards switch to a near-solid surface fill so the typed values
 * keep their contrast whatever the card behind them is doing.
 */

const GREEN = 'var(--c-primary)';
const YELLOW = 'var(--c-yellow)';   // between primary and secondary

// Darkness of the fill, by position. Card 1 is plain surface; the last entry
// is the ceiling for anything beyond the list.
const STEPS = [0, 0.07, 0.14, 0.22, 0.31, 0.4];
const YELLOW_FROM = 6; // zero-based index of the first yellow-variant card

const rgba = (channels: string, a: number) => `rgb(${channels} / ${Math.round(a * 1000) / 1000})`;

// Opaque blend of the hue over the card surface (white in light mode, dark
// grey-green in dark), so the fill never depends on what sits behind it.
const overSurface = (channels: string, a: number) =>
  `color-mix(in srgb, rgb(${channels}) ${Math.round(a * 1000) / 10}%, rgb(var(--c-surface)))`;

export interface CardTint {
  background: string;
  border: string;
  inputBackground: string;
  inputBorder: string;
  footerBackground: string;
  footerBorder: string;
}

export function cardTint(index: number): CardTint {
  const i = Math.max(0, Math.floor(index));
  if (i === 0) {
    return {
      background: 'rgb(var(--c-surface))',
      border: rgba(GREEN, 0.133),
      inputBackground: rgba(GREEN, 0.024),
      inputBorder: rgba(GREEN, 0.133),
      footerBackground: rgba(GREEN, 0.047),
      footerBorder: rgba(GREEN, 0.122),
    };
  }
  const yellow = i >= YELLOW_FROM;
  const hue = yellow ? YELLOW : GREEN;
  // The yellow run restarts a couple of steps in so the hand-off reads as a
  // deliberate change of colour rather than a lighter green.
  const stepIndex = yellow ? Math.min(STEPS.length - 1, i - YELLOW_FROM + 2) : Math.min(STEPS.length - 1, i);
  const step = STEPS[stepIndex];
  return {
    background: overSurface(hue, step),
    border: rgba(hue, 0.13 + step * 0.6),
    inputBackground: 'rgb(var(--c-surface) / 0.85)',
    inputBorder: rgba(hue, 0.25),
    footerBackground: rgba(hue, 0.09),
    footerBorder: rgba(hue, 0.12 + step * 0.5),
  };
}
