/**
 * SHGAdrip – Luxury in Every Drip
 * Main JavaScript
 *
 * KEY CHANGES:
 * - Products no longer carry a fixed price; price is set by shirt grade
 * - SHIRT_GRADES defines the quality tiers and their prices
 * - Sleeveless products have a fixed price (not grade-based)
 * - Modal shows grade selector for standard designs; fixed notice for Sleeveless
 * - Cart stores { productId, design, shirtGrade, price, quantity }
 * - WhatsApp order message includes grade & price from cart
 */

// ===================================
// SHIRT GRADE / QUALITY TIERS
// ===================================
const SHIRT_GRADES = [
  { name: "Standard", price: 16000 },
  { name: "Premium",  price: 22000 },
  { name: "Pro",      price: 28000 },
  { name: "Luxury",   price: 30000 },
];

// ===================================
// PRODUCT DATABASE
// type: "design"     → grade-based pricing (no price field)
// type: "sleeveless" → fixed price (price field present)
// ===================================
const products = [
  {
    id: 1,
    name: "USA Hustle Graphic Tee",
    category: "Unisex",
    type: "design",
    image: "images/shirt1.jpg",
    description: "Premium USA street graphic featuring bold pink artwork with luxury detailing. Printed on 100% cotton. Available in Black and White. Sizes M – XXL."
  },
  {
    id: 2,
    name: "Richest Money Back Print Tee",
    category: "Unisex",
    type: "design",
    image: "images/shirt2.jpg",
    description: "Bold 'Richest' back print featuring cash and luxury ring artwork with gold rope detailing. Available in Black and White. Sizes M – XXL."
  },
  {
    id: 3,
    name: "Astronaut Color Pop Graphic Tee",
    category: "Unisex",
    type: "design",
    image: "images/shirt3.jpg",
    description: "Vibrant astronaut artwork with bold color block detailing for a standout streetwear look. Available in Black and White. Sizes M – XXL."
  },
  {
    id: 4,
    name: "Cartoon Space Explorer Tee",
    category: "Unisex",
    type: "design",
    image: "images/shirt4.jpg",
    description: "Playful astronaut cartoon design featuring planets and space elements. Available in Black and White. Sizes M – XXL."
  },
  {
    id: 5,
    name: "El Barto Split Face Graphic Tee",
    category: "Unisex",
    type: "design",
    image: "images/shirt5.jpg",
    description: "Bold split-face cartoon artwork with 'El Barto' detail on the upper back. Available in Black and White. Sizes M – XXL."
  },
  {
    id: 6,
    name: "Street Bunny Graphic Tee",
    category: "Unisex",
    type: "design",
    image: "images/shirt6.jpg",
    description: "Bold cartoon bunny artwork with street-style attitude and clean back print detailing. Available in Black and White. Sizes M – XXL."
  },
  {
    id: 7,
    name: "With God Stone Wash Statement Tee",
    category: "Unisex",
    type: "design",
    image: "images/shirt7.jpg",
    description: "Premium stone-washed oversized tee featuring 'With God All Things Are Possible' back print and minimalist cross detail. Available in Black and White. Sizes M – XXL."
  },
  {
    id: 8,
    name: "Praise The Lord Stone Wash Tee",
    category: "Unisex",
    type: "design",
    image: "images/shirt8.jpg",
    description: "Premium oversized stone-wash tee featuring 'Praise The Lord' front print and Psalm 150:6 statement back design. Available in Black and White. Sizes M – XXL."
  },
  {
    id: 9,
    name: "Mindset Over Everything Graphic Tee",
    category: "Unisex",
    type: "design",
    image: "images/shirt9.jpg",
    description: "Bold 'Mindset Over Everything' front graphic on premium 100% cotton. Clean street aesthetic. Available in Black and White. Sizes M – XXL."
  },
  // ── Sleeveless – fixed price, no grade selection ──
  {
    id: 16,
    name: "Stonewash Sleeveless",
    category: "Sleeveless",
    type: "sleeveless",
    price: 17000,
    image: "images/stonewash-sleeveless.jpg",
    description: "Vintage stone-washed sleeveless shirt with a uniquely textured finish. Ultra-premium feel, made for the culture. Available in Black and White. Sizes M – XXL."
  },
  {
    id: 17,
    name: "Premium Sleeveless",
    category: "Sleeveless",
    type: "sleeveless",
    price: 20000,
    image: "images/premium-sleeveless.jpg",
    description: "Heavyweight premium sleeveless shirt. Clean, structured silhouette with luxury cotton quality. Available in Black and White. Sizes M – XXL."
  },
];

