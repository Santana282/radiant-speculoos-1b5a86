// js/arcade.js - Pac-Garden Arcade
const canvasA = document.getElementById('pacmanCanvas');
if (canvasA) {
    const ctxA = canvasA.getContext('2d');
    let player = { x: 1, y: 1, score: 0 };

    function renderArcade() {
        ctxA.fillStyle = '#0a0a14';
        ctxA.fillRect(0, 0, canvasA.width, canvasA.height);

        // Jugador (Analy 👩🏻‍🍳)
        ctxA.font = "20px Arial";
        ctxA.fillText("👩🏻‍🍳", player.x * 25 + 5, player.y * 25 + 20);

        // Antojos / Girasoles
        ctxA.fillText("🍰", 3 * 25 + 5, 3 * 25 + 20);
        ctxA.fillText("🌻", 5 * 25 + 5, 5 * 25 + 20);
        ctxA.fillText("🍓", 2 * 25 + 5, 6 * 25 + 20);
    }

    renderArcade();
}
