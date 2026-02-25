import { auth } from "../firebase/firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

$(document).ready(function () {

    initTheme();

    $(".header-container").load("assets/header-footer/header.html", function () {
        $("#headerTitle").text(document.title);

        const temaActual = localStorage.getItem("tema") || "default";
        const btnActivo = $(".btnCambiarTema").filter(function () {
            return $(this).text().toLowerCase() === temaActual;
        });
        btnActivo.closest("ul").prependTo("#liBtnCambiarTema");

        $(".btnCambiarTema").on("click", function () {
            const tema = $(this).data("tema") || $(this).text().toLowerCase();
            setTheme(tema);
            $(this).closest("ul").prependTo("#liBtnCambiarTema");
        });

        $("#btnCerrarSesion").on("click", async function () {
            try {
                await signOut(auth);
                console.log("Sesión cerrada correctamente");
                window.location.href = "../index.html";
            } catch (error) {
                console.error("Error al cerrar sesión:", error);
                alert("Error al cerrar sesión: " + error.message);
            }
        });
    })

    $(".footer-container").load("assets/header-footer/footer.html");
});

