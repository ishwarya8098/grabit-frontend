const API_URL = "https://grabit-backend-ald6.onrender.com";
// test deploy
document.addEventListener("DOMContentLoaded", loadItems);

document.getElementById("itemForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const desc = document.getElementById("desc").value;

  const item = { name, price, description: desc };

  try {
    const res = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      alert("Item Added Successfully! ✅");
      document.getElementById("itemForm").reset();
      loadItems();
    } else {
      alert("Error adding item!");
    }
  } catch (err) {
    console.error(err);
    alert("Server ku connect aagala. Render 50sec la wake up aagum.");
  }
});

async function loadItems() {
  try {
    const res = await fetch(`${API_URL}/items`);
    const items = await res.json();

    const itemList = document.getElementById("itemList");
    itemList.innerHTML = "";

    items.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("item-card");
      div.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <p>${item.description}</p>
      `;
      itemList.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading items:", err);
  }
}
