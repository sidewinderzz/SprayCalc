import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (import.meta.env.PROD) {
  // Production: register the PWA service worker for offline support.
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
} else {
  // Dev: never register the SW. If a previous visit registered the buggy
  // cache-first SW, unregister it and wipe its caches so dev assets stop
  // being served from stale cache. Guard with sessionStorage so the
  // post-cleanup reload only happens once per tab.
  if ('serviceWorker' in navigator) {
    const RELOAD_FLAG = 'sw-dev-cleanup-reloaded';
    const APP_CACHE_PREFIX = 'spraycalc-';
    const isOurSw = (r: ServiceWorkerRegistration) => {
      const sw = r.active || r.waiting || r.installing;
      return !!sw && sw.scriptURL.endsWith('/sw.js');
    };
    navigator.serviceWorker.getRegistrations().then(async (registrations) => {
      const ours = registrations.filter(isOurSw);
      if (ours.length === 0) return;
      await Promise.all(ours.map(r => r.unregister()));
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(
          keys.filter(k => k.startsWith(APP_CACHE_PREFIX)).map(k => caches.delete(k))
        );
      }
      if (!sessionStorage.getItem(RELOAD_FLAG)) {
        sessionStorage.setItem(RELOAD_FLAG, '1');
        console.log('[dev] Cleared stale service worker + caches; reloading.');
        window.location.reload();
      }
    }).catch(() => { /* ignore */ });
  }
}
