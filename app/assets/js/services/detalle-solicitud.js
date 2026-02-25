$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const solicitudId = params.get("solicitudId");
    const solicitud = JSON.parse(localStorage.getItem("solicitudSeleccionada"));

    if (!solicitud) {
        $("#contenido-reporte").html("<p>No se encontró la solicitud.</p>");
        return;
    }

    const fecha = new Date(solicitud.creadoEn.seconds * 1000).toLocaleDateString("es-ES");

    $("#contenido-reporte").html(`
        <table class="tabla-detalle">
            <tr>
                <th>Cliente</th>
                <td>${solicitud.cliente.nombre}</td>
            </tr>
            <tr>
                <th>Teléfono</th>
                <td>${solicitud.cliente.telefono}</td>
            </tr>
            <tr>
                <th>Correo</th>
                <td>${solicitud.cliente.correo}</td>
            </tr>
            <tr>
                <th>Título</th>
                <td>${solicitud.titulo}</td>
            </tr>
            <tr>
                <th>Descripción</th>
                <td>${solicitud.descripcion}</td>
            </tr>
            <tr>
                <th>Localización</th>
                <td>${solicitud.localizacion}</td>
            </tr>
        </table>
    `);

    $(".button[type='submit']").on("click", function () {
        window.location.href = `./crearTicket.html?solicitudId=${solicitudId}`;
    });
});