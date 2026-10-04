export class StorageService {
    constructor(namespace) {
        this.namespace = namespace;
    }

    save(data) {
        try {
            const serialized = JSON.stringify(data);
            window.localStorage.setItem(this.namespace, serialized);
        } catch (error) {
            console.error(`[Storage] Error guardando en ${this.namespace}:`, error);
        }
    }

    get() {
        try {
            const serialized = window.localStorage.getItem(this.namespace);
            return serialized ? JSON.parse(serialized) : null;
        } catch (error) {
            console.error(`[Storage] Error leyendo de ${this.namespace}:`, error);
            return null;
        }
    }

    clear() {
        window.localStorage.removeItem(this.namespace);
    }
}
