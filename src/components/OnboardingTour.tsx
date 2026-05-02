import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { colors } from '../types';

export interface TourStep {
  id: string;
  targetSelector?: string;
  title: string;
  body: string;
  placement?: 'auto' | 'bottom' | 'top' | 'center';
}

interface OnboardingTourProps {
  open: boolean;
  steps: TourStep[];
  onClose: () => void;
  onComplete: () => void;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PADDING = 8;
const TOOLTIP_WIDTH = 320;
const TOOLTIP_GAP = 14;
const VIEWPORT_MARGIN = 12;

function getRect(el: Element): Rect {
  const r = el.getBoundingClientRect();
  return {
    top: r.top - PADDING,
    left: r.left - PADDING,
    width: r.width + PADDING * 2,
    height: r.height + PADDING * 2,
  };
}

export function OnboardingTour({ open, steps, onClose, onComplete }: OnboardingTourProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number; placement: 'bottom' | 'top' | 'center' }>({
    top: 0, left: 0, placement: 'center',
  });
  const [mounted, setMounted] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Reset to first step whenever opened.
  useEffect(() => {
    if (open) {
      setStepIdx(0);
      setMounted(true);
      previouslyFocused.current = document.activeElement as HTMLElement | null;
    } else if (mounted) {
      // small delay so exit animation could play if added later
      setMounted(false);
      previouslyFocused.current?.focus?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const step = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;
  const isFirst = stepIdx === 0;

  // Compute the spotlight + tooltip position for the active step.
  const recompute = () => {
    if (!step) return;
    const selector = step.targetSelector;
    const tooltipEl = tooltipRef.current;
    const tooltipH = tooltipEl?.offsetHeight ?? 160;
    const tooltipW = tooltipEl?.offsetWidth ?? TOOLTIP_WIDTH;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (!selector) {
      setTargetRect(null);
      setTooltipPos({
        top: Math.max(VIEWPORT_MARGIN, vh / 2 - tooltipH / 2),
        left: Math.max(VIEWPORT_MARGIN, vw / 2 - tooltipW / 2),
        placement: 'center',
      });
      return;
    }
    const el = document.querySelector(selector);
    if (!el) {
      setTargetRect(null);
      setTooltipPos({
        top: Math.max(VIEWPORT_MARGIN, vh / 2 - tooltipH / 2),
        left: Math.max(VIEWPORT_MARGIN, vw / 2 - tooltipW / 2),
        placement: 'center',
      });
      return;
    }
    const rect = getRect(el);
    setTargetRect(rect);

    const preferred = step.placement ?? 'auto';
    const spaceBelow = vh - (rect.top + rect.height);
    const spaceAbove = rect.top;
    let placement: 'top' | 'bottom' | 'center' = 'bottom';
    if (preferred === 'top') placement = 'top';
    else if (preferred === 'bottom') placement = 'bottom';
    else if (preferred === 'center') placement = 'center';
    else {
      placement = spaceBelow >= tooltipH + TOOLTIP_GAP + VIEWPORT_MARGIN || spaceBelow >= spaceAbove
        ? 'bottom'
        : 'top';
    }

    let top = placement === 'bottom'
      ? rect.top + rect.height + TOOLTIP_GAP
      : rect.top - tooltipH - TOOLTIP_GAP;
    if (placement === 'center') top = Math.max(VIEWPORT_MARGIN, vh / 2 - tooltipH / 2);

    // Clamp top into viewport
    top = Math.min(Math.max(VIEWPORT_MARGIN, top), vh - tooltipH - VIEWPORT_MARGIN);

    let left = rect.left + rect.width / 2 - tooltipW / 2;
    left = Math.min(Math.max(VIEWPORT_MARGIN, left), vw - tooltipW - VIEWPORT_MARGIN);

    setTooltipPos({ top, left, placement });
  };

  // Scroll target into view, then position. Re-position on resize/scroll.
  useLayoutEffect(() => {
    if (!open || !step) return;
    const selector = step.targetSelector;
    if (selector) {
      const el = document.querySelector(selector);
      if (el && 'scrollIntoView' in el) {
        try {
          (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch {
          (el as HTMLElement).scrollIntoView();
        }
      }
    }
    // Recompute now and again after the smooth scroll likely settles.
    recompute();
    const t1 = window.setTimeout(recompute, 200);
    const t2 = window.setTimeout(recompute, 450);

    const onChange = () => recompute();
    window.addEventListener('resize', onChange);
    window.addEventListener('scroll', onChange, true);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('resize', onChange);
      window.removeEventListener('scroll', onChange, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, stepIdx]);

  // Focus the close button when a step changes for keyboard accessibility.
  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus?.();
  }, [open, stepIdx]);

  const advance = () => {
    if (isLast) {
      onComplete();
    } else {
      setStepIdx((i) => Math.min(i + 1, steps.length - 1));
    }
  };
  const back = () => setStepIdx((i) => Math.max(i - 1, 0));

  // Keyboard shortcuts: Esc closes, ←/→/Enter navigate.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        advance();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        back();
      } else if (e.key === 'Tab') {
        // Trap focus inside the tooltip
        const root = tooltipRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, stepIdx, isLast]);

  if (!open || !step) return null;

  const showSpotlight = !!targetRect;
  const spotlight = targetRect ?? { top: -9999, left: -9999, width: 0, height: 0 };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-step-title"
      aria-describedby="tour-step-body"
      style={{ position: 'fixed', inset: 0, zIndex: 100 }}
    >
      {/* Dimmer with cut-out spotlight via box-shadow trick */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: spotlight.top,
          left: spotlight.left,
          width: spotlight.width,
          height: spotlight.height,
          borderRadius: 12,
          boxShadow: showSpotlight
            ? '0 0 0 9999px rgba(15, 32, 22, 0.55)'
            : '0 0 0 9999px rgba(15, 32, 22, 0.6)',
          transition: 'top 280ms cubic-bezier(.4,.0,.2,1), left 280ms cubic-bezier(.4,.0,.2,1), width 280ms cubic-bezier(.4,.0,.2,1), height 280ms cubic-bezier(.4,.0,.2,1)',
          pointerEvents: 'auto',
          outline: showSpotlight ? `2px solid ${colors.secondary}` : 'none',
          outlineOffset: 0,
        }}
      />

      {/* Tooltip card */}
      <div
        ref={tooltipRef}
        id="onboarding-tooltip"
        role="document"
        style={{
          position: 'fixed',
          top: tooltipPos.top,
          left: tooltipPos.left,
          width: `min(${TOOLTIP_WIDTH}px, calc(100vw - ${VIEWPORT_MARGIN * 2}px))`,
          backgroundColor: 'white',
          borderRadius: 14,
          boxShadow: '0 12px 40px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.1)',
          padding: 18,
          transition: 'top 280ms cubic-bezier(.4,.0,.2,1), left 280ms cubic-bezier(.4,.0,.2,1), opacity 200ms ease',
          opacity: 1,
          border: `1px solid ${colors.primary}30`,
          color: colors.lightText,
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: colors.primaryLight }}
            >
              Step {stepIdx + 1} of {steps.length}
            </span>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md hover:bg-black/5"
            style={{ color: colors.primaryDark }}
            aria-label="Skip tour"
            title="Skip tour"
          >
            <svg viewBox="0 0 14 14" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>
        <h3
          id="tour-step-title"
          className="font-bold text-base mb-1"
          style={{ color: colors.primaryDark }}
        >
          {step.title}
        </h3>
        <p id="tour-step-body" className="text-sm mb-4" style={{ color: colors.lightText }}>
          {step.body}
        </p>

        {/* Step indicator dots */}
        <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
          {steps.map((s, i) => (
            <span
              key={s.id}
              style={{
                width: i === stepIdx ? 18 : 6,
                height: 6,
                borderRadius: 9999,
                backgroundColor: i === stepIdx ? colors.primary : colors.primary + '35',
                transition: 'width 200ms ease, background-color 200ms ease',
              }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onClose}
            className="text-sm font-medium px-2 py-2"
            style={{ color: colors.lightText + 'aa' }}
          >
            Skip
          </button>
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                onClick={back}
                className="px-3 py-2 rounded-lg text-sm font-medium border"
                style={{ borderColor: colors.primary + '50', color: colors.primaryDark }}
              >
                Back
              </button>
            )}
            <button
              onClick={advance}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: colors.primary }}
            >
              {isLast ? 'Got it' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Spray Calc',
    body: 'A quick tour to show you how to plan your tank mix in just a few steps. Use Next, Back, or Skip at any time.',
    placement: 'center',
  },
  {
    id: 'mix-info',
    targetSelector: '[data-tour-id="mix-information"]',
    title: 'Start with your mix info',
    body: 'Enter your tank fill volume and application rate (GPA). Acres-per-fill is calculated automatically.',
  },
  {
    id: 'products',
    targetSelector: '[data-tour-id="products"]',
    title: 'Add your products',
    body: 'Add each product with its rate and unit. You can change the display units on any amount with a tap.',
  },
  {
    id: 'summary',
    targetSelector: '[data-tour-id="summary"]',
    title: 'Read the mix summary',
    body: 'See exactly what to add to one tank. Copy, share, or export the summary as a PDF from the buttons here.',
  },
  {
    id: 'field-ops',
    targetSelector: '[data-tour-id="field-operations"]',
    title: 'Optional: field logistics',
    body: 'Expand Field Quantities and Field Operations to plan total product to buy, mix counts, and time estimates for the full field.',
    placement: 'top',
  },
  {
    id: 'done',
    title: "You're all set",
    body: 'You can replay this tour any time from the menu in the top right (next to Tips). Happy spraying!',
    placement: 'center',
  },
];
