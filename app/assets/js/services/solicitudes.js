// Solicitud
import { Solicitud } from "../class/Solicitud.js";
import { Cliente } from "../class/Cliente.js";

$(document).ready(function () {
  $("#form_solicitud").on("submit", function (e) {
    recogerSolicitud(e);
  });
  $("#cancelar_solicitud").on("click", cancelarParte);
});

function cancelarParte() {
  window.location.href = "../index.html";
}

function recogerSolicitud(e) {
  e.preventDefault();

  const datos = recogerDatos();

  console.log("DATOS:", datos);

  const cliente = new Cliente(
    datos.get("nombre"),
    datos.get("tlf"),
    datos.get("correo"),
  );

  const solicitud = new Solicitud(
    datos.get("titulo"),
    cliente,
    datos.get("descripcion"),
    datos.get("localizacion"),
  );

  console.log(cliente);
  console.log(solicitud);
}

function recogerDatos() {
  const nombre = $("#nombre").val().trim();
  const tlf = $("#telefono").val().trim();
  const correo = $("#correo").val().trim();
  const titulo = $("#titulo").val().trim();
  const descripcion = $("#descripcion").val();
  const localizacion = $("#localizacion").val();

  if (!titulo || !descripcion || !localizacion || !nombre || !tlf || !correo) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  if (nombre.length < 3) {
    alert("El nombre debe tener al menos 3 caracteres");
    return;
  }

  if (!/^[0-9]{9}$/.test(tlf)) {
    alert("El teléfono debe tener 9 dígitos numéricos");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    alert("El correo no es válido");
    return;
  }

  if (titulo.length < 10) {
    alert("El título debe ser más explicativo (mínimo 10 caracteres)");
    return;
  }

  if (descripcion.length < 15) {
    alert("La descripción debe tener al menos 15 caracteres");
    return;
  }

  if (localizacion.length < 5) {
    alert("La localización no parece válida");
    return;
  }
  $(".response").fadeIn();

  return new Map([
    ["nombre", nombre],
    ["tlf", tlf],
    ["correo", correo],
    ["titulo", titulo],
    ["descripcion", descripcion],
    ["localizacion", localizacion],
  ]);
}
