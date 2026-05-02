import { useEffect, useRef, useState } from 'react';

interface Options {
  topThreshold?: number;
  hideAfter?: number;
  downDelta?: number;
  upDelta?: number;
}

interface ScrollState {
  isNearTop: boolean;
  isHidden: boolean;
}

export function useScrollDirection({
  topThreshold = 8,
  hideAfter = 80,
  downDelta = 6,
  upDelta = 4,
}: Options = {}): ScrollState {
  const [state, setState] = useState<ScrollState>({
    isNearTop: true,
    isHidden: false,
  });

  const lastY = useRef(0);
  const ticking = useRef(false);
  const accumDown = useRef(0);
  const accumUp = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY < 0 ? 0 : window.scrollY;
        const delta = y - lastY.current;
        const nearTop = y <= topThreshold;

        setState((prev) => {
          let next = prev;
          if (prev.isNearTop !== nearTop) {
            next = { ...next, isNearTop: nearTop };
          }
          if (nearTop) {
            if (next.isHidden) next = { ...next, isHidden: false };
            accumDown.current = 0;
            accumUp.current = 0;
          } else if (delta > 0) {
            accumDown.current += delta;
            accumUp.current = 0;
            if (
              !next.isHidden &&
              accumDown.current > downDelta &&
              y > hideAfter
            ) {
              next = { ...next, isHidden: true };
            }
          } else if (delta < 0) {
            accumUp.current += -delta;
            accumDown.current = 0;
            if (next.isHidden && accumUp.current > upDelta) {
              next = { ...next, isHidden: false };
            }
          }
          return next;
        });

        lastY.current = y;
        ticking.current = false;
      });
    };

    lastY.current = window.scrollY < 0 ? 0 : window.scrollY;
    setState({
      isNearTop: window.scrollY <= topThreshold,
      isHidden: false,
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [topThreshold, hideAfter, downDelta, upDelta]);

  return state;
}