// ===================================
// CART
// ===================================
let cart = [];

// ===================================
// STATE
// ===================================
const state = {
  activeCategory: "all",
  maxPrice: 50000,
  selectedGrade: SHIRT_GRADES[0],
  openProduct: null,
};

// ===================================
// DOM REFS
// ===================================
const $  = (id)  => document.getElementById(id);
const $$ = (sel) => document.querySelectorAll(sel);

const productGrid  = $("productGrid");
const modal        = $("productModal");
const modalImg     = $("modalImg");
const modalCat     = $("modalCategory");
const modalTitle   = $("modalTitle");
const modalPrice   = $("modalPrice");
const modalDesc    = $("modalDesc");
const modalWaLink  = $("modalWaLink");
const priceFilter  = $("priceFilter");
const priceDisplay = $("priceDisplay");
const orderForm    = $("orderForm");
const navToggle    = $("navToggle");
const navMenu      = $("navMenu");
const navOverlay   = $("navOverlay");
const header       = $("header");
const cartBtn      = $("cartBtn");
const cartPanel    = $("cartPanel");
const cartOverlay  = $("cartOverlay");
const cartItems    = $("cartItems");
const cartCount    = $("cartCount");
const cartTotal    = $("cartTotal");
const cartWaBtn    = $("cartWaBtn");
const cartEmptyMsg = $("cartEmptyMsg");

// ===================================
// UTILS
// ===================================
const formatPrice = (price) => `\u20a6${price.toLocaleString("en-NG")}`;

const buildSingleWaLink = (product, grade) => {
  const phone = "2349160000000";
  const gradeInfo =
    product.type === "sleeveless"
      ? `Fixed Price: ${formatPrice(product.price)}`
      : `Shirt Grade: ${grade.name} — ${formatPrice(grade.price)}`;
  const msg =
    `Hi SHGAdrip! I'd like to order:\n\n` +
    `Design: ${product.name}\n${gradeInfo}\n\n` +
    `Please confirm availability and delivery details. Thanks!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
};

const buildCartWaLink = () => {
  const phone = "2349160000000";
  const lines = cart.map((item, i) =>
    `${i + 1}. ${item.design}` +
    (item.shirtGrade ? ` (${item.shirtGrade} Grade)` : "") +
    ` — ${formatPrice(item.price)} x ${item.quantity}`
  ).join("\n");
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const msg =
    `Hi SHGAdrip! Here's my order:\n\n${lines}\n\nTotal: ${formatPrice(total)}\n\nPlease confirm details. Thanks!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
};

// Minimum starting price for a product (for slider filtering)
const effectiveMinPrice = (p) =>
  p.type === "sleeveless" ? p.price : SHIRT_GRADES[0].price;

// ===================================
// RENDER PRODUCT GRID
// ===================================
const renderProducts = () => {
  const filtered = products.filter((p) => {
    const catMatch =
      state.activeCategory === "all" || p.category === state.activeCategory;
    const priceMatch = effectiveMinPrice(p) <= state.maxPrice;
    return catMatch && priceMatch;
  });

  productGrid.innerHTML = "";

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;">
        <p style="font-family:var(--font-heading);font-size:1.5rem;letter-spacing:3px;text-transform:uppercase;color:var(--white-dim);">
          No items found
        </p>
      </div>`;
    return;
  }

  const frag = document.createDocumentFragment();
  filtered.forEach((product, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${i * 0.05}s`;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `View ${product.name}`);

    const priceLabel =
      product.type === "sleeveless"
        ? formatPrice(product.price)
        : `From ${formatPrice(SHIRT_GRADES[0].price)}`;

    card.innerHTML = `
      <div class="card-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy"
             onerror="this.parentElement.style.background='var(--black-3)'; this.style.display='none'">
      </div>
      <div class="card-body">
        <p class="card-cat">${product.category}</p>
        <h3 class="card-name">${product.name}</h3>
        <p class="card-price">${priceLabel}</p>
        <span class="card-cta">Choose Grade &amp; Order</span>
      </div>
    `;

    card.addEventListener("click", () => openModal(product));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openModal(product);
    });
    frag.appendChild(card);
  });
  productGrid.appendChild(frag);
};

