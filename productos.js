document.addEventListener("DOMContentLoaded", function() {
    cargarProductos();
});

function cargarProductos() {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los productos.');
            }
            return response.json();
        })
        .then(data => {
            mostrarProductos(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function mostrarProductos(productos) {
    const listaProductos = document.getElementById('productos-lista');
    listaProductos.innerHTML = '';

    productos.forEach(function(producto) {
        const itemProducto = document.createElement('div');
        itemProducto.innerHTML = `
            <h3>${producto.title}</h3>
            <p><strong>Precio:</strong> $${producto.price}</p>
            <p><strong>Categoría:</strong> ${producto.category}</p>
            <img src="${producto.image}" alt="${producto.title}">
        `;
        listaProductos.appendChild(itemProducto);
    });
}
