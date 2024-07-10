
  // Estilos para el body
  const body = document.body;
  body.style.fontFamily = "Roboto, sans-serif";

  // Elementos a variables
  const viewPort = document.querySelector(".viewPort");
  const tarjetasProductos = document.querySelector(".tarjetasProductos");
  const containers = document.querySelectorAll(".container");
  const products = document.querySelectorAll(".product");
  const buttons = document.querySelectorAll(".botonCarrito");
  const buttonVaciar = document.getElementById("vaciarCarrito");
  const titular = document.querySelector(".titular");
  const cart = document.getElementById("cart");
  const cartList = document.getElementById("cartList");
  const recuadro = document.querySelector(".recuadro");
  const parrafo = document.querySelector("p");

  // Estilo del viewPort
  viewPort.style.display = "flex";
  tarjetasProductos.style.flex = "0 0 80%";
  cart.style.flex = "0 0 20%";

  // Estilo para titular h1 y su p
  titular.style.fontSize = "50px";
  titular.style.textAlign = "center";
  titular.style.color = "#7e57c2";
  titular.style.margin = "0";
  parrafo.style.margin = "5px 0 0 0";
  parrafo.style.fontSize = "30px";
  parrafo.style.fontWeight = "100";

  // Estilo para botón de vaciar carrito
  buttonVaciar.style.padding = "10px";
  buttonVaciar.style.fontSize = "16px";
  buttonVaciar.style.width = "150px";
  buttonVaciar.style.borderRadius = "50px";
  buttonVaciar.style.marginTop = "10px";
  buttonVaciar.style.cursor = "pointer";

  // Estilos para recuadro
  recuadro.style.display = "flex";
  recuadro.style.flexDirection = "column";
  recuadro.style.alignItems = "center";
  recuadro.style.padding = "30px";
  recuadro.style.borderStyle = "solid";
  recuadro.style.borderWidth = "1px";
  recuadro.style.borderColor = "#f5f5f7";

  // Estilo para carrito
  cart.style.display = "flex";
  cart.style.flexDirection = "column";
  cart.style.alignItems = "center";
  cart.style.textAlign = "center";

  // Estilos para la lista del carrito
  cartList.style.listStyleType = "none";
  cartList.style.padding = "0";
  cartList.style.margin = "0";
  cartList.style.textAlign = "center";

  const listItems = document.querySelectorAll("#cartList li");
  listItems.forEach((item) => {
      item.style.marginBottom = "5px";
  });

  const total = document.getElementById("total");
  total.style.marginTop = "10px";
  total.style.fontSize = "30px";

  const precioParrafo = document.querySelector(".precioParrafo");
  precioParrafo.style.fontSize = "30px";

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

