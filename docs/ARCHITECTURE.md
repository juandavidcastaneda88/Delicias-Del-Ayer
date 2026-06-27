# Arquitectura y hoja de ruta a producción

Este documento explica cómo está construido el modelo funcional y cómo se mapearía cada
requisito empresarial a una arquitectura de servidor real (Node/Express + PostgreSQL/Prisma +
Redis + Docker) si se decide llevarlo a producción.

## 1. Capas del modelo actual

| Capa | Implementación en esta entrega |
|------|--------------------------------|
| Presentación | HTML5 semántico por página + `styles.css` (sistema de diseño con tokens CSS). |
| Estado / "API" | `store.js`: pub/sub + `localStorage` como almacén persistente. |
| Datos semilla | `data.js`: catálogo, blog, usuarios, cupones, proveedores, ajustes. |
| UI compartida | `app.js`: header, footer, *cart drawer*, modal de autenticación, *toasts*, *scroll‑reveal*, tarjetas de producto. |

El `Store` expone una API que imita endpoints REST:

```
Store.login(email,pw)            ≈  POST /auth/login
Store.register(data)             ≈  POST /auth/register
Store.addToCart(id,qty,variant)  ≈  POST /cart/items
Store.applyCoupon(code)          ≈  POST /cart/coupon
Store.placeOrder(form)           ≈  POST /orders
Store.saveProduct(data)          ≈  POST/PUT /admin/products
Store.adjustStock(id,delta)      ≈  PATCH /admin/inventory/:id
Store.updateOrderStatus(id,st)   ≈  PATCH /admin/orders/:id
```

## 2. Mapa de requisitos → producción

| Requisito | Estado en el modelo | En producción |
|-----------|--------------------|---------------|
| Autenticación + roles | Simulada en `store.js`, rutas protegidas por rol | JWT + refresh tokens, `bcrypt`, middleware de roles |
| Google/Facebook login | Simulado (entra como cliente) | OAuth2 (Passport/Auth.js) |
| Pagos (Stripe, Wompi, Nequi, PSE, PayPal, Mercado Pago…) | Flujo completo simulado, sin cobro real | SDKs oficiales + webhooks de confirmación |
| Base de datos | `localStorage` | PostgreSQL + Prisma (esquema relacional, índices, seeds) |
| Caché | — | Redis (catálogo, sesiones, *rate limit*) |
| Inventario en tiempo real | `Store.adjustStock`, alertas de stock | Tabla `inventory` + websockets/SSE |
| Reparto / GPS | Estados de pedido y seguimiento visual | Tabla `deliveries`, app de repartidor, mapas en vivo |
| Notificaciones (email/SMS/WhatsApp/push) | Centro de notificaciones en la app | Resend/SendGrid, Twilio, WhatsApp Cloud API, Web Push |
| IA (recomendaciones, predicción) | Tarjetas de *insights* en el admin | Modelo de recomendación + serie temporal de ventas |
| Reportes (CSV/PDF/Excel) | Export CSV real + PDF por impresión | Generación servidor (puppeteer / exceljs) |
| SEO | Metadatos, OpenGraph, JSON‑LD, títulos dinámicos | SSR/SSG (Next.js), sitemap.xml, robots.txt |
| Seguridad | Escapado XSS en render, validación de formularios | Helmet, CORS, CSRF, rate‑limit, auditoría |

## 3. Esquema de datos sugerido (PostgreSQL/Prisma)

```
User(id, name, email, passwordHash, role, phone, address, createdAt)
Product(id, slug, name, category, price, stock, sku, rating, ...)
ProductVariant(id, productId, name, price)
Order(id, userId, status, subtotal, discount, shipping, tax, total, paymentMethod, createdAt)
OrderItem(id, orderId, productId, quantity, price)
Coupon(code, type, value, minOrder)
Review(id, productId, userId, rating, comment, createdAt)
Supplier(id, name, product, phone, leadTime)
Delivery(id, orderId, driverId, status, lat, lng, eta)
```

Las entidades y campos anteriores ya están reflejados en `data.js` / `store.js`, por lo que la
migración a Prisma es directa: cada arreglo del `Store` corresponde a una tabla.

## 4. Despliegue (referencia)

- **Estático (hoy):** cualquier hosting de archivos — Netlify, Vercel, GitHub Pages, S3+CloudFront.
- **Full‑stack (futuro):** `docker-compose` con servicios `web` (Next.js), `api` (Express),
  `db` (Postgres), `cache` (Redis); variables en `.env`; CI con tests unitarios y de API.
