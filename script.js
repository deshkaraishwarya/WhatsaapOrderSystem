let cart = [];
const whatsappNumber = "919264953782";


function toggleCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    cartDrawer.classList.toggle('active');
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartUI();
    
    // Simple toast notification
    showToast(`${name} added to cart!`);
}

function updateQuantity(name, delta) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.name !== name);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.innerText = totalCount;
    cartTotal.innerText = totalPrice;
    
    cartItems.innerHTML = cart.length === 0 
        ? '<p style="text-align:center; padding: 20px; color: #777;">Your cart is empty</p>' 
        : cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.name}', 1)">+</button>
                </div>
            </div>
        `).join('');
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

function checkout() {
    if (cart.length === 0) {
        alert("Please add items to your cart first!");
        return;
    }
    
    let message = "Hi, I want to order:\n\n";
    cart.forEach(item => {
        message += `• ${item.name} × ${item.quantity}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: ₹${total}\n\nPlease confirm my order.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}
