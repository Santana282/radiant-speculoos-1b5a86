import { CONFIG } from './core/config.js';
import { StorageService } from './core/storage.js';
import { Store } from './core/store.js';
import { Router } from './core/router.js';

// Importar Web Components (Light DOM)
import './components/layout/app-header.js';
import './components/layout/bottom-nav.js';
import './views/home-view.js';
import './views/garden-view.js';
import './views/arcade-view.js'; // <-- Ruta del arcade agregada

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Persistencia Pública
    const publicStorage = new StorageService(CONFIG.publicStorageKey);
    const savedState = publicStorage.get() || { initialized: true };

    // 2. Inicializar Estado Público (Store)
    const appStore = new Store(savedState);

    // 3. Conexión Store -> Persistencia (Unidirectional Flow)
    appStore.subscribe((newState) => {
        publicStorage.save(newState);
    });

    // 4. Configurar Enrutador (Declarado una sola vez con todas las vistas)
    const routes = {
        '#/': 'home-view',
        '#/jardin': 'garden-view',
        '#/arcade': 'arcade-view'
    };
    const router = new Router(routes, 'app-root');
    
    // Forzar renderizado inicial
    router.resolveRoute();

    // 5. Registro Pasivo de Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('[App] SW Registrado en scope:', reg.scope))
            .catch(err => console.error('[App] SW Error de registro:', err));
    }
});
