import { conexionAPI } from "./conexionapi.js";

const formulario = document.querySelector("[data-form]");

function esURLValida(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

async function crearProducto(evento) {
    evento.preventDefault(); 

    const name = document.querySelector("[data-name]").value.trim();
    const price = document.querySelector("[data-price]").value.trim();
    const image = document.querySelector("[data-image]").value.trim();

    if (!name || !price || !image) {
        alert("Por favor, complete todos los campos antes de enviar");
        return;
    }

    if (!esURLValida(image)) { 
        alert("Por favor, ingrese una URL valida.");
        return;
    }

    try {
        await conexionAPI.enviarProducto(name, price, image);
        formulario.reset();
        window.location.reload();
    } catch (error) {
        console.error("Error al enviar datos: ", error);
    }
}

formulario.addEventListener("submit", crearProducto);
