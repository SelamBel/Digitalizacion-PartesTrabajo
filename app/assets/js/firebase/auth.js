import { auth } from "./firebase-config.js"; 
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const btnEntrar = document.getElementById("btnEntrar");

    btnEntrar.addEventListener("click", async (e) => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Por favor, rellena todos los campos");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Inicio de sesión exitoso:", userCredential.user.email);
            window.location.href = "./app/home.html";  

        } catch (error) {
            console.error("Error al iniciar sesión:", error.code);
            alert("Error: " + error.message);
        }
    });
});