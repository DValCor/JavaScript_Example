// Storage y JSON

document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelectorAll(".product");

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

    // Actualizar la lista del carrito en el HTML
    updateCartList(cart);

    // Mostrar un popup del producto añadido al carrito
    const popup = document.createElement("div");
    popup.textContent = `${name} añadido al carrito`;
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
  if (cartCounter) {
    cartCounter.textContent = cart.length.toString();
  }
}

const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
vaciarCarritoBtn.addEventListener("click", function () {
  localStorage.removeItem("cart"); // Eliminar el carrito del localStorage
  updateCartList([]); // Limpiar la lista del carrito en el HTML
});

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

// Crear el icono del carrito
const cartIcon = document.createElement("div");
cartIcon.innerHTML = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 18C8.10457 18 9 18.8954 9 20C9 21.1046 8.10457 22 7 22C5.89543 22 5 21.1046 5 20C5 18.8954 5.89543 18 7 18Z" fill="#333"/>
    <path d="M17 18C18.1046 18 19 18.8954 19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18Z" fill="#333"/>
    <path d="M1 1H5L6.68 14.39C6.7972 15.3508 7.53879 16.0909 8.5 16.2H19C19.9612 16.0909 20.7028 15.3508 20.82 14.39L22 4H6" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;
cartIcon.style.cursor = "pointer";

// Crear el contador del carrito
const cartCounter = document.createElement("span");
cartCounter.classList.add("cart-counter");
cartCounter.textContent = "0";
cartIcon.appendChild(cartCounter);

// Añadir el enlace y el icono a la barra de menú
menuBar.appendChild(homeLink);
menuBar.appendChild(cartIcon);

// Insertar la barra de menú en el DOM
document.body.insertBefore(menuBar, document.body.firstChild);

// Mostrar el carrito al hacer clic en el icono del carrito
cartIcon.addEventListener("click", function () {
  const cart = document.getElementById("cart");
  cart.style.display = cart.style.display === "none" ? "block" : "none";
});
