import { Capacitor } from '@capacitor/core';

// Running inside the Capacitor Android shell rather than a browser tab.
// The web build is unchanged by this — `Capacitor.isNativePlatform()` is
// false everywhere except the packaged app.
export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform();
}

export function isAndroidApp(): boolean {
  return Capacitor.getPlatform() === 'android';
}

// Public origin of the deployed PWA.
//
// The native shell serves the bundle from https://localhost so the app works
// with no signal in the field. That means `window.location.origin` is useless
// for anything that has to reach — or be opened by — the outside world:
//   - the OCR serverless function (`/.netlify/functions/ocr`)
//   - share links and the QR code printed on exported PDFs
// Those resolve against this absolute base instead.
//
// Override at build time with VITE_PUBLIC_APP_URL when the site moves off the
// default Netlify domain.
const DEFAULT_PUBLIC_APP_URL = 'https://spraycalc.netlify.app';

export function publicAppUrl(): string {
  const configured = import.meta.env.VITE_PUBLIC_APP_URL as string | undefined;
  const base = (configured || '').trim() || DEFAULT_PUBLIC_APP_URL;
  return base.replace(/\/+$/, '');
}

// Base used to build user-facing links to a mix. On the web this stays
// relative to wherever the app is actually hosted (so preview deploys and
// self-hosting keep working); in the native app it points at the public site,
// which is the only URL a recipient can open.
export function shareBaseUrl(): string {
  if (isNativeApp()) return `${publicAppUrl()}/`;
  if (typeof window === 'undefined') return '';
  const { origin, pathname } = window.location;
  return `${origin}${pathname}`;
}
