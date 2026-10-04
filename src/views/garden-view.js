export class GardenView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="view-container">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: var(--garden-sunflower); font-family: var(--font-secondary);">Invernadero</h2>
                    <p style="color: var(--gastro-sage); font-size: 0.9rem;">El jardín que crece con nosotros.</p>
                </div>
                
                <div class="flower-garden">
                    <div class="plant" style="animation-delay: 0.2s;">
                        <div class="stem"></div>
                        <div class="flower-head">
                            <div class="petal" style="--rot: 0deg;"></div>
                            <div class="petal" style="--rot: 60deg;"></div>
                            <div class="petal" style="--rot: 120deg;"></div>
                            <div class="petal" style="--rot: 180deg;"></div>
                            <div class="petal" style="--rot: 240deg;"></div>
                            <div class="petal" style="--rot: 300deg;"></div>
                            <div class="center"></div>
                        </div>
                    </div>
                    <div class="plant" style="animation-delay: 0.5s;">
                        <div class="stem" style="animation-delay: 0.4s;"></div>
                        <div class="flower-head" style="animation-delay: 2.4s;">
                            <div class="petal" style="--rot: 0deg;"></div>
                            <div class="petal" style="--rot: 60deg;"></div>
                            <div class="petal" style="--rot: 120deg;"></div>
                            <div class="petal" style="--rot: 180deg;"></div>
                            <div class="petal" style="--rot: 240deg;"></div>
                            <div class="petal" style="--rot: 300deg;"></div>
                            <div class="center"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('garden-view', GardenView);
