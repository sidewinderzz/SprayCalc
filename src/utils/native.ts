import { MixData } from '../types';
import { isNativeApp } from './platform';
import { decodeMixFromParam, MIX_LINK_PARAM } from './mixLink';
import { handleBackPress } from '../hooks/useBackHandler';

// Everything the Android shell needs that the browser gives us for free:
// system chrome, the hardware back button, and links opened from outside the
// app. Every entry point here is a no-op on the web, and the Capacitor
// plugins are dynamically imported so they stay out of the browser bundle.

// A shared link can arrive before React has mounted (cold start from a link),
// so the decoded mix is buffered until App.tsx subscribes.
let pendingSharedMix: MixData | null = null;
let sharedMixHandler: ((mix: MixData) => void) | null = null;

function deliverSharedMix(mix: MixData): void {
  if (sharedMixHandler) sharedMixHandler(mix);
  else pendingSharedMix = mix;
}

// Subscribe to mixes opened from a link while the app is already running (or
// buffered from a cold start). Returns an unsubscribe function.
export function onSharedMixLink(handler: (mix: MixData) => void): () => void {
  sharedMixHandler = handler;
  if (pendingSharedMix) {
    const mix = pendingSharedMix;
    pendingSharedMix = null;
    handler(mix);
  }
  return () => {
    sharedMixHandler = null;
  };
}

function readMixFromUrl(rawUrl: string): MixData | null {
  try {
    const param = new URL(rawUrl).searchParams.get(MIX_LINK_PARAM);
    return param ? decodeMixFromParam(param) : null;
  } catch (_err) {
    // Unparseable incoming URL — just open the app normally.
    return null;
  }
}

async function setupSystemChrome(): Promise<void> {
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    // The app's own background is white at the top, so: dark status bar icons
    // over a white bar, with the WebView below it rather than underneath.
    await StatusBar.setOverlaysWebView({ overlay: false });
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
  } catch (err) {
    // Status bar theming is cosmetic and the API is a no-op on Android 15+,
    // where the theme handles it instead. Never block startup on it.
    console.warn('Status bar setup skipped:', err);
  }
}

async function setupBackButton(): Promise<void> {
  const { App } = await import('@capacitor/app');
  App.addListener('backButton', () => {
    // A modal, menu or the tour gets first refusal on the back press;
    // if nothing is open, back leaves the app as Android users expect.
    if (handleBackPress()) return;
    App.exitApp();
  });
}

async function setupDeepLinks(): Promise<void> {
  const { App } = await import('@capacitor/app');

  // Fired when the app is already running and a SprayCalc link is tapped.
  App.addListener('appUrlOpen', ({ url }) => {
    const mix = readMixFromUrl(url);
    if (mix) deliverSharedMix(mix);
  });

  // Cold start: the launch URL is not replayed through appUrlOpen.
  try {
    const launch = await App.getLaunchUrl();
    if (launch?.url) {
      const mix = readMixFromUrl(launch.url);
      if (mix) deliverSharedMix(mix);
    }
  } catch (_err) {
    // No launch URL — normal launch from the home screen.
  }
}

async function hideSplash(): Promise<void> {
  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide();
  } catch (err) {
    console.warn('Splash screen hide failed:', err);
  }
}

let initialized = false;

export function initNativeShell(): void {
  if (!isNativeApp() || initialized) return;
  initialized = true;

  void setupSystemChrome();
  void setupBackButton();
  void setupDeepLinks();

  // `launchAutoHide` is off in capacitor.config.ts, so the splash stays up
  // until the first frame is actually painted rather than flashing an empty
  // white screen while React boots.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      void hideSplash();
    });
  });
}
