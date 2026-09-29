// js/jardin.js
// Gestor de Base de Datos Local y Lógica del Ecosistema

const JARDIN_DB_KEY = 'ecosistema_analy_db';

// Estructura Inicial (El Código Fuente de su Futuro)
const defaultEcosystem = {
    vitalidad: 10, // Comienza en 10% como lo diseñaste en tu prototipo
    acuerdosSanados: 0,
    hojasTotales: 14,
    tierra: {
        humedad: 25, // Porcentaje de agua en la tierra
        estado: 'Seca'
    },
    girasoles: [
        {
            id: 1,
            nombre: "Girasol del Alba: Confianza Nocturna",
            etapa: "1 de 5",
            hojas: [
                {
                    id_hoja: 1,
                    titulo: "Madrugada en Discord",
                    error: "Cuando cambiaron tus planes y me muteaste en Discord para no despertarme, me empaniqué de madrugada y me muteé como castigo.",
                    diagnostico: "Hipervigilancia afectiva: Ante un cambio imprevisto, mi mente activó defensas interpretando tu cuidado como ocultamiento.",
                    empatia: "Te hice sentir juzgada injustamente.",
                    propuesta: "Prometo hablar sin asumir lo peor.",
                    compromiso: "Preguntar con ternura y jamás usar el silencio como castigo.",
                    sanada: false
                }
                // Aquí agregaremos futuras hojas (problemas) conforme surjan
            ]
        }
    ]
};

// Función para inicializar o leer la Base de Datos
export function cargarEcosistema() {
    const data = localStorage.getItem(JARDIN_DB_KEY);
    if (data) {
        return JSON.parse(data);
    } else {
        localStorage.setItem(JARDIN_DB_KEY, JSON.stringify(defaultEcosystem));
        return defaultEcosystem;
    }
}

// Función para guardar cambios en tiempo real
export function guardarEcosistema(db) {
    localStorage.setItem(JARDIN_DB_KEY, JSON.stringify(db));
    actualizarInterfaz(db);
}

// Función para "Regar Girasol" (Aumenta humedad de la Tierra y Vitalidad)
export function regarJardin() {
    let db = cargarEcosistema();
    if (db.tierra.humedad < 100) {
        db.tierra.humedad += 15;
        if (db.tierra.humedad > 100) db.tierra.humedad = 100;
        
        db.vitalidad += 5;
        if (db.vitalidad > 100) db.vitalidad = 100;

        db.tierra.estado = db.tierra.humedad > 60 ? 'Tierra Fértil: Lealtad y Amor Real' : 'Necesita Apapacho';
        guardarEcosistema(db);
        return true;
    }
    return false;
}

// Función para Sanar una Hoja Específica
export function sanarHoja(id_girasol, id_hoja) {
    let db = cargarEcosistema();
    const girasol = db.girasoles.find(g => g.id === id_girasol);
    if (girasol) {
        const hoja = girasol.hojas.find(h => h.id_hoja === id_hoja);
        if (hoja && !hoja.sanada) {
            hoja.sanada = true;
            db.acuerdosSanados += 1;
            db.vitalidad += 15; // Sanar un problema da un gran boost de vitalidad
            if (db.vitalidad > 100) db.vitalidad = 100;
            guardarEcosistema(db);
        }
    }
}

// Lógica para inyectar los datos en el HTML
export function actualizarInterfaz(db) {
    const uiVitalidad = document.getElementById('ui-vitalidad');
    const uiHumedad = document.getElementById('ui-humedad');
    
    if(uiVitalidad) uiVitalidad.innerText = `${db.vitalidad}% (${db.acuerdosSanados}/6 acuerdos)`;
    if(uiHumedad) uiHumedad.innerText = `${db.tierra.humedad}% - ${db.tierra.estado}`;
}
