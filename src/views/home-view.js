export class HomeView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="view-container">
                <div style="text-align: center; margin-top: 50px;">
                    <h1 style="color: var(--garden-leaf); font-size: 3rem;">🌱</h1>
                    <h2>Ecosistema Iniciado</h2>
                    <p style="color: var(--gastro-sage); margin-top: 10px;">Cimientos estructurales operativos.</p>
                </div>
            </div>
        `;
    }
}
customElements.define('home-view', HomeView);
