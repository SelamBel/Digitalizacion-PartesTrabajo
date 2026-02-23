import { Ticket } from "../class/Ticket.js";
import { Parte } from "../class/Parte.js";
import { Cliente } from "../class/Cliente.js";

let ticket;

$(document).ready(function () {
    rellenarConTicket();
    $("#submitParte").on("click", recogerParte);
    $("#cancelarParte").on("click", cancelarParte);
});

function rellenarConTicket() {
    //TODO: DATOS DE EJEMPLO. BORRAR CUANDO SE TENGA ACCESO A BASE DE DATOS
    const empleados = ["Sel", "Mangel"];
    const totalEmpleados = ["Sel", "Mangel", "Edel", "Rafa", "Dani"];
    const cliente = new Cliente("Pepe Carlo", "622942844", "pepe@correo.com");

    ticket = new Ticket("Titulo de problema problematico", cliente, "Descripción de la movida", "Mi casa chula", empleados, 2, "hecha");

    console.log(ticket);
    

    $("#descripcionCliente").val(ticket.clienteTXT());
    $("#titulo").val(ticket.tituloSolicitud);
    $("#descripcionSolicitud").val(ticket.descripcionSolicitud);
    $("#localizacion").val(ticket.localicacionSolicitud);

    const select = $("#empleado");
    select.empty();
    totalEmpleados.forEach(function (empleado) {
        const option = $("<option>").val(empleado).text(empleado);
        if (ticket.empleados.includes(empleado)) {
            option.prop("selected", true);
        }
        select.append(option);
    });
}

function recogerParte() {
    const parte = new Parte(
        $("#titulo").val(),
        $("#descripcionCliente").val(),
        $("#descripcionSolicitud").val(),
        $("#localizacion").val(),
        $("#empleado").val(),
        ticket.prioridad,
        ticket.estado,
        $("#fecha").val(),
        $("#horas").val(),
        $("#materialUtilizado").val()
    );

    console.log(parte);
}

function cancelarParte() {
    window.location.href = "../../index.html";
}