export class ArcadeView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="view-container" style="text-align: center;">
                <h2 style="color: var(--garden-sunflower);">Arcade Retro</h2>
                <p style="color: var(--gastro-sage); font-size: 0.9rem;">Nuestro espacio para distraernos.</p>
                
                <div style="margin-top: 30px; display: flex; flex-direction: column; gap: 15px; align-items: center;">
                    <button class="nav-btn" style="width: 80%; justify-content: center; background: #ff3366; color: white; border: none;">👾 Jugar Pacman</button>
                    <button class="nav-btn" style="width: 80%; justify-content: center; background: #0277bd; color: white; border: none;">🏓 Jugar Ping Pong</button>
                </div>
            </div>
        `;
    }
}
customElements.define('arcade-view', ArcadeView);
