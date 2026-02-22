 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..c3b6a34043e8ceff98b121ec34d7cbbdf18b4a78
--- /dev/null
+++ b/script.js
@@ -0,0 +1,182 @@
+const products = [
+  {
+    name: 'Anillo Spiral Bloom',
+    price: 189,
+    description: 'Acero inoxidable con acabado lila satinado y forma orgánica.',
+    material: 'acero inoxidable'
+  },
+  {
+    name: 'Collar Dual Petal',
+    price: 279,
+    description: 'Cadena de acero quirúrgico con doble dije curvo en resina.',
+    material: 'acero quirúrgico'
+  },
+  {
+    name: 'Pulsera Resin Flow',
+    price: 159,
+    description: 'Cuentas de resina translúcidas con cierre ajustable.',
+    material: 'cuentas de resina'
+  },
+  {
+    name: 'Aretes Orbit Curve',
+    price: 149,
+    description: 'Acero inoxidable pulido con curvas ligeras y modernas.',
+    material: 'acero inoxidable'
+  },
+  {
+    name: 'Choker Soft Loop',
+    price: 239,
+    description: 'Base de acero quirúrgico con detalles de plástico perlado.',
+    material: 'plástico'
+  },
+  {
+    name: 'Anillo Aurora Bend',
+    price: 199,
+    description: 'Anillo abierto de acero quirúrgico, cómodo y resistente.',
+    material: 'acero quirúrgico'
+  },
+  {
+    name: 'Pulsera Lila Nodes',
+    price: 169,
+    description: 'Combinación de cuentas de resina mate y brillo suave.',
+    material: 'cuentas de resina'
+  },
+  {
+    name: 'Collar Velvet Drift',
+    price: 289,
+    description: 'Cadena fina con dije orgánico en acero inoxidable.',
+    material: 'acero inoxidable'
+  },
+  {
+    name: 'Aretes Bloom Pop',
+    price: 139,
+    description: 'Piezas ligeras en plástico premium con pin de acero.',
+    material: 'plástico'
+  },
+  {
+    name: 'Anillo Gota Violeta',
+    price: 179,
+    description: 'Acero inoxidable con inserto de resina color lila.',
+    material: 'cuentas de resina'
+  },
+  {
+    name: 'Collar Ripple Arc',
+    price: 299,
+    description: 'Diseño alternativo en acero quirúrgico con líneas fluidas.',
+    material: 'acero quirúrgico'
+  },
+  {
+    name: 'Pulsera Bubble Shape',
+    price: 149,
+    description: 'Cuentas de plástico premium en tonos lila pastel.',
+    material: 'plástico'
+  },
+  {
+    name: 'Aretes Spiral Kiss',
+    price: 169,
+    description: 'Mini espiral sutil en acero inoxidable con brillo espejo.',
+    material: 'acero inoxidable'
+  },
+  {
+    name: 'Anillo Resin Wave',
+    price: 189,
+    description: 'Aro de acero quirúrgico con frente de resina texturizada.',
+    material: 'acero quirúrgico'
+  },
+  {
+    name: 'Collar Mini Capsule',
+    price: 259,
+    description: 'Colgante en forma orgánica con detalles plásticos suaves.',
+    material: 'plástico'
+  },
+  {
+    name: 'Pulsera Steel Muse',
+    price: 179,
+    description: 'Eslabones de acero inoxidable y acentos de resina.',
+    material: 'acero inoxidable'
+  },
+  {
+    name: 'Aretes Resin Cloud',
+    price: 159,
+    description: 'Resina translúcida con gancho de acero quirúrgico.',
+    material: 'cuentas de resina'
+  },
+  {
+    name: 'Anillo Twist Frame',
+    price: 209,
+    description: 'Doble giro contemporáneo en acero inoxidable.',
+    material: 'acero inoxidable'
+  },
+  {
+    name: 'Collar Organic Drop',
+    price: 279,
+    description: 'Línea minimal de acero quirúrgico con caída suave.',
+    material: 'acero quirúrgico'
+  },
+  {
+    name: 'Pulsera Petal Bounce',
+    price: 169,
+    description: 'Cuentas de plástico y resina con estética juvenil.',
+    material: 'plástico'
+  }
+];
+
+const productGrid = document.getElementById('productGrid');
+const cartCount = document.getElementById('cartCount');
+const menuToggle = document.getElementById('menuToggle');
+const navLinks = document.getElementById('navLinks');
+
+let cartItems = 0;
+
+const imageFor = (index, material) => {
+  const encoded = encodeURIComponent(`${material}, jewelry, lilac background, studio photo`);
+  return `https://source.unsplash.com/600x600/?${encoded}&sig=${index + 1}`;
+};
+
+const formatPrice = value =>
+  new Intl.NumberFormat('es-MX', {
+    style: 'currency',
+    currency: 'MXN',
+    maximumFractionDigits: 0
+  }).format(value);
+
+const renderProducts = () => {
+  productGrid.innerHTML = products
+    .map(
+      (product, index) => `
+      <article class="product-card" style="animation-delay:${index * 0.04}s">
+        <img src="${imageFor(index, product.material)}" alt="${product.name}" loading="lazy" />
+        <div class="product-content">
+          <h3 class="product-title">${product.name}</h3>
+          <p class="price">${formatPrice(product.price)}</p>
+          <p class="product-desc">${product.description}</p>
+          <button class="add-cart" data-product="${product.name}">Agregar al carrito</button>
+        </div>
+      </article>`
+    )
+    .join('');
+};
+
+renderProducts();
+
+productGrid.addEventListener('click', event => {
+  if (!event.target.classList.contains('add-cart')) return;
+
+  cartItems += 1;
+  cartCount.textContent = cartItems;
+  event.target.textContent = 'Añadido ✓';
+
+  setTimeout(() => {
+    event.target.textContent = 'Agregar al carrito';
+  }, 900);
+});
+
+menuToggle.addEventListener('click', () => {
+  navLinks.classList.toggle('show');
+});
+
+navLinks.addEventListener('click', event => {
+  if (event.target.tagName === 'A') {
+    navLinks.classList.remove('show');
+  }
+});
 
EOF
)
