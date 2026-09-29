const CACHE_NAME = 'spraycalc-v7';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json?v=2',
  '/icons/icon.svg?v=2',
  '/icons/icon-192x192.png?v=2',
  '/icons/icon-512x512.png?v=2',
  '/icons/icon-maskable-192x192.png?v=2',
  '/icons/icon-maskable-512x512.png?v=2',
  '/icons/apple-touch-icon.png?v=2',
  '/icons/favicon-32x32.png?v=2',
  '/icons/mark.svg?v=2'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first for HTML, cache first for assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For navigation requests (HTML), try network first
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the latest version
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request) || caches.match('/');
        })
    );
    return;
  }

  // Manifest: network first so installs always see current icons/name;
  // fall back to the cached copy only when offline.
  if (url.pathname === '/manifest.json') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // For assets (JS, CSS, images), cache first then network
  if (url.pathname.startsWith('/assets/') ||
      url.pathname.startsWith('/icons/') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.css')) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request).then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200) {
              return response;
            }

            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });

            return response;
          });
        })
        .catch(() => {
          // Return offline fallback for assets if available
          return new Response('', { status: 404 });
        })
    );
    return;
  }

  // For other requests, try cache first then network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Only cache same-origin successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            if (event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, responseClone);
            }
          });

          return response;
        });
      })
      .catch(() => {
        return caches.match('/');
      })
  );
});
