import { colors } from '../types';

/**
 * Progressive fill for the product cards so a long mix stays scannable:
 * the first card is white, and each card after it takes a slightly darker
 * tint of the brand green. Past six products the hue swings to the brand
 * yellow-green so the steps keep separating instead of flattening out.
 *
 * Inputs on tinted cards switch to a near-white fill so the typed values
 * keep their contrast whatever the card behind them is doing.
 */

const GREEN = colors.primary;      // #498a5a
const YELLOW = '#b5ae3f';          // between primary and secondary (#d1c343)

// Darkness of the fill, by position. Card 1 is white; the last entry is the
// ceiling for anything beyond the list.
const STEPS = [0, 0.07, 0.14, 0.22, 0.31, 0.4];
const YELLOW_FROM = 6; // zero-based index of the first yellow-variant card

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
}

function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${Math.round(alpha * 1000) / 1000})`;
}

// Opaque blend of a colour over white, so the card fill never depends on what
// sits behind it.
function overWhite(hex: string, alpha: number): string {
  const c = hexToRgb(hex).map(v => Math.round(v * alpha + 255 * (1 - alpha)));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

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
      background: '#ffffff',
      border: `${GREEN}22`,
      inputBackground: `${GREEN}06`,
      inputBorder: `${GREEN}22`,
      footerBackground: `${GREEN}0c`,
      footerBorder: `${GREEN}1f`,
    };
  }
  const yellow = i >= YELLOW_FROM;
  const hue = yellow ? YELLOW : GREEN;
  // The yellow run restarts a couple of steps in so the hand-off reads as a
  // deliberate change of colour rather than a lighter green.
  const stepIndex = yellow ? Math.min(STEPS.length - 1, i - YELLOW_FROM + 2) : Math.min(STEPS.length - 1, i);
  const step = STEPS[stepIndex];
  return {
    background: overWhite(hue, step),
    border: rgba(hue, 0.13 + step * 0.6),
    inputBackground: 'rgba(255,255,255,0.85)',
    inputBorder: rgba(hue, 0.25),
    footerBackground: rgba(hue, 0.09),
    footerBorder: rgba(hue, 0.12 + step * 0.5),
  };
}
