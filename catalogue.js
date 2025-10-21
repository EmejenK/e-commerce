//Catalogue Page the Cart Functions
document.addEventListener('DOMContentLoaded',() =>{
const addToCartButtons= document.querySelectorAll('.add-to-cart');
const cartItemCount= document.querySelector('.cart-icon span');
const cartItemlist= document.querySelector('.cart-items');
const cartTotal= document.querySelector('.cart-total');
const cartIcon= document.querySelector('.cart-icon');
const sidebar= document.getElementById('.sidebar');

let cartItem = [];
let totalAmount = 0;

addToCartButtons.forEach((button, index) => {
button.addEventListener('click', ()=>{
    const Item= {
        name: document.querySelectorAll('.card .card-title')[index].textContent,
        price: parseFloat(
            document.querySelectorAll('.price')[index].textContent.slice(1),
        ),
        quantity: 1,
    };

    const existingItem = cartItems.find(
        (cartItem) => cartItem.name === Item.name,
    );
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItem.push(item);
    }

    totalAmount += item.price;

    updateCartUI();
});

function updateCartUI() {
    updateCartItemCount(cartItems.length);
    updateCartItemList();
    UpdateCartTotal();
}

function updateCartItemCount(count) {
    cartItemCount.textContent = count;
}

function updateCartItemList() {
    cartItemlist.innerHTML = '';
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item', 'individual-cart-item');
        
        cartItem.innerHTML= '
        <span>(${item.quantity}x)${item.name}</span>
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}
        <button class="remove-btn" data-index="${index}"><i class="fa fa-times" aria-hidden="true"></i></button>
        </span>
        ';

        cartItemlist.append(cartItem);
    });

    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            removeItemFromCart(index);
        });
    });
}

function removeItemFronCart(index) {
    const removeItem = cartItems.splice(index, 1)[0];
    totalAmount -= removeItem.price * removeItem.quantity;
    updateCartUI();
}

function UpdateCartTotal() {
    cartTotal.textContent = '$${totalAmount.toFixed(2)}';
}

cartIcon.addEventListener('click', ()=> {
    sidebar.classList.toggle('open');
});

const closeButton = document.querySelector('sidebar-close');
closeButton.addEventListener('click', ()=>{
    sidebar.classList.remove('open');
});
});

});