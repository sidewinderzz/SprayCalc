import React from 'react';
import { colors, alpha } from '../types';

/**
 * SprayCalc brand mark: plus, times, equals and a drop in a 2×2 grid
 * ("the math, and the answer is the spray").
 *
 * All geometry lives in one 512-unit square so the tile icon, the tile-less
 * mark and the animated loader share the exact same shapes as
 * public/icons/*.svg (those are generated from the same numbers).
 *
 * The loader's keyframes (.sc-loader, .sc-k1..3, .sc-drop) are
 * defined once in index.html, not here, so the pre-JavaScript boot splash
 * can use them too.
 */

const DROP_D =
  'M256 96C256 96 388 230 388 318C388 392 326 450 256 450C186 450 124 392 124 318C124 230 256 96 256 96Z';
const DROP_TRANSFORM = 'translate(352 354) scale(.34) translate(-256 -273)';

type Variant = 'green' | 'dark' | 'white';

const VARIANTS: Record<Variant, { bg: string; fg: string; border?: string }> = {
  green: { bg: colors.primary, fg: '#ffffff' },
  dark: { bg: colors.lightText, fg: '#8cc49b' },
  white: { bg: '#ffffff', fg: colors.primary, border: '#d9dfda' },
};

function Glyphs({ fg, animated }: { fg: string; animated?: boolean }) {
  const k = (n: number) => (animated ? `sc-k sc-k${n}` : undefined);
  return (
    <>
      <g fill="none" stroke={fg} strokeWidth={30} strokeLinecap="round">
        <path className={k(1)} d="M112 160H208M160 112V208" />
        <path className={k(2)} d="M318 126L386 194M386 126L318 194" />
        <path className={k(3)} d="M112 332H208M112 376H208" />
      </g>
      <g className={animated ? 'sc-drop' : undefined}>
        <path fill={fg} transform={DROP_TRANSFORM} d={DROP_D} />
      </g>
    </>
  );
}

interface LogoIconProps {
  size?: number;
  variant?: Variant;
  className?: string;
  title?: string;
}

/** The app icon as a rounded tile. Decorative unless `title` is passed. */
export function LogoIcon({ size = 32, variant = 'green', className, title }: LogoIconProps) {
  const v = VARIANTS[variant];
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <rect
        x={v.border ? 3 : 0}
        y={v.border ? 3 : 0}
        width={v.border ? 506 : 512}
        height={v.border ? 506 : 512}
        rx={v.border ? 78 : 80}
        fill={v.bg}
        stroke={v.border}
        strokeWidth={v.border ? 6 : undefined}
      />
      <Glyphs fg={v.fg} />
    </svg>
  );
}

/** Tile-less mark; takes the surrounding text color. */
export function LogoMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="90 90 332 332" width={size} height={size} className={className} aria-hidden>
      <Glyphs fg="currentColor" />
    </svg>
  );
}

/**
 * Loading animation: +, ×, = get "tapped" in turn like calculator keys,
 * then the drop pops bigger than the keys — the answer. ~1.6 s loop.
 * Honors prefers-reduced-motion (static icon).
 */
export function LogoLoader({ size = 64, label }: { size?: number; label?: string }) {
  const v = VARIANTS.green;
  return (
    <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
      <svg viewBox="0 0 512 512" width={size} height={size} className="sc-loader" aria-hidden>
        <rect width={512} height={512} rx={80} fill={v.bg} />
        <Glyphs fg={v.fg} animated />
      </svg>
      {label ? (
        <p className="text-sm" style={{ color: alpha(colors.lightText, '80') }}>
          {label}
        </p>
      ) : (
        <span className="sr-only">Loading…</span>
      )}
    </div>
  );
}
