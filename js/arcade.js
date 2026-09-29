// js/arcade.js - Pac-Garden Remasterizado para iOS / Android
const canvasArcade = document.getElementById('pacmanCanvas');
if (canvasArcade) {
    const ctxA = canvasArcade.getContext('2d');
    
    const GRID_SIZE = 20;
    const ROWS = 15;
    const COLS = 15;
    
    // Posición Jugador (Analy 👩🏻‍🍳)
    let player = { x: 1, y: 1, score: 0, itemsEaten: 0 };
    
    // Fantasmitas (Estrés / Racionalización)
    let ghosts = [
        { x: 13, y: 13, dx: -1, dy: 0, name: "Estrés" },
        { x: 1, y: 13, dx: 0, dy: -1, name: "Cansancio" }
    ];

    // Mapa del Laberinto (1 = Pared, 0 = Camino con Antojo)
    const map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
        [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
        [1,0,1,0,0,0,0,1,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,0,1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,0,1,1,1,1,0,1],
        [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
        [1,1,1,0,1,0,1,1,1,0,1,0,1,1,1],
        [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,0,1,0,1,1,1,1,0,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    function drawArcade() {
        ctxA.fillStyle = '#0a0a14';
        ctxA.fillRect(0, 0, canvasArcade.width, canvasArcade.height);

        // Dibujar Laberinto
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (map[r][c] === 1) {
                    ctxA.fillStyle = '#ff77a9';
                    ctxA.fillRect(c * GRID_SIZE, r * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
                } else if (map[r][c] === 0) {
                    // Antojos: Pastelitos / Girasoles
                    ctxA.fillStyle = '#ffd32a';
                    ctxA.beginPath();
                    ctxA.arc(c * GRID_SIZE + 10, r * GRID_SIZE + 10, 3, 0, Math.PI * 2);
                    ctxA.fill();
                }
            }
        }

        // Dibujar a Analy (👩🏻‍🍳)
        ctxA.font = "14px Arial";
        ctxA.fillText("👩🏻‍🍳", player.x * GRID_SIZE + 2, player.y * GRID_SIZE + 15);

        // Dibujar Fantasmas
        ghosts.forEach(g => {
            ctxA.fillText("👻", g.x * GRID_SIZE + 2, g.y * GRID_SIZE + 15);
        });
    }

    function movePlayer(dirX, dirY) {
        const newX = player.x + dirX;
        const newY = player.y + dirY;

        if (map[newY][newX] !== 1) {
            player.x = newX;
            player.y = newY;

            if (map[newY][newX] === 0) {
                map[newY][newX] = 2; // Visitado / Comido
                player.score += 10;
                player.itemsEaten++;
            }
            drawArcade();
        }
    }

    // Eventos de teclado y controles táctiles
    window.addEventListener('keydown', (e) => {
        if (e.key === "ArrowUp") movePlayer(0, -1);
        if (e.key === "ArrowDown") movePlayer(0, 1);
        if (e.key === "ArrowLeft") movePlayer(-1, 0);
        if (e.key === "ArrowRight") movePlayer(1, 0);
    });

    drawArcade();
}
