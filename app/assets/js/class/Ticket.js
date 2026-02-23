import { Solicitud } from "./Solicitud.js";
export class Ticket extends Solicitud {
  constructor(
    titulo,
    cliente,
    descripcion,
    localizacion,
    empleados,
    prioridad,
    estado) {
    super(
      titulo,
      cliente,
      descripcion,
      localizacion,
    );
    this._empleados = empleados
    this._prioridad = prioridad
    this._estado = estado
  }

  // GETTERS
  get empleados() {
    return this._empleados
  }

  get prioridad() {
    return this._prioridad
  }

  get estado() {
    return this._estado
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