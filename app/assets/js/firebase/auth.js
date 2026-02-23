import { auth, db } from "./firebase-config.js"; 
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
            const user = userCredential.user;

            const docSnap = await getDoc(doc(db, "usuarios", user.uid));

            if (docSnap.exists() && docSnap.data().rol === "admin") {
                window.location.href = "./app/homeAdmin.html";
            } else {
                window.location.href = "./app/home.html";
            }

        } catch (error) {
            console.error("Error al iniciar sesión:", error.code);
            alert("Error: " + error.message);
        }
    });
});