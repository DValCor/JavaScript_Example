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
  total.textContent = totalCompra;
}

const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
vaciarCarritoBtn.addEventListener("click", function () {
  localStorage.removeItem("cart"); // Eliminar el carrito del localStorage
  updateCartList([]); // Limpiar la lista del carrito en el HTML
});
