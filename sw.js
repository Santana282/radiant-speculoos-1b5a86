const CACHE_VERSION = 'nj-v0.1.0';

self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log(`[Service Worker] Instalado pasivamente: ${CACHE_VERSION}`);
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_VERSION) {
                        console.log(`[Service Worker] Eliminando caché antigua: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});
