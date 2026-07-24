const API_URL = "https://grabit-backend-ald6.onrender.com";
let cart = []; // Cart ah store panna

async function loadItems() {
  const itemList = document.getElementById("item-list");
  try {
    const response = await fetch(`${API_URL}/api/items`);
    const items = await response.json();
    if(items.length === 0) {
      itemList.innerHTML = "<p>No items yet. Add some below!</p>";
      return;
    }
    itemList.innerHTML = "";
    items.forEach(item => {
      itemList.innerHTML += `
        <div class="item-card">
          <h3>${item.name}</h3>
          <p class="price">₹${item.price}</p>
          <p>${item.description}</p>
          <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})" style="background:green; width:120px;">Add to Cart</button>
          <button onclick="deleteItem(${item.id})" style="background:red; width:80px;">Delete</button>
        </div>
      `;
    });
  } catch (error) {
    console.error(error);
    itemList.innerHTML = "<p>Error loading items.</p>";
  }
}

function addToCart(id, name, price) {
  cart.push({id, name, price});
  updateCart();
  alert(`${name} added to cart!`);
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  const totalSpan = document.getElementById("total");
  if(cart.length === 0) {
    cartList.innerHTML = "<p>Cart is empty</p>";
    totalSpan.innerText = 0;
    return;
  }
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    cartList.innerHTML += `<p>${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})" style="background:red; width:30px; padding:2px;">X</button></p>`;
  });
  totalSpan.innerText = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function checkout() {
  if(cart.length === 0) { alert("Cart is empty"); return; }
  alert("Order Placed! Total: ₹" + document.getElementById("total").innerText);
  cart = [];
  updateCart();
}

document.getElementById("add-item-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const newItem = {
    name: document.getElementById("name").value,
    price: parseFloat(document.getElementById("price").value),
    description: document.getElementById("description").value,
    shop_id: 1
  };
  await fetch(`${API_URL}/api/items`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newItem)
  });
  document.getElementById("add-item-form").reset();
  loadItems();
});

async function deleteItem(id) {
  if(confirm("Delete this item?")) {
    await fetch(`${API_URL}/api/items/${id}`, { method: "DELETE" });
    loadItems();
  }
}

loadItems();
