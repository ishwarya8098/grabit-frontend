const API_URL = "https://grabit-backend-ald6.onrender.com";

// Page load aagumbodhe items ah eduka
async function loadItems() {
  const itemList = document.getElementById("item-list");

  try {
    const response = await fetch(`${API_URL}/api/items`);
    const items = await response.json();

    if(items.length === 0) {
      itemList.innerHTML = "<p>No items yet. Add some below!</p>";
      return;
    }

    itemList.innerHTML = ""; // Loading clear pannidu

    items.forEach(item => {
      itemList.innerHTML += `
        <div class="item-card">
          <h3>${item.name}</h3>
          <p class="price">₹${item.price}</p>
          <p>${item.description}</p>
          <button onclick="deleteItem(${item.id})" style="background:red; width:80px;">Delete</button>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading items:", error);
    itemList.innerHTML = "<p>Error loading items. Backend check pannu.</p>";
  }
}

// Form submit panna item add aagum
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
  loadItems(); // List ah refresh pannum
});

// DELETE FUNCTION - ITHU NEW
async function deleteItem(id) {
  if(confirm("Are you sure to delete this item?")) {
    await fetch(`${API_URL}/api/items/${id}`, {
      method: "DELETE"
    });
    loadItems(); // List refresh aagum
  }
}

loadItems(); // Call panidu
