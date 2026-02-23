$(document).ready(function() {

    initTheme();

    $(".header-container").load("assets/header-footer/header.html", function() {
        //$("#headerTitle").text(document.title);

        $(".btnCambiarTema").on("click", function() {
            const tema = $(this).data("tema") || $(this).text().toLowerCase();
            setTheme(tema);
        });
    });

    $(".footer-container").load("assets/header-footer/footer.html");
});
