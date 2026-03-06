/**
 * SHGAdrip – Luxury in Every Drip
 * Main JavaScript
 *
 * NEW: Full color selection system
 * - SHIRT_COLORS defines all available colors with hex values and names
 * - Color swatches rendered in modal; selected color stored in state
 * - Cart item includes selectedColor
 * - WhatsApp messages include color selection
 * - Custom color text input for unlisted colors
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
// COLOR CATALOG
// Grouped: Essentials, Earth & Neutrals, Bold & Vibrant,
//          Pastels & Soft, Dark & Rich, Special
// ===================================
const SHIRT_COLORS = [
  // ── Essentials ──
  { id: "white",       name: "White",        hex: "#F5F0E8",  group: "Essentials" },
  { id: "black",       name: "Black",        hex: "#0A0A0A",  group: "Essentials" },
  { id: "grey",        name: "Ash Grey",     hex: "#9E9E9E",  group: "Essentials" },
  { id: "charcoal",    name: "Charcoal",     hex: "#3C3C3C",  group: "Essentials" },
  { id: "offwhite",    name: "Off White",    hex: "#FAF3E0",  group: "Essentials" },
  { id: "cream",       name: "Cream",        hex: "#FFFDD0",  group: "Essentials" },

  // ── Earth & Neutrals ──
  { id: "beige",       name: "Beige",        hex: "#C8AD90",  group: "Earth & Neutrals" },
  { id: "sand",        name: "Sand",         hex: "#D4B896",  group: "Earth & Neutrals" },
  { id: "camel",       name: "Camel",        hex: "#C19A6B",  group: "Earth & Neutrals" },
  { id: "brown",       name: "Brown",        hex: "#6B3A2A",  group: "Earth & Neutrals" },
  { id: "khaki",       name: "Khaki",        hex: "#B5A642",  group: "Earth & Neutrals" },
  { id: "olive",       name: "Olive",        hex: "#6B6B2A",  group: "Earth & Neutrals" },
  { id: "tan",         name: "Tan",          hex: "#D2B48C",  group: "Earth & Neutrals" },
  { id: "mocha",       name: "Mocha",        hex: "#4A2C2A",  group: "Earth & Neutrals" },

  // ── Bold & Vibrant ──
  { id: "red",         name: "Red",          hex: "#CC2222",  group: "Bold & Vibrant" },
  { id: "scarlet",     name: "Scarlet",      hex: "#E03030",  group: "Bold & Vibrant" },
  { id: "orange",      name: "Orange",       hex: "#E8651A",  group: "Bold & Vibrant" },
  { id: "yellow",      name: "Yellow",       hex: "#F5CC00",  group: "Bold & Vibrant" },
  { id: "gold",        name: "Gold",         hex: "#C9A44A",  group: "Bold & Vibrant" },
  { id: "green",       name: "Green",        hex: "#2D8A34",  group: "Bold & Vibrant" },
  { id: "forestgreen", name: "Forest Green", hex: "#1A4A22",  group: "Bold & Vibrant" },
  { id: "royalblue",   name: "Royal Blue",   hex: "#2244BB",  group: "Bold & Vibrant" },
  { id: "cobalt",      name: "Cobalt Blue",  hex: "#0047AB",  group: "Bold & Vibrant" },
  { id: "navy",        name: "Navy",         hex: "#0A1A3A",  group: "Bold & Vibrant" },
  { id: "purple",      name: "Purple",       hex: "#6B2DB5",  group: "Bold & Vibrant" },
  { id: "violet",      name: "Violet",       hex: "#8B00FF",  group: "Bold & Vibrant" },
  { id: "hotpink",     name: "Hot Pink",     hex: "#D91A7A",  group: "Bold & Vibrant" },
  { id: "magenta",     name: "Magenta",      hex: "#CC00AA",  group: "Bold & Vibrant" },
  { id: "teal",        name: "Teal",         hex: "#008080",  group: "Bold & Vibrant" },
  { id: "cyan",        name: "Cyan",         hex: "#00BBCC",  group: "Bold & Vibrant" },

  // ── Pastels & Soft ──
  { id: "babyblue",    name: "Baby Blue",    hex: "#AED6F1",  group: "Pastels & Soft" },
  { id: "lavender",    name: "Lavender",     hex: "#C9B1E8",  group: "Pastels & Soft" },
  { id: "blush",       name: "Blush",        hex: "#F4C2C2",  group: "Pastels & Soft" },
  { id: "mintgreen",   name: "Mint Green",   hex: "#98E8C4",  group: "Pastels & Soft" },
  { id: "peach",       name: "Peach",        hex: "#FFCBA4",  group: "Pastels & Soft" },
  { id: "lilac",       name: "Lilac",        hex: "#DDA0DD",  group: "Pastels & Soft" },
  { id: "skyblue",     name: "Sky Blue",     hex: "#87CEEB",  group: "Pastels & Soft" },
  { id: "buttercup",   name: "Buttercup",    hex: "#FFF176",  group: "Pastels & Soft" },

  // ── Dark & Rich ──
  { id: "burgundy",    name: "Burgundy",     hex: "#6E0E1A",  group: "Dark & Rich" },
  { id: "maroon",      name: "Maroon",       hex: "#5C0A14",  group: "Dark & Rich" },
  { id: "darkpurple",  name: "Deep Purple",  hex: "#2C0A5A",  group: "Dark & Rich" },
  { id: "midnight",    name: "Midnight",     hex: "#0A0A2A",  group: "Dark & Rich" },
  { id: "bottle",      name: "Bottle Green", hex: "#0A3A1A",  group: "Dark & Rich" },
  { id: "chocolate",   name: "Chocolate",    hex: "#3E1A08",  group: "Dark & Rich" },
  { id: "slate",       name: "Slate",        hex: "#445566",  group: "Dark & Rich" },
  { id: "graphite",    name: "Graphite",     hex: "#2A2A2A",  group: "Dark & Rich" },

  // ── Special ──
  { id: "stonewash",   name: "Stone Wash",   hex: "#8C9BAB",  group: "Special" },
  { id: "acid",        name: "Acid Wash",    hex: "#B0C4C4",  group: "Special" },
  { id: "tie_dye",     name: "Tie-Dye",      hex: "",         group: "Special", isMulti: true },
  { id: "custom",      name: "Custom",       hex: "",         group: "Special", isCustom: true },
];

// Group colors for rendering
const colorGroups = [...new Set(SHIRT_COLORS.map(c => c.group))];

// ===================================
// PRODUCT DATABASE
// ===================================
const products = [
  { id: 1,  name: "USA Hustle Graphic Tee",            category: "Unisex",    type: "design",    image: "images/shirt1.jpg", description: "Premium USA street graphic featuring bold pink artwork with luxury detailing. Printed on 100% cotton. Sizes M – XXL." },
  { id: 2,  name: "Richest Money Back Print Tee",       category: "Unisex",    type: "design",    image: "images/shirt2.jpg", description: "Bold 'Richest' back print featuring cash and luxury ring artwork with gold rope detailing. Sizes M – XXL." },
  { id: 3,  name: "Astronaut Color Pop Graphic Tee",    category: "Unisex",    type: "design",    image: "images/shirt3.jpg", description: "Vibrant astronaut artwork with bold color block detailing for a standout streetwear look. Sizes M – XXL." },
  { id: 4,  name: "Cartoon Space Explorer Tee",         category: "Unisex",    type: "design",    image: "images/shirt4.jpg", description: "Playful astronaut cartoon design featuring planets and space elements. Sizes M – XXL." },
  { id: 5,  name: "El Barto Split Face Graphic Tee",    category: "Unisex",    type: "design",    image: "images/shirt5.jpg", description: "Bold split-face cartoon artwork with 'El Barto' detail on the upper back. Sizes M – XXL." },
  { id: 6,  name: "Street Bunny Graphic Tee",           category: "Unisex",    type: "design",    image: "images/shirt6.jpg", description: "Bold cartoon bunny artwork with street-style attitude and clean back print detailing. Sizes M – XXL." },
  { id: 7,  name: "With God Stone Wash Statement Tee",  category: "Unisex",    type: "design",    image: "images/shirt7.jpg", description: "Premium stone-washed oversized tee featuring 'With God All Things Are Possible' back print. Sizes M – XXL." },
  { id: 8,  name: "Praise The Lord Stone Wash Tee",     category: "Unisex",    type: "design",    image: "images/shirt8.jpg", description: "Premium oversized stone-wash tee featuring 'Praise The Lord' front print and Psalm 150:6 back design. Sizes M – XXL." },
  { id: 9,  name: "Mindset Over Everything Graphic Tee",category: "Unisex",    type: "design",    image: "images/shirt9.jpg", description: "Bold 'Mindset Over Everything' front graphic on premium 100% cotton. Sizes M – XXL." },
  { id: 16, name: "Stonewash Sleeveless",               category: "Sleeveless",type: "sleeveless",price: 17000, image: "images/stonewash-sleeveless.jpg", description: "Vintage stone-washed sleeveless shirt with a uniquely textured finish. Sizes M – XXL." },
  { id: 17, name: "Premium Sleeveless",                 category: "Sleeveless",type: "sleeveless",price: 20000, image: "images/premium-sleeveless.jpg",    description: "Heavyweight premium sleeveless shirt. Clean, structured silhouette. Sizes M – XXL." },
];

// ===================================
// CART
// ===================================
let cart = [];

// ===================================
// STATE
// ===================================
// ===================================
// SLEEVE STYLES
// ===================================
const SLEEVE_STYLES = [
  { id: "sleeved",    name: "With Sleeves",  icon: "fa-solid fa-shirt",        desc: "Classic full-sleeve tee" },
  { id: "sleeveless", name: "Sleeveless",    icon: "fa-solid fa-person-running", desc: "Cut-off sleeveless style" },
];

const state = {
  activeCategory: "all",
  maxPrice: 50000,
  selectedGrade: SHIRT_GRADES[0],
  selectedColor: SHIRT_COLORS[0],  // default: White
  selectedSleeve: SLEEVE_STYLES[0], // default: With Sleeves
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

/** Decide text color (black or white) based on background luminance */
const contrastColor = (hex) => {
  if (!hex) return "#ffffff";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? "#111111" : "#ffffff";
};

