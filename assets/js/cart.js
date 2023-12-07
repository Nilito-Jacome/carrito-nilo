/* Carr */

// #1 Database
const db = [
  {
    id: 1,
    name: "Laptop_Acer",
    price: 689,
    image: "assets/img/laptop/Asus-2230.jpg",
    category: "Laptop_clasic",
    quantity: 4,
  },
  {
    id: 2,
    name: "Laptop_Dell",
    price: 742,
    image: "assets/img/laptop/Dell-7760.jpg",
    category: "Laptop_clasic",
    quantity: 7,
  },
  {
    id: 3,
    name: "Laptop_Hp",
    price: 788,
    image: "assets/img/laptop/Hp-beats.jpg",
    category: "Laptop_clasic",
    quantity: 5,
  },
  {
    id: 4,
    name: "Laptop_Lenovo",
    price: 642,
    image: "assets/img/laptop/Lenovo-25896.jpg",
    category: "Laptop_clasic",
    quantity: 10,
  },
  {
    id: 5,
    name: "Cell_phone_Galaxy",
    price: 580,
    image: "assets/img/celulares/Galaxy-a71.jpg",
    category: "Smartphone",
    quantity: 15,
  },
  {
    id: 6,
    name: "Cell_phone_Motorola",
    price: 487,
    image: "assets/img/celulares/Motorola-XT2231.jpg",
    category: "Smartphone",
    quantity: 8,
  },
  {
    id: 7,
    name: "Cell_phone_Realme",
    price: 456,
    image: "assets/img/celulares/Realme-X50.jpg",
    category: "Smartphone",
    quantity: 9,
  },
  {
    id: 8,
    name: "Cell_phone_Yueti",
    price: 358,
    image: "assets/img/celulares/YUETI-753.jpg",
    category: "Smartphone",
    quantity: 3,
  },
  {
    id: 9,
    name: "Mouse_Deathadder",
    price: 31,
    image: "assets/img/mouse/Deathadder-85.jpg",
    category: "Optical_usb",
    quantity: 20,
  },
  {
    id: 10,
    name: "Mouse_Logitech",
    price: 28,
    image: "assets/img/mouse/Logitech-789.jpg",
    category: "Optical_usb",
    quantity: 22,
  },
  {
    id: 11,
    name: "Mouse_Mtec",
    price: 18,
    image: "assets/img/mouse/Mtec-691.png",
    category: "Optical_usb",
    quantity: 18,
  },
  {
    id: 12,
    name: "Mouse_Optical",
    price: 35,
    image: "assets/img/mouse/Optical-333.jpg",
    category: "Optical_usb",
    quantity: 30,
  },
  {
    id: 13,
    name: "Keyboard_Del",
    price: 18,
    image: "assets/img/teclado/Del-25.jpg",
    category: "Usb_plug_&_Play",
    quantity: 11,
  },
  {
    id: 14,
    name: "Keyboard_Hp",
    price: 22,
    image: "assets/img/teclado/Hp-1318.png",
    category: "Usb_plug_&_Play",
    quantity: 32,
  },
  {
    id: 15,
    name: "Keyboard_Hp",
    price: 28,
    image: "assets/img/teclado/Hp-4569.jpg",
    category: "Usb_plug_&_Play",
    quantity: 18,
  },
  {
    id: 16,
    name: "Keyboard_Lenovo",
    price: 21,
    image: "assets/img/teclado/Lenovo-123.jpg",
    category: "Usb_plug_&_Play",
    quantity: 23,
  },
  
];

const products = window.localStorage.getItem("productsDB")
  ? JSON.parse(window.localStorage.getItem("productsDB"))
  : db;

// #2 Pintar los productos en el DOM
const productContainer = document.getElementById("products__content");
function printProducts() {
  let html = "";
  for (const product of products) {
    html += `
    <article class="products__card Laptop_clasic">
      <div class="products__shape">
        <img src="${product.image}" alt="${product.name}" class="products__img">
      </div>

      <div class="products__data">
        <h2 class="products__name">${product.name}</h2>
        <div class="">
          <h3 class="products__price">$${product.price}</h3>
          <span class="products__quantity">Left alone ${product.quantity} units</span>
        </div>
        <button type="button" class="button products__button addToCart" data-id="${product.id}">
          <i class="bx bx-plus"></i>
        </button>
      </div>
    </article>
    `;
  }
  productContainer.innerHTML = html;
  window.localStorage.setItem("productsDB", JSON.stringify(products));
}

printProducts();









// #3 Carrito
let cart = window.localStorage.getItem("cartDB")
  ? JSON.parse(window.localStorage.getItem("cartDB"))
  : [];
const cartContainer = document.getElementById("cart__container");
const cartCount = document.getElementById("cart-count");
const itemsCount = document.getElementById("items-count");
const cartTotal = document.getElementById("cart-total");

function printCart() {
  let html = "";
  for (const article of cart) {
    const product = products.find((p) => p.id === article.id);
    html += `
    <article class="cart__card">
        <div class="cart__box">
          <img src="${product.image}" alt="${product.name}" class="cart__img">
        </div>

        <div class="cart__details">
          <h3 class="cart__title">${product.name} <span class="cart__price">$${
      product.price
    }</span></h3>

          <div class="cart__amount">
            <div class="cart__amount-content">
              <span class="cart__amount-box removeToCart" data-id="${
                product.id
              }">
                <i class="bx bx-minus"></i>
              </span>

              <span class="cart__amount-number">${article.qty}</span>

              <span class="cart__amount-box addToCart" data-id="${product.id}">
                <i class="bx bx-plus"></i>
              </span>
            </div>

            <i class="bx bx-trash-alt cart__amount-trash deleteToCart" data-id="${
              product.id
            }"></i>
            </div>
            
            <span class="cart__subtotal">
            <span class="cart__stock">Remain ${
              product.quantity - article.qty
            } units</span>
            <span class="cart__subtotal-price">${
              product.price * article.qty
            }</span>
            </span>
            </div>
            </article>
            `;
  }
  cartContainer.innerHTML = html;
  cartCount.innerHTML = totalArticles();
  itemsCount.innerHTML = totalArticles();
  cartTotal.innerHTML = numberToCurrency(totalAmount());
  checkButtons();
  window.localStorage.setItem('cartDB', JSON.stringify(cart))
}



printCart();
// #4 Agragar al carrito
function addToCart(id, qty = 1) {
  const product = products.find((p) => p.id === id);
  if (product && product.quantity > 0) {
    const article = cart.find((a) => a.id === id);

    if (article) {
      if (checkStock(id, qty + article.qty)) {
        article.qty++;
      } else {
        window.alert("Not enough stock");
      }
    } else {
      cart.push({ id, qty });
    }
  } else {
    window.alert("Sold out");
  }
  printCart();
}


function checkStock(id, qty) {
  const product = products.find((p) => p.id === id);
  return product.quantity - qty >= 0;
}



// #5 Remover articulos
function removeFromCart(id, qty = 1) {
  const article = cart.find((a) => a.id === id);

  if (article && article.qty - qty > 0) {
    article.qty--;
  } else {
    const confirm = window.confirm("You're sure??");
    if (confirm) {
      cart = cart.filter((a) => a.id !== id);
    }
  }
  printCart();
}


// #6 Eliminar del carrito
function deleteFromCart(id) {
  const article = cart.find((a) => a.id === id);
  cart.splice(cart.indexOf(article), 1);
  printCart();
}


// #7 Contar Artículos
function totalArticles() {
  return cart.reduce((acc, article) => acc + article.qty, 0);
}


// #8 El total
function totalAmount() {
  return cart.reduce((acc, article) => {
    /* Primero recorre los productos, la base de datos para traer las propiedades y luego busca al producto por su id y lo hace coincidir con el articulo, si lo encuentra multiplica el precio del producto por la cantidad de artículos del carrito*/
    const product = products.find((p) => p.id === article.id);
    return acc + product.price * article.qty;
  }, 0);
}


// #9 Limpiar Carrito
function clearCart() {
  cart = [];
  printCart();
}


// #10 Comprar
function checkout() {
  cart.forEach((article) => {
    const product = products.find((p) => p.id === article.id);

    product.quantity -= article.qty;
  });
  clearCart();
  printProducts();
  printCart();
  window.alert("Thanks for your purchase");
}


function checkButtons() {
  if (cart.length > 0) {
    document.getElementById("cart-checkout").removeAttribute("disabled");
    document.getElementById("cart-empty").removeAttribute("disabled");
  } else {
    document
      .getElementById("cart-checkout")
      .setAttribute("disabled", "disabled");
    document.getElementById("cart-empty").setAttribute("disabled", "disabled");
  }
}


function numberToCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

/* Agregando eventos a nuestros botones */
productContainer.addEventListener("click", function (e) {
  const add = e.target.closest(".addToCart");

  if (add) {
    const id = +add.dataset.id;
    addToCart(id);
  }
});


cartContainer.addEventListener("click", function (e) {
  const remove = e.target.closest(".removeToCart");
  const add = e.target.closest(".addToCart");
  const deleteCart = e.target.closest(".deleteToCart");

  if (remove) {
    const id = +remove.dataset.id;
    removeFromCart(id);
  }

  if (add) {
    const id = +add.dataset.id;
    addToCart(id);
  }

  if (deleteCart) {
    const id = +deleteCart.dataset.id;
    deleteFromCart(id);
  }
});



const actionButtons = document.getElementById("action-buttons");

actionButtons.addEventListener("click", function (e) {
  const clear = e.target.closest("#cart-empty");
  const buy = e.target.closest("#cart-checkout");

  if (clear) {
    clearCart();
  }

  if (buy) {
    checkout();
  }
});


