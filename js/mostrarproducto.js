import { conexionAPI } from "./conexionapi.js";

const lista = document.querySelector("[data-lista]");

function crearCard(name, price, image, id) {
    const card = document.createElement("div");
    card.className = "card__image";

    card.innerHTML = `
        <img src="${image}" alt="imagen producto" class="imagen__producto">
        <div class="card-container--info">
            <p class="name__product">${name}</p>
            <div class="card-container--value">
                <p class="price__product">${price}</p>
                <button class="eliminar" data-id="${id}">
                    <div class="icono__papelera">
                        <img src="assets/trashicon.png" alt="Eliminar" />
                    </div>
                </button>
            </div>
        </div>
    `;

    const botonEliminar = card.querySelector(".eliminar");
    botonEliminar.addEventListener("click", () => {
        conexionAPI.borrarProducto(id)
            .then(() => {
                card.remove();
            })
            .catch(err => console.log(err));
    });

    lista.appendChild(card);
    return card;
}

const producto = async () => {
    try {
        const listaApi = await conexionAPI.listarProducto();
        listaApi.forEach(card => {
            lista.appendChild(
                crearCard(
                    card.name,
                    card.price,
                    card.image,
                    card.id
                )
            );
        });
    } catch (error) {
        console.log("error", error);
    }
};

producto();
