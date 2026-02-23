import { Cliente } from "../class/Cliente.js";
export class Solicitud {
  constructor(titulo, cliente, descripcion, localicacion) {
    this._titulo = titulo;
    this._cliente = new Cliente(
      cliente.nombre,
      cliente.telefono,
      cliente.correo,
    );
    this._descripcion = descripcion;
    this._localicacion = localicacion;
  }

  // Getter y Setter para id_solicitus
  get idSolicitus() {
    return this._id_solicitud;
  }

  set idSolicitus(valor) {
    //TODO: Recoger de firebase
    return valor;
  }

  // Getter y Setter para cliente
  get cliente() {
    return this._cliente;
  }

  set cliente(valor) {
    this._cliente = valor;
  }

  clienteTXT() {
    let txt = `Nombre: ${this._cliente.nombre}\nTlf: ${this._cliente.telefono}\nCorreo: ${this._cliente.correo}`;

    return txt;
  }

  // Getter y Setter para descripcion
  get descripcion() {
    return this._descripcion;
  }

  set descripcion(valor) {
    this._descripcion = valor;
  }

  // Getter y Setter para localicacion
  get localicacion() {
    return this._localicacion;
  }

  set localicacion(valor) {
    this._localicacion = valor;
  }

  // Getter y Setter para titulo
  get titulo() {
    return this._titulo;
  }

  set titulo(valor) {
    this._titulo = valor;
  }
}
