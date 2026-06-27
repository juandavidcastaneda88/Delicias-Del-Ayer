/* =====================================================================
   store.js — Client-side "backend" for Delicias del Ayer.
   Persists state in localStorage and exposes a small reactive API.
   Simulates: auth/session, catalog CRUD, cart, favorites, recently
   viewed, orders, coupons, reviews, inventory. No server required.
   ===================================================================== */
(function (global) {
  'use strict';

  const KEY = 'dda_state_v1';
  const D = global.DDA_DATA;

  function freshState() {
    return {
      products: clone(D.products),
      orders: clone(D.orders),
      users: clone(D.users),
      coupons: clone(D.coupons),
      suppliers: clone(D.suppliers),
      settings: clone(D.settings),
      cart: [],            // {productId, variant, price, quantity}
      saved: [],           // saved for later
      favorites: [],       // productIds
      recent: [],          // productIds
      session: null,       // logged-in user (without password)
      appliedCoupon: null,
      notifications: seedNotifications(),
      newsletter: []
    };
  }

  function seedNotifications() {
    return [
      { id: 'n1', icon: 'local_shipping', text: 'Tu pedido ORD-0890 fue entregado.', date: '2026-06-18', read: true },
      { id: 'n2', icon: 'redeem', text: 'Tienes un cupón BIENVENIDO10 disponible.', date: '2026-06-22', read: false }
    ];
  }

  const clone = (x) => JSON.parse(JSON.stringify(x));

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) { const s = freshState(); persist(s); return s; }
      const parsed = JSON.parse(raw);
      // Always refresh static catalog content shape if data version changes
      return Object.assign(freshState(), parsed);
    } catch (e) {
      const s = freshState(); persist(s); return s;
    }
  }
  function persist(s) { try { localStorage.setItem(KEY, JSON.stringify(s || state)); } catch (e) {} }

  // ---- pub/sub ----
  const subs = new Set();
  function emit() { persist(state); subs.forEach((fn) => { try { fn(state); } catch (e) {} }); }
  function subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }

  // ---- helpers ----
  function getProduct(id) { return state.products.find((p) => p.id === id); }
  function bySlug(slug) { return state.products.find((p) => p.slug === slug); }

  // ---- Cart ----
  function addToCart(productId, qty = 1, variant = null) {
    const p = getProduct(productId);
    if (!p) return;
    const price = variant ? (p.variants.find((v) => v.name === variant)?.price ?? p.price) : p.price;
    const line = state.cart.find((l) => l.productId === productId && l.variant === variant);
    if (line) line.quantity += qty;
    else state.cart.push({ productId, variant, price, quantity: qty });
    emit();
  }
  function setQty(productId, variant, qty) {
    const line = state.cart.find((l) => l.productId === productId && l.variant === variant);
    if (!line) return;
    line.quantity = Math.max(1, qty);
    emit();
  }
  function removeFromCart(productId, variant) {
    state.cart = state.cart.filter((l) => !(l.productId === productId && l.variant === variant));
    emit();
  }
  function saveForLater(productId, variant) {
    const line = state.cart.find((l) => l.productId === productId && l.variant === variant);
    if (!line) return;
    state.cart = state.cart.filter((l) => l !== line);
    state.saved.push(line); emit();
  }
  function moveToCart(idx) {
    const line = state.saved[idx]; if (!line) return;
    state.saved.splice(idx, 1); state.cart.push(line); emit();
  }
  function clearCart() { state.cart = []; state.appliedCoupon = null; emit(); }
  function cartCount() { return state.cart.reduce((n, l) => n + l.quantity, 0); }

  function cartDetailed() {
    return state.cart.map((l) => {
      const p = getProduct(l.productId) || {};
      return Object.assign({}, l, { product: p, lineTotal: l.price * l.quantity });
    });
  }

  function totals() {
    const items = cartDetailed();
    const subtotal = items.reduce((s, l) => s + l.lineTotal, 0);
    let discount = 0, freeShip = false;
    const c = state.appliedCoupon;
    if (c) {
      if (c.type === 'percent') discount = subtotal * (c.value / 100);
      else if (c.type === 'fixed') discount = c.value;
      else if (c.type === 'shipping') freeShip = true;
    }
    const set = state.settings;
    let shipping = (subtotal >= set.freeShippingFrom || freeShip || subtotal === 0) ? 0 : set.flatShipping;
    const taxable = Math.max(0, subtotal - discount);
    const tax = +(taxable * set.taxRate).toFixed(2);
    const total = +(taxable + shipping + tax).toFixed(2);
    return { subtotal: +subtotal.toFixed(2), discount: +discount.toFixed(2), shipping, tax, total, count: cartCount() };
  }

  function applyCoupon(code) {
    const c = state.coupons.find((x) => x.code.toLowerCase() === String(code).trim().toLowerCase());
    if (!c) return { ok: false, msg: 'Cupón no válido' };
    const { subtotal } = totals();
    if (subtotal < c.minOrder) return { ok: false, msg: `Mínimo $${c.minOrder} para este cupón` };
    state.appliedCoupon = c; emit();
    return { ok: true, msg: `Cupón ${c.code} aplicado` };
  }
  function removeCoupon() { state.appliedCoupon = null; emit(); }

  // ---- Favorites / recently viewed ----
  function toggleFav(productId) {
    const i = state.favorites.indexOf(productId);
    if (i >= 0) state.favorites.splice(i, 1); else state.favorites.push(productId);
    emit();
    return state.favorites.includes(productId);
  }
  function isFav(productId) { return state.favorites.includes(productId); }
  function pushRecent(productId) {
    state.recent = [productId, ...state.recent.filter((id) => id !== productId)].slice(0, 6);
    emit();
  }

  // ---- Auth (simulated) ----
  function register({ name, email, password, phone }) {
    if (state.users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
      return { ok: false, msg: 'Ese correo ya está registrado' };
    const user = { id: 'usr_' + Date.now(), name, email, password, phone: phone || '', address: '', role: 'Customer', avatar: 'https://i.pravatar.cc/100?u=' + encodeURIComponent(email) };
    state.users.push(user);
    state.session = sanitize(user);
    emit();
    return { ok: true, user: state.session };
  }
  function login(email, password) {
    const u = state.users.find((x) => x.email.toLowerCase() === String(email).toLowerCase() && x.password === password);
    if (!u) return { ok: false, msg: 'Correo o contraseña incorrectos' };
    state.session = sanitize(u); emit();
    return { ok: true, user: state.session };
  }
  function socialLogin(provider) {
    // Emulates OAuth: logs into the demo customer account.
    const u = state.users.find((x) => x.role === 'Customer');
    state.session = sanitize(u); emit();
    return { ok: true, user: state.session, provider };
  }
  function logout() { state.session = null; emit(); }
  function sanitize(u) { const c = Object.assign({}, u); delete c.password; return c; }
  function currentUser() { return state.session; }
  function updateProfile(patch) {
    if (!state.session) return;
    Object.assign(state.session, patch);
    const u = state.users.find((x) => x.id === state.session.id);
    if (u) Object.assign(u, patch);
    emit();
  }

  // ---- Orders ----
  function placeOrder(details) {
    const t = totals();
    const id = 'ORD-' + String(Math.floor(1000 + Math.random() * 9000));
    const order = {
      id, userId: state.session ? state.session.id : 'guest',
      customerName: details.name, customerEmail: details.email,
      deliveryAddress: details.address, paymentMethod: details.paymentMethod,
      status: details.paymentMethod === 'Contra entrega' ? 'Pendiente de pago' : 'Pagado',
      items: cartDetailed().map((l) => ({
        productId: l.productId, productName: (l.product.name || '') + (l.variant ? ' · ' + l.variant : ''),
        price: l.price, quantity: l.quantity, image: l.product.image
      })),
      subtotal: t.subtotal, shipping: t.shipping, discount: t.discount, tax: t.tax, total: t.total,
      createdAt: new Date().toISOString()
    };
    // decrement stock
    cartDetailed().forEach((l) => { const p = getProduct(l.productId); if (p) p.stock = Math.max(0, p.stock - l.quantity); });
    state.orders.unshift(order);
    state.notifications.unshift({ id: 'n' + Date.now(), icon: 'receipt_long', text: `Pedido ${id} confirmado por $${t.total}.`, date: new Date().toISOString().slice(0, 10), read: false });
    clearCart();
    return order;
  }
  function ordersForUser() {
    if (!state.session) return [];
    return state.orders.filter((o) => o.userId === state.session.id || o.customerEmail === state.session.email);
  }
  function updateOrderStatus(id, status) {
    const o = state.orders.find((x) => x.id === id); if (o) { o.status = status; emit(); }
  }

  // ---- Reviews ----
  function addReview(productId, review) {
    const p = getProduct(productId); if (!p) return;
    p.reviews = p.reviews || [];
    p.reviews.unshift(Object.assign({ date: new Date().toISOString().slice(0, 10) }, review));
    p.reviewsCount = (p.reviewsCount || 0) + 1;
    const avg = p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length;
    p.rating = +avg.toFixed(1);
    emit();
  }

  // ---- Admin CRUD ----
  function saveProduct(data) {
    if (data.id && getProduct(data.id)) {
      Object.assign(getProduct(data.id), data);
    } else {
      const id = 'prod_' + Date.now();
      state.products.push(Object.assign({
        id, slug: (data.name || 'producto').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        rating: 0, reviewsCount: 0, reviews: [], questions: [], gallery: [data.image], variants: [{ name: 'Único', price: data.price }],
        ingredients: [], allergens: [], nutrition: { calories: 0, fat: '0g', carbs: '0g', protein: '0g' }, fallback: data.image
      }, data));
    }
    emit();
  }
  function deleteProduct(id) { state.products = state.products.filter((p) => p.id !== id); emit(); }
  function adjustStock(id, delta) { const p = getProduct(id); if (p) { p.stock = Math.max(0, p.stock + delta); emit(); } }

  // ---- Newsletter ----
  function subscribeNewsletter(email) {
    if (!state.newsletter.includes(email)) state.newsletter.push(email);
    emit(); return true;
  }

  function markNotificationsRead() { state.notifications.forEach((n) => (n.read = true)); emit(); }
  function unreadCount() { return state.notifications.filter((n) => !n.read).length; }

  function reset() { state = freshState(); emit(); }

  global.Store = {
    get state() { return state; },
    subscribe, emit,
    getProduct, bySlug,
    addToCart, setQty, removeFromCart, saveForLater, moveToCart, clearCart, cartCount, cartDetailed, totals,
    applyCoupon, removeCoupon,
    toggleFav, isFav, pushRecent,
    register, login, socialLogin, logout, currentUser, updateProfile,
    placeOrder, ordersForUser, updateOrderStatus,
    addReview,
    saveProduct, deleteProduct, adjustStock,
    subscribeNewsletter, markNotificationsRead, unreadCount,
    reset
  };
})(window);
