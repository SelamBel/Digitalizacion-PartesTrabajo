// assets/js/services/home.js
import { obtenerNombreUsuario } from "../firebase/userService.js";

$(document).ready(function () {
    rellenarTabla(reportes);
});

obtenerNombreUsuario((nombre) => {
    if (nombre) {
        document.title = `Home - ${nombre}`;

        const headerTitle = document.getElementById("headerTitle");
        if (headerTitle) {
            headerTitle.textContent = `Home - ${nombre}`;
        }

        const saludo = document.querySelector("main h2");
        if (saludo) saludo.textContent = `Reportes de ${nombre}`;
    }
});

////////////////////////

// 1. Datos inventados
const reportes = [
    { fecha: "2026/02/15", horas: 8, material: "Cableado, Enchufes", cliente: "Instalaciones S.A.", estado: "aprobado" },
    { fecha: "2026/02/14", horas: 4, material: "Tubería PVC", cliente: "Particular S.L.", estado: "pendiente" },
    { fecha: "2026/02/13", horas: 6, material: "Pintura, Brochas", cliente: "Reformas Pepe", estado: "enviado" },
    { fecha: "2026/02/12", horas: 2, material: "Bombillas LED", cliente: "Comunidad Centro", estado: "borrador" },
    { fecha: "2026/02/11", horas: 5, material: "Silicona, Pistola", cliente: "Ventanas Madrid", estado: "rechazado" }
];

/**
 * Función para rellenar la tabla dinámicamente
 */
function rellenarTabla(datos) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    datos.forEach((item, index) => {
        const fila = document.createElement("tr");
        // Añadimos un estilo de cursor para que el usuario sepa que es clicable
        fila.style.cursor = "pointer"; 

        fila.innerHTML = `
            <td>${item.fecha}</td>
            <td>${item.horas}</td>
            <td>${item.material}</td>
            <td>${item.cliente}</td>
            <td><span class="estado ${item.estado.toLowerCase()}">${item.estado}</span></td>
        `;

        // EVENTO DE CLICK
        fila.addEventListener("click", () => {
            // Guardamos el objeto completo en el almacenamiento local del navegador
            localStorage.setItem("reporteSeleccionado", JSON.stringify(item));
            // Redirigimos a la página de detalles
            window.location.href = "detalle-reporte.html";
        });

        tbody.appendChild(fila);
    });
}

