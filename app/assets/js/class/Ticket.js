class Ticket {
  constructor(id, titulo, descripcion, prioridad, estado) {
    this._id = id
    this._titulo = titulo
    this._descripcion = descripcion
    this._empleados = []
    this._prioridad = prioridad
    this._estado = estado
  }

  // GETTERS
  get id() {
    return this._id
  }

  get titulo() {
    return this._titulo
  }

  get descripcion() {
    return this._descripcion
  }

  get empleados() {
    return this._empleados
  }

  get prioridad() {
    return this._prioridad
  }

  get estado() {
    return this._estado
  }

  // SETTERS
  set titulo(value) {
    this._titulo = value
  }

  set descripcion(value) {
    this._descripcion = value
  }

  set empleados(value) {
    this._empleados = value
  }

  set prioridad(value) {
    this._prioridad = value
  }

  set estado(value) {
    this._estado = value
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