(function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

    const headerCart = document.querySelector('.cart');

    if (isNaN(totalPrice)) {
        totalPrice = 0;
    }

    validateCart();
    updateCart();

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.box');
            const img = product.querySelector('.img img').src;
            const name = product.querySelector('h5').textContent;
            const price = parseFloat(product.querySelector('.price').textContent.replace('$', ''));

            addProductToCart(img, name, price);
        });
    });

    function addProductToCart(img, name, price) {
        const productIndex = cart.findIndex(item => item.name === name);
        if (productIndex > -1) {
            const existingItem = cart[productIndex];
            existingItem.quantity++;
            existingItem.totalPrice = existingItem.price * existingItem.quantity;
            totalPrice += existingItem.price;
        } else {
            const newItem = { img, name, price, quantity: 1, totalPrice: price };
            cart.push(newItem);
            totalPrice += price;
        }

        saveCart();
        updateCart();
    }

    function updateQuantity(name, change) {
        const productIndex = cart.findIndex(item => item.name === name);

        if (productIndex > -1) {
            const item = cart[productIndex];
            item.quantity += change;

            if (item.quantity <= 0) {
                cart.splice(productIndex, 1);
            } else {
                item.totalPrice = item.price * item.quantity;
            }

            totalPrice = cart.reduce((sum, product) => sum + product.totalPrice, 0);
            saveCart();
            updateCart();
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));
    }

    function updateCart() {
        headerCart.innerHTML = '';

        if(cart.length === 0) {
            headerCart.innerHTML = '<h3 style="color:#AB4459;">Cart is empty</h3>'; 
        }

        const bgColors = [
            "#f8d7da", "#d4edda", "#d1ecf1", 
            "#fef3cd", "#f5c6cb", "#c3e6cb", 
            "#bee5eb", "#ffeeba"
        ];
        cart.forEach((item, index) => {
            const itemTotalPrice = (item.quantity * item.price).toFixed(2); 
    
            const backgroundColor = bgColors[index % bgColors.length];

            const cartItem = document.createElement('div');
            cartItem.classList.add('header-cart-item');
            cartItem.style.backgroundColor = backgroundColor; 
            cartItem.innerHTML = `
                <div class="img">
                    <img class="rounded" src="${item.img}" alt="${item.name}">
                    <div class="imgtitle cart-item-details">
                        <h6>${item.name}</h6>
                        <div class="qu rounded">
                            <div class="minus rounded">-</div>
                            <div class="price">${item.quantity}</div>
                            <div class="plus rounded">+</div>
                        </div>
                    </div>
                </div>
                <div class="totele h6">$${itemTotalPrice}</div>
            `;
            headerCart.appendChild(cartItem);
    
            // Add event listeners for minus and plus buttons
            cartItem.querySelector('.minus').addEventListener('click', () => updateQuantity(item.name, -1));
            cartItem.querySelector('.plus').addEventListener('click', () => updateQuantity(item.name, 1));
        });
        
        updateall()
    }
    

    function validateCart() {
        cart = cart.map(item => {
            if (!item.totalPrice || isNaN(item.totalPrice)) {
                item.totalPrice = item.price * item.quantity || 0;
            }
            return item;
        });
    }

    function updateall() {
        document.querySelector('.totle-price').innerHTML = `$${totalPrice.toFixed(2)}`;
        document.querySelector('.pvalue').innerHTML = cart.length;

        if(cart.length < 1){
            document.querySelector('.pvalue').style.display = 'none';
            document.querySelector('.chackout').style.display = 'none ';
        } else { 
            document.querySelector('.pvalue').style.display = 'flex';
            document.querySelector('.chackout').style.display = 'block';
        }

    }
})();
