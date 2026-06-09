import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { getLoadedAuth, isFirebaseConfigured, loadFirebaseAuth } from '../utils/firebase';
import { trackEvent } from '../utils/analytics';

export function useAuth(onFeedback: (msg: string) => void) {
  const enabled = isFirebaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [authBusy, setAuthBusy] = useState(false);

  // Preload the auth SDK and subscribe to auth state. Loading here (on
  // mount) also means the module is cached before the user ever clicks
  // "Sign in", so the sign-in popup opens within the click gesture.
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;
    loadFirebaseAuth().then(loaded => {
      if (!loaded || cancelled) return;
      unsubscribe = loaded.authModule.onAuthStateChanged(loaded.auth, setUser);
    });
    return () => {
      cancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const flashFeedback = (msg: string) => {
    onFeedback(msg);
    setTimeout(() => onFeedback(''), 2500);
  };

  const signInWithGoogle = async () => {
    if (!enabled || authBusy) return;
    setAuthBusy(true);
    try {
      const loaded = getLoadedAuth() ?? (await loadFirebaseAuth());
      if (!loaded) return;
      const { auth, authModule } = loaded;
      const provider = new authModule.GoogleAuthProvider();
      const result = await authModule.signInWithPopup(auth, provider);
      trackEvent('login', { method: 'google' });
      flashFeedback(`Signed in as ${result.user.displayName || result.user.email || 'user'}`);
    } catch (err: any) {
      // User closing the popup isn't an error worth surfacing.
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
        console.error('Sign-in failed:', err);
        flashFeedback('Sign-in failed');
      }
    } finally {
      setAuthBusy(false);
    }
  };

  const signOutUser = async () => {
    const loaded = getLoadedAuth();
    if (!loaded) return;
    try {
      await loaded.authModule.signOut(loaded.auth);
      flashFeedback('Signed out');
    } catch (err) {
      console.error('Sign-out failed:', err);
    }
  };

  return { enabled, user, authBusy, signInWithGoogle, signOutUser };
}
