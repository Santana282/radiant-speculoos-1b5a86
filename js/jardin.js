// js/jardin.js - Invernadero de Girasoles
const GIRASOLES = [
    {
        id: 1,
        titulo: "Girasol del Alba: Confianza Nocturna",
        hojas: [
            { txt: "Madrugada en Discord", sanada: true },
            { txt: "Miedo a no ser prioridad", sanada: true },
            { txt: "Desvelos extremos", sanada: false }
        ],
        miError: "Mutear la llamada sin aviso claro por cansancio extremo, interpretándose como distancia.",
        diagnostico: "Hipervigilancia afectiva ante cambios repentinos de dinámica comunicativa.",
        compromiso: "Despedirme siempre con calidez y ternura antes de desconectarme."
    },
    {
        id: 2,
        titulo: "Girasol de la Claridad: Transparencia Digital",
        hojas: [
            { txt: "Notificaciones de FB Parejas", sanada: true },
            { txt: "Incertidumbre inmediata", sanada: true }
        ],
        miError: "Falta de explicación oportuna respecto a funciones o historial de redes sociales.",
        diagnostico: "Necesidad de reafirmación explícita sobre la elección de pareja consciente.",
        compromiso: "Reafirmar activamente que Analy es mi única elección de vida."
    },
    {
        id: 3,
        titulo: "Girasol del Foco: Tiempos de Calidad",
        hojas: [
            { txt: "Distracción en series/juegos", sanada: true },
            { txt: "Multitarea comunicativa", sanada: false }
        ],
        miError: "Dividir mi atención mientras veíamos contenido juntos.",
        diagnostico: "Para Analy, compartir una actividad exige presencia y conexión plena.",
        compromiso: "Dedicar bloques de tiempo libre de distracciones al estar con ella."
    }
];

function renderizarGirasoles() {
    const grid = document.getElementById('girasolesGrid');
    if (!grid) return;

    grid.innerHTML = GIRASOLES.map(g => `
        <div class="girasol-card">
            <h3>🌻 ${g.titulo}</h3>
            <div class="hojas-list">
                ${g.hojas.map(h => `
                    <span class="badge ${h.sanada ? 'sanada' : 'pendiente'}">
                        ${h.sanada ? '🍃 Sanada:' : '🍂 En proceso:'} ${h.txt}
                    </span>
                `).join('')}
            </div>
            <p style="margin-top:10px;"><strong>Mi Error:</strong> ${g.miError}</p>
            <p><strong>Diagnóstico:</strong> ${g.diagnostico}</p>
            <p style="color:#eccc68; margin-top:5px;"><strong>Nuevo Compromiso:</strong> ${g.compromiso}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderizarGirasoles);