const buildSingleWaLink = (product, grade, color) => {
  const phone = "2349160000000";
  const gradeInfo = product.type === "sleeveless"
    ? `Fixed Price: ${formatPrice(product.price)}`
    : `Shirt Grade: ${grade.name} — ${formatPrice(grade.price)}`;
  const colorInfo = color
    ? `Color: ${color.name}${color.isCustom ? " (custom — please specify)" : ""}`
    : "";
  const sleeveInfo = product.type !== "sleeveless" && state.selectedSleeve
    ? `Sleeve Style: ${state.selectedSleeve.name}`
    : "";
  const msg =
    `Hi SHGAdrip! I'd like to order:\n\n` +
    `Design: ${product.name}\n${gradeInfo}\n${sleeveInfo}\n${colorInfo}\n\n` +
    `Please confirm availability and delivery details. Thanks!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
};

const buildCartWaLink = () => {
  const phone = "2349160000000";
  const lines = cart.map((item, i) =>
    `${i + 1}. ${item.design}` +
    (item.sleeveStyle   ? ` · ${item.sleeveStyle}` : "") +
    (item.shirtGrade    ? ` · ${item.shirtGrade} Grade` : "") +
    (item.color         ? ` · ${item.color}` : "") +
    ` — ${formatPrice(item.price)} x ${item.quantity}`
  ).join("\n");
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const msg =
    `Hi SHGAdrip! Here's my order:\n\n${lines}\n\nTotal: ${formatPrice(total)}\n\nPlease confirm details. Thanks!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
};

const effectiveMinPrice = (p) =>
  p.type === "sleeveless" ? p.price : SHIRT_GRADES[0].price;

// ===================================
// RENDER PRODUCT GRID
// ===================================
const renderProducts = () => {
  const filtered = products.filter((p) => {
    const catMatch = state.activeCategory === "all" || p.category === state.activeCategory;
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

    const priceLabel = product.type === "sleeveless"
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
        <span class="card-cta">Choose Grade &amp; Color</span>
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
            data-grade-idx="${idx}" aria-pressed="${idx === 0}">
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
      $("modalWaLink").href = buildSingleWaLink(product, state.selectedGrade, state.selectedColor);
      $("modalAddToCart").dataset.gradeIdx = idx;
    });
  });
};

// ===================================
// MODAL – Sleeve Style Selector
// Only shown for "design" type products (graphic tees).
// Sleeveless-category products already are sleeveless.
// ===================================
const renderSleeveSelector = (product) => {
  const wrap = $("sleeveSelector");
  if (!wrap) return;

  if (product.type === "sleeveless") {
    wrap.closest(".sleeve-selector-section").style.display = "none";
    return;
  }

  wrap.closest(".sleeve-selector-section").style.display = "block";

  // Reset to default
  state.selectedSleeve = SLEEVE_STYLES[0];

  wrap.innerHTML = SLEEVE_STYLES.map((s, idx) => `
    <button class="sleeve-btn${idx === 0 ? " active" : ""}"
            data-sleeve-idx="${idx}" aria-pressed="${idx === 0}">
      <i class="${s.icon} sleeve-btn-icon"></i>
      <span class="sleeve-btn-name">${s.name}</span>
      <span class="sleeve-btn-desc">${s.desc}</span>
    </button>`
  ).join("");

  wrap.querySelectorAll(".sleeve-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.sleeveIdx, 10);
      state.selectedSleeve = SLEEVE_STYLES[idx];
      wrap.querySelectorAll(".sleeve-btn").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      // Refresh WA link with updated sleeve choice
      $("modalWaLink").href = buildSingleWaLink(product, state.selectedGrade, state.selectedColor);
    });
  });
};


