import * as THREE from 'three';
import { DeviceOrientationControls } from 'three/addons/controls/DeviceOrientationControls.js';
// Importamos la lógica de nuestro ecosistema
import { cargarEcosistema, regarJardin, sanarHoja, actualizarInterfaz } from './jardin.js';

let scene, camera, renderer, controls, starMesh, phoenixA, clock;
let isEcosystemActive = false;

// 1. Solicitud de Permisos para iOS (Giroscopio)
document.getElementById('btn-enter').addEventListener('click', async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permissionState = await DeviceOrientationEvent.requestPermission();
            if (permissionState === 'granted') {
                iniciarEcosistema();
            } else {
                alert("Mi amor, necesito acceso a los sensores para que el universo gire contigo. 🐼");
            }
        } catch (error) {
            console.error(error);
            iniciarEcosistema(); // Forzar inicio en caso de error de API
        }
    } else {
        iniciarEcosistema(); // Dispositivos Android o PC
    }
});

function iniciarEcosistema() {
    if (isEcosystemActive) return;
    isEcosystemActive = true;

    // Transición de Interfaz
    const startScreen = document.getElementById('start-screen');
    startScreen.style.opacity = '0';
    setTimeout(() => { startScreen.style.display = 'none'; }, 1000);
    document.getElementById('ui-layer').style.display = 'block';

    // 2. Configuración de Three.js
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

    // 3. Generación de Galaxia (Tonos Rosas y Verdes)
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 4000;
    const posArray = new Float32Array(starsCount * 3);
    const colorArray = new Float32Array(starsCount * 3);

    for(let i = 0; i < starsCount * 3; i+=3) {
        posArray[i] = (Math.random() - 0.5) * 100;
        posArray[i+1] = (Math.random() - 0.5) * 100;
        posArray[i+2] = (Math.random() - 0.5) * 100;

        const colorType = Math.random();
        if(colorType > 0.8) {
            colorArray[i] = 1.0; colorArray[i+1] = 0.2; colorArray[i+2] = 0.4; // Rosa
        } else if (colorType > 0.6) {
            colorArray[i] = 0.2; colorArray[i+1] = 0.8; colorArray[i+2] = 0.2; // Verde
        } else {
            colorArray[i] = 1.0; colorArray[i+1] = 1.0; colorArray[i+2] = 1.0; // Blanco
        }
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    starMesh = new THREE.Points(starsGeometry, new THREE.PointsMaterial({
        size: 0.15, vertexColors: true, transparent: true, opacity: 0.8
    }));
    scene.add(starMesh);

    // 4. Agujero Negro Phoenix A (Modelo Matemático Básico)
    const blackHoleGeometry = new THREE.TorusGeometry(3, 0.8, 16, 100);
    phoenixA = new THREE.Mesh(blackHoleGeometry, new THREE.MeshBasicMaterial({ 
        color: 0xff3366, wireframe: true, transparent: true, opacity: 0.6
    }));
    phoenixA.position.set(0, 0, -20);
    scene.add(phoenixA);

    clock = new THREE.Clock();
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    starMesh.rotation.y = elapsedTime * 0.02;
    starMesh.rotation.x = elapsedTime * 0.01;
    
    phoenixA.rotation.x = elapsedTime * 0.5;
    phoenixA.rotation.y = elapsedTime * 0.5;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    if(!camera) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
// --- EVENTOS DEL ECOSISTEMA (CRUD) ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar la base de datos al inicio
    const db = cargarEcosistema();
    actualizarInterfaz(db);
    document.getElementById('barra-vitalidad').style.width = db.vitalidad + '%';

    // 2. Acción: Regar el Girasol
    document.getElementById('btn-regar').addEventListener('click', () => {
        if (regarJardin()) {
            const nuevaDb = cargarEcosistema();
            document.getElementById('barra-vitalidad').style.width = nuevaDb.vitalidad + '%';
            
            // Efecto visual rápido: Aceleramos el agujero negro un segundo para simular energía
            if(phoenixA) phoenixA.rotation.x += 1;
            
            // Vibración nativa en el iPhone para dar feedback táctil de que la tierra recibió agua
            if (navigator.vibrate) navigator.vibrate(100); 
        }
    });

    // 3. Acción: Sanar la Hoja (Discord)
    document.getElementById('btn-sanar').addEventListener('click', (e) => {
        sanarHoja(1, 1); // ID Girasol 1, ID Hoja 1
        const nuevaDb = cargarEcosistema();
        document.getElementById('barra-vitalidad').style.width = nuevaDb.vitalidad + '%';
        e.target.innerHTML = "✅ Hoja Sanada con Éxito";
        e.target.style.background = "#4caf50"; // Cambia a verde
        
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]); // Vibración de éxito
    });
});
