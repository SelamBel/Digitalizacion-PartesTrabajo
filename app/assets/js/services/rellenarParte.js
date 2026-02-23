import { Ticket } from "../class/Ticket.js";
import { Parte } from "../class/Parte.js";
import { Cliente } from "../class/Cliente.js";

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
  rellenarDate();
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

function recogerParte(e) {
  e.preventDefault();

  const datos = recogerDatos();
  if (!datos) return;
  const parte = new Parte(
    ticket.titulo,
    ticket.cliente,
    ticket.descripcion,
    ticket.localicacion,
    ticket.empleados,
    ticket.prioridad,
    ticket.estado,
    datos.get("fecha"),
    datos.get("horas"),
    datos.get("materialUtilizado"),
  );

  console.log(parte);
}

function rellenarDate() {
  let fecha = new Date().toISOString().split("T")[0];
  $("#fecha").val(fecha);
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
