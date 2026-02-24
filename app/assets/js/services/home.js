import { db, auth } from "../firebase/firebase-config.js";
import { obtenerNombreUsuario } from "../firebase/userService.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

obtenerNombreUsuario((nombre) => {
    if (nombre) {
        document.title = `Home - ${nombre}`;

        const headerTitle = document.getElementById("headerTitle");
        if (headerTitle) headerTitle.textContent = `Home - ${nombre}`;

        const saludo = $("#tit-tickets");
        if (saludo) saludo.text('Tickets asignados a ' + nombre);

        const saludo2 = $("#tit-partes");
        if (saludo2) saludo2.text('Partes de ' + nombre);
    }
});

$(document).ready(function () {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = "../index.html";
        } else {
            cargarTickets(user.uid);
            cargarPartes(user.uid);
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

        const tbody = $("#tabla-tickets tbody");
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
            const estadoFormateado = t.estado.replace(/_/g, " ");

            const fila = $(`
            <tr style="cursor:pointer">
            <td>${fecha}</td>
            <td>${t.titulo}</td>
            <td class="desaparecer">${t.descripcion}</td>
            <td>${t.localizacion}</td>
            <td class="desaparecer"><span class="estado ${t.estado}">${estadoFormateado}</span></td>
            </tr>
            `);

            fila.on("click", () => {
                localStorage.setItem("ticketSeleccionado", JSON.stringify({ id: doc.id, ...t }));
                window.location.href = "detalle-ticket.html";
            });

            tbody.append(fila);
        });

    } catch (error) {
        console.error("Error al cargar tickets:", error);
    }
}

async function cargarPartes(uid) {
    try {
        const q = query(
            collection(db, "partes"),
            where("empleadoUid", "==", uid)
        );

        const querySnapshot = await getDocs(q);

        const tbody = $("#tabla-partes tbody");
        tbody.empty();

        if (querySnapshot.empty) {
            tbody.append(`
                <tr>
                    <td colspan="6">No tienes partes asignados</td>
                </tr>
            `);
            return;
        }

        querySnapshot.forEach((doc) => {
            const p = doc.data();
            const fecha = p.creadoEn.toDate().toLocaleDateString("es-ES");
            const estadoFormateado = p.estado.replace(/_/g, " ");

            const fila = $(`
                <tr style="cursor:pointer">
                    <td>${fecha}</td>
                    <td>${p.titulo}</td>
                    <td>${p.localizacion}</td>
                    <td class="desaparecer">${p.horas}</td>
                    <td class="desaparecer">${p.materialUtilizado}</td>
                    <td class="desaparecer"><span class="estado ${p.estado}">${p.estado}</span></td>
                </tr>
            `);

            fila.on("click", () => {
                localStorage.setItem("parteSeleccionado", JSON.stringify({ id: doc.id, ...p }));
                window.location.href = "detalle-parte.html";
            });

            tbody.append(fila);
        });



    } catch (error) {
        console.error("Error al cargar partes:", error);
    }
}