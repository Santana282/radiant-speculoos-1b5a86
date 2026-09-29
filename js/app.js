// js/app.js - Lógica del Ecosistema, Clima API y Ciclo Hormonal
const PAREJA_DATA = {
    kevin: {
        nombre: "Kevin Santana Ramírez",
        nacimiento: "2003-03-24T00:00:00",
        ciudad: "Orizaba, Veracruz",
        lat: 18.8497,
        lon: -97.1036
    },
    analy: {
        nombre: "Analy Monserrat Vázquez Gómez",
        nacimiento: "1998-09-22T00:00:00",
        carrera: "Gastronomía",
        direccion: "Calle Emiliano Zapata, C.P. 74290, Atlixco, Puebla",
        lat: 18.9073,
        lon: -98.4371
    },
    aniversario: "2026-07-22T00:00:00", // Inicio de cómputo oficial de meses
    ultimoPeriodo: "2026-09-11T00:00:00", // Referencia de ciclo reportada
    duracionCiclo: 28
};

// 1. Contador de Días Juntos
function actualizarContadorRelacion() {
    const inicio = new Date(PAREJA_DATA.aniversario);
    const ahora = new Date();
    const diffMs = ahora - inicio;
    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diffMs / (1000 * 60)) % 60);

    const elem = document.getElementById('contadorTiempoJuntos');
    if (elem) {
        elem.innerText = `${dias}d ${horas}h ${minutos}m juntos`;
    }
}

// 2. Monitor Hormonal & Curva Lunar del Ciclo Femenino
function calcularFaseHormonal() {
    const inicioCiclo = new Date(PAREJA_DATA.ultimoPeriodo);
    const hoy = new Date();
    const diasTranscurridos = Math.floor((hoy - inicioCiclo) / (1000 * 60 * 60 * 24)) % PAREJA_DATA.duracionCiclo;
    const diaActual = diasTranscurridos + 1;

    let estado = {
        dia: diaActual,
        fase: "",
        energia: 0,
        necesidadApapacho: 0,
        indicaciones: ""
    };

    if (diaActual >= 1 && diaActual <= 5) {
        estado.fase = "Fase Menstrual (Sensibilidad & Descanso)";
        estado.energia = 30;
        estado.necesidadApapacho = 100;
        estado.indicaciones = "Preparar chocolatito caliente, té de manzanilla, masajitos y evitar cualquier estrés.";
    } else if (diaActual >= 6 && diaActual <= 13) {
        estado.fase = "Fase Folicular (Alta Energía y Creatividad)";
        estado.energia = 85;
        estado.necesidadApapacho = 60;
        estado.indicaciones = "Ideal para entrenar al fallo en el gym (pierna/espalda) y cocinar recetas nuevas.";
    } else if (diaActual >= 14 && diaActual <= 16) {
        estado.fase = "Fase Ovulatoria (Brillo Máximo y Conexión)";
        estado.energia = 100;
        estado.necesidadApapacho = 75;
        estado.indicaciones = "Punto máximo de vitalidad. Excelente para salidas a cenar o jugar juntos.";
    } else {
        estado.fase = "Fase Lútea (Preparación & Antojos Dulces)";
        estado.energia = 45;
        estado.necesidadApapacho = 90;
        estado.indicaciones = "Ofrecer pastel de chocolate, 3 leches, sopecitos y brindar máxima comprensión.";
    }

    return estado;
}

// 3. Consulta de Clima en Tiempo Real (Open-Meteo API sin API Key)
async function obtenerClima(lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await response.json();
        return data.current_weather;
    } catch (err) {
        console.error("Error al obtener clima:", err);
        return null;
    }
}

async function cargarClimasPareja() {
    const climaOrizaba = await obtenerClima(PAREJA_DATA.kevin.lat, PAREJA_DATA.kevin.lon);
    const climaAtlixco = await obtenerClima(PAREJA_DATA.analy.lat, PAREJA_DATA.analy.lon);

    const elemOrizaba = document.getElementById('climaOrizaba');
    const elemAtlixco = document.getElementById('climaAtlixco');

    if (elemOrizaba && climaOrizaba) {
        elemOrizaba.innerText = `Orizaba: ${climaOrizaba.temperature}°C (Viento: ${climaOrizaba.windspeed} km/h)`;
    }
    if (elemAtlixco && climaAtlixco) {
        elemAtlixco.innerText = `Atlixco: ${climaAtlixco.temperature}°C (Viento: ${climaAtlixco.windspeed} km/h)`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorRelacion();
    setInterval(actualizarContadorRelacion, 60000);
    cargarClimasPareja();
});
