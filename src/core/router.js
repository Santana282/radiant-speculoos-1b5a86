export class Router {
    constructor(routes, targetElementId) {
        this.routes = routes;
        this.target = document.getElementById(targetElementId);
        window.addEventListener('hashchange', () => this.resolveRoute());
    }

    resolveRoute() {
        let hash = window.location.hash || '#/';
        const componentName = this.routes[hash] || this.routes['#/'];
        
        if (this.target) {
            this.target.innerHTML = `<${componentName}></${componentName}>`;
        }
    }

    navigate(path) {
        window.location.hash = path;
    }
}
