// js/app.js - Lógica Principal, Datos Afectivos y Hormonales

const DATOS_PAREJA = {
    kevin: {
        nombreCompleto: "Kevin Santana Ramírez",
        fechaNacimiento: new Date("2003-03-24T00:00:00"),
    },
    analy: {
        nombreCompleto: "Analy Monserrat Vázquez Gómez",
        fechaNacimiento: new Date("1998-09-22T00:00:00"),
        ubicacion: "Calle Emiliano Zapata, C.P. 74290, Atlixco, Puebla",
        carrera: "Gastronomía"
    },
    aniversarioOficial: new Date("2026-07-22T00:00:00"),
    // Último ciclo reportado por Analy (11 de Septiembre de 2026)
    ultimoPeriodo: new Date("2026-09-11T00:00:00"),
    duracionCiclo: 28
};

// 1. Calculadora de Edades y Días Juntos Exactos
function calcularTiempos() {
    const ahora = new Date();

    // Días de Aniversario
    const diffTiempo = Math.abs(ahora - DATOS_PAREJA.aniversarioOficial);
    const diasJuntos = Math.floor(diffTiempo / (1000 * 60 * 60 * 24));

    // Edad Kevin
    const edadKevinAnios = Math.floor((ahora - DATOS_PAREJA.kevin.fechaNacimiento) / (365.25 * 24 * 60 * 60 * 1000));
    
    // Edad Analy
    const edadAnalyAnios = Math.floor((ahora - DATOS_PAREJA.analy.fechaNacimiento) / (365.25 * 24 * 60 * 60 * 1000));

    return {
        diasJuntos,
        edadKevin: edadKevinAnios,
        edadAnaly: edadAnalyAnios
    };
}

// 2. Monitor Hormonal & Curva Lunar del Ciclo
function obtenerEstadoCiclo() {
    const hoy = new Date();
    const diffDias = Math.floor((hoy - DATOS_PAREJA.ultimoPeriodo) / (1000 * 60 * 60 * 24)) % DATOS_PAREJA.duracionCiclo;
    
    let fase = "";
    let recomendacion = "";
    let nivelEnergia = 0; // 0 a 100
    let necesidadApapacho = 0; // 0 a 100

    if (diffDias >= 0 && diffDias <= 5) {
        fase = "Fase Menstrual / Sensibilidad Alta";
        recomendacion = "Requiere apapachos incondicionales, té caliente, chocolatitos y masajitos.";
        nivelEnergia = 30;
        necesidadApapacho = 100;
    } else if (diffDias > 5 && diffDias <= 13) {
        fase = "Fase Folicular / Alta Energía";
        recomendacion = "Excelente momento para entrenar al fallo (pierna/espalda) y salir a cenar.";
        nivelEnergia = 90;
        necesidadApapacho = 60;
    } else if (diffDias > 13 && diffDias <= 16) {
        fase = "Fase Ovulatoria / Brillo Máximo";
        recomendacion = "Punto máximo de energía y conexión comunicativa.";
        nivelEnergia = 100;
        necesidadApapacho = 75;
    } else {
        fase = "Fase Lútea / Preparación & Antojos";
        recomendacion = "Preparar postres (Pastel de 3 leches, arroz con leche) y evitar discusiones innecesarias.";
        nivelEnergia = 45;
        necesidadApapacho = 90;
    }

    return { diaCiclo: diffDias + 1, fase, recomendacion, nivelEnergia, necesidadApapacho };
}

// Actualización en DOM al cargar
document.addEventListener('DOMContentLoaded', () => {
    const tiempos = calcularTiempos();
    const estadoHormonal = obtenerEstadoCiclo();

    console.log(`Kevin Santana (${tiempos.edadKevin} años) & Analy Vázquez (${tiempos.edadAnaly} años)`);
    console.log(`Días de amor activo: ${tiempos.diasJuntos} días`);
    console.log(`Día del ciclo de Analy: ${estadoHormonal.diaCiclo} - ${estadoHormonal.fase}`);
});
