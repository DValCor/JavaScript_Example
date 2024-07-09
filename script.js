document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelectorAll(".product");

  //Función agregar producto a carrito
  function addToCart(event) {
    const product = event.target.closest(".product");
    const name = product.querySelector(".name").textContent;
    const price = product.querySelector(".price").textContent;

    const cartItem = {
      name: name,
      price: price,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartList(cart);

    // Mostrar popup del producto añadido al carrito
    showPopup(`${name} añadido al carrito`);
  }

  const addButtons = document.querySelectorAll(".botonCarrito");
  addButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  // Cargar el contenido del carrito al cargar la página
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartList(cart);
});

function updateCartList(cart) {
  const cartList = document.getElementById("cartList");
  const total = document.getElementById("total");
  let totalCompra = 0;

  // Limpiar la lista del carrito
  cartList.innerHTML = "";

  // Actualizar la lista del carrito con los productos almacenados
  cart.forEach((item) => {
    const itemCarrito = document.createElement("li");
    itemCarrito.textContent = `${item.name} : ${item.price}`;
    cartList.appendChild(itemCarrito);

    // Sumar el precio de cada producto al total
    totalCompra += parseFloat(item.price.replace("$", ""));
  });

  // Mostrar el total en el HTML
  total.textContent = totalCompra.toFixed(2);

  // Actualizar el contador del carrito
  const cartCounter = document.querySelector(".cart-counter");
  cartCounter.textContent = cart.length.toString();
}

const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
vaciarCarritoBtn.addEventListener("click", function () {
  localStorage.removeItem("cart");
  updateCartList([]);
});

// Mostrar popup de producto añadido al carrito
function showPopup(message) {
  const popup = document.createElement("div");
  popup.textContent = message;
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "#7e57c2";
  popup.style.color = "white";
  popup.style.padding = "10px 20px";
  popup.style.borderRadius = "5px";
  popup.style.zIndex = "9999";
  document.body.appendChild(popup);

  // Desaparecer el popup después de 2 segundos
  setTimeout(() => {
    popup.remove();
  }, 2000);
}

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
homeLink.href = "#";
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
menuBar.appendChild(cartIcon);

// Añadir la barra de menú al DOM
document.body.insertBefore(menuBar, document.body.firstChild);

// Función para crear el formulario de inicio de sesión con Sweetalert2
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
