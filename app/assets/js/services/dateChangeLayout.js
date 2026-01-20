// TODO!: Deprecated
//! Las fechas deben venir formateadas desde la base de datos.
//! No se deberían obtener ni reformatear desde el DOM.

document.addEventListener("DOMContentLoaded", () => {
    let celdas;

    if (document.querySelector("main h2").textContent.includes("Reportes Realizados")) {
        celdas = document.querySelectorAll("tbody td:first-child");
    } else {
        celdas = document.querySelectorAll("tbody td:nth-child(2)");
    }

    const fechasOriginales = [];
    for (let i = 0; i < celdas.length; i++) {
        fechasOriginales.push(celdas[i].textContent);
    }

    function formatearFechas() {
        const esMovil = window.matchMedia("(max-width: 768px)").matches;

        for (let i = 0; i < celdas.length; i++) {
            const td = celdas[i];
            const fecha = fechasOriginales[i];
            const partes = fecha.split("-");

            if (esMovil) {
                td.textContent = partes[0].slice(2) + "/" + partes[1] + "/" + partes[2];
            } else {
                td.textContent = fecha;
            }
        }
    }

    formatearFechas();
    window.addEventListener("resize", formatearFechas);
});
