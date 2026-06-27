# Delicias del Ayer — Plataforma de e‑commerce (HTML · CSS · JavaScript)

Repostería tradicional colombiana desde 1920. Tienda en línea completa y funcional,
construida como un sitio estático **conectado de extremo a extremo**: catálogo, carrito,
checkout multipaso, panel de cliente y panel de administración, todo persistente en el
navegador. No requiere servidor, base de datos ni instalación.

Diseño y contenido heredados del proyecto Stitch / AI Studio original (paleta *Artisanal
Heritage*, tipografías Libre Caslon Text + Manrope, fichas de producto, blog y pedidos).

---

## Cómo abrirlo

Opción rápida: **doble clic en `index.html`**.

Para que las rutas y `localStorage` funcionen igual que en producción, sírvelo por HTTP:

```bash
# Python
python3 -m http.server 8080
# o Node
npx serve .
```

Luego abre <http://localhost:8080>.

---

## Cuentas de demostración

| Rol | Correo | Contraseña |
|-----|--------|-----------|
| Administrador | `admin@delicias.com` | `admin123` |
| Gerente | `manager@delicias.com` | `manager123` |
| Empleado | `empleado@delicias.com` | `empleado123` |
| Repartidor | `driver@delicias.com` | `driver123` |
| Cliente | `cliente@ejemplo.com` | `cliente123` |

El acceso con Google/Facebook está simulado (entra como cliente demo).
Cupones de prueba: **BIENVENIDO10**, **ENVIOGRATIS**, **DULCE5**.

---

## Páginas

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Home: hero animado, destacados, categorías, historia, testimonios, Instagram, blog, mapa y newsletter. |
| `shop.html` | Tienda: búsqueda, filtros por categoría/precio/valoración, orden, chips activos, vistos recientemente. |
| `product.html` | Detalle: galería con zoom, variantes, stock, pestañas (descripción, ingredientes, nutrición, reseñas, preguntas), relacionados. |
| `custom-cakes.html` | Constructor de tartas personalizadas con precio en vivo → añade al carrito. |
| `cart.html` | Carrito: cantidades, guardar para después, cupones, impuestos, envío, venta cruzada. |
| `checkout.html` | Checkout en 4 pasos: datos → envío → pago (9 métodos) → confirmar. |
| `confirmation.html` | Confirmación + factura imprimible (PDF) + seguimiento del pedido. |
| `account.html` | Panel de cliente: resumen, pedidos, favoritos, direcciones, cupones, notificaciones, perfil, fidelidad. |
| `admin.html` | Panel de administración: dashboard con KPIs y gráfico, pedidos, CRUD de productos, inventario en tiempo real, clientes, proveedores, reportes (CSV/PDF), ajustes, recomendaciones IA. |
| `blog.html` | Blog CMS: listado + artículo con comentarios. |

---

## Arquitectura

```
delicias-del-ayer/
├── index.html  shop.html  product.html  custom-cakes.html
├── cart.html  checkout.html  confirmation.html
├── account.html  admin.html  blog.html
├── assets/
│   ├── css/styles.css      # sistema de diseño completo (tokens, componentes, responsive)
│   └── js/
│       ├── data.js         # catálogo semilla (productos, blog, usuarios, cupones…)
│       ├── store.js        # "backend" en localStorage: carrito, auth, pedidos, CRUD
│       └── app.js          # UI compartida: header, footer, cart drawer, modal auth, toasts
├── docs/ARCHITECTURE.md
└── README.md
```

**`store.js`** es el núcleo: un mini‑backend reactivo (patrón pub/sub) que persiste todo el
estado en `localStorage`. Expone una API (`Store.addToCart`, `Store.login`, `Store.placeOrder`,
`Store.saveProduct`, `Store.totals`…) que todas las páginas consumen, de modo que el carrito,
la sesión y los pedidos están **realmente conectados** entre vistas.

### Funciona de verdad (sin servidor)
- Carrito persistente, cantidades, guardar para después, venta cruzada.
- Cupones con reglas (porcentaje / fijo / envío gratis / mínimo de compra).
- Impuestos (8%) y envío gratis configurable por umbral.
- Registro / login / logout con control de acceso por rol y rutas protegidas (cliente vs admin).
- Pedidos: se crean, descuentan stock, generan factura y aparecen en el panel.
- CRUD de productos e inventario en tiempo real desde el admin.
- Reseñas, preguntas y comentarios del blog que se guardan.
- Exportación CSV de pedidos y reportes; factura/reporte a PDF vía impresión.

---

## Accesibilidad y rendimiento
- HTML semántico, `skip link`, foco visible, `aria-label`, navegación por teclado.
- `prefers-reduced-motion` respetado; imágenes `loading="lazy"` con *fallback* automático.
- Responsive de móvil a escritorio (menú hamburguesa, filtros en *drawer*, tablas con scroll).
- Sin dependencias externas de JS: solo fuentes e iconos de Google Fonts.

---

## Sobre el alcance "enterprise"

Este entregable cumple el pedido principal: **un modelo HTML/CSS/JS totalmente funcional y
conectado**. Las capacidades que requieren infraestructura real de servidor —pagos reales
(Stripe/Wompi/Nequi/PSE), base de datos PostgreSQL/Prisma, Redis, GPS de reparto, envío real
de correos/SMS/WhatsApp— están **simuladas de forma fiel** en el cliente para que toda la
experiencia funcione de principio a fin. En `docs/ARCHITECTURE.md` encontrarás el mapa de
cada requisito y cómo se llevaría a un backend Node/Express + PostgreSQL en producción.

© Delicias del Ayer — hecho con cariño en Bogotá.
