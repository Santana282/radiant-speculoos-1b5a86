const CACHE_NAME = 'ecosistema-v1';
const urlsToCache = [
  './',
  './index.html',
  './carta.html',
  './diarios.html',
  './invernadero.html',
  './manifest.json',
  './audio/golden-hour.mp3',
  './css/styles.css',
  './js/pingpong.js'
];

// Instalación del Service Worker y almacenamiento en caché de los archivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Archivos guardados en caché correctamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker y limpieza de cachés antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia: responder con caché primero, si no hay red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
