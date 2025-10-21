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

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            // Find the closest card container to get the specific item details
            const card = event.target.closest('.card');
            
            if (!card) {
                console.error('Could not find card element');
                return;
            }

            const itemName = card.querySelector('.card-title').textContent;
            const itemPriceText = card.querySelector('.price').textContent;
            const itemPrice = parseFloat(itemPriceText.replace('$', ''));

            const item = {
                name: itemName,
                price: itemPrice,
                quantity: 1,
            };

            // Check if item already exists in cart
            const existingItemIndex = cartItems.findIndex(
                (cartItem) => cartItem.name === item.name
            );

            if (existingItemIndex !== -1) {
                // Item exists, increase quantity
                cartItems[existingItemIndex].quantity++;
            } else {
                // Item doesn't exist, add new item
                cartItems.push(item);
            }

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