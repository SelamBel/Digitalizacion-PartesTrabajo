const THEMES = ["default", "dani", "rafa", "edel", "mangel", "sel"];

function setTheme(tema) {
    if (!THEMES.includes(tema)) tema = "default";
    $("html").removeClass(THEMES.join(" ")).addClass(tema);
    localStorage.setItem("tema", tema);
}

function initTheme() {
    const temaGuardado = localStorage.getItem("tema") || "default";
    setTheme(temaGuardado);
}
