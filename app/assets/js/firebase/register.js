import { auth, db } from "./firebase-config.js"; 
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const btnRegistrar = document.getElementById("btnRegistrar");

    btnRegistrar.addEventListener("click", async () => {
        const nombre = document.getElementById("cliente").value.trim();
        const dni = document.getElementById("dni").value.trim();
        const email = document.getElementById("email").value.trim();
        const pass = document.getElementById("password").value;
        const confirmPass = document.getElementById("confirmPass").value;

        if (!nombre || !dni || !email || !pass) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (pass !== confirmPass) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        if (pass.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;

            await setDoc(doc(db, "usuarios", user.uid), {
                nombre: nombre,
                dni: dni,
                email: email,
                rol: "usuario",
                createdAt: serverTimestamp() 
            });

            alert("¡Cuenta creada con éxito!");
            window.location.href = "home.html";

        } catch (error) {
            console.error(error);

            if (error.code === "auth/email-already-in-use") {
                alert("Este email ya está registrado.");
            } else if (error.code === "auth/invalid-email") {
                alert("El email no es válido.");
            } else {
                alert("Error al registrar: " + error.message);
            }
        }
    });
});