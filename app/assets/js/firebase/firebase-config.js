import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDKb9xivF2ekPt1dlU_I0BeSS2TG6Ncl-k",
    authDomain: "reportes-digitalizacion.firebaseapp.com",
    projectId: "reportes-digitalizacion",
    storageBucket: "reportes-digitalizacion.firebasestorage.app",
    messagingSenderId: "192889489963",
    appId: "1:192889489963:web:66f4bce0cd65b667ae786e",
    measurementId: "G-X8JRZN0WL8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);