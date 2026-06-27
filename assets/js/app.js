/* =====================================================================
   app.js — Shared chrome for every page.
   Renders header + footer, wires the cart drawer, auth modal, toasts,
   scroll reveal, mobile menu and price/format helpers.
   Include AFTER data.js and store.js.
   ===================================================================== */
(function (global) {
  'use strict';
  const S = global.Store, D = global.DDA_DATA;

  // ---------- formatters ----------
  const money = (n) => '$' + Number(n || 0).toFixed(2);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function imgFallback(el) { el.onerror = null; if (el.dataset.fb) el.src = el.dataset.fb; }
  global.DDA = { money, esc, imgFallback };

  const NAV = [
    { href: 'index.html', label: 'Inicio' },
    { href: 'shop.html', label: 'Tienda' },
    { href: 'custom-cakes.html', label: 'Pedidos Especiales' },
    { href: 'blog.html', label: 'Blog' },
    { href: 'admin.html', label: 'Admin' }
  ];

  function stars(rating) {
    let h = '';
    for (let i = 1; i <= 5; i++) {
      const ic = rating >= i ? 'star' : (rating >= i - 0.5 ? 'star_half' : 'star');
      const fill = rating >= i - 0.5 ? '' : 'style="color:var(--outline-variant)"';
      h += `<span class="icon" ${fill}>${ic}</span>`;
    }
    return `<span class="stars" aria-label="${rating} de 5">${h}</span>`;
  }
  global.DDA.stars = stars;

  // ---------- header ----------
  function renderHeader() {
    const here = location.pathname.split('/').pop() || 'index.html';
    const user = S.currentUser();
    const links = NAV.map((n) => `<a href="${n.href}" class="${here === n.href ? 'active' : ''}">${n.label}</a>`).join('');
    const el = document.createElement('header');
    el.className = 'site-header';
    el.innerHTML = `
      <a class="skip-link" href="#main">Saltar al contenido</a>
      <div class="container">
        <nav class="nav" aria-label="Principal">
          <a class="brand" href="index.html" aria-label="Delicias del Ayer, inicio">
            <span class="brand-mark">D</span>
            <span class="brand-name">Delicias del Ayer<small>Repostería 1920</small></span>
          </a>
          <div class="nav-links">${links}</div>
          <div class="nav-actions">
            <button class="icon-btn" id="navSearch" aria-label="Buscar" title="Buscar"><span class="icon">search</span></button>
            <a class="icon-btn" href="account.html" aria-label="Mi cuenta" title="${user ? esc(user.name) : 'Acceder'}">
              <span class="icon">${user ? 'account_circle' : 'person'}</span></a>
            <button class="icon-btn" id="navCart" aria-label="Carrito" title="Carrito">
              <span class="icon">shopping_bag</span>
              <span class="badge" id="cartBadge" hidden>0</span>
            </button>
            <button class="icon-btn hamburger" id="navMenu" aria-label="Menú"><span class="icon">menu</span></button>
          </div>
        </nav>
      </div>`;
    document.body.prepend(el);

    el.querySelector('#navCart').addEventListener('click', openCart);
    el.querySelector('#navMenu').addEventListener('click', openMobileMenu);
    el.querySelector('#navSearch').addEventListener('click', () => { location.href = 'shop.html#search'; });
    addEventListener('scroll', () => el.classList.toggle('scrolled', scrollY > 8), { passive: true });
    updateCartBadge();

    // mobile menu element
    const mm = document.createElement('div');
    mm.className = 'mobile-menu'; mm.id = 'mobileMenu';
    mm.innerHTML = `<div class="mm-head"><span class="brand-name">Menú</span>
      <button class="icon-btn" id="mmClose"><span class="icon">close</span></button></div>
      ${NAV.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
      <a href="account.html">${user ? 'Mi cuenta' : 'Acceder / Registrarse'}</a>`;
    document.body.appendChild(mm);
    mm.querySelector('#mmClose').addEventListener('click', () => mm.classList.remove('open'));
  }
  function openMobileMenu() { document.getElementById('mobileMenu').classList.add('open'); }

  // ---------- footer ----------
  function renderFooter() {
    const s = S.state.settings;
    const f = document.createElement('footer');
    f.className = 'site-footer';
    f.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="index.html"><span class="brand-mark">D</span>
              <span class="brand-name" style="color:#fff">Delicias del Ayer</span></a>
            <p>${esc(s.tagline)}. Horneamos cada mañana con recetas heredadas y los mejores ingredientes colombianos.</p>
            <div class="footer-social">
              <a href="#" aria-label="Instagram"><span class="icon">photo_camera</span></a>
              <a href="#" aria-label="Facebook"><span class="icon">thumb_up</span></a>
              <a href="https://wa.me/" aria-label="WhatsApp"><span class="icon">chat</span></a>
            </div>
          </div>
          <div>
            <h4>Tienda</h4>
            <a href="shop.html">Catálogo</a>
            <a href="shop.html?cat=Tartas%20Tradicionales">Tartas</a>
            <a href="shop.html?cat=Paster%C3%ADa%20Francesa">Pastelería</a>
            <a href="custom-cakes.html">Pedidos especiales</a>
          </div>
          <div>
            <h4>Ayuda</h4>
            <a href="account.html">Mi cuenta</a>
            <a href="account.html#orders">Mis pedidos</a>
            <a href="blog.html">Blog</a>
            <a href="#contact">Contacto</a>
          </div>
          <div>
            <h4>Visítanos</h4>
            <a href="#"><span class="icon" style="font-size:1.1em">place</span> ${esc(s.address)}</a>
            <a href="tel:${esc(s.phone)}"><span class="icon" style="font-size:1.1em">call</span> ${esc(s.phone)}</a>
            <a href="mailto:${esc(s.email)}"><span class="icon" style="font-size:1.1em">mail</span> ${esc(s.email)}</a>
            <a href="#"><span class="icon" style="font-size:1.1em">schedule</span> ${esc(s.hours)}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Delicias del Ayer. Hecho con cariño en Bogotá.</span>
          <span>Términos · Privacidad · Cookies</span>
        </div>
      </div>`;
    document.body.appendChild(f);
  }

  // ---------- cart drawer ----------
  function mountCart() {
    const ov = document.createElement('div'); ov.className = 'overlay'; ov.id = 'cartOverlay';
    const d = document.createElement('aside'); d.className = 'drawer'; d.id = 'cartDrawer';
    d.setAttribute('aria-label', 'Carrito de compras');
    d.innerHTML = `
      <div class="drawer-head"><h3>Tu carrito</h3>
        <button class="icon-btn" id="cartClose" aria-label="Cerrar"><span class="icon">close</span></button></div>
      <div class="drawer-body" id="cartBody"></div>
      <div class="drawer-foot" id="cartFoot"></div>`;
    document.body.appendChild(ov); document.body.appendChild(d);
    ov.addEventListener('click', closeCart);
    d.querySelector('#cartClose').addEventListener('click', closeCart);
    S.subscribe(() => { updateCartBadge(); if (d.classList.contains('open')) renderCart(); });
  }
  function openCart() { renderCart(); document.getElementById('cartDrawer').classList.add('open'); document.getElementById('cartOverlay').classList.add('open'); }
  function closeCart() { document.getElementById('cartDrawer').classList.remove('open'); document.getElementById('cartOverlay').classList.remove('open'); }
  global.DDA.openCart = openCart;

  function renderCart() {
    const items = S.cartDetailed();
    const body = document.getElementById('cartBody'), foot = document.getElementById('cartFoot');
    if (!items.length) {
      body.innerHTML = `<div class="cart-empty"><span class="icon">shopping_bag</span>
        <div><b>Tu carrito está vacío</b><br><span class="muted">Añade algo dulce para empezar.</span></div>
        <a class="btn btn-primary" href="shop.html">Ir a la tienda</a></div>`;
      foot.innerHTML = ''; return;
    }
    body.innerHTML = items.map((l) => `
      <div class="cart-line">
        <img src="${esc(l.product.image)}" data-fb="${esc(l.product.fallback || '')}" onerror="DDA.imgFallback(this)" alt="${esc(l.product.name)}">
        <div>
          <div class="nm">${esc(l.product.name)}</div>
          ${l.variant ? `<div class="pr">${esc(l.variant)}</div>` : ''}
          <div class="pr">${money(l.price)}</div>
          <div class="qty" style="margin-top:.4rem">
            <button data-act="dec" data-id="${l.productId}" data-v="${esc(l.variant || '')}" aria-label="Restar">−</button>
            <span>${l.quantity}</span>
            <button data-act="inc" data-id="${l.productId}" data-v="${esc(l.variant || '')}" aria-label="Sumar">+</button>
          </div>
        </div>
        <button class="icon-btn" data-act="del" data-id="${l.productId}" data-v="${esc(l.variant || '')}" aria-label="Quitar"><span class="icon">delete</span></button>
      </div>`).join('');
    const t = S.totals();
    foot.innerHTML = `
      <div class="summary-row"><span>Subtotal</span><span>${money(t.subtotal)}</span></div>
      ${t.discount ? `<div class="summary-row"><span>Descuento</span><span>−${money(t.discount)}</span></div>` : ''}
      <div class="summary-row"><span>Envío</span><span>${t.shipping ? money(t.shipping) : 'Gratis'}</span></div>
      <div class="summary-row total"><span>Total</span><b>${money(t.total)}</b></div>
      <a class="btn btn-primary btn-block" href="checkout.html" style="margin-top:.8rem">Finalizar compra</a>
      <a class="btn btn-ghost btn-block" href="cart.html" style="margin-top:.5rem">Ver carrito</a>`;
    body.querySelectorAll('button[data-act]').forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.id, v = b.dataset.v || null;
      const cur = S.cartDetailed().find((l) => l.productId === id && (l.variant || '') === (v || ''));
      if (b.dataset.act === 'inc') S.setQty(id, v, cur.quantity + 1);
      if (b.dataset.act === 'dec') S.setQty(id, v, cur.quantity - 1);
      if (b.dataset.act === 'del') S.removeFromCart(id, v);
    }));
  }

  function updateCartBadge() {
    const b = document.getElementById('cartBadge'); if (!b) return;
    const n = S.cartCount(); b.textContent = n; b.hidden = n === 0;
  }

  // ---------- toasts ----------
  let toastWrap;
  function toast(msg, type = '') {
    if (!toastWrap) { toastWrap = document.createElement('div'); toastWrap.className = 'toast-wrap'; document.body.appendChild(toastWrap); }
    const t = document.createElement('div'); t.className = 'toast ' + type;
    const ic = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
    t.innerHTML = `<span class="icon">${ic}</span><span>${esc(msg)}</span>`;
    toastWrap.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(10px)'; setTimeout(() => t.remove(), 300); }, 2800);
  }
  global.DDA.toast = toast;

  // ---------- auth modal ----------
  function mountAuth() {
    const m = document.createElement('div'); m.className = 'modal'; m.id = 'authModal';
    m.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true" aria-label="Acceder">
        <div class="modal-head">
          <h3 id="authTitle">Bienvenido de vuelta</h3>
          <p class="muted" style="font-size:.9rem">Accede para guardar favoritos y seguir tus pedidos.</p>
          <button class="icon-btn close" id="authClose" aria-label="Cerrar"><span class="icon">close</span></button>
        </div>
        <div class="modal-body">
          <div class="tabs"><button class="active" data-tab="login">Iniciar sesión</button><button data-tab="register">Crear cuenta</button></div>
          <form id="authForm">
            <div class="field" id="nameField" hidden>
              <label for="auName">Nombre completo</label>
              <input class="input" id="auName" autocomplete="name" placeholder="Tu nombre">
            </div>
            <div class="field"><label for="auEmail">Correo electrónico</label>
              <input class="input" id="auEmail" type="email" autocomplete="email" placeholder="tucorreo@ejemplo.com" required></div>
            <div class="field"><label for="auPass">Contraseña</label>
              <input class="input" id="auPass" type="password" autocomplete="current-password" placeholder="••••••••" required>
              <span class="err" id="authErr"></span></div>
            <button class="btn btn-primary btn-block" type="submit" id="authSubmit">Iniciar sesión</button>
          </form>
          <div style="display:flex;align-items:center;gap:.7rem;margin:1.1rem 0;color:var(--outline);font-size:.82rem">
            <span style="flex:1;height:1px;background:var(--outline-variant)"></span>o continúa con<span style="flex:1;height:1px;background:var(--outline-variant)"></span>
          </div>
          <div style="display:flex;gap:.6rem">
            <button class="btn btn-outline btn-block" data-social="Google"><span class="icon">g_translate</span> Google</button>
            <button class="btn btn-outline btn-block" data-social="Facebook"><span class="icon">thumb_up</span> Facebook</button>
          </div>
          <p class="muted center" style="font-size:.8rem;margin-top:1rem">Demo: cliente@ejemplo.com · cliente123</p>
        </div>
      </div>`;
    document.body.appendChild(m);
    let mode = 'login';
    const close = () => m.classList.remove('open');
    m.querySelector('#authClose').addEventListener('click', close);
    m.addEventListener('click', (e) => { if (e.target === m) close(); });
    m.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => {
      mode = b.dataset.tab;
      m.querySelectorAll('[data-tab]').forEach((x) => x.classList.toggle('active', x === b));
      m.querySelector('#nameField').hidden = mode === 'login';
      m.querySelector('#authTitle').textContent = mode === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta';
      m.querySelector('#authSubmit').textContent = mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta';
      m.querySelector('#authErr').textContent = '';
    }));
    m.querySelectorAll('[data-social]').forEach((b) => b.addEventListener('click', () => {
      const r = S.socialLogin(b.dataset.social); close(); toast('Sesión iniciada con ' + r.provider, 'success'); afterAuth();
    }));
    m.querySelector('#authForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = m.querySelector('#auEmail').value.trim();
      const pass = m.querySelector('#auPass').value;
      const err = m.querySelector('#authErr');
      let r;
      if (mode === 'login') r = S.login(email, pass);
      else r = S.register({ name: m.querySelector('#auName').value.trim() || 'Cliente', email, password: pass });
      if (!r.ok) { err.textContent = r.msg; return; }
      close(); toast('¡Hola, ' + r.user.name + '!', 'success'); afterAuth();
    });
    function afterAuth() {
      const cb = global.DDA._authCb;
      if (cb) { global.DDA._authCb = null; cb(); } else location.reload();
    }
  }
  function openAuth(cb) { global.DDA._authCb = cb || null; document.getElementById('authModal').classList.add('open'); }
  global.DDA.openAuth = openAuth;
  global.DDA.requireAuth = function (cb) { if (S.currentUser()) cb(); else openAuth(cb); };

  // ---------- product card ----------
  function productCard(p, delay) {
    const fav = S.isFav(p.id);
    const tag = p.stock <= 5 ? `<span class="product-tag low">Quedan ${p.stock}</span>` : (p.badge ? `<span class="product-tag ${p.badge === 'Más vendido' ? 'gold' : ''}">${esc(p.badge)}</span>` : '');
    return `
      <article class="product-card reveal" ${delay ? `data-d="${delay}"` : ''}>
        <div class="product-media">
          <a href="product.html?id=${p.id}"><img src="${esc(p.image)}" data-fb="${esc(p.fallback || '')}" onerror="DDA.imgFallback(this)" alt="${esc(p.name)}" loading="lazy"></a>
          ${tag}
          <button class="fav-btn ${fav ? 'active' : ''}" data-fav="${p.id}" aria-label="Favorito"><span class="icon">favorite</span></button>
        </div>
        <div class="product-body">
          <span class="product-cat">${esc(p.category)}</span>
          <a href="product.html?id=${p.id}"><h3 class="product-name">${esc(p.name)}</h3></a>
          <div class="rating-row">${stars(p.rating)} <span>${p.rating} · ${p.reviewsCount} reseñas</span></div>
          <p class="product-desc">${esc(p.description)}</p>
          <div class="product-foot">
            <div class="price">${p.oldPrice ? `<del>${money(p.oldPrice)}</del>` : ''}${money(p.price)}</div>
            <button class="add-mini" data-add="${p.id}" aria-label="Añadir ${esc(p.name)}"><span class="icon">add_shopping_cart</span></button>
          </div>
        </div>
      </article>`;
  }
  global.DDA.productCard = productCard;

  // Delegated handlers for any product card on the page
  function wireProductGrids() {
    document.addEventListener('click', (e) => {
      const add = e.target.closest('[data-add]');
      if (add) { S.addToCart(add.dataset.add, 1); toast('Añadido al carrito', 'success'); pulse(add); return; }
      const fav = e.target.closest('[data-fav]');
      if (fav) { const on = S.toggleFav(fav.dataset.fav); fav.classList.toggle('active', on); toast(on ? 'Guardado en favoritos' : 'Quitado de favoritos'); return; }
    });
  }
  function pulse(el) { el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 280 }); }

  // ---------- scroll reveal ----------
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    function scan() { document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el)); }
    scan(); global.DDA.rescanReveal = scan;
  }

  // ---------- boot ----------
  function boot(opts) {
    opts = opts || {};
    renderHeader();
    mountCart();
    mountAuth();
    wireProductGrids();
    if (!opts.noFooter) renderFooter();
    initReveal();
  }
  global.DDA.boot = boot;
})(window);
