
document.addEventListener("DOMContentLoaded", function() {
    crearBarraMenu();
    cargarProductos();
    
});

//FN CREAR BARRA MENÚ

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

    // Crear el enlace de usuario (inicio de sesión)
    const userLink = document.createElement("a");
    userLink.href = "#";
    userLink.textContent = "Usuario";
    userLink.style.textDecoration = "none";
    userLink.style.color = "#333";
    userLink.style.fontSize = "18px";
    userLink.addEventListener("click", createLoginForm);

    // Crear el enlace de productos
    const productLink = document.createElement("a");
    productLink.href = "#";
    productLink.textContent = "Productos";
    productLink.style.textDecoration = "none";
    productLink.style.color = "#333";
    productLink.style.fontSize = "18px";

    // Crear el icono del carrito
    const cartIcon = document.createElement("div");
    cartIcon.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18C8.10457 18 9 18.8954 9 20C9 21.1046 8.10457 22 7 22C5.89543 22 5 21.1046 5 20C5 18.8954 5.89543 18 7 18Z" fill="#333"/>
            <path d="M17 18C18.1046 18 19 18.8954 19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18Z" fill="#333"/>
            <path d="M1 1H5L6.68 14.39C6.7972 15.3508 7.4393 16.1339 8.34912 16.4684C9.25894 16.803 10.2797 16.6393 11 16H19C19.7152 16.0014 20.3853 15.7013 20.8413 15.1857C21.2973 14.6702 21.5 13.9833 21.4 13.3L20.35 6.3C20.2798 5.82541 20.053 5.39328 19.7165 5.07189C19.38 4.7505 18.9555 4.55938 18.5 4.54H5.21" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="cart-counter" style="color: #333; font-size: 14px; position: absolute; top: 10px; right: 10px;">0</span>
    `;

    // Añadir los elementos a la barra de menú
    menuBar.appendChild(homeLink);
    menuBar.appendChild(userLink);
    menuBar.appendChild(productLink);
    menuBar.appendChild(cartIcon);

    // Añadir la barra de menú al DOM
    document.body.insertBefore(menuBar, document.body.firstChild);
}

//FN CREAR FORM DE LOGIN CON SWEET ALERT

function createLoginForm(event) {
    event.preventDefault();
  
    Swal.fire({
      title: "Inicio de Sesión",
      html: `
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username" class="swal2-input" required>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" class="swal2-input" required>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const username = Swal.getPopup().querySelector("#username").value;
        const password = Swal.getPopup().querySelector("#password").value;
        if (!username || !password) {
          Swal.showValidationMessage(`Por favor ingresa usuario y contraseña`);
        }
        return { username: username, password: password };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Username:", result.value.username);
        console.log("Password:", result.value.password);
      }
    });
  }
  

//FN CARGAR PRODUCTOS

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
            aplicarEstilosDinamicos();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al cargar los productos. Inténtalo nuevamente.');
        });
}

//FN MOSTRAR PRODUCTOS

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

//FN APLICAR ESTILOS

function aplicarEstilosDinamicos() {
    const body = document.body;
    body.style.fontFamily = "Roboto, sans-serif";

    // Elementos a variables
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
        img.style.width = "150px"; 
   
        product.style.flex = "1 0 25%";
        product.style.maxWidth = "25%"; 
        product.style.minWidth = "200px"; 
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