const renderColorSelector = (product) => {
  const container = $("colorSelectorWrap");
  if (!container) return;

  // Reset selected color
  state.selectedColor = SHIRT_COLORS[0];

  let html = "";

  colorGroups.forEach((group) => {
    const colors = SHIRT_COLORS.filter(c => c.group === group);
    html += `<div class="color-group">
      <p class="color-group-label">${group}</p>
      <div class="color-swatches">`;

    colors.forEach((color, idx) => {
      const isFirst = group === SHIRT_COLORS[0].group && idx === 0;

      if (color.isMulti) {
        // Tie-dye – gradient swatch
        html += `
          <button class="color-swatch color-swatch--multi${isFirst ? " active" : ""}"
                  data-color-id="${color.id}"
                  title="${color.name}"
                  aria-label="${color.name}"
                  aria-pressed="${isFirst}">
            <span class="swatch-check"><i class="fa-solid fa-check"></i></span>
          </button>`;
      } else if (color.isCustom) {
        // Custom – pencil icon swatch
        html += `
          <button class="color-swatch color-swatch--custom${isFirst ? " active" : ""}"
                  data-color-id="${color.id}"
                  title="${color.name}"
                  aria-label="Enter custom color"
                  aria-pressed="${isFirst}">
            <i class="fa-solid fa-pen"></i>
          </button>`;
      } else {
        const border = color.hex === "#F5F0E8" || color.hex === "#FAF3E0" || color.hex === "#FFFDD0" || color.hex === "#AED6F1" || color.hex === "#C9B1E8" || color.hex === "#F4C2C2" || color.hex === "#98E8C4" || color.hex === "#FFCBA4" || color.hex === "#DDA0DD" || color.hex === "#87CEEB" || color.hex === "#FFF176" || color.hex === "#D2B48C" || color.hex === "#C8AD90" || color.hex === "#D4B896"
          ? "1px solid #444"
          : "none";
        html += `
          <button class="color-swatch${isFirst ? " active" : ""}"
                  data-color-id="${color.id}"
                  style="background:${color.hex};border:${border};"
                  title="${color.name}"
                  aria-label="${color.name}"
                  aria-pressed="${isFirst}">
            <span class="swatch-check" style="color:${contrastColor(color.hex)}">
              <i class="fa-solid fa-check"></i>
            </span>
          </button>`;
      }
    });

    html += `</div></div>`; // close color-swatches and color-group
  });

  // Custom color text input (hidden by default)
  html += `
    <div id="customColorInput" class="custom-color-input" style="display:none;">
      <input type="text" id="customColorText" placeholder="e.g. Coral Pink, Dusty Rose, Army Green..." maxlength="60" />
      <p class="custom-color-hint">We'll confirm your custom color via WhatsApp</p>
    </div>`;

  container.innerHTML = html;

  // Selected color display pill
  updateColorDisplay();

  // Attach swatch click handlers
  container.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      const colorId = swatch.dataset.colorId;
      const color = SHIRT_COLORS.find(c => c.id === colorId);
      if (!color) return;

      state.selectedColor = color;

      // Update active states
      container.querySelectorAll(".color-swatch").forEach((s) => {
        s.classList.remove("active");
        s.setAttribute("aria-pressed", "false");
      });
      swatch.classList.add("active");
      swatch.setAttribute("aria-pressed", "true");

      // Show/hide custom input
      const customInput = $("customColorInput");
      if (color.isCustom) {
        customInput.style.display = "block";
        $("customColorText").focus();
      } else {
        customInput.style.display = "none";
      }

      updateColorDisplay();
      $("modalWaLink").href = buildSingleWaLink(product, state.selectedGrade, state.selectedColor);
    });
  });

  // Custom color text input listener
  container.querySelector("#customColorText")?.addEventListener("input", (e) => {
    state.selectedColor = { ...SHIRT_COLORS.find(c => c.isCustom), name: e.target.value || "Custom" };
    updateColorDisplay();
    $("modalWaLink").href = buildSingleWaLink(product, state.selectedGrade, state.selectedColor);
  });
};

