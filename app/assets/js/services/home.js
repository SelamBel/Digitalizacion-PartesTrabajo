import { db, auth } from "../firebase/firebase-config.js";
import { obtenerNombreUsuario } from "../firebase/userService.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

obtenerNombreUsuario((nombre) => {
    if (nombre) {
        document.title = `Home - ${nombre}`;

        const headerTitle = document.getElementById("headerTitle");
        if (headerTitle) headerTitle.textContent = `Home - ${nombre}`;

        const saludo = document.querySelector("main h2");
        if (saludo) saludo.textContent = `Tickets asignados a ${nombre}`;
    }
});

$(document).ready(function () {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "../index.html";
        } else {
            cargarTickets(user.uid);
        }
    });
});

async function cargarTickets(uid) {
    try {
        const q = query(
            collection(db, "tickets"),
            where("empleados", "array-contains", uid)
        );
        const querySnapshot = await getDocs(q);

        const tbody = $("table tbody");
        tbody.empty();

        if (querySnapshot.empty) {
            tbody.append(`
                <tr>
                    <td colspan="5">No tienes tickets asignados</td>
                </tr>
            `);
            return;
        }

        querySnapshot.forEach((doc) => {
            const t = doc.data();
            const fecha = t.creadoEn.toDate().toLocaleDateString("es-ES");

            const fila = $(`
                <tr style="cursor:pointer">
                    <td>${fecha}</td>
                    <td>${t.titulo}</td>
                    <td>${t.descripcion}</td>
                    <td>${t.localizacion}</td>
                    <td><span class="estado ${t.estado}">${t.estado}</span></td>
                </tr>
            `);

            fila.on("click", () => {
                localStorage.setItem("ticketSeleccionado", JSON.stringify({ id: doc.id, ...t }));
                window.location.href = "detalle-reporte.html";
            });

            tbody.append(fila);
        });

    } catch (error) {
        console.error("Error al cargar tickets:", error);
    }
}