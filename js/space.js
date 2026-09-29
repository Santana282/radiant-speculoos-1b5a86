// js/space.js - Canvas Espacial Interactiva con Giroscopio
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

// Captura de Giroscopio para dispositivos móviles (iOS/Android)
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (event) => {
        // Normalización de inclinación
        gyroX = (event.gamma || 0) * 0.5; // Inclinación lateral
        gyroY = (event.beta || 0) * 0.5;  // Inclinación frontal
    });
}

// Configuración de Estrellas Espaciales
const NUM_STARS = 350;
const stars = Array.from({ length: NUM_STARS }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * width,
    size: Math.random() * 1.5 + 0.5,
    alpha: Math.random(),
    speed: Math.random() * 0.02 + 0.005
}));

// Partículas de Galaxia
const NUM_GALAXY_PARTICLES = 250;
const galaxyParticles = Array.from({ length: NUM_GALAXY_PARTICLES }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * 180 + 20,
    size: Math.random() * 2 + 0.5,
    color: Math.random() > 0.4 ? '#ff77a9' : '#70a1ff',
    speed: Math.random() * 0.002 + 0.0005
}));

function renderSpace() {
    ctx.fillStyle = '#030308';
    ctx.fillRect(0, 0, width, height);

    // 1. Dibujar Estrellas con paralaje de Giroscopio
    ctx.save();
    ctx.translate(gyroX * 0.8, gyroY * 0.8);
    stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();

    // 2. Dibujar Agujero Negro Central con Disco de Acreción y Giroscopio
    const centerX = width * 0.5 + gyroX * 1.5;
    const centerY = height * 0.3 + gyroY * 1.5;

    // Disco de Acreción Exterior (Brillo Neón)
    const bgGrad = ctx.createRadialGradient(centerX, centerY, 15, centerX, centerY, 120);
    bgGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    bgGrad.addColorStop(0.25, 'rgba(255, 120, 0, 0.8)');
    bgGrad.addColorStop(0.65, 'rgba(235, 47, 6, 0.35)');
    bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
    ctx.fill();

    // Galaxia en Espiral rodeando el Centro
    galaxyParticles.forEach(p => {
        p.angle += p.speed;
        const gx = centerX + Math.cos(p.angle) * p.radius;
        const gy = centerY + Math.sin(p.angle) * (p.radius * 0.4); // Efecto 3D de inclinación

        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(gx, gy, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    // Horizonte de Eventos (Sombra Absoluta del Agujero Negro)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    requestAnimationFrame(renderSpace);
}

renderSpace();
