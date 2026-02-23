import { db } from "../firebase/firebase-config.js";
import { 
    collection, getDocs, doc, getDoc, addDoc, query, 
    where, Timestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

$(document).ready(async function () {
    await cargarEmpleados();
    await cargarSolicitud();

    $("#form_ticket").on("submit", function (e) {
        e.preventDefault();
        guardarTicket();
    });

    $(".cancelar").on("click", function () {
        window.location.href = "./homeAdmin.html";
    });
});

async function cargarEmpleados() {
    try {
        const q = query(collection(db, "usuarios"), where("rol", "==", "empleado"));
        const querySnapshot = await getDocs(q);

        const select = $("#empleado");
        select.empty();

        querySnapshot.forEach((doc) => {
            const empleado = doc.data();
            select.append(
                $("<option>").val(doc.id).text(empleado.nombre)
            );
        });

    } catch (error) {
        console.error("Error al cargar empleados:", error);
    }
}

async function cargarSolicitud() {
    const params = new URLSearchParams(window.location.search);
    const solicitudId = params.get("solicitudId");

    if (!solicitudId) return;

    try {
        const docSnap = await getDoc(doc(db, "solicitudes", solicitudId));

        if (!docSnap.exists()) {
            alert("Solicitud no encontrada.");
            return;
        }

        const s = docSnap.data();

        $("#datosCliente").val(
            `Nombre: ${s.cliente.nombre}\nTlf: ${s.cliente.telefono}\nCorreo: ${s.cliente.correo}`
        );
        $("#titulo").val(s.titulo);
        $("#descripcion").val(s.descripcion);
        $("#localizacion").val(s.localizacion);

    } catch (error) {
        console.error("Error al cargar la solicitud:", error);
    }
}

async function guardarTicket() {
    const empleadosSeleccionados = $("#empleado").val();
    const prioridad = $("#prioridad").val();
    const estado = $("#estado").val();
    const titulo = $("#titulo").val();
    const descripcion = $("#descripcion").val();
    const localizacion = $("#localizacion").val();
    const datosCliente = $("#datosCliente").val();

    if (!empleadosSeleccionados || empleadosSeleccionados.length === 0) {
        alert("Por favor, asigna al menos un empleado.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const solicitudId = params.get("solicitudId");

    try {
        const docRef = await addDoc(collection(db, "tickets"), {
            solicitudId: solicitudId || null,
            titulo: titulo,
            descripcion: descripcion,
            localizacion: localizacion,
            datosCliente: datosCliente,
            empleados: empleadosSeleccionados, 
            prioridad: prioridad,
            estado: estado,
            creadoEn: Timestamp.now()
        });

        console.log("Ticket creado con ID:", docRef.id);
        alert("Ticket creado con éxito.");
        window.location.href = "./homeAdmin.html";

    } catch (error) {
        console.error("Error al crear el ticket:", error);
        alert("Error al crear el ticket: " + error.message);
    }
}