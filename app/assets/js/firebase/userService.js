import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Escucha el estado de la sesión y obtiene los datos del perfil
 * @param {Function} callback - Función que recibe el nombre del usuario o null
 */
export function obtenerNombreUsuario(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const docRef = doc(db, "usuarios", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    callback(docSnap.data().nombre);
                } else {
                    console.warn("No hay datos en Firestore para el UID:", user.uid);
                    callback("Usuario");
                }
            } catch (error) {
                console.error("Error al consultar Firestore:", error);
                callback("Usuario");
            }
        } else {
            callback(null); // No hay sesión iniciada
        }
    });
}