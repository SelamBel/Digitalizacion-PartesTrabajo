class Responsable {
    constructor(){
        this._trabajadoresAsignados = [];
    }

    // GETTER
    get trabajadoresAsignados() {
        return this._trabajadoresAsignados;
    }

    // SETTER
    set trabajadoresAsignados(value) {
        this._trabajadoresAsignados = value;
    }
}