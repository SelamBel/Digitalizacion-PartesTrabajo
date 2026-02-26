import { db } from "../firebase/firebase-config.js";
import { esAdmin } from "../firebase/userService.js";
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

$(document).ready(function () {
    esAdmin((admin) => {
        if (admin === null) {
            window.location.href = "../index.html";
        } else if (!admin) {
            window.location.href = "./home.html";
        } else {
            cargarSolicitudes();
        }
    });

    $(document).on("click", ".fila-solicitud", function () {
        const id = $(this).data("id");
        localStorage.setItem("solicitudSeleccionada", JSON.stringify({ id: doc.id, ...s }));
        window.location.href = `./detalle-solicitud.html?solicitudId=${id}`;
    });
});

async function cargarSolicitudes() {
    try {
        const q = query(collection(db, "solicitudes"), orderBy("creadoEn", "desc"));
        const querySnapshot = await getDocs(q);

        const tbody = $("#tabla-solicitudes tbody");
        tbody.empty();

        if (querySnapshot.empty) {
            tbody.append(`
                <tr>
                    <td colspan="5">No hay solicitudes pendientes</td>
                </tr>
            `);
            return;
        }

        querySnapshot.forEach((doc) => {
            const s = doc.data();
            const fecha = s.creadoEn.toDate().toLocaleDateString("es-ES");
            const estadoFormateado = s.estado.replace(/_/g, " ");

            const fila = $(`
                <tr style="cursor:pointer">
                    <td>${s.cliente.nombre}</td>
                    <td>${fecha}</td>
                    <td>${s.titulo}</td>
                    <td>${s.localizacion}</td>
                    <td><span class="estado ${s.estado}">${estadoFormateado}</span></td>
                </tr>
            `);

            fila.on("click", () => {
                localStorage.setItem("solicitudSeleccionada", JSON.stringify({ id: doc.id, ...s }));
                window.location.href = `./detalle-solicitud.html?solicitudId=${doc.id}`;
            });

            tbody.append(fila);
        });

    } catch (error) {
        console.error("Error al cargar solicitudes:", error);
    }
}

async function cargarTickets() {
    try {
        const q = query(
            collection(db, "solicitudes"),
            orderBy("creadoEn", "desc")
        );
    } catch (error) {
        console.error("Error al cargar solicitudes:", error);
    }
}