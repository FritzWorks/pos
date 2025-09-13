let cart = [];

async function fetchMenu() {
  const res = await fetch("api.php?action=getMenu");
  const menu = await res.json();
  renderMenu(menu);
}

function renderMenu(menu) {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "<h2>Menu</h2>";
  menu.forEach(item => {
    menuDiv.innerHTML += `
      <div class="item">
        <span>${item.name} - ₱${item.price}</span>
        <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Add</button>
      </div>
    `;
  });
}

function renderCart() {
  const cartDiv = document.getElementById("cart-items");
  cartDiv.innerHTML = "";
  let total = 0;
  cart.forEach(c => {
    total += c.price * c.qty;
    cartDiv.innerHTML += `
      <div class="item">
        <span>${c.name} x ${c.qty}</span>
        <span>
          <button onclick="removeFromCart(${c.id})">-</button>
          <button onclick="addToCart(${c.id}, '${c.name}', ${c.price})">+</button>
        </span>
      </div>
    `;
  });
  document.getElementById("total").textContent = `Total: ₱${total}`;
}

function addToCart(id, name, price) {
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  cart = cart.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c).filter(c => c.qty > 0);
  renderCart();
}

async function checkout() {
  if (cart.length === 0) return alert("Cart is empty!");

  const res = await fetch("api.php?action=checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart })
  });

  const result = await res.json();
  if (result.success) {
    alert("Checkout successful!");
    cart = [];
    renderCart();
  } else {
    alert("Checkout failed!");
  }
}

fetchMenu();
