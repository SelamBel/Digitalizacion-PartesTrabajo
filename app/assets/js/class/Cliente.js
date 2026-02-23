export class Cliente {
  constructor(nombre, telefono, correo) {
    this._nombre = nombre;
    this._telefono = telefono;
    this._correo = correo;
  }

  get id() {
    return this._id;
  }

  set id(valor) {
    //TODO: Recoger de firebase
    return valor;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(valor) {
    this._nombre = valor;
  }

  get telefono() {
    return this._telefono;
  }

  set telefono(valor) {
    this._telefono = valor;
  }

  get correo() {
    return this._correo;
  }

  set correo(valor) {
    this._correo = valor;
  }
}
