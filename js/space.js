// MOTOR ESPACIAL THREE.JS CON GIROSCOPIO REAL
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('space-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Campo estelar
const starGeo = new THREE.BufferGeometry();
const starPos = new Float32Array(1800 * 3);
for(let i = 0; i < 5400; i++) {
    starPos[i] = (Math.random() - 0.5) * 900;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const starMat = new THREE.PointsMaterial({ color: 0x4cc9f0, size: 1.3 });
const starField = new THREE.Points(starGeo, starMat);
scene.add(starField);

// Agujero Negro con Anillo de Acreción
const ringGeo = new THREE.RingGeometry(3, 6, 32);
const ringMat = new THREE.MeshBasicMaterial({ color: 0xff75a0, side: THREE.DoubleSide });
const blackHole = new THREE.Mesh(ringGeo, ringMat);
blackHole.position.set(0, 0, -15);
scene.add(blackHole);
camera.position.z = 5;

// Detección de giroscopio en móviles
window.addEventListener('deviceorientation', (e) => {
    if(e.beta && e.gamma) {
        starField.rotation.x = e.beta * 0.0015;
        starField.rotation.y = e.gamma * 0.0015;
        blackHole.rotation.z = e.gamma * 0.003;
    }
});

function renderSpace() {
    requestAnimationFrame(renderSpace);
    blackHole.rotation.z += 0.008;
    starField.rotation.z += 0.0002;
    renderer.render(scene, camera);
}
renderSpace();