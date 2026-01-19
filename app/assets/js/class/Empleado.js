class Empleado {
    constructor(id, estado, direccion, telf, email, fnac, nom, ape1, ape2, dni) {
        this._id = id;
        this._estado = estado;
        this._direccion = direccion;
        this._telefono = telf;
        this._email = email;
        this._fechaNacimiento = fnac;
        this._nombre = nom;
        this._apellido1 = ape1;
        this._apellido2 = ape2;
        this._dni = dni;
    }

    // GETTERS
    get id() {
        return this._id;
    }

    get estado() {
        return this._estado;
    }

    get direccion() {
        return this._direccion;
    }

    get telefono() {
        return this._telefono;
    }

    get email() {
        return this._email;
    }

    get fechaNacimiento() {
        return this._fechaNacimiento;
    }

    get nombre() {
        return this._nombre;
    }

    get apellido1() {
        return this._apellido1;
    }

    get apellido2() {
        return this._apellido2;
    }

    get dni() {
        return this._dni;
    }

    // SETTERS
    set id(value) {
        this._id = value;
    }

    set estado(value) {
        this._estado = value;
    }

    set direccion(value) {
        this._direccion = value;
    }

    set telefono(value) {
        this._telefono;
    }

    set email(value) {
        this._email = value;
    }

    set fechaNacimiento(value) {
        this._fechaNacimiento = value;
    }

    set nombre(value) {
        this._nombre = value;
    }

    set apellido1(value) {
        this._apellido1 = value;
    }

    set apellido2(value) {
        this._apellido2 = value;
    }

    set dni(value) {
        this._dni = value;
    }
}