import { app } from "./firebase-config.js";
import { 
  getAuth, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const auth = getAuth(app);

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const email = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("Login correcto:", user.email);

  } catch (error) {
    console.error("Error en login:", error.code, error.message);
    alert("Usuario o contraseña incorrectos");
  }
});
