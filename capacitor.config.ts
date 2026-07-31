import type { CapacitorConfig } from '@capacitor/cli';

// The Android shell serves the built `dist/` bundle from a local https origin
// (https://localhost) rather than loading the deployed site, so the app is
// fully usable offline in the field — which is the point of a spray
// calculator. Anything that genuinely needs the public site (the OCR
// function, share links, QR codes) resolves an absolute URL via
// `src/utils/appUrl.ts` instead of a relative path.
const config: CapacitorConfig = {
  appId: 'com.spraycalc.app',
  appName: 'SprayCalc',
  webDir: 'dist',
  android: {
    // Matches the app's own background so there is no white/black flash
    // between the splash screen and first paint.
    backgroundColor: '#ffffff',
    // Android 15 (targetSdk 35) forces edge-to-edge. 'auto' lets Capacitor
    // inset the WebView on those devices so the sticky header and the bottom
    // toast are never hidden behind the system bars, and the layout matches
    // every older API level instead of shifting on one.
    adjustMarginsForEdgeToEdge: 'auto',
  },
  plugins: {
    SplashScreen: {
      // Hidden explicitly from `src/utils/native.ts` once React has mounted,
      // so the splash never disappears before there is something to show.
      launchAutoHide: false,
      launchShowDuration: 3000,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSplashResourceName: 'splash',
    },
    Keyboard: {
      // Every screen in this app is numeric inputs, so the keyboard must not
      // cover the field being typed into. 'native' resizes the whole WebView
      // the way adjustResize used to — which Android 15's edge-to-edge
      // enforcement no longer does on its own.
      resize: 'native',
      resizeOnFullScreen: true,
    },
  },
};

export default config;
