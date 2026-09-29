// js/space.js - Fondo Cósmico Realista
const canvas = document.getElementById('spaceCanvas') || document.createElement('canvas');
if (!canvas.id) {
    canvas.id = 'spaceCanvas';
    document.body.appendChild(canvas);
}
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Estrellas
const stars = Array.from({ length: 400 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.8,
    alpha: Math.random(),
    speed: Math.random() * 0.02 + 0.005
}));

// Partículas de Galaxia Espiral
const galaxyParticles = Array.from({ length: 350 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 250 + 20;
    return {
        armAngle: angle,
        distance: distance,
        size: Math.random() * 2,
        color: Math.random() > 0.5 ? '#ff77a9' : '#70a1ff',
        speed: (300 - distance) * 0.00005
    };
});

function drawSpace() {
    // Fondo espacial profundo
    ctx.fillStyle = '#05050d';
    ctx.fillRect(0, 0, width, height);

    // 1. Dibujar Estrellas parpadeantes
    stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // 2. Dibujar Galaxia Espiral en esquina derecha
    const gx = width * 0.8;
    const gy = height * 0.25;
    galaxyParticles.forEach(p => {
        p.armAngle += p.speed;
        const currentAngle = p.armAngle + (p.distance * 0.015);
        const x = gx + Math.cos(currentAngle) * p.distance;
        const y = gy + Math.sin(currentAngle) * (p.distance * 0.5); // Perspectiva inclinada

        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    // 3. Agujero Negro con Disco de Acreción y Lente Gravitacional (Centro Superior)
    const bx = width * 0.5;
    const by = height * 0.15;

    // Halo / Disco de acreción brillante
    const grad = ctx.createRadialGradient(bx, by, 10, bx, by, 65);
    grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grad.addColorStop(0.35, 'rgba(255, 140, 0, 0.9)');
    grad.addColorStop(0.7, 'rgba(255, 0, 128, 0.4)');
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(bx, by, 65, 0, Math.PI * 2);
    ctx.fill();

    // Event Horizon (Sombra del agujero negro)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(bx, by, 22, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(drawSpace);
}
drawSpace();
