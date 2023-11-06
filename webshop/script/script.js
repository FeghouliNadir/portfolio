// Function to get a DOM element by its ID
const getElement = (id) => document.getElementById(id);

// DOM element references
const payButton = getElement('pay');
const paymentPopup = getElement('payment-popup');
const closePopupButton = getElement('close-popup');
const paymentForm = getElement('payment-form');
const cartToggle = getElement('cart-toggle');
const cartContainer = getElement('cart');
const productElements = document.querySelectorAll('.product');
const cartItemsDiv = document.querySelector('.cart-items');
const cartTotalSpan = getElement('cart-total');

// Define product information and stock quantities
const products = [
    { name: 'Pistol', price: 599, stock: 3, id: 'pistol' },
    { name: 'AK-47', price: 2999, stock: 3, id: 'ak' },
    { name: 'Revolver', price: 1599, stock: 3, id: 'revolver' },
];

// Initialize cart and total
const cart = {};
let total = 0;

// Function to update the cart and UI
function updateCartUI() {
    total = 0;
    cartItemsDiv.innerHTML = '';

    for (const product of products) {
        const quantity = cart[product.id] || 0;
        const stockSpan = getElement(`${product.id}Stock`);
        const incrementButton = getElement(`${product.id}Up`);

        if (quantity > 0) {
            const itemPrice = quantity * product.price;
            total += itemPrice;
            stockSpan.textContent = product.stock - quantity;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `<p>${product.name} x${quantity} - €${itemPrice.toFixed(2)}</p>`;
            cartItemsDiv.appendChild(cartItemDiv);

            if (product.stock - quantity === 0) {
                incrementButton.textContent = 'Out of Stock';
                incrementButton.disabled = true;
            } else {
                incrementButton.textContent = '+';
                incrementButton.disabled = false;
            }
        } else {
            stockSpan.textContent = product.stock;
            incrementButton.textContent = '+';
            incrementButton.disabled = false;
        }
    }

    cartTotalSpan.textContent = total.toFixed(2);
}

// Function to handle quantity updates
function updateQuantity(productId, increment) {
    const stockSpan = getElement(`${productId}Stock`);
    const valueInput = getElement(`${productId}Value`);
    const currentQuantity = cart[productId] || 0;

    if (increment && currentQuantity < products.find((product) => product.id === productId).stock) {
        cart[productId] = currentQuantity + 1;
    } else if (!increment && currentQuantity > 0) {
        cart[productId] = currentQuantity - 1;
    }

    valueInput.value = cart[productId] || 0;
    updateCartUI();
}

// Event listeners
payButton.addEventListener('click', () => paymentPopup.style.display = 'block');
closePopupButton.addEventListener('click', () => paymentPopup.style.display = 'none');

// Close the payment popup when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === paymentPopup) {
        paymentPopup.style.display = 'none';
    }
});

// Handle form submission
paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the value entered in the "name" input field
    let firstName = document.getElementById("name").value;

    alert('Payment submitted. Thank you, ' + firstName + '!');
    location.reload();
});


// Toggle the cart visibility
cartToggle.addEventListener('click', () => cartContainer.style.display = (cartContainer.style.display === 'none' || cartContainer.style.display === '') ? 'block' : 'none');

// Add event listeners to toggle product expansion
productElements.forEach((product) => {
    product.addEventListener('click', (event) => {
        if (!event.target.classList.contains('increment-button') && !event.target.classList.contains('decrement-button') && !event.target.closest('.quantity-control')) {
            product.classList.toggle('expanded');

            // Close all other expanded products except the clicked one
            productElements.forEach((otherProduct) => {
                if (otherProduct !== product && otherProduct.classList.contains('expanded')) {
                    otherProduct.classList.remove('expanded');
                }
            });
        }
    });
});

// Add event listeners for quantity controls
for (const product of products) {
    getElement(`${product.id}Up`).addEventListener('click', () => updateQuantity(product.id, true));
    getElement(`${product.id}Down`).addEventListener('click', () => updateQuantity(product.id, false));
}

// Initialize the cart UI
updateCartUI();