// ===================================
// MODAL – Grade Selector
// ===================================
const renderGradeSelector = (product) => {
  const wrap = $("gradeSelector");
  if (!wrap) return;

  if (product.type === "sleeveless") {
    wrap.innerHTML = `
      <div class="grade-fixed-notice">
        <i class="fa-solid fa-tag"></i>
        Fixed price — no grade selection needed
      </div>`;
    return;
  }

  wrap.innerHTML = SHIRT_GRADES.map((g, idx) => `
    <button class="grade-btn${idx === 0 ? " active" : ""}"
            data-grade-idx="${idx}"
            aria-pressed="${idx === 0}">
      <span class="grade-btn-name">${g.name}</span>
      <span class="grade-btn-price">${formatPrice(g.price)}</span>
    </button>`
  ).join("");

  wrap.querySelectorAll(".grade-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.gradeIdx, 10);
      state.selectedGrade = SHIRT_GRADES[idx];

      wrap.querySelectorAll(".grade-btn").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      $("modalPrice").textContent = formatPrice(state.selectedGrade.price);
      $("modalWaLink").href = buildSingleWaLink(product, state.selectedGrade);
      $("modalAddToCart").dataset.gradeIdx = idx;
    });
  });
};

const openModal = (product) => {
  state.selectedGrade = SHIRT_GRADES[0];
  state.openProduct   = product;

  modalImg.src        = product.image;
  modalImg.alt        = product.name;
  modalCat.textContent  = product.category;
  modalTitle.textContent = product.name;
  modalDesc.textContent  = product.description;

  const displayPrice = product.type === "sleeveless"
    ? product.price : state.selectedGrade.price;
  modalPrice.textContent = formatPrice(displayPrice);

  renderGradeSelector(product);
  modalWaLink.href = buildSingleWaLink(product, state.selectedGrade);

  const addBtn = $("modalAddToCart");
  addBtn.dataset.productId = product.id;
  addBtn.dataset.gradeIdx  = 0;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  setTimeout(() => modal.querySelector(".modal-close").focus(), 50);
};

const closeModal = () => {
  modal.classList.remove("active");
  document.body.style.overflow = "";
};

// ===================================
// CART
// ===================================
const addToCart = (productId, gradeIdx) => {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  let itemPrice, gradeName;
  if (product.type === "sleeveless") {
    itemPrice = product.price;
    gradeName = null;
  } else {
    const grade = SHIRT_GRADES[gradeIdx] || SHIRT_GRADES[0];
    itemPrice   = grade.price;
    gradeName   = grade.name;
  }

  const existing = cart.find(
    (i) => i.productId === productId && i.shirtGrade === gradeName
  );
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId, design: product.name, shirtGrade: gradeName, price: itemPrice, quantity: 1 });
  }

  updateCartUI();
  showCartToast(product.name, gradeName, itemPrice);
};

const removeFromCart = (productId, gradeName) => {
  const gradeKey = gradeName === "null" ? null : gradeName;
  cart = cart.filter((i) => !(i.productId === productId && i.shirtGrade === gradeKey));
  updateCartUI();
  renderCartItems();
};

const changeQty = (productId, gradeName, delta) => {
  const gradeKey = gradeName === "null" ? null : gradeName;
  const item = cart.find((i) => i.productId === productId && i.shirtGrade === gradeKey);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) removeFromCart(productId, String(gradeKey));
  else { updateCartUI(); renderCartItems(); }
};

const updateCartUI = () => {
  const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
  const totalAmt = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  cartCount.textContent  = totalQty;
  cartCount.style.display = totalQty > 0 ? "flex" : "none";
  cartTotal.textContent   = formatPrice(totalAmt);
  cartWaBtn.style.display = totalQty > 0 ? "flex" : "none";
  cartEmptyMsg.style.display = totalQty === 0 ? "block" : "none";
};

const renderCartItems = () => {
  if (cart.length === 0) { cartItems.innerHTML = ""; return; }
  cartItems.innerHTML = cart.map((item) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <p class="cart-item-name">${item.design}</p>
        ${item.shirtGrade ? `<p class="cart-item-grade">${item.shirtGrade} Grade</p>` : `<p class="cart-item-grade">Fixed Price</p>`}
        <p class="cart-item-price">${formatPrice(item.price)}</p>
      </div>
      <div class="cart-item-controls">
        <button class="cart-qty-btn" onclick="changeQty(${item.productId},'${item.shirtGrade}',-1)">−</button>
        <span class="cart-qty-num">${item.quantity}</span>
        <button class="cart-qty-btn" onclick="changeQty(${item.productId},'${item.shirtGrade}',1)">+</button>
        <button class="cart-remove-btn" onclick="removeFromCart(${item.productId},'${item.shirtGrade}')" aria-label="Remove">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>`
  ).join("");
};

const showCartToast = (name, grade, price) => {
  const existing = document.querySelector(".cart-toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check"></i>
    <span><strong>${name}</strong>${grade ? ` · ${grade}` : ""} — ${formatPrice(price)}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("visible"), 10);
  setTimeout(() => { toast.classList.remove("visible"); setTimeout(() => toast.remove(), 300); }, 2800);
};

// ===================================
// CART PANEL
// ===================================
const openCart = () => {
  renderCartItems();
  cartPanel.classList.add("open");
  cartOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

const closeCart = () => {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
};

// ===================================
// MOBILE NAV
// ===================================
const openNav = () => {
  navMenu.classList.add("open");
  navToggle.classList.add("open");
  navOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
};
const closeNav = () => {
  navMenu.classList.remove("open");
  navToggle.classList.remove("open");
  navOverlay.classList.remove("active");
  document.body.style.overflow = "";
};

// ===================================
// ORDER FORM
// ===================================
const handleOrderSubmit = (e) => {
  e.preventDefault();
  const name    = $("clientName").value.trim();
  const phone   = $("clientPhone").value.trim();
  const size    = $("shirtSize").value;
  const quality = $("shirtQuality").value;
  const color   = $("shirtColor").value.trim() || "Not specified";
  const design  = $("designDesc").value.trim() || "Not specified";

  const msg =
    `Hi SHGAdrip! I'd like to place an order:\n\n` +
    `Name: ${name}\nPhone: ${phone}\nSize: ${size}\n` +
    `Quality/Grade: ${quality}\nColor: ${color}\nDesign: ${design}\n\n` +
    `Please confirm details. Thanks!`;

  window.open(`https://wa.me/2349160000000?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  orderForm.reset();
};

// ===================================
// EVENTS
// ===================================
const initEvents = () => {
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeCategory = btn.dataset.filter;
      renderProducts();
    });
  });

  priceFilter.addEventListener("input", () => {
    state.maxPrice = parseInt(priceFilter.value, 10);
    priceDisplay.textContent = formatPrice(state.maxPrice);
    renderProducts();
  });

  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  $("modalAddToCart").addEventListener("click", () => {
    const productId = parseInt($("modalAddToCart").dataset.productId, 10);
    const gradeIdx  = parseInt($("modalAddToCart").dataset.gradeIdx || "0", 10);
    addToCart(productId, gradeIdx);
    closeModal();
  });

  cartBtn.addEventListener("click", openCart);
  cartOverlay.addEventListener("click", closeCart);
  $("cartClose").addEventListener("click", closeCart);
  cartWaBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    window.open(buildCartWaLink(), "_blank", "noopener");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal.classList.contains("active")) closeModal();
      if (navMenu.classList.contains("open")) closeNav();
      if (cartPanel.classList.contains("open")) closeCart();
    }
  });

  navToggle.addEventListener("click", () => {
    navMenu.classList.contains("open") ? closeNav() : openNav();
  });
  navOverlay.addEventListener("click", () => {
    if (navMenu.classList.contains("open")) closeNav();
  });

  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("open")) closeNav();
    });
  });

  orderForm.addEventListener("submit", handleOrderSubmit);

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });

  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
      }
    });
  });
};

// ===================================
// INTERSECTION OBSERVER
// ===================================
const initObserver = () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  const animateOnScroll = (selector) => {
    $$(selector).forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
      io.observe(el);
    });
  };
  animateOnScroll(".feature");
  animateOnScroll(".stat");
  animateOnScroll(".size-card");
};

// ===================================
// INIT
// ===================================
const init = () => {
  updateCartUI();
  renderProducts();
  initEvents();
  initObserver();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
