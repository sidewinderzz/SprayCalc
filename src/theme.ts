import { useEffect, useState } from 'react';

/**
 * Light / dark theme.
 *
 * The user's choice is 'system' (follow the phone), 'light' or 'dark', kept
 * per device in localStorage. The resolved theme is written to
 * <html data-theme="light|dark">, which switches the CSS variables in
 * src/index.css. index.html runs the same logic inline before first paint so
 * the app never flashes the wrong theme on launch.
 */

export type ThemePref = 'system' | 'light' | 'dark';

const KEY = 'sc-theme';
const THEME_COLOR = { light: '#498a5a', dark: '#121714' };

const media = () =>
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

export function getThemePref(): ThemePref {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch {
    /* storage blocked: fall through */
  }
  return 'system';
}

function resolve(pref: ThemePref): 'light' | 'dark' {
  if (pref === 'system') return media()?.matches ? 'dark' : 'light';
  return pref;
}

export function applyTheme(pref: ThemePref = getThemePref()) {
  const theme = resolve(pref);
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
}

export function setThemePref(pref: ThemePref) {
  try {
    localStorage.setItem(KEY, pref);
  } catch {
    /* not persisted, still applied for this session */
  }
  applyTheme(pref);
  window.dispatchEvent(new CustomEvent('sc-theme-change', { detail: pref }));
}

/** Current preference + setter; also re-applies when the phone's theme flips
 *  while the preference is 'system'. */
export function useThemePref(): [ThemePref, (p: ThemePref) => void] {
  const [pref, setPref] = useState<ThemePref>(getThemePref);

  useEffect(() => {
    const onChange = (e: Event) => setPref((e as CustomEvent<ThemePref>).detail);
    window.addEventListener('sc-theme-change', onChange);
    const mq = media();
    const onSystem = () => {
      if (getThemePref() === 'system') applyTheme('system');
    };
    mq?.addEventListener?.('change', onSystem);
    return () => {
      window.removeEventListener('sc-theme-change', onChange);
      mq?.removeEventListener?.('change', onSystem);
    };
  }, []);

  return [pref, setThemePref];
}
