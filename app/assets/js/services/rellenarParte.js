import { db, auth } from "../firebase/firebase-config.js";
import { doc, getDoc, addDoc, collection, Timestamp, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let ticketActual = null;
let usuarioActual = null;

$(document).ready(function () {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "../index.html";
      return;
    }
    usuarioActual = user;
    cargarTicket();
  });

  $("#form_partes").on("submit", function (e) {
    e.preventDefault();
    guardarParte();
  });

  $("#cancelarParte").on("click", function () {
    window.location.href = "./home.html";
  });
});

async function cargarTicket() {
  const params = new URLSearchParams(window.location.search);
  const ticketId = params.get("ticketId");

  let ticket = null;

  if (ticketId) {
    try {
      const docSnap = await getDoc(doc(db, "tickets", ticketId));
      if (docSnap.exists()) {
        ticket = { id: docSnap.id, ...docSnap.data() };
      }
    } catch (error) {
      console.error("Error al cargar el ticket:", error);
    }
  } else {
    const stored = localStorage.getItem("ticketSeleccionado");
    if (stored) ticket = JSON.parse(stored);
  }

  if (!ticket) {
    alert("No se encontró el ticket.");
    window.location.href = "./home.html";
    return;
  }

  ticketActual = ticket;
  rellenarFormulario(ticket);
}

async function rellenarFormulario(ticket) {
  $("#descripcionCliente").val(ticket.datosCliente);
  $("#titulo").val(ticket.titulo);
  $("#descripcionSolicitud").val(ticket.descripcion);
  $("#localizacion").val(ticket.localizacion);

  try {
    const docSnap = await getDoc(doc(db, "usuarios", usuarioActual.uid));
    if (docSnap.exists()) {
      $("#empleado").val(docSnap.data().nombre);
    }
  } catch (error) {
    console.error("Error al obtener nombre del empleado:", error);
    $("#empleado").val(usuarioActual.email);
  }
}

async function guardarParte() {
  const fecha = $("#fecha").val().trim();
  const horas = $("#horas").val().trim();
  const materialUtilizado = $("#materialUtilizado").val().trim();

  if (!fecha || !horas || !materialUtilizado) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  if (horas <= 0) {
    alert("Las horas deben ser mayor que 0.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "partes"), {
      ticketId: ticketActual.id,
      titulo: ticketActual.titulo,
      descripcion: ticketActual.descripcion,
      localizacion: ticketActual.localizacion,
      datosCliente: ticketActual.datosCliente,
      empleadoUid: usuarioActual.uid,
      fecha: Timestamp.fromDate(new Date(fecha)),
      horas: Number(horas),
      materialUtilizado: materialUtilizado,
      estado: "pendiente",
      creadoEn: Timestamp.now()
    });

    console.log("Parte guardado con ID:", docRef.id);

    await deleteDoc(doc(db, "tickets", ticketActual.id));
    console.log("Ticket eliminado:", ticketActual.id);

    $(".response").fadeIn();

    setTimeout(() => {
      window.location.href = "./home.html";
    }, 1500);

  } catch (error) {
    console.error("Error al guardar el parte:", error);
    alert("Error al guardar el parte: " + error.message);
  }
}