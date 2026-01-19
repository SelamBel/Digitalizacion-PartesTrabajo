class Trabajador {
    constructor() {
        this._ticketsAsignados = [];
    }

    // GETTER
    get ticketsAsignados() {
        return this._ticketsAsignados;
    }

    // SETTER
    set ticketsAsignados(value) {
        this._ticketsAsignados = value;
    }
}