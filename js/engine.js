// RELOJ & MONITOR BIOLÓGICO Y TEMPORAL
function updateRelationalEngine() {
    const now = new Date();
    document.getElementById('live-clock').innerText = now.toLocaleTimeString('es-MX');

    // Tiempo juntos desde el 22 de Julio
    const startDate = new Date(2026, 6, 22);
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    document.getElementById('timer-together').innerText = `${days}d ${hours}h ${mins}m`;

    // Calculador de Ciclo Menstrual (Último registro: 11 Sep)
    const lastPeriod = new Date(2026, 8, 11);
    const cycleDay = Math.floor((now - lastPeriod) / (1000 * 60 * 60 * 24)) % 28;
    const title = document.getElementById('cycle-title');
    const desc = document.getElementById('cycle-desc');

    if(cycleDay <= 5) {
        title.innerText = "FASE MENSTRUAL / APAPACHO RENEGADO 🩸";
        desc.innerText = "Descanso absoluto, chocolatito caliente y confort. Cero presiones.";
    } else if(cycleDay <= 12) {
        title.innerText = "FASE FOLICULAR / ALTA ENERGÍA ✨";
        desc.innerText = "Energía al máximo. Excelente momento para disfrutar, compartir y sonreír juntas/os.";
    } else if(cycleDay <= 16) {
        title.innerText = "OVULACIÓN / MÁXIMA CONEXIÓN 🥚";
        desc.innerText = "Pico de sociabilidad, afecto y cercanía emocional.";
    } else {
        title.innerText = "FASE LÚTEA / SENSIBILIDAD 🌙";
        desc.innerText = "Priorizar escucha activa, paciencia y ternura.";
    }
}
setInterval(updateRelationalEngine, 1000);
updateRelationalEngine();

// CAMBIO DE PESTAÑAS (NAVEGACIÓN DOCK)
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.querySelectorAll('.dock-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

// BUZÓN Y NOTAS LOCALES
const journalInput = document.getElementById('analy-journal-input');
journalInput.value = localStorage.getItem('analy_journal_note') || '';

function saveJournalLocal() {
    localStorage.setItem('analy_journal_note', journalInput.value);
    alert('❤️ Nota guardada localmente en tu dispositivo.');
}

function sendJournalWhatsApp() {
    const text = encodeURIComponent("Hola mi amor, te escribo esto desde mi buzón en el servidor:\n\n" + journalInput.value);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function healLeafAction() {
    document.getElementById('vitality-val').innerText = "25% (2/14)";
    alert("🌻 Compromiso registrado: Anteponer la calidez afectiva antes de la logística.");
}

// AUDIO SINTETIZADO (WEB AUDIO API)
let audioCtx, osc, isAudioOn = false;
function toggleAudioEngine() {
    const btn = document.getElementById('music-btn');
    if(!isAudioOn) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine'; osc.frequency.setValueAtTime(216, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start();
        btn.innerText = "🎵 Música: ON"; btn.style.color = "var(--accent-green)";
        isAudioOn = true;
    } else {
        if(audioCtx) audioCtx.close();
        btn.innerText = "🎵 Música: OFF"; btn.style.color = "var(--accent-blue)";
        isAudioOn = false;
    }
}