import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

// Firebase is entirely optional: when the VITE_FIREBASE_* env vars are not
// set at build time, the app runs exactly as before (localStorage only) and
// no sign-in UI is shown. The SDK is loaded via dynamic import so the
// (large) firebase chunk is only downloaded when configured.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

async function getApp() {
  const { initializeApp, getApps, getApp: getExistingApp } = await import('firebase/app');
  return getApps().length ? getExistingApp() : initializeApp(config);
}

export interface LoadedAuth {
  auth: Auth;
  authModule: typeof import('firebase/auth');
}

let loadedAuth: LoadedAuth | null = null;
let authPromise: Promise<LoadedAuth | null> | null = null;

// Loads (and caches) the auth SDK. Called once on app mount so that by the
// time the user clicks "Sign in" the module is available synchronously via
// getLoadedAuth() — keeping signInWithPopup inside the user-gesture window
// so popup blockers don't interfere.
export function loadFirebaseAuth(): Promise<LoadedAuth | null> {
  if (!isFirebaseConfigured()) return Promise.resolve(null);
  if (!authPromise) {
    authPromise = (async () => {
      const [app, authModule] = await Promise.all([getApp(), import('firebase/auth')]);
      loadedAuth = { auth: authModule.getAuth(app), authModule };
      return loadedAuth;
    })();
  }
  return authPromise;
}

export function getLoadedAuth(): LoadedAuth | null {
  return loadedAuth;
}

let dbPromise: Promise<Firestore | null> | null = null;

export function getDb(): Promise<Firestore | null> {
  if (!isFirebaseConfigured()) return Promise.resolve(null);
  if (!dbPromise) {
    dbPromise = (async () => {
      const [app, { getFirestore }] = await Promise.all([getApp(), import('firebase/firestore')]);
      return getFirestore(app);
    })();
  }
  return dbPromise;
}
