$(document).ready(function () {
    const ticket = JSON.parse(localStorage.getItem("ticketSeleccionado"));

    if (!ticket) {
        $("#contenido-ticket").html("<p>No se encontró el ticket.</p>");
        return;
    }

    const fecha = new Date(ticket.creadoEn.seconds * 1000).toLocaleDateString("es-ES");
    const estadoFormateado = ticket.estado.replace(/_/g, " ");

    $("#contenido-ticket").html(`
        <table class="tabla-detalle">
            <tr>
                <th>Título</th>
                <td>${ticket.titulo}</td>
            </tr>
            <tr>
                <th>Descripción</th>
                <td class="td-descripcion">${ticket.descripcion}</td>
            </tr>
            <tr>
                <th>Localización</th>
                <td>${ticket.localizacion}</td>
            </tr>
            <tr>
                <th>Cliente</th>
                <td>${ticket.datosCliente}</td>
            </tr>
            <tr>
                <th>Prioridad</th>
                <td><span class="estado ${ticket.prioridad}">${ticket.prioridad}</span></td>
            </tr>
            <tr>
                <th>Estado</th>
                <td><span class="estado ${ticket.estado}">${estadoFormateado}</span></td>
            </tr>
            <tr>
                <th>Fecha de creación</th>
                <td>${fecha}</td>
            </tr>
        </table>
    `);

    $(".button[type='submit']").on("click", function () {
        window.location.href = `./rellenarParte.html?ticketId=${ticket.id}`;
    });
});