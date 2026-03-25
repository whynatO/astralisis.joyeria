const products = [
  {
    id: 1,
    name: 'Anillo Spiral Bloom',
    price: 189,
    category: 'acero',
    description: 'Acero inoxidable con acabado lila satinado y forma orgánica.'
  },
  {
    id: 2,
    name: 'Collar Dual Petal',
    price: 279,
    category: 'acero',
    description: 'Cadena de acero quirúrgico con doble dije curvo en resina.'
  },
  {
    id: 3,
    name: 'Pulsera Resin Flow',
    price: 159,
    category: 'resina',
    description: 'Cuentas translúcidas con cierre ajustable y diseño ligero.'
  },
  {
    id: 4,
    name: 'Aretes Orbit Curve',
    price: 149,
    category: 'acero',
    description: 'Acero pulido con curvas ligeras y estética contemporánea.'
  },
  {
    id: 5,
    name: 'Choker Soft Loop',
    price: 239,
    category: 'plastico',
    description: 'Base flexible con detalles perlados y herrajes resistentes.'
  },
  {
    id: 6,
    name: 'Anillo Aurora Bend',
    price: 199,
    category: 'acero',
    description: 'Anillo abierto de acero quirúrgico, cómodo y durable.'
  },
  {
    id: 7,
    name: 'Aretes Resin Cloud',
    price: 159,
    category: 'resina',
    description: 'Resina translúcida con gancho hipoalergénico de acero.'
  },
  {
    id: 8,
    name: 'Collar Mini Capsule',
    price: 259,
    category: 'plastico',
    description: 'Colgante orgánico con textura suave y acabado brillante.'
  }
];

const cart = [];
const productsGrid = document.getElementById('productsGrid');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCountElement = document.querySelector('.cart-count');

const categoryLabel = {
  acero: 'Acero',
  resina: 'Resina',
  plastico: 'Plástico'
};

const formatCurrency = value =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(value);

const imageForCategory = category => {
  switch (category) {
    case 'acero':
      return 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80';
    case 'resina':
      return 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80';
    default:
      return 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=800&q=80';
  }
};

function renderProducts(category = 'todos') {
  const filtered =
    category === 'todos' ? products : products.filter(product => product.category === category);

  productsGrid.innerHTML = filtered
    .map(
      product => `
      <article class="product-card">
        <img src="${imageForCategory(product.category)}" alt="${product.name}" loading="lazy" />
        <div class="product-content">
          <span class="product-category">${categoryLabel[product.category]}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-footer">
            <strong>${formatCurrency(product.price)}</strong>
            <button onclick="addToCart(${product.id})">Agregar</button>
          </div>
        </div>
      </article>
    `
    )
    .join('');
}

function updateCartUI() {
  cartCountElement.textContent = cart.reduce((count, item) => count + item.qty, 0);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío.</p>';
    cartTotalElement.textContent = '0';
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      item => `
        <div class="cart-item">
          <div>
            <h4>${item.name}</h4>
            <p>${formatCurrency(item.price)} x ${item.qty}</p>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
        </div>
      `
    )
    .join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotalElement.textContent = total;
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index === -1) return;

  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }

  updateCartUI();
}

function filterProducts(category) {
  document.querySelectorAll('.filter-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.filter === category);
  });

  renderProducts(category);
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
}

function handleContact(event) {
  event.preventDefault();
  const form = event.target;
  alert('¡Gracias! Tu mensaje fue enviado correctamente.');
  form.reset();
}

renderProducts();
updateCartUI();

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.filterProducts = filterProducts;
window.toggleCart = toggleCart;
window.handleContact = handleContact;
