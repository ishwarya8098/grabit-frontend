const API_URL = "https://grabit-backend-ald6.onrender.com";

// Page load aagumbodhe items ah eduka
async function loadItems() {
  const itemList = document.getElementById("item-list");
  
  try {
    const response = await fetch(`${API_URL}/api/items`);
    const items = await response.json();
    
    if(items.length === 0) {
      itemList.innerHTML = "<p>No items yet. Add some from backend!</p>";
      return;
    }

    itemList.innerHTML = ""; // Loading clear pannidu

    items.forEach(item => {
      itemList.innerHTML += `
        <div class="item-card">
          <h3>${item.name}</h3>
          <p class="price">₹${item.price}</p>
          <p>${item.description}</p>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading items:", error);
    itemList.innerHTML = "<p>Error loading items. Backend check pannu.</p>";
  }
}

loadItems(); // Call panidu
