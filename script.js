const cartBtns   = document.getElementsByClassName('cart-btn');
const cartNum    = document.querySelector('.badge-number');
const learnBtn   = document.getElementsByClassName('learn-btn')[0];
const loginBtn   = document.getElementsByClassName('login-btn')[0];
const loginModal = document.getElementsByClassName('loginModal')[0];
const userCircle = document.querySelector('.user-name');
const emailInput = document.getElementById('floatingInput');
const passInput  = document.getElementById('floatingPassword');
const signOut    = document.getElementsByClassName('signout')[0];
const cartTable  = document.querySelector('.table tbody');
const addToCart  = document.querySelectorAll('.cart-btn');
const clearCart  = document.querySelector('.clear-cart');

let count = parseInt(localStorage.getItem('cartCount')) || 0;
cartNum.textContent = count.toString();

// Function to update the cart count in the UI
function updateCartCount() {
  cartNum.textContent = count.toString();
  localStorage.setItem('cartCount', count);
}

// Function to increment the cart count
function incrementCartCount() {
  count++;
  updateCartCount();
}

// Function to clear the cart
function clearCartItems() {
  count = 0;
  updateCartCount();
  localStorage.removeItem('cartItems');
  cartTableBody.innerHTML = '';
}

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to handle adding an item to the cart
function addToCartHandler(event) {
  const button = event.target;                                                                      // Get the clicked button element
  const productContainer = button.closest('.card');                                                 // Find the closest parent element with class 'card'
  const productName = productContainer.querySelector('.card-title').textContent;                    // Get the product name within the container
  const productPrice = productContainer.querySelector('.card-text').textContent;                 // Get the product price within the container
  
  const cartItem = {
    name: productName,
    price: productPrice,
    
};

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  cartItems.push(cartItem);

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  console.log(cartItems);
}

// Add event listeners to "Add to Cart" buttons
for (let i = 0; i < cartBtns.length; i++) {
  cartBtns[i].addEventListener('click', incrementCartCount);
}

// Add event listener to "Add to Cart" button
if (addToCart) {
  addToCart.forEach((button) => {
  button.addEventListener('click', addToCartHandler);
});
}

// Add event listener to "Clear Cart" button
if (clearCart){clearCart.addEventListener('click', clearCartItems);}


// Login modal event listener
loginModal.addEventListener('click', function() {
  if (emailInput.value !== '' || passInput.value !== '' || !emailInput.value.includes('@')) {
    const modalElement = document.getElementById('exampleModal');
    const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
    bootstrapModal.hide();
    loginBtn.style.display = 'none';
    const firstLetter = emailInput.value[0].toUpperCase();
    userCircle.classList.remove('visually-hidden');
    userCircle.textContent = firstLetter;
  } else {
    alert('Invalid Input');
  }
});

// Sign out event listener
signOut.addEventListener('click', function() {
  userCircle.classList.add('visually-hidden');
  loginBtn.style.display = 'block';
});

const cartTableBody = document.querySelector('.cartTable');

function renderCart() {

  // Clear the table body before rendering
  cartTableBody.innerHTML = '';

  // Retrieve the cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  

  
  // Iterate over the cart items and generate table rows
  cartItems.forEach((item, index) => {
    const { name, price, quantity } = item;

    

    // Create a table row for each cart item
    const row = document.createElement('tr');

    

    // Set the row HTML content
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${name}</td>
      <td>${price}</td>
      <td><select class="quantity-select" data-index="${index}">
          <option value="1" ${quantity === 1 ? 'selected' : ''}>1</option>
          <option value="2" ${quantity === 2 ? 'selected' : ''}>2</option>
          <option value="3" ${quantity === 3 ? 'selected' : ''}>3</option>
          <option value="4" ${quantity === 4 ? 'selected' : ''}>4</option>
          <option value="5" ${quantity === 5 ? 'selected' : ''}>5</option>
        </select></td>
      <td></td>
    `;

   
    // Append the row to the table body
    cartTableBody.appendChild(row);
  });
}

// Call the renderCart function to initially render the cart items
renderCart();