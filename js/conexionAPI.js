async function listarProducto() {
    const conexion = await fetch("http://localhost:3000/products");
    const conexionConvertida = await conexion.json(); 
    return conexionConvertida;
}

async function enviarProducto(name, price, image) {
    return await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-type": "application/json" }, 
        body: JSON.stringify({
            name: name,
            price: price,
            image: image
        })
    });
}

const borrarProducto = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE"
        });
        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

export const conexionAPI = {
    listarProducto,
    enviarProducto,
    borrarProducto
};
