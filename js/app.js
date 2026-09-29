import * as THREE from 'three';
import { DeviceOrientationControls } from 'three/addons/controls/DeviceOrientationControls.js';

// 1. Inicialización de la Escena, Cámara y Renderizador
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0b0c10, 0.002);

// Cámara perspectiva ajustada para el campo de visión humano (75 grados)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimización para Retina Display del iPhone
container.appendChild(renderer.domElement);

// 2. Controladores de Giroscopio (DeviceOrientation)
// Esto conectará los sensores físicos del celular de Analy con la cámara 3D
const controls = new DeviceOrientationControls(camera);

// 3. Creación del Universo: Polvo Estelar y Galaxias
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 4000;
const posArray = new Float32Array(starsCount * 3);
const colorArray = new Float32Array(starsCount * 3);

for(let i = 0; i < starsCount * 3; i+=3) {
    // Distribuimos las estrellas en una esfera gigante
    posArray[i] = (Math.random() - 0.5) * 100;     // X
    posArray[i+1] = (Math.random() - 0.5) * 100;   // Y
    posArray[i+2] = (Math.random() - 0.5) * 100;   // Z

    // Asignamos colores sutiles: mezcla de tonos verdosos (Monster) y rosas/dorados (Gerberas/Girasoles)
    const colorType = Math.random();
    if(colorType > 0.8) {
        // Rosa intenso
        colorArray[i] = 1.0; colorArray[i+1] = 0.2; colorArray[i+2] = 0.4; 
    } else if (colorType > 0.6) {
        // Verde sutil
        colorArray[i] = 0.2; colorArray[i+1] = 0.8; colorArray[i+2] = 0.2;
    } else {
        // Blanco estelar
        colorArray[i] = 1.0; colorArray[i+1] = 1.0; colorArray[i+2] = 1.0;
    }
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
starsGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const starsMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
});

const starMesh = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starMesh);

// 4. El Núcleo: Representación Matemática del Agujero Negro Phoenix A
// Utilizamos un shader básico aquí para no sobrecargar el GPU desde el navegador móvil, 
// simulando el disco de acreción con geometría interactiva.
const blackHoleGeometry = new THREE.TorusGeometry(3, 0.8, 16, 100);
const blackHoleMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff3366, 
    wireframe: true,
    transparent: true,
    opacity: 0.6
});
const phoenixA = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
phoenixA.position.set(0, 0, -20);
scene.add(phoenixA);

// 5. Bucle de Animación Cuántica (Ciclo de Vida)
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Actualizamos el giroscopio para que la cámara siga el movimiento del celular
    controls.update();

    // Rotación perpetua del universo y del disco de acreción
    starMesh.rotation.y = elapsedTime * 0.02;
    starMesh.rotation.x = elapsedTime * 0.01;
    
    phoenixA.rotation.x = elapsedTime * 0.5;
    phoenixA.rotation.y = elapsedTime * 0.5;

    renderer.render(scene, camera);
}

// 6. Ajuste dinámico de pantalla si el iPhone rota
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Nota de usabilidad para iOS: Los sensores del giroscopio a veces requieren un clic previo
// En la siguiente iteración añadiremos el botón "Entrar a nuestro ecosistema" para solicitar este permiso.
animate();
