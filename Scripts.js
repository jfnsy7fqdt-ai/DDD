// Dropify — lightweight interactions and smooth animations

document.addEventListener('DOMContentLoaded', () => {
  // Helpers
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const cartCountEl = $('#cartCount');
  const cartBtn = $('#cartBtn');

  // state
  const cart = { items: [], count: 0 };

  // set year
  $('#year').textContent = new Date().getFullYear();

  // reveal on scroll
  const revealEls = $$('.reveal');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // smooth scroll for nav
  $$('.nav-link').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // quick view modal
  const modal = $('#modal');
  const modalImage = $('#modalImage');
  const modalTitle = $('#modalTitle');
  const modalPrice = $('#modalPrice');
  const modalClose = $('#modalClose');

  function openModal(data){
    modalImage.src = data.image;
    modalTitle.textContent = data.name;
    modalPrice.textContent = `$${data.price}`;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    // focus for accessibility
    modalClose.focus();
  }
  function closeModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // product interactions
  function updateCartUI(){
    cartCountEl.textContent = cart.count;
    // pop animation
    cartCountEl.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.35)' },
      { transform: 'scale(1)' }
    ], { duration: 350, easing: 'cubic-bezier(.2,.9,.2,1)' });
  }

  function flyToCart(imgEl){
    // create a clone and animate it to cart icon
    const cartRect = cartBtn.getBoundingClientRect();
    const imgRect = imgEl.getBoundingClientRect();
    const clone = imgEl.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = imgRect.left + 'px';
    clone.style.top = imgRect.top + 'px';
    clone.style.width = imgRect.width + 'px';
    clone.style.height = imgRect.height + 'px';
    clone.style.transition = 'transform 700ms cubic-bezier(.2,.9,.2,1), opacity 500ms';
    clone.style.zIndex = 120;
    clone.style.borderRadius = '10px';
    document.body.appendChild(clone);

    // compute translation
    const dx = cartRect.left + cartRect.width / 2 - (imgRect.left + imgRect.width / 2);
    const dy = cartRect.top + cartRect.height / 2 - (imgRect.top + imgRect.height / 2);

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.14) rotate(15deg)`;
      clone.style.opacity = '0.6';
    });

    clone.addEventListener('transitionend', () => {
      clone.remove();
    });
  }

  // Add-to-cart logic (supports multiple add-to-cart buttons)
  $$('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.preventDefault();
      // find product card
      const card = btn.closest('.product-card') || btn.closest('.modal-panel') || btn.closest('article');
      const name = card?.dataset?.name || $('#modalTitle')?.textContent || 'Item';
      const price = card?.dataset?.price || $('#modalPrice')?.textContent?.replace(/\$/,'') || '0';
      const image = card?.dataset?.image || $('#modalImage')?.src;

      // push to cart
      cart.items.push({ name, price, image });
      cart.count = cart.items.length;
      updateCartUI();

      // animate
      const imgEl = card?.querySelector('img') || modalImage;
      if (imgEl) flyToCart(imgEl);
    });
  });

  // quick view buttons
  $$('.quick-view').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      if (!card) return;
      openModal({ name: card.dataset.name, price: card.dataset.price, image: card.dataset.image });
    });
  });

  // simple accessibility: trap focus in modal when open
  document.addEventListener('focusin', (e) => {
    if (!modal.classList.contains('show')) return;
    if (!modal.contains(e.target)) {
      e.stopPropagation();
      modalClose.focus();
    }
  });

  // lightweight inertia on hero image to create micro-parallax
  const heroImg = document.querySelector('.hero-image img');
  if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    window.addEventListener('mousemove', (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX - w/2) / (w/6);
      const y = (e.clientY - h/2) / (h/6);
      heroImg.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    });
    window.addEventListener('mouseleave', () => heroImg.style.transform = '');
  }

  // initial cart UI
  updateCartUI();

});