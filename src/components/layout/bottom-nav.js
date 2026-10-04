export class BottomNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="bottom-nav">
                <a href="#/" class="nav-item">Inicio</a>
                <a href="#/jardin" class="nav-item">🌱 Jardín</a>
            </nav>
        `;
    }
}
customElements.define('bottom-nav', BottomNav);
