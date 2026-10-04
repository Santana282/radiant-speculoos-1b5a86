export class AppHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="app-header">
                <h3>Nuestro Jardín</h3>
            </header>
        `;
    }
}
customElements.define('app-header', AppHeader);
