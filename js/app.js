// js/app.js - Lógica Principal
const CONFIG = {
    kevin: { nacimiento: new Date("2003-03-24T00:00:00"), lat: 18.8497, lon: -97.1036 },
    analy: { nacimiento: new Date("1998-09-22T00:00:00"), lat: 18.9073, lon: -98.4371 },
    aniversario: new Date("2026-07-22T00:00:00"),
    ultimoPeriodo: new Date("2026-09-11T00:00:00"),
    duracionCiclo: 28
};

// 1. Contador de Aniversario en Tiempo Real
function actualizarContador() {
    const ahora = new Date();
    const diff = ahora - CONFIG.aniversario;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const elem = document.getElementById('contadorDias');
    if (elem) elem.innerText = `${d}d ${h}h ${m}m ${s}s`;
}

// 2. Monitor Hormonal del Ciclo
function actualizarCiclo() {
    const hoy = new Date();
    const diffDias = Math.floor((hoy - CONFIG.ultimoPeriodo) / (1000 * 60 * 60 * 24)) % CONFIG.duracionCiclo;
    const diaActual = diffDias + 1;

    const elemDia = document.getElementById('diaCicloNum');
    const elemFase = document.getElementById('faseCicloTexto');
    const barE = document.getElementById('barEnergia');
    const barA = document.getElementById('barApapacho');
    const elemRec = document.getElementById('recomendacionCiclo');

    if (!elemDia) return;

    elemDia.innerText = diaActual;

    if (diaActual <= 5) {
        elemFase.innerText = "Fase Menstrual (Sensibilidad y Descanso)";
        barE.style.width = "30%";
        barA.style.width = "100%";
        elemRec.innerText = "Recomendación: Consentir con té caliente, chocolatitos, masajitos y total refugio afectivo.";
    } else if (diaActual <= 13) {
        elemFase.innerText = "Fase Folicular (Energía en Aumento)";
        barE.style.width = "85%";
        barA.style.width = "60%";
        elemRec.innerText = "Recomendación: Excelente momento para entrenar duro en el gym y crear proyectos juntos.";
    } else if (diaActual <= 16) {
        elemFase.innerText = "Fase Ovulatoria (Brillo Máximo)";
        barE.style.width = "100%";
        barA.style.width = "75%";
        elemRec.innerText = "Recomendación: Punto máximo de vitalidad y comunicación fluida.";
    } else {
        elemFase.innerText = "Fase Lútea (Antojos y Cuidado)";
        barE.style.width = "45%";
        barA.style.width = "90%";
        elemRec.innerText = "Recomendación: Ofrecer pastel de chocolate/3 leches y brindar comprensión absoluta.";
    }
}

// 3. Clima API
async function cargarClima(lat, lon, idElem, ciudad) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        const elem = document.getElementById(idElem);
        if (elem && data.current_weather) {
            elem.innerText = `🌡️ ${ciudad}: ${data.current_weather.temperature}°C`;
        }
    } catch (e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    setInterval(actualizarContador, 1000);
    actualizarCiclo();

    cargarClima(CONFIG.kevin.lat, CONFIG.kevin.lon, 'climaOrizaba', 'Orizaba');
    cargarClima(CONFIG.analy.lat, CONFIG.analy.lon, 'climaAtlixco', 'Atlixco');
});
