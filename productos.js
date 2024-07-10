document.addEventListener("DOMContentLoaded", function() {
    cargarProductos();
    crearBarraMenu();
});

function crearBarraMenu() {
    // Crear la barra de menú
    const menuBar = document.createElement("nav");
    menuBar.style.display = "flex";
    menuBar.style.justifyContent = "space-between";
    menuBar.style.alignItems = "center";
    menuBar.style.padding = "10px 20px";
    menuBar.style.backgroundColor = "#f5f5f5";
    menuBar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

    // Crear el enlace de inicio
    const homeLink = document.createElement("a");
    homeLink.href = "index.html";
    homeLink.textContent = "Inicio";
    homeLink.style.textDecoration = "none";
    homeLink.style.color = "#333";
    homeLink.style.fontSize = "18px";

    // Crear el enlace de productos
    const productLink = document.createElement("a");
    productLink.href = "#";
    productLink.textContent = "Productos";
    productLink.style.textDecoration = "none";
    productLink.style.color = "#333";
    productLink.style.fontSize = "18px";

    // Añadir los elementos a la barra de menú
    menuBar.appendChild(homeLink);
    menuBar.appendChild(productLink);

    // Añadir la barra de menú al HTML
    document.body.insertBefore(menuBar, document.body.firstChild);
}

function cargarProductos() {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los productos. Código de estado: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            mostrarProductos(data);
            aplicarEstilosDinamicos(); // Aplicar estilos después de mostrar los productos
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al cargar los productos. Inténtalo nuevamente.');
        });
}

function mostrarProductos(productos) {
    const itemContainer = document.querySelector('#productos-lista .container');

    productos.forEach(producto => {
        const itemProducto = document.createElement('div');
        itemProducto.classList.add('product');

        itemProducto.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" class="product-image">
            <h2 class="name">${producto.title}</h2>
            <p class="product-description">${producto.description}</p>
            <h3 class="price">$${producto.price.toFixed(2)}</h3>
            <button class="botonCarrito">Añadir al carrito</button>
        `;

        itemContainer.appendChild(itemProducto);
    });
    aplicarEstilosDinamicos();
}




function aplicarEstilosDinamicos() {

    const body = document.body;
    body.style.fontFamily = "Roboto, sans-serif";

    // Elementos a variables
    const viewPort = document.querySelector(".viewPort");
    const tarjetasProductos = document.querySelector(".tarjetasProductos");
    const containers = document.querySelectorAll(".container");
    const products = document.querySelectorAll(".product");
    const buttons = document.querySelectorAll(".botonCarrito");

    tarjetasProductos.style.display = 'flex';
    tarjetasProductos.style.flexWrap = 'wrap';
    tarjetasProductos.style.gap = '20px';

    // Aplicando estilos a cada contenedor
    containers.forEach((container) => {
        container.style.backgroundColor = "#fbfbfb";
        container.style.display = "flex";
        container.style.flexWrap = "wrap";
        container.style.justifyContent = "space-around";
        container.style.padding = "30px";
        container.style.gap = "10px";
    });

    // Aplicando estilos a los productos
    products.forEach((product) => {
        const h2 = product.querySelector("h2");
        h2.style.color = "#2c2d2d";
        h2.style.fontSize = "24px";

        const img = product.querySelector(".product-image");
        img.style.width = "150px"; // Ajuste del tamaño de la imagen
   
        // Ajustar tamaño del producto a 1/4 del ancho de la pantalla
        product.style.flex = "1 0 25%";
        product.style.maxWidth = "25%"; // Asegura que ocupe máximo el 25% del ancho
        product.style.minWidth = "200px"; // Define un ancho mínimo para cada producto
    });

    // Aplicando estilos a los botones y agregando eventos de hover
    buttons.forEach((button) => {
        button.style.padding = "10px";
        button.style.fontSize = "16px";
        button.style.width = "150px";
        button.style.borderRadius = "50px";
        button.style.marginTop = "10px";
        button.style.cursor = "pointer";
        button.style.transition = "background-color 0.3s ease, color 0.3s ease";

        // Agregar evento hover
        button.addEventListener("mouseover", function () {
            button.style.backgroundColor = "#000000";
            button.style.color = "#FFFFFF";
        });

        // Quitar efecto hover
        button.addEventListener("mouseout", function () {
            button.style.backgroundColor = "";
            button.style.color = "";
        });
    });
}
