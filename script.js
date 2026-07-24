// UNODA WHATSAPP NUMBER IDHULA PODU - 91 oda start aaganum
const WHATSAPP_NUMBER = "918098918459"; 

// IDHULA UNODA ITEMS ADD PANNU
const items = [
  {
    id: 1,
    name: "Drill Machine",
    category: "Tools",
    price: 200,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300",
    description: "Heavy duty drill - Per day rent"
  },
  {
    id: 2, 
    name: "Projector",
    category: "Electronics", 
    price: 500,
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=300",
    description: "HD Projector - Per day rent"
  },
  {
    id: 3,
    name: "Party Tent",
    category: "Events",
    price: 800,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300", 
    description: "10x10 Tent - Per day rent"
  },
  {
    id: 4,
    name: "Sound System",
    category: "Electronics",
    price: 1200,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300",
    description: "Speaker with Mic - Per day rent"
  }
];

let cart = [];

// ITEMS AH PAGE LA KAATUM FUNCTION
function displayItems() {
    const container = document.getElementById('items-container');
    if (!container) return;
    
    container.innerHTML = '';
    items.forEach(item => {
        container.innerHTML += `
            <div class="item-card">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><b>₹${item.price}/day</b></p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `;
    });
}

// CART LA ADD PANRADHU
function addToCart(id) {
    const item = items.find(i => i.id === id);
    cart.push(item);
    alert(`${item.name} added to cart!`);
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart-items');
    if (!cartDiv) return;
    cartDiv.innerHTML = cart.map(i => `<p>${i.name} - ₹${i.price}</p>`).join('');
}

// PLACE ORDER BUTTON
function placeOrder() {
    if(cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    let message = "New Order from Grabit:%0A%0A";
    cart.forEach(i => message += `- ${i.name} - ₹${i.price}/day%0A`);
    message += "%0ATotal: ₹" + cart.reduce((a,b) => a+b.price, 0);
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    cart = [];
    updateCart();
}

// PAGE LOAD AAGUMBODHU ITEMS KAAKA VAI
window.onload = displayItems;