/** Update the selected color display pill in the modal */
const updateColorDisplay = () => {
  const pill = $("selectedColorDisplay");
  if (!pill) return;
  const c = state.selectedColor;
  if (c.isMulti) {
    pill.style.background = "linear-gradient(135deg,#e03030,#f5cc00,#2d8a34,#2244bb,#8b00ff)";
    pill.style.color = "#fff";
    pill.textContent = c.name;
  } else if (c.isCustom) {
    pill.style.background = "var(--grey)";
    pill.style.color = "var(--white)";
    pill.textContent = c.name === "Custom" ? "Custom color" : c.name;
  } else {
    pill.style.background = c.hex;
    pill.style.color = contrastColor(c.hex);
    pill.textContent = c.name;
  }
};

// ===================================
// OPEN / CLOSE MODAL
// ===================================
const openModal = (product) => {
  state.selectedGrade = SHIRT_GRADES[0];
  state.openProduct   = product;

  modalImg.src           = product.image;
  modalImg.alt           = product.name;
  modalCat.textContent   = product.category;
  modalTitle.textContent = product.name;
  modalDesc.textContent  = product.description;

  const displayPrice = product.type === "sleeveless" ? product.price : state.selectedGrade.price;
  modalPrice.textContent = formatPrice(displayPrice);

  renderGradeSelector(product);
  renderSleeveSelector(product);
  renderColorSelector(product);

  modalWaLink.href = buildSingleWaLink(product, state.selectedGrade, state.selectedColor);

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

  // Get sleeve choice (only for design-type products)
  const sleeveStyle = product.type !== "sleeveless"
    ? (state.selectedSleeve?.name || "With Sleeves")
    : null;

  // Get color from custom input if custom selected
  let colorName = state.selectedColor?.name || "White";
  if (state.selectedColor?.isCustom) {
    const customText = $("customColorText")?.value.trim();
    colorName = customText || "Custom (TBC)";
  }

  // Each unique product+grade+sleeve+color combo is a separate cart line
  const existing = cart.find(
    (i) => i.productId === productId && i.shirtGrade === gradeName && i.color === colorName && i.sleeveStyle === sleeveStyle
  );
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId, design: product.name, shirtGrade: gradeName, sleeveStyle, color: colorName, price: itemPrice, quantity: 1 });
  }

  updateCartUI();
  showCartToast(product.name, gradeName, sleeveStyle, colorName, itemPrice);
};

const removeFromCart = (idx) => {
  cart.splice(idx, 1);
  updateCartUI();
  renderCartItems();
};

const changeQty = (idx, delta) => {
  if (!cart[idx]) return;
  cart[idx].quantity += delta;
  if (cart[idx].quantity <= 0) removeFromCart(idx);
  else { updateCartUI(); renderCartItems(); }
};

const updateCartUI = () => {
  const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
  const totalAmt = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  cartCount.textContent      = totalQty;
  cartCount.style.display    = totalQty > 0 ? "flex" : "none";
  cartTotal.textContent      = formatPrice(totalAmt);
  cartWaBtn.style.display    = totalQty > 0 ? "flex" : "none";
  cartEmptyMsg.style.display = totalQty === 0 ? "block" : "none";
};

const renderCartItems = () => {
  if (cart.length === 0) { cartItems.innerHTML = ""; return; }
  cartItems.innerHTML = cart.map((item, idx) => {
    const colorObj = SHIRT_COLORS.find(c => c.name === item.color);
    const swatchStyle = colorObj && !colorObj.isCustom && !colorObj.isMulti
      ? `background:${colorObj.hex};`
      : colorObj?.isMulti
        ? "background:linear-gradient(135deg,#e03030,#f5cc00,#2d8a34,#2244bb,#8b00ff);"
        : "background:var(--grey);";

    return `
    <div class="cart-item">
      <div class="cart-item-info">
        <p class="cart-item-name">${item.design}</p>
        <div class="cart-item-meta">
          ${item.shirtGrade ? `<span class="cart-meta-badge">${item.shirtGrade}</span>` : `<span class="cart-meta-badge">Fixed</span>`}
          ${item.sleeveStyle ? `<span class="cart-meta-badge cart-meta-badge--sleeve"><i class="${item.sleeveStyle === 'Sleeveless' ? 'fa-solid fa-person-running' : 'fa-solid fa-shirt'}"></i> ${item.sleeveStyle}</span>` : ""}
          <span class="cart-color-dot" style="${swatchStyle}" title="${item.color}"></span>
          <span class="cart-item-color-name">${item.color}</span>
        </div>
        <p class="cart-item-price">${formatPrice(item.price)}</p>
      </div>
      <div class="cart-item-controls">
        <button class="cart-qty-btn" onclick="changeQty(${idx},-1)">−</button>
        <span class="cart-qty-num">${item.quantity}</span>
        <button class="cart-qty-btn" onclick="changeQty(${idx},1)">+</button>
        <button class="cart-remove-btn" onclick="removeFromCart(${idx})" aria-label="Remove">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>`;
  }).join("");
};

const showCartToast = (name, grade, sleeve, color, price) => {
  const existing = document.querySelector(".cart-toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check"></i>
    <span><strong>${name}</strong>${grade ? ` · ${grade}` : ""}${sleeve ? ` · ${sleeve}` : ""}${color ? ` · ${color}` : ""} — ${formatPrice(price)}</span>`;
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
