// js/jardin.js - Datos e Interacción de Girasoles

const GIRASOLES_DATOS = [
    {
        id: 1,
        titulo: "Girasol del Alba: Confianza Nocturna",
        hojas: [
            { id: "h1", titulo: "1. Madrugada en Discord", sanada: true },
            { id: "h2", titulo: "2. Miedo a no ser prioridad", sanada: true },
            { id: "h3", titulo: "3. Desvelos extremos", sanada: false }
        ],
        miError: "Cuando cambiaron tus planes y me muteé en Discord para no despertarme, no preví que se interpretara como silencio punitivo.",
        diagnostico: "Hipervigilancia afectiva ante cambios imprevistos + retraimiento defensivo por fatiga.",
        empatia: "Te hice sentir juzgada e insegura sobre tu lugar en mi vida.",
        compromiso: "Comunicar siempre con ternura y despedirme amorosamente antes de apagar la llamada."
    },
    {
        id: 2,
        titulo: "Girasol de la Claridad: Transparencia Digital",
        hojas: [
            { id: "h4", titulo: "1. Notificaciones de FB Parejas", sanada: true },
            { id: "h5", titulo: "2. Asunciones rápidas", sanada: true }
        ],
        miError: "No explicar con suficiente rapidez mi historial en redes, generando dudas sobre otras opciones.",
        diagnostico: "Necesidad de reafirmación inmediata de seguridad comunicativa.",
        empatia: "Te hizo sentir que debías defender tu lugar o dudar de mi entrega.",
        compromiso: "Reafirmar que solo tengo ojos y corazón para ti, aclarando dudas con calma."
    }
];

function renderizarInvernadero() {
    const contenedor = document.getElementById('girasolesContainer');
    if (!contenedor) return;

    contenedor.innerHTML = GIRASOLES_DATOS.map(girasol => `
        <div class="girasol-card">
            <h3>🌻 ${girasol.titulo}</h3>
            <div class="hojas-list">
                ${girasol.hojas.map(h => `
                    <span class="badge ${h.sanada ? 'sanada' : 'pendiente'}">
                        ${h.sanada ? '🍃 Sanada:' : '🍂 Por Sanar:'} ${h.titulo}
                    </span>
                `).join('')}
            </div>
            <div class="analisis-box">
                <p><strong>Mi Error:</strong> ${girasol.miError}</p>
                <p><strong>Diagnóstico Psicológico:</strong> ${girasol.diagnostico}</p>
                <p><strong>Empatía:</strong> ${girasol.empatia}</p>
                <p class="compromiso-text"><strong>Nuevo Compromiso:</strong> ${girasol.compromiso}</p>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderizarInvernadero);
