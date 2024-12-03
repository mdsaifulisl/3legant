// Initialize cart and total price from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

const headerCart = document.querySelector('.header-cart');
const cartElement = document.getElementById('cart');
const totalPriceElement = document.getElementById('total-price');

// Check if totalPrice is not a number (e.g., if localStorage has invalid data)
if (isNaN(totalPrice)) {
    totalPrice = 0;
}

// Function to update the cart display
function updateCart() {
    cartElement.innerHTML = '';

    cart.forEach(item => {
        const itemTotalPrice = (item.price * item.quantity).toFixed(2);
        const cartItem = document.createElement('div');
        cartItem.classList.add('header-cart-item');
        cartItem.innerHTML = `
            <div class="img">
                <img class="rounded" src="${item.img}" alt="">
                <div class="imgtitle cart-item-details">
                    <h6>${item.name}</h6>
                    <div class="qu rounded">
                        <div class="plus rounded">+</div>
                        <div class="price">${item.quantity}</div>
                        <div class="minus rounded">-</div>
                    </div>
                </div>
            </div>
            <div class="totele h6">$${itemTotalPrice}</div>
        `;
        cartElement.appendChild(cartItem);

        // Add event listeners for quantity buttons
        cartItem.querySelector('.minus').addEventListener('click', () => {
            updateQuantity(item.name, -1);
        });
        cartItem.querySelector('.plus').addEventListener('click', () => {
            updateQuantity(item.name, 1);
        });
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to add product to cart
function addProductToCart(img, name, price) {
    const productIndex = cart.findIndex(item => item.name === name);
    if (productIndex > -1) {
        cart[productIndex].quantity++;
    } else {
        cart.push({ img, name, price, quantity: 1 });
    }
    totalPrice += price;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice);
    updateCart();
}

// Function to update quantity of an item
function updateQuantity(name, change) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalPrice', totalPrice);
        updateCart();
    }
}

// Event listeners for add to cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const product = e.target.closest('.box');
        const img = product.querySelector('.img img').src;
        const name = product.querySelector('.name').textContent;
        const price = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
        addProductToCart(img, name, price);
    });
});

// Initial cart update on page load
updateCart();