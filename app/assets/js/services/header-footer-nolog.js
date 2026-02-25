import { auth } from "../firebase/firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

$(document).ready(function () {

    initTheme();

    $(".header-container").load("assets/header-footer/header-nolog.html", function () {
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
    })

    $(".footer-container").load("assets/header-footer/footer.html");
});

