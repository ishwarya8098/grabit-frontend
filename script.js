// UNODA WHATSAPP NUMBER
const WHATSAPP_NUMBER = "918098918459"; 

// UNODA RENTAL ITEMS
const items = [
  {
    id: 1,
    name: "Drill Machine",
    category: "Tools",
    price: 200,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
    description: "Heavy duty drill machine - Per day rent"
  },
  {
    id: 2, 
    name: "HD Projector",
    category: "Electronics", 
    price: 500,
    image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400",
    description: "1080p Projector with screen - Per day rent"
  },
  {
    id: 3,
    name: "Party Tent 10x10",
    category: "Events",
    price: 800,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400", 
    description: "Big party tent - Per day rent"
  },
  {
    id: 4,
    name: "Sound System + Mic",
    category: "Electronics",
    price: 1200,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400",
    description: "2 Speakers with wireless mic - Per day rent"
  }
];

let cart = [];

// ITEMS AH PAGE LA KAATUM
function displayItems() {
    const container = document.getElementById('items-container');
    if (!container) return;
    
    container.innerHTML = '';
    items.forEach(item => {
        container.innerHTML += `
            <div class="item-card" style="border:1px solid #ddd; padding:15px; margin:10px; border-radius:8px; width:250px; display:inline-block;">
                <img src="${item.image}" alt="${item.name}" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><b>₹${item.price}/day</b></p>
                <button onclick="addToCart(${item.id})" style="background:purple; color:white; border:none; padding:8px 15px; border-radius:5px; cursor:pointer;">Add to Cart</button>
            </div>
        `;
    });
}

// CART LA ADD PANRADHU
function addToCart(id) {
    const item = items.find(i => i.id === id);
    cart.push(item);
    alert(`${item.name} cart ku add aagiduchu!`);
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart-items');
    if (!cartDiv) return;
    if(cart.length === 0) {
        cartDiv.innerHTML = "<p>Cart empty</p>";
        return;
    }
    cartDiv.innerHTML = cart.map(i => `<p>${i.name} - ₹${i.price}</p>`).join('');
    cartDiv.innerHTML += `<button onclick="placeOrder()" style="background:green; color:white; padding:10px; border:none; border-radius:5px; margin-top:10px;">Place Order via WhatsApp</button>`;
}

// PLACE ORDER
function placeOrder() {
    if(cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    let message = "Hi Grabit! New Order:%0A%0A";
    cart.forEach(i => message += `- ${i.name} - ₹${i.price}/day%0A`);
    message += "%0ATotal: ₹" + cart.reduce((a,b) => a+b.price, 0);
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    cart = [];
    updateCart();
}

// PAGE LOAD AAGUMBODHU
window.onload = displayItems;
