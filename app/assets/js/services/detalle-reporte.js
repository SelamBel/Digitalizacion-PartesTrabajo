// Lógica para mostrar los datos del reporte
const data = JSON.parse(localStorage.getItem("reporteSeleccionado"));

if (data) {
    document.getElementById("contenido-reporte").innerHTML = `
        <div class="campo"><label>Fecha:</label> <span>${data.fecha}</span></div>
        <div class="campo"><label>Cliente:</label> <span>${data.cliente}</span></div>
        <div class="campo"><label>Horas trabajadas:</label> <span>${data.horas}</span></div>
        <div class="campo"><label>Material utilizado:</label> <span>${data.material}</span></div>
        <div class="campo"><label>Estado:</label> <span class="estado ${data.estado.toLowerCase()}">${data.estado}</span></div>
    `;
    // Cambiamos el título de la pestaña opcionalmente
    document.title = `Detalle - ${data.cliente}`;
} else {
    document.getElementById("contenido-reporte").innerHTML = "<p>No se encontró información del reporte.</p>";
}