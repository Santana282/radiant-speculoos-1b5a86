// 1. URLs seguras que Safari aprueba
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.min.js';
import { DeviceOrientationControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/DeviceOrientationControls.js';

// 2. Base de datos del invernadero
import { cargarEcosistema, actualizarInterfaz } from './jardin.js';

let scene, camera, renderer, controls, starMesh, phoenixA, clock;
let isEcosystemActive = false;

// 3. Activador central
document.getElementById('btn-enter').addEventListener('click', async () => {
    // Desaparece la tarjeta visualmente al instante
    const startScreen = document.getElementById('start-screen');
    startScreen.style.opacity = '0';
    setTimeout(() => { startScreen.style.display = 'none'; }, 800);
    document.getElementById('ui-layer').style.display = 'block';

    // Pide permiso al iPhone para el giroscopio
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission === 'granted') {
                iniciarUniverso();
            } else {
                iniciarUniverso(); // Inicia aunque rechace el sensor
            }
        } catch (error) {
            iniciarUniverso();
        }
    } else {
        iniciarUniverso(); // Android o PC
    }
});

function iniciarUniverso() {
    if (isEcosystemActive) return;
    isEcosystemActive = true;

    // Cargar datos de vitalidad
    const db = cargarEcosistema();
    actualizarInterfaz(db);

    const container = document.getElementById('canvas-container');
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0c10, 0.002);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    controls = new DeviceOrientationControls(camera);

    // Creación de las estrellas rosas y verdes
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 4000;
    const posArray = new Float32Array(starsCount * 3);
    const colorArray = new Float32Array(starsCount * 3);

    for(let i = 0; i < starsCount * 3; i+=3) {
        posArray[i] = (Math.random() - 0.5) * 100;
        posArray[i+1] = (Math.random() - 0.5) * 100;
        posArray[i+2] = (Math.random() - 0.5) * 100;

        const type = Math.random();
        if(type > 0.8) { colorArray[i] = 1; colorArray[i+1] = 0.2; colorArray[i+2] = 0.4; } // Rosa
        else if (type > 0.6) { colorArray[i] = 0.2; colorArray[i+1] = 0.8; colorArray[i+2] = 0.2; } // Verde
        else { colorArray[i] = 1; colorArray[i+1] = 1; colorArray[i+2] = 1; } // Blanco
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    starMesh = new THREE.Points(starsGeometry, new THREE.PointsMaterial({ size: 0.15, vertexColors: true, transparent: true, opacity: 0.8 }));
    scene.add(starMesh);

    // Agujero Negro
    phoenixA = new THREE.Mesh(new THREE.TorusGeometry(3, 0.8, 16, 100), new THREE.MeshBasicMaterial({ color: 0xff3366, wireframe: true, transparent: true, opacity: 0.6 }));
    phoenixA.position.set(0, 0, -20);
    scene.add(phoenixA);

    clock = new THREE.Clock();
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    if(controls) controls.update();
    
    if(starMesh) {
        starMesh.rotation.y = elapsed * 0.02;
        starMesh.rotation.x = elapsed * 0.01;
    }
    if(phoenixA) {
        phoenixA.rotation.x = elapsed * 0.5;
        phoenixA.rotation.y = elapsed * 0.5;
    }

    renderer.render(scene, camera);
}
