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
        window.location.href = `./crearTicket.html?solicitudId=${id}`;
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

            tbody.append(`
                <tr class="fila-solicitud" data-id="${doc.id}" style="cursor:pointer">
                    <td>${s.cliente.nombre}</td>
                    <td>${fecha}</td>
                    <td>${s.titulo}</td>
                    <td>${s.localizacion}</td>
                    <td><span class="estado ${s.estado}">${s.estado}</span></td>
                </tr>
            `);
        });

    } catch (error) {
        console.error("Error al cargar solicitudes:", error);
    }
}