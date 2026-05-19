const CACHE_NAME = 'metik-v3';
const PRECACHE = ['./', './index.html', './favicon.svg', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const destination = e.request.destination;

  // Network-first for navigation and hashed build assets. This avoids a stale
  // service worker holding an old index/chunk pair after GitHub Pages deploys.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('./index.html'))
    );
    return;
  }
  if (destination === 'script' || destination === 'style' || destination === 'worker') {
    e.respondWith(
      fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first for stable static assets.
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});

// Listen for skipWaiting message from the app
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
