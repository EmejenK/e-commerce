// Catalogue Page the Cart Functions
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;

    // Event delegation for remove buttons
    cartItemsList.addEventListener('click', (event) => {
        if (event.target.closest('.remove-btn')) {
            const button = event.target.closest('.remove-btn');
            const index = parseInt(button.dataset.index);
            removeItemFromCart(index);
        }
    });

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                name: document.querySelectorAll('.card .card-title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.price')[index].textContent.slice(1),
                ),
                quantity: 1,
            };

            const existingItem = cartItems.find(
                (cartItem) => cartItem.name === item.name,
            );
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push(item);
            }

            totalAmount += item.price;

            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount();
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount() {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartItemCount.textContent = totalItems;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                    <button class="remove-btn" data-index="${index}">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                </span>
            `;

            cartItemsList.append(cartItem);
        });
    }

    function removeItemFromCart(index) {
        if (index >= 0 && index < cartItems.length) {
            const removedItem = cartItems.splice(index, 1)[0];
            totalAmount -= removedItem.price * removedItem.quantity;
            updateCartUI();
        }
    }

    function updateCartTotal() {
        // Recalculate total to ensure accuracy
        totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});