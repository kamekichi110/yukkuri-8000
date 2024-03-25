// service-worker.js

const cacheName = 'my-site-cache-v1';
const filesToCache = [
  './img/desk.png',
  './img/mic.png',
  './kameta_v2/kame-ta.2048/texture_00.png',
  './kameta_v2/kame-ta.cdi3.json',
  './kameta_v2/kame-ta.moc3',
  './kameta_v2/kame-ta.model3.json',
  './custom.css',
  './index.html',
  './retina.html',
  './main.js',
  './main_for_retina.js',
  './script.js',
  './js/cam.js',
  './js/face.js',
  './js/draw.js',
  './js/kalido.js',
  './js/live2d_core.min.js',
  './js/live2d.min.js',
  './js/pixi_index.js',
  './js/pixi.min.js',
  './app/manifest.webmanifest',
  './app/sw.js',
  './app/icon-192x192.png',
  './app/icon-256x256.png',
  './app/icon-384x384.png',
  './app/icon-512x512.png',
  './app/manifest_for_retina.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => {
        return cache.match(event.request)
          .then(response => {
            const fetchPromise = fetch(event.request)
              .then(networkResponse => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              })
              .catch(() => {
                return caches.match(event.request);
              });

            return response || fetchPromise;
          });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cache => cache !== cacheName)
          .map(cache => caches.delete(cache))
      );
    })
  );
});