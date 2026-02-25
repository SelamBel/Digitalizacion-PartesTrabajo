import { auth, db } from "./firebase-config.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

$(document).ready(function () {
    $("#form-recuperar").on("submit", async function (e) {
        e.preventDefault();

        const email = $("#email").val().trim();

        if (!email) {
            alert("Por favor, introduce tu correo.");
            return;
        }

        try {
            const q = query(collection(db, "usuarios"), where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert("No existe ninguna cuenta con ese correo.");
                return;
            }

            await sendPasswordResetEmail(auth, email);
            alert("Correo de recuperación enviado. Revisa tu bandeja de entrada.");
            window.location.href = "../index.html";

        } catch (error) {
            console.error("Error:", error);

            if (error.code === "auth/invalid-email") {
                alert("El correo introducido no es válido.");
            } else {
                alert("Error al enviar el correo: " + error.message);
            }
        }
    });
});