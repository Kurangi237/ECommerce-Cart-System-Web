const products = [
  { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
  { id: 2, name: "Smartphone", price: 25000, category: "Electronics" },
  { id: 3, name: "Headphones", price: 2000, category: "Accessories" },
  { id: 4, name: "Keyboard", price: 1500, category: "Accessories" },
  { id: 5, name: "Mouse", price: 700, category: "Accessories" },
  { id: 6, name: "Tablet", price: 18000, category: "Electronics" },
  { id: 7, name: "Smartwatch", price: 8000, category: "Gadgets" },
  { id: 8, name: "Camera", price: 30000, category: "Electronics" },
  { id: 9, name: "Printer", price: 12000, category: "Electronics" },
  { id: 10, name: "External Hard Drive", price: 6000, category: "Accessories" },
  { id: 11, name: "Monitor", price: 15000, category: "Electronics" },
  { id: 12, name: "Gaming Console", price: 40000, category: "Gadgets" },
  { id: 13, name: "Speakers", price: 5000, category: "Accessories" },
  { id: 14, name: "Power Bank", price: 2000, category: "Accessories" },
  { id: 15, name: "Router", price: 3500, category: "Electronics" }
];

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "{}");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function showPage(page) {
  document.querySelectorAll(".container").forEach(div => div.style.display = "none");
  document.getElementById(page).style.display = "block";
  if (page === "cart") renderCart();
  if (page === "checkout") renderCheckout();
}

function renderProducts(category) {
  showPage("categories");
  const productList = document.getElementById("product-list");
  productList.innerHTML = "<h2>" + category + "</h2>";
  products.filter(p => p.category === category)
    .forEach(p => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <span>${p.name} - ₹${p.price}</span>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
}

function addToCart(id) {
  let cart = getCart();
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
  alert("Item added to cart!");
}

function removeFromCart(id) {
  let cart = getCart();
  if (cart[id]) {
    delete cart[id];
    saveCart(cart);
    renderCart();
  }
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let cart = getCart();
  cartItems.innerHTML = "";
  let total = 0;

  for (let id in cart) {
    const item = products.find(p => p.id == id);
    const qty = cart[id];
    const subtotal = item.price * qty;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} x ${qty} = ₹${subtotal}</span>
      <button onclick="removeFromCart(${id})">Remove</button>
    `;
    cartItems.appendChild(div);
  }
  cartTotal.innerHTML = `<h3>Total: ₹${total}</h3>`;
}

function renderCheckout() {
  const checkoutItems = document.getElementById("checkout-items");
  const checkoutTotal = document.getElementById("checkout-total");
  let cart = getCart();
  checkoutItems.innerHTML = "";
  let total = 0;

  for (let id in cart) {
    const item = products.find(p => p.id == id);
    const qty = cart[id];
    const subtotal = item.price * qty;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `${item.name} x ${qty} = ₹${subtotal}`;
    checkoutItems.appendChild(div);
  }
  checkoutTotal.innerHTML = `<h3>Total: ₹${total}</h3>`;
}

function checkout() {
  let cart = getCart();
  if (Object.keys(cart).length === 0) {
    alert("Cart is empty. Add items before checkout.");
    return;
  }
  let total = 0;
  for (let id in cart) {
    const item = products.find(p => p.id == id);
    total += item.price * cart[id];
  }
  alert("Checkout successful! Total bill: ₹" + total);
  localStorage.removeItem("cart");
  renderCart();
  renderCheckout();
}
