// js/space.js - Canvas Espacial de Alta Fidelidad
const canvas = document.getElementById('spaceCanvas') || document.createElement('canvas');
if (!canvas.id) {
    canvas.id = 'spaceCanvas';
    document.body.appendChild(canvas);
}
const ctx = canvas.getContext('2d');

let width, height;
let gyroX = 0, gyroY = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Detección de giroscopio en móviles
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
        gyroX = (e.gamma || 0) * 0.4;
        gyroY = (e.beta || 0) * 0.4;
    });
}

const stars = Array.from({ length: 450 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.6 + 0.4,
    alpha: Math.random(),
    speed: Math.random() * 0.02 + 0.005
}));

const galaxyParticles = Array.from({ length: 300 }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * 160 + 20,
    size: Math.random() * 2,
    color: Math.random() > 0.5 ? '#ff77a9' : '#70a1ff',
    speed: Math.random() * 0.002 + 0.0005
}));

function renderSpace() {
    ctx.fillStyle = '#030308';
    ctx.fillRect(0, 0, width, height);

    // 1. Estrellas
    ctx.save();
    ctx.translate(gyroX, gyroY);
    stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.alpha)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();

    // 2. Agujero Negro Central (Gargantúa)
    const cx = width * 0.5 + gyroX * 1.2;
    const cy = height * 0.22 + gyroY * 1.2;

    // Disco de acreción
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 100);
    grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grad.addColorStop(0.3, 'rgba(255, 140, 0, 0.85)');
    grad.addColorStop(0.7, 'rgba(255, 0, 128, 0.3)');
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 100, 0, Math.PI * 2);
    ctx.fill();

    // Partículas de Galaxia rodeándolo
    galaxyParticles.forEach(p => {
        p.angle += p.speed;
        const gx = cx + Math.cos(p.angle) * p.radius;
        const gy = cy + Math.sin(p.angle) * (p.radius * 0.45);

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(gx, gy, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Event Horizon (Sombra)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(cx, cy, 24, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(renderSpace);
}

renderSpace();
