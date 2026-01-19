fetch("assets/header-footer/header.html")
    .then(res => res.text())
    .then(html => {
        document.querySelector('.header-container').innerHTML = html;
        document.getElementById("headerTitle").innerHTML = document.title;
    })
    .catch(err => console.error("Error cargando el header:", err));