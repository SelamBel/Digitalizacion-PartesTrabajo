import { DEV_AUTH } from '../config/devAuth.js';

export function validarLogin(nom, pass) {
    return nom === DEV_AUTH.username && pass === DEV_AUTH.password;
}