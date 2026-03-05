/**
 * SHGAdrip – Luxury in Every Drip
 * Main JavaScript
 */

// ===================================
// PRODUCT DATABASE
// ===================================
const products = [
  {
  id: 1,
  name: "USA Hustle Graphic Tee",
  price: 16000,
  category: "Unisex",
  gsm: "250GSM",
  image: "images/shirt1.jpg",
  description: "Premium USA street graphic featuring bold pink artwork with luxury detailing. Printed on 250GSM 100% cotton for a soft yet structured feel. Available in Black and White. Sizes M - XXL."
},
  {
  id: 2,
  name: "Richest Money Back Print Tee",
  price: 16000,
  category: "Unisex",
  gsm: "250GSM",
  image: "images/shirt2.jpg",
  description: "Bold 'Richest' back print featuring cash and luxury ring artwork with gold rope detailing. Printed on premium 250GSM 100% cotton for durability and comfort. Available in Black and White. Sizes M - XXL."
},
  {
  id: 3,
  name: "Astronaut Color Pop Graphic Tee",
  price: 16000,
  category: "Unisex",
  gsm: "370GSM",
  image: "images/shirt3.jpg",
  description: "Vibrant astronaut artwork with bold color block detailing for a standout streetwear look. Printed on ultra-heavy 370GSM premium cotton for a thick, structured feel. Available in Black and White. Sizes M - XXL."
},
  {
  id: 4,
  name: "Cartoon Space Explorer Tee",
  price: 16000,
  category: "Unisex",
  gsm: "250GSM",
  image: "images/shirt4.jpg",
  description: "Playful astronaut cartoon design featuring planets and space elements for a clean, eye-catching look. Printed on premium 250GSM 100% cotton for comfort and durability. Available in Black and White. Sizes M - XXL."
},
  {
  id: 5,
  name: "El Barto Split Face Graphic Tee",
  price: 16000,
  category: "Unisex",
  gsm: "250GSM",
  image: "images/shirt5.jpg",
  description: "Bold split-face cartoon artwork with 'El Barto' detail on the upper back for a standout street vibe. Printed on premium 250GSM 100% cotton for a smooth, durable finish. Available in Black and White. Sizes M - XXL."
},
  {
  id: 6,
  name: "Street Bunny Graphic Tee",
  price: 16000,
  category: "Unisex",
  gsm: "250GSM",
  image: "images/shirt6.jpg",
  description: "Bold cartoon bunny artwork with street-style attitude and clean back print detailing. Printed on premium 250GSM 100% cotton for a smooth, breathable, and durable finish. Available in Black and White. Sizes M - XXL."
},
  {
  id: 7,
  name: "With God Stone Wash Statement Tee",
  price: 30000,
  category: "Unisex",
  gsm: "370GSM",
  image: "images/shirt7.jpg",
  description: "Premium stone-washed oversized tee featuring 'With God All Things Are Possible' back print and minimalist cross detail on the front. Crafted from ultra-heavy 370GSM cotton for a vintage fade and luxury streetwear feel. Available in Black and White. Sizes M - XXL."
},
  {
  id: 8,
  name: "Praise The Lord Stone Wash Tee",
  price: 30000,
  category: "Unisex",
  gsm: "370GSM",
  image: "images/shirt8.jpg",
  description: "Premium oversized stone-wash tee featuring 'Praise The Lord' front print and Psalm 150:6 statement back design. Crafted from ultra-heavy 370GSM cotton for a vintage fade and luxury streetwear finish. Available in Black and White. Sizes M - XXL."
},
  {
  id: 9,
  name: "Mindset Over Everything Graphic Tee",
  price: 16000,
  category: "Unisex",
  gsm: "250GSM",
  image: "images/shirt9.jpg",
  description: "Bold 'Mindset Over Everything' front graphic on premium 250GSM 100% cotton. Clean street aesthetic with a powerful motivational statement. Available in Black and White. Sizes M - XXL."
},
  ];
  
  // ===================================
  // STATE
  // ===================================
  const state = {
    activeCategory: 'all',
    maxPrice: 50000
  };
  
  // ===================================
  // DOM REFS
  // ===================================
  const $ = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);
  
  const productGrid = $('productGrid');
  const modal = $('productModal');
  const modalImg = $('modalImg');
  const modalCat = $('modalCategory');
  const modalTitle = $('modalTitle');
  const modalPrice = $('modalPrice');
  const modalDesc = $('modalDesc');
  const modalWaLink = $('modalWaLink');
  const priceFilter = $('priceFilter');
  const priceDisplay = $('priceDisplay');
  const orderForm = $('orderForm');
  const navToggle = $('navToggle');
  const navMenu = $('navMenu');
  const navOverlay = $('navOverlay');
  const header = $('header');
  
  // ===================================
  // UTILS
  // ===================================
  const formatPrice = price => `₦${price.toLocaleString('en-NG')}`;
  
  const buildWaLink = product => {
    const phone = "2349160000000";
    const msg = `Hi SHGAdrip! I want to order the *${product.name}* for ${formatPrice(product.price)}.\n\nPlease confirm availability and delivery details. Thanks!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };
  
  // ===================================
  // RENDER
  // ===================================
  const renderProducts = () => {
    const filtered = products.filter(p => {
      const catMatch = state.activeCategory === 'all' || p.category === state.activeCategory;
      const priceMatch = p.price <= state.maxPrice;
      return catMatch && priceMatch;
    });
  
    productGrid.innerHTML = '';
  
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
      const card = document.createElement('div');
      card.className = 'product-card';
      card.style.animationDelay = `${i * 0.05}s`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View ${product.name}`);
  
      card.innerHTML = `
        <div class="card-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.parentElement.style.background='var(--black-3)'; this.style.display='none'">
        </div>
        <div class="card-body">
          <p class="card-cat">${product.category}</p>
          <h3 class="card-name">${product.name}</h3>
          <p class="card-price">${formatPrice(product.price)}</p>
          <span class="card-cta">View Details</span>
        </div>
      `;
  
      card.addEventListener('click', () => openModal(product));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(product); });
      frag.appendChild(card);
    });
  
    productGrid.appendChild(frag);
  };
  
  // ===================================
  // MODAL
  // ===================================
  const openModal = product => {
    modalImg.src = product.image;
    modalImg.alt = product.name;
    modalCat.textContent = product.category;
    modalTitle.textContent = product.name;
    modalPrice.textContent = formatPrice(product.price);
    modalDesc.textContent = product.description;
    modalWaLink.href = buildWaLink(product);
  
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  
    // Focus trap
    setTimeout(() => modal.querySelector('.modal-close').focus(), 50);
  };
  
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  // ===================================
  // MOBILE NAV
  // ===================================
  const openNav = () => {
    navMenu.classList.add('open');
    navToggle.classList.add('open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  const closeNav = () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  // ===================================
  // ORDER FORM
  // ===================================
  const handleOrderSubmit = e => {
    e.preventDefault();
  
    const name = $('clientName').value.trim();
    const phone = $('clientPhone').value.trim();
    const size = $('shirtSize').value;
    const quality = $('shirtQuality').value;
    const color = $('shirtColor').value.trim() || 'Not specified';
    const design = $('designDesc').value.trim() || 'Not specified';
  
    const msg = `Hi SHGAdrip! I'd like to place an order:\n\nName: ${name}\nPhone: ${phone}\nSize: ${size}\nQuality: ${quality}\nColor: ${color}\nDesign: ${design}\n\nPlease confirm details. Thanks!`;
  
    const waUrl = `https://wa.me/2349160000000?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener');
    orderForm.reset();
  };
  
  // ===================================
  // EVENTS
  // ===================================
  const initEvents = () => {
    // Filter buttons
    $$('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeCategory = btn.dataset.filter;
        renderProducts();
      });
    });
  
    // Price slider
    priceFilter.addEventListener('input', () => {
      state.maxPrice = parseInt(priceFilter.value);
      priceDisplay.textContent = formatPrice(state.maxPrice);
      renderProducts();
    });
  
    // Modal close
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (modal.classList.contains('active')) closeModal();
        if (navMenu.classList.contains('open')) closeNav();
      }
    });
  
    // Nav
    navToggle.addEventListener('click', () => {
      navMenu.classList.contains('open') ? closeNav() : openNav();
    });
    navOverlay.addEventListener('click', closeNav);
  
    // Close nav on link click (mobile)
    $$('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) closeNav();
      });
    });
  
    // Form
    orderForm.addEventListener('submit', handleOrderSubmit);
  
    // Header scroll state
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  
    // Smooth scroll
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  };
  
  // ===================================
  // INTERSECTION OBSERVER
  // ===================================
  const initObserver = () => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
  
    const animateOnScroll = selector => {
      $$(selector).forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
        io.observe(el);
      });
    };
  
    animateOnScroll('.feature');
    animateOnScroll('.stat');
    animateOnScroll('.size-card');
  };
  
  // ===================================
  // INIT
  // ===================================
  const init = () => {
    renderProducts();
    initEvents();
    initObserver();
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }