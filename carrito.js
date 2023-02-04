const mostrarCarrito = () => {
    contenedorCompra.innerHTML = "";
    contenedorCompra.style.display = "flex";
    const resumenCompra = document.createElement("div");
    resumenCompra.className = "resumen-compra";
    resumenCompra.innerHTML = `
        <h1 class="resumen-compra-header">Carrito</h1>
      `;
      
    contenedorCompra.append(resumenCompra);
  
    const cerrarResumen = document.createElement("h1");
    cerrarResumen.innerText = "x";
    cerrarResumen.className = "cerrar-resumen";
  
    cerrarResumen.addEventListener("click", () => {
      contenedorCompra.style.display = "none";
    });
  
    resumenCompra.append(cerrarResumen);
  
    carrito.forEach((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "contenido-carrito";
      carritoContent.innerHTML = `
          <img src="${product.img}">
          <h3>${product.nombre}</h3>
          <p>${product.precio} $</p>
          <span class="restar"> - </span>
          <p>${product.cantidad}</p>
          <span class="sumar"> + </span>
          <p>Total: ${product.cantidad * product.precio} $</p>
          <span class="eliminar-producto"> ❌ </span>
        `;
  
      contenedorCompra.append(carritoContent);
  
      let restar = carritoContent.querySelector(".restar");
  
      restar.addEventListener("click", () => {
        if (product.cantidad !== 1) {
          product.cantidad--;
        }
        guardarLocal();
        mostrarCarrito();
      });
  
      let sumar = carritoContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        product.cantidad++;
        guardarLocal();
        mostrarCarrito();
      });
  
      let eliminar = carritoContent.querySelector(".eliminar-producto");
  
      eliminar.addEventListener("click", () => {
        eliminarProducto(product.id);
      });
    });
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-compra";
    totalCompra.innerHTML = `Total a pagar: ${total} $`;
    contenedorCompra.append(totalCompra);

    const confirmarCompra = document.createElement("button");
    confirmarCompra.className = "confirmar-compra";
    confirmarCompra.innerText = "Confirmar Compra";
    confirmarCompra.addEventListener("click", () =>{
      Swal.fire({
        title: "Felicidades!",
        text: "Gracias por tu compra!",
        imageUrl: "https://i.pinimg.com/474x/d2/12/f1/d212f1ca9f372c2a893b5ae4461b42a9--one-piece-anime-tattoo-ideas.jpg",
        imageHeight: 500,
        confirmButtonText: "Cerar",
        confirmButtonColor: "#CC0001"
      })
      contenedorCompra.style.display = "none";
      carrito = [];
      localStorage.clear();
    })
    contenedorCompra.append(confirmarCompra);
  };

  
  verCarrito.addEventListener("click", mostrarCarrito);
  
  const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
  
    console.log(foundId);
  
    carrito = carrito.filter((carritoId) => {
      return carritoId !== foundId;
    });
    guardarLocal();
    mostrarCarrito();
  };
