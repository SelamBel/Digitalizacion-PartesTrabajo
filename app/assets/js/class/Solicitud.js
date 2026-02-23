export class Solicitud {
  constructor(titulo, cliente, descripcion, localicacion) {
    this._titulo = titulo;
    this._cliente = cliente;
    this._descripcion = descripcion;
    this._localicacion = localicacion;
  }

  // Getter y Setter para cliente
  get clienteNombre() {
    return this._cliente;
  }

  set clienteNombre(valor) {
    this._cliente = valor;
  }

  // Getter y Setter para descripcion
  get descripcionSolicitud() {
    return this._descripcion;
  }

  set descripcionSolicitud(valor) {
    this._descripcion = valor;
  }

  // Getter y Setter para localicacion
  get localicacionSolicitud() {
    return this._localicacion;
  }

  set localicacionSolicitud(valor) {
    this._localicacion = valor;
  }

  // Getter y Setter para titulo
  get tituloSolicitud() {
    return this._titulo;
  }

  set tituloSolicitud(valor) {
    this._titulo = valor;
  }
}