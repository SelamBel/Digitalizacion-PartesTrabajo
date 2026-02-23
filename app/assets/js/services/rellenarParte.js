import { Ticket } from "../class/Ticket.js";
import { Parte } from "../class/Parte.js";
import { Cliente } from "../class/Cliente.js";
import { db } from "../firebase/firebase-config.js";
import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

//TODO: DATOS DE EJEMPLO. BORRAR CUANDO SE TENGA ACCESO A BASE DE DATOS
const empleados = ["Sel", "Mangel"];
const totalEmpleados = ["Sel", "Mangel", "Edel", "Rafa", "Dani"];
const cliente = new Cliente("Pepe Carlo", "622942844", "pepe@correo.com");
let ticket = new Ticket(
    "Titulo de problema problematico",
    cliente,
    "Descripción de la movida",
    "Mi casa chula",
    empleados,
    2,
    "hecha",
);

$(document).ready(function () {
    rellenarConTicket();
    $("#form_partes").on("submit", function (e) {
        recogerParte(e);
    });
    $("#cancelarParte").on("click", cancelarParte);
});

function rellenarConTicket() {
    console.log(ticket);

    $("#descripcionCliente").val(ticket.clienteTXT());
    $("#titulo").val(ticket.titulo);
    $("#descripcionSolicitud").val(ticket.descripcion);
    $("#localizacion").val(ticket.localicacion);

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

function cancelarParte() {
    window.location.href = "./home.html";
}

async function recogerParte(e) {
    e.preventDefault();

    const datos = recogerDatos();
    if (!datos) return;

    const empleadosSeleccionados = $("#empleado").val(); 

    const parte = new Parte(
        ticket.titulo,
        ticket.cliente,
        ticket.descripcion,
        ticket.localicacion,
        empleadosSeleccionados,
        ticket.prioridad,
        ticket.estado,
        datos.get("fecha"),
        datos.get("horas"),
        datos.get("materialUtilizado"),
    );

    await guardarParte(parte);
}

function recogerDatos() {
    const fecha = $("#fecha").val().trim();
    const horas = $("#horas").val().trim();
    const materialUtilizado = $("#materialUtilizado").val().trim();

    if (!fecha || !horas || !materialUtilizado) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    $(".response").fadeIn();

    return new Map([
        ["fecha", fecha],
        ["horas", horas],
        ["materialUtilizado", materialUtilizado],
    ]);
}

async function guardarParte(parte) {
    try {
        const docRef = await addDoc(collection(db, "partes"), {
            titulo: parte.titulo,
            cliente: {
                nombre: parte.cliente.nombre,
                telefono: parte.cliente.telefono,
                email: parte.cliente.email
            },
            descripcion: parte.descripcion,
            localizacion: parte.localicacion,
            empleados: parte.empleados,
            prioridad: parte.prioridad,
            estado: parte.estado,
            fecha: Timestamp.fromDate(new Date(parte.fecha)),
            horas: Number(parte.horas),
            materialUtilizado: parte.materialUtilizado,
            creadoEn: Timestamp.now()
        });

        console.log("Parte guardado con ID:", docRef.id);
        alert("Parte guardado con éxito.");
        window.location.href = "./home.html";

    } catch (error) {
        console.error("Error al guardar el parte:", error);
        alert("Error al guardar el parte: " + error.message);
    }
}