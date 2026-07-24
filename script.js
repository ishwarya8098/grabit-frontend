const WHATSAPP_NUMBER = "918098918459"; 
const items = [
  {id:1, name:"Drill Machine", price:200, image:"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400", description:"Heavy duty drill"},
  {id:2, name:"HD Projector", price:500, image:"https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400", description:"1080p Projector"},
  {id:3, name:"Party Tent", price:800, image:"https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400", description:"10x10 Tent"},
  {id:4, name:"Sound System", price:1200, image:"https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400", description:"2 Speakers + Mic"}
];
let cart = [];
function displayItems(){const c=document.getElementById('items-container');if(!c)return;c.innerHTML='';items.forEach(i=>{c.innerHTML+=`<div class="item-card"><img src="${i.image}"><h3>${i.name}</h3><p>${i.description}</p><p><b>₹${i.price}/day</b></p><button onclick="addToCart(${i.id})">Add to Cart</button></div>`})};
function addToCart(id){cart.push(items.find(i=>i.id===id));alert("Added to Cart!");updateCart()}
function updateCart(){const d=document.getElementById('cart-items');d.innerHTML=cart.length?cart.map(i=>`<p>${i.name} - ₹${i.price}</p>`).join('')+"<button onclick='placeOrder()'>Order via WhatsApp</button>":"<p>Cart empty</p>"}
function placeOrder(){let m="Hi Grabit Order:%0A";cart.forEach(i=>m+=`- ${i.name} - ₹${i.price}/day%0A`);window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${m}`,'_blank');cart=[];updateCart()}
window.onload=displayItems;
