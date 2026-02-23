$(document).ready(function () {
    const parte = JSON.parse(localStorage.getItem("parteSeleccionado"));

    if (!parte) {
        $("#contenido-parte").html("<p>No se encontró el parte.</p>");
        return;
    }

    const fecha = new Date(parte.creadoEn.seconds * 1000).toLocaleDateString("es-ES");

    $("#contenido-parte").html(`
        <table class="tabla-detalle">
            <tr>
                <th>Título</th>
                <td>${parte.titulo}</td>
            </tr>
            <tr>
                <th>Descripción</th>
                <td>${parte.descripcion}</td>
            </tr>
            <tr>
                <th>Localización</th>
                <td>${parte.localizacion}</td>
            </tr>
            <tr>
                <th>Cliente</th>
                <td>${parte.datosCliente}</td>
            </tr>
            <tr>
                <th>Estado</th>
                <td><span class="estado ${parte.estado}">${parte.estado}</span></td>
            </tr>
            <tr>
                <th>Fecha de creación</th>
                <td>${fecha}</td>
            </tr>
            <tr>
                <th>Horas trabajadas</th>
                <td>${parte.horas} horas</td>
            </tr>
            <tr>
                <th>Materiales usados</th>
                <td>${parte.materialUtilizado}</td>
            </tr>
        </table>
    `);
});