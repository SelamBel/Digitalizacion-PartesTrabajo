import { Ticket } from "./Ticket.js";

export class Parte extends Ticket {
  constructor(
    titulo,
    cliente,
    descripcion,
    localizacion,
    empleados,
    prioridad,
    estado,
    fecha,
    horasTrabajadas,
    materialUtilizado
  ) {
    super(titulo, cliente, descripcion, localizacion, empleados, prioridad, estado);
    this._fecha = fecha;
    this._horasTrabajadas = horasTrabajadas;
    this._materialUtilizado = materialUtilizado;
  }

  get fecha() { return this._fecha; }
  get horasTrabajadas() { return this._horasTrabajadas; }
  get materialUtilizado() { return this._materialUtilizado; }

  set fecha(value) { this._fecha = value; }
  set horasTrabajadas(value) { this._horasTrabajadas = value; }
  set materialUtilizado(value) { this._materialUtilizado = value; }
}