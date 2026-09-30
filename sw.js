const CACHE_NAME = 'ecosistema-kevin-analy-v1';
const ASSETS = [
  './',
  './index.html',
  './diarios.html',
  './invernadero.html',
  './carta.html',
  './css/styles.css',
  './js/space.js',
  './js/app.js',
  './js/jardin.js',
  './js/arcade.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
