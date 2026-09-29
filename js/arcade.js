// MOTOR PAC-MAN
const canvas = document.getElementById('pacmanCanvas');
const ctx = canvas.getContext('2d');
let px = 110, py = 110;

function drawPacman() {
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, 220, 220);
    
    // Puntos de comida
    ctx.fillStyle = '#ffd166';
    ctx.beginPath(); ctx.arc(40, 110, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(180, 110, 4, 0, Math.PI * 2); ctx.fill();

    // Pac-Man
    ctx.beginPath();
    ctx.arc(px, py, 11, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(px, py); ctx.fill();
}

function movePacman(dir) {
    if(dir === 'UP' && py > 20) py -= 12;
    if(dir === 'DOWN' && py < 200) py += 12;
    if(dir === 'LEFT' && px > 20) px -= 12;
    if(dir === 'RIGHT' && px < 200) px += 12;
    drawPacman();
}
drawPacman();

// RUNNER TERMINAL STARK-OS
function runScriptTerminal() {
    const out = document.getElementById('term-out');
    out.innerHTML += "<br>> Script ejecutado: 'Rompiendo patrones transgeneracionales...' OK";
}