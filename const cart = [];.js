// ===== Page Loader Animation =====
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('fade-out');
    setTimeout(() => loader.style.display = 'none', 800);
  }
});

// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// ===== Cart Drawer Toggle =====
const cartDrawer = document.querySelector('.cart-drawer');
const cartOverlay = document.querySelector('.cart-overlay');
const openCartBtn = document.querySelector('#open-cart');
const closeCartBtn = document.querySelector('#close-cart');

openCartBtn?.addEventListener('click', () => {
  cartDrawer.classList.add('open');
  cartDrawer.style.animation = 'slideIn 0.3s forwards';
  cartOverlay.classList.add('active');
  renderCart();
});

closeCartBtn?.addEventListener('click', () => {
  cartDrawer.style.animation = 'slideOut 0.3s forwards';
  setTimeout(() => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('active');
  }, 300);
});

cartOverlay?.addEventListener('click', () => {
  cartDrawer.style.animation = 'slideOut 0.3s forwards';
  setTimeout(() => {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('active');
  }, 300);
});

// ===== CART FUNCTIONALITY =====
let cart = [];

const cartContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('#cart-count');

function addToCart(productName, price) {
  const item = { name: productName, price };
  cart.push(item);
  renderCart();
  updateCartCount();
  animateCartIcon(); // <-- New
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  updateCartCount();
}

function renderCart() {
  if (!cartContainer) return;
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(div);
  });
}

function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? 'inline-block' : 'none';
  }
}

// ===== Animate Cart Icon on Add =====
function animateCartIcon() {
  if (cartCount) {
    cartCount.classList.add('pulse');
    setTimeout(() => cartCount.classList.remove('pulse'), 300);
  }
}

// ===== Sample Add to Cart Buttons =====
const addCartButtons = document.querySelectorAll('.add-to-cart');

addCartButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.getAttribute('data-name');
    const price = btn.getAttribute('data-price');
    addToCart(name, price);
  });
});

// ===== Product Slider Auto Scroll =====
const slider = document.querySelector('.slider');
let isScrolling = true;

if (slider) {
  setInterval(() => {
    if (isScrolling) {
      slider.scrollLeft += 1.5;
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0;
      }
    }
  }, 16); // ~60fps
}
