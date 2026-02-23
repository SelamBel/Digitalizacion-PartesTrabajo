export class Solicitud {
  constructor(titulo, cliente, descripcion, localicacion) {
    this._titulo = titulo;
    this._cliente = cliente;
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

/**
 * Se usa el prefijo `_` por convención para indicar que la propiedad es “privada”.
 * Los getters y setters se acceden **como propiedades**, no como funciones:
 *
 * const ticket = new Ticket(1, "Error", "No carga", "Alta", "Abierto")
 *
 * console.log(ticket.titulo)   // getter
 * ticket.estado = "Cerrado"    // setter
 */
