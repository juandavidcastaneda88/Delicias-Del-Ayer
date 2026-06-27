/* =====================================================================
   data.js — Seed catalog for Delicias del Ayer
   Content carried over from the original Stitch / AI Studio project.
   Images use the original Google-hosted assets with graceful fallbacks.
   ===================================================================== */
(function (global) {
  'use strict';

  const IMG = {
    abuela: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8rKaZu8Fs89F1e14kQZgkENdRQmUxkX8JrjcEJqcXJ5u5iUQJ1bb5zSZMtVJ50Y6KcyD-HfDyt2Kwz27rWLSv7tKcjK3ItliHds6PUpeA3_UpEQXxOiKMH80DJ7lc7oleb2ol5DlDkJfJIkkU9ApU-t-gVMYlsz0VM2UHbkMJbZ45RsWvyhzc0tRgxpU6HwL3Y_suI64fqsgBkZscs5yVzwgDIyuOskpdqlNiBdMCuRLCBgSIfIN_z8o1eSkMPhzIg0ylmlCjUX6m',
    victoria: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_nwMWicm4eLrCO99FJBYGqhwkIohfyMGrkYV8seO94dJBOglLIklvTQPHr3E8fETjSTKbXR-6IXAv9md08uNKgs4HMwAcHasHoUlpmskqKsjQQ7GjGi_x7-UgzKKuSc6FzxzrxjKs5tkFdDWGAKzoiVqbrHH7W5gURTIST9dpV4v8CWEpncM7DogNOSNllpVJFaXwaHIqQFLrsVqRoYPWGrGZkEFudpJdHt9lHKrA4Jd9PTaZ9uAJqjtDXmDqAATcPUjzO_fBdHzf',
    ensaimada: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnRqfwq2P-aJQImYBIY7S4wAwAsf1wTzRefVW2gU_62Fiq4XnUhFnujsOUdEOGXcgFoeM-WV5pVRcI7VHZjHvKq1WrIdAeLGjO64OwXvFriLLZVJQQtdD1tBAq3O5_9zPRzSJuVorgm5RXk4NpDkdKYB8vpt4ZlS63YtShtMfkVtbcvzMts3mA2aFogY5m0IgS-A7u1Oiyi5XNDkuZju-MkzA4V7hVwMf6GT7nBn6ck89Z01uOF3JgBNAvvMand477-kfTnijYCP6R',
    trufas: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8VLm6YDfJfmNkJ14jSk9C9l5VMIVPZzRCQR0MfF6Y9ID_VEH-Qlv7PXf0jDUEmH0Jxo6M6pAowToKC2ozgMcHs6Z8CUJ1-ePA1jNrXAbOmTEj2k4vtpAngadCVl-_AM0nKMF-oXKis3WBn4dRBNFJlpc4uPVAm-qA_t1MjgDSnBU9k5n4IPQ0-Ri45nrGkdr4CGwg5QqBLtIq5hn8vu725YWmnWxCOwMCQ0Y7iGe45Y8eBLrB82vm8xCIAhkPUyxD3lpBx0DOv6A0',
    croissant: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdUFZlyxQN4u_tABvKVgN4718etoGorcyJGZ69FaGErOjePeeO7iZI17kRw11OQtXyaXVbzm_ATNnxrPtDz_YE_6mIiDOvXP-0MLArNzMCq_iFzppuQeq8w0LZBVMXQY7IZWyyIOCMJp8jYDC5XkNdE3Vdvx8TQVEK96jHTBmYoK2w2UztxjahgRWvLQUNiWUh1_VI5arABoPTi-LG5I7f1gR-Ex0yPBxnqbxKNk0LgGfZWl61EG8x0-2wG6mfTtE6r-yTu6xNAMQu',
    milhojas: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAWboqC0uZJ3z_I7ArMG8C2l2J1zgia75Wng9wCVKidtpd5xf6wc8CKNzmG9DapOQFAEr7VUcM7-JtZlnQNKcmUXcZ3tAJE9cOHbdUjJye7JOVH3sx1Y96kNbQvDQDCKCzjbIbICTzOgEV18cRkqxxCwlx3NEOsdUXZrDKvjLtw_7ZyrIaWTJAjgY5ZzgplMDGEFE-a4jPNqfbAKWT_bLzoGJIu6Ai9aY-RBpUJ6znl-pg20o38jb5YsIGEYMEcpLyr8YdWckdUgVf',
    pandebono: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA98a_AhXuw_I4rRi330EfS503vE9N-Hr-R73ZezKHPr2u8hHQ2HTCvp3R2rRnzByVkCa-faLpXvC-Pg2-Y4j9wyHZphYw04qovnQnWmgWuwOrkbWu7Ch_MHgltLAiuBTuCEnjwVkwpzwPVeqcHgykFn8YHq6JWl-9hOPMXbt-o7lKXK_gIxO6avgZCpht8UPL9vuqJkxZIXVkV5pTZxkxPCfHi2Dc6Fu8bYSjMmYS1yVoaxky1d60dy7FnTow0SWwZMtyl5kEDbHcB'
  };

  // Public CDN fallbacks (Unsplash) keep the UI looking complete offline-ish.
  const FALLBACK = {
    abuela: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    victoria: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80',
    ensaimada: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    trufas: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80',
    croissant: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
    milhojas: 'https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=800&q=80',
    pandebono: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80'
  };

  const products = [
    {
      id: 'prod_abuela', name: 'Tarta de la Abuela', slug: 'tarta-de-la-abuela',
      category: 'Tartas Tradicionales', price: 45.0, oldPrice: 52.0, stock: 12, sku: 'DDA-TT-001',
      badge: 'Más vendido', featured: true,
      image: IMG.abuela, fallback: FALLBACK.abuela,
      gallery: [IMG.abuela, FALLBACK.abuela, IMG.milhojas],
      description: 'Nuestra tarta más emblemática. Un viaje a los recuerdos de la infancia con capas de galleta María empapadas en leche con un toque de coñac, intercaladas con crema pastelera casera y un baño intenso de chocolate negro 70% cacao. Elaborada artesanalmente cada mañana.',
      rating: 4.8, reviewsCount: 128,
      variants: [
        { name: 'Pequeña · 6 porciones', price: 45.0 },
        { name: 'Mediana · 10 porciones', price: 62.0 },
        { name: 'Grande · 16 porciones', price: 88.0 }
      ],
      ingredients: ['Galleta María', 'Crema pastelera casera', 'Leche entera', 'Coñac premium', 'Chocolate negro 70% cacao', 'Azúcar de caña'],
      allergens: ['Gluten', 'Lácteos', 'Huevo'],
      nutrition: { calories: 340, fat: '14g', carbs: '45g', protein: '6g' },
      reviews: [
        { author: 'Guillermo G.', rating: 5, comment: 'Es exactamente el sabor de mi infancia. Increíble y suave.', date: '2026-06-15' },
        { author: 'Camila R.', rating: 4.5, comment: 'Súper fresca, el toque de licor es sutil y perfecto.', date: '2026-06-12' }
      ],
      questions: [
        { q: '¿Se puede pedir sin alcohol?', a: 'Sí, preparamos una versión sin coñac bajo pedido especial.' }
      ]
    },
    {
      id: 'prod_victoria', name: 'Tarta Victoria', slug: 'tarta-victoria',
      category: 'Tartas Tradicionales', price: 32.0, stock: 8, sku: 'DDA-TT-002',
      badge: 'Clásico', featured: true,
      image: IMG.victoria, fallback: FALLBACK.victoria,
      gallery: [IMG.victoria, FALLBACK.victoria],
      description: 'Bizcocho esponjoso relleno de una delicada crema de vainilla de Madagascar y abundante mermelada artesanal de frambuesa fresca, espolvoreada suavemente con azúcar glas. El equilibrio perfecto de acidez y dulzura.',
      rating: 4.6, reviewsCount: 24,
      variants: [
        { name: 'Mediana · 10 porciones', price: 32.0 },
        { name: 'Grande · 16 porciones', price: 48.0 }
      ],
      ingredients: ['Harina de repostería', 'Crema de vainilla de Madagascar', 'Mermelada de frambuesa casera', 'Mantequilla pura', 'Huevos de campo', 'Azúcar glas'],
      allergens: ['Gluten', 'Lácteos', 'Huevo'],
      nutrition: { calories: 290, fat: '11g', carbs: '41g', protein: '4g' },
      reviews: [
        { author: 'Juliana P.', rating: 5, comment: 'Espectacular para acompañar el té o café por la tarde.', date: '2026-06-20' }
      ],
      questions: []
    },
    {
      id: 'prod_ensaimada', name: 'Ensaimada Tradicional', slug: 'ensaimada-tradicional',
      category: 'Masas Finas', price: 12.5, stock: 15, sku: 'DDA-MF-001',
      badge: 'Receta de 1920', featured: true,
      image: IMG.ensaimada, fallback: FALLBACK.ensaimada,
      gallery: [IMG.ensaimada, FALLBACK.ensaimada],
      description: 'Masa hojaldrada en forma de espiral, fermentada lentamente durante 12 horas, horneada hasta lograr un exterior crujiente y un interior de nube algodonosa, generosamente cubierta con azúcar glas. Siguiendo nuestra receta secreta de 1920.',
      rating: 4.9, reviewsCount: 64,
      variants: [
        { name: 'Individual', price: 12.5 },
        { name: 'Familiar', price: 22.0 }
      ],
      ingredients: ['Harina de fuerza', 'Manteca de cerdo artesanal', 'Azúcar glas', 'Masa madre tradicional', 'Levadura', 'Huevos frescos'],
      allergens: ['Gluten', 'Huevo'],
      nutrition: { calories: 410, fat: '18g', carbs: '52g', protein: '7g' },
      reviews: [], questions: []
    },
    {
      id: 'prod_trufas', name: 'Trufas de Cacao Puro', slug: 'trufas-de-cacao-puro',
      category: 'Pastelería Francesa', price: 18.0, stock: 5, sku: 'DDA-PF-001',
      badge: 'Edición limitada', featured: false,
      image: IMG.trufas, fallback: FALLBACK.trufas,
      gallery: [IMG.trufas, FALLBACK.trufas],
      description: 'Exquisitas y cremosas trufas elaboradas con ganache de chocolate de origen 70% cacao y crema de leche fresca, espolvoreadas con el más fino cacao amargo. Un lujo de sabor que se derrite en la boca.',
      rating: 4.7, reviewsCount: 42,
      variants: [
        { name: 'Caja x 6', price: 18.0 },
        { name: 'Caja x 12', price: 33.0 }
      ],
      ingredients: ['Chocolate negro 70% de origen', 'Crema de leche fresca', 'Polvo de cacao puro sin azúcar', 'Licor de naranja (opcional)', 'Mantequilla de cacao'],
      allergens: ['Lácteos'],
      nutrition: { calories: 180, fat: '12g', carbs: '16g', protein: '3g' },
      reviews: [], questions: []
    },
    {
      id: 'prod_croissant', name: 'Croissant Francés de Mantequilla', slug: 'croissant-frances',
      category: 'Pastelería Francesa', price: 3.5, stock: 30, sku: 'DDA-PF-002',
      badge: 'Recién horneado', featured: true,
      image: IMG.croissant, fallback: FALLBACK.croissant,
      gallery: [IMG.croissant, FALLBACK.croissant],
      description: 'Laminado artesanal con mantequilla de alta calidad para conseguir infinitas y finas capas doradas, crujientes al morder con un interior alveolado, suave, aromático y untuoso.',
      rating: 4.9, reviewsCount: 142,
      variants: [{ name: 'Unidad', price: 3.5 }, { name: 'Media docena', price: 19.0 }],
      ingredients: ['Harina de fuerza', 'Mantequilla francesa 84% materia grasa', 'Levadura', 'Leche', 'Azúcar', 'Sal de mar'],
      allergens: ['Gluten', 'Lácteos'],
      nutrition: { calories: 270, fat: '16g', carbs: '26g', protein: '5g' },
      reviews: [], questions: []
    },
    {
      id: 'prod_milhojas', name: 'Milhojas de Hojaldre', slug: 'milhojas-de-hojaldre',
      category: 'Tartas Tradicionales', price: 4.5, stock: 14, sku: 'DDA-TT-003',
      badge: '', featured: false,
      image: IMG.milhojas, fallback: FALLBACK.milhojas,
      gallery: [IMG.milhojas, FALLBACK.milhojas],
      description: 'Capas súper crujientes de hojaldre invertido intercaladas con abundante crema de vainilla y el toque tradicional de arequipe colombiano dulce, cubierto de azúcar glas.',
      rating: 4.8, reviewsCount: 95,
      variants: [{ name: 'Porción', price: 4.5 }],
      ingredients: ['Hojaldre invertido', 'Crema de vainilla', 'Arequipe colombiano', 'Azúcar glas'],
      allergens: ['Gluten', 'Lácteos', 'Huevo'],
      nutrition: { calories: 320, fat: '17g', carbs: '38g', protein: '4g' },
      reviews: [], questions: []
    },
    {
      id: 'prod_pandebono', name: 'Pandebono de Queso Colombiano', slug: 'pandebono',
      category: 'Panadería', price: 1.8, stock: 45, sku: 'DDA-PA-001',
      badge: 'Tradición', featured: false,
      image: IMG.pandebono, fallback: FALLBACK.pandebono,
      gallery: [IMG.pandebono, FALLBACK.pandebono],
      description: 'El pan tradicional colombiano elaborado con fécula de maíz, almidón de yuca y queso costeño salado de primera. Hornea suave y esponjoso con corteza crujiente.',
      rating: 4.9, reviewsCount: 210,
      variants: [{ name: 'Unidad', price: 1.8 }, { name: 'Docena', price: 19.0 }],
      ingredients: ['Almidón de yuca', 'Fécula de maíz', 'Queso costeño', 'Huevo', 'Cuajada'],
      allergens: ['Lácteos', 'Huevo'],
      nutrition: { calories: 150, fat: '7g', carbs: '17g', protein: '5g' },
      reviews: [], questions: []
    }
  ];

  const categories = [
    { name: 'Tartas Tradicionales', desc: 'Recetas de toda la vida', image: IMG.abuela, fallback: FALLBACK.abuela },
    { name: 'Pastelería Francesa', desc: 'El arte del hojaldre', image: IMG.croissant, fallback: FALLBACK.croissant },
    { name: 'Masas Finas', desc: 'Fermentación lenta', image: IMG.ensaimada, fallback: FALLBACK.ensaimada },
    { name: 'Panadería', desc: 'Horneado cada mañana', image: IMG.pandebono, fallback: FALLBACK.pandebono }
  ];

  const blog = [
    {
      id: 'post_origen', slug: 'el-origen-de-la-tarta-de-la-abuela',
      title: 'El origen de la Tarta de la Abuela', category: 'Historia',
      excerpt: 'Cómo una receta familiar de 1920 se convirtió en el símbolo de Delicias del Ayer.',
      author: 'María Alejandra', date: '2026-06-10', readMins: 5,
      image: IMG.abuela, fallback: FALLBACK.abuela,
      body: 'Todo comenzó en la cocina de doña Mercedes, en una pequeña casa del centro de Bogotá. La receta, escrita a mano y guardada celosamente, pasó de generación en generación hasta llegar a las manos de nuestra fundadora. Hoy seguimos empapando cada galleta María en leche con el mismo cariño de entonces.'
    },
    {
      id: 'post_hojaldre', slug: 'el-secreto-del-hojaldre-perfecto',
      title: 'El secreto del hojaldre perfecto', category: 'Técnica',
      excerpt: 'Mantequilla fría, paciencia y 27 capas. Te contamos cómo logramos esa textura.',
      author: 'Chef Andrés', date: '2026-06-04', readMins: 7,
      image: IMG.croissant, fallback: FALLBACK.croissant,
      body: 'El hojaldre invertido requiere envolver la masa dentro de la mantequilla, y no al revés. Esta técnica francesa, más exigente, produce capas más crujientes y un dorado uniforme. La clave: mantener todo a 14°C y descansar la masa entre cada pliegue.'
    },
    {
      id: 'post_cafe', slug: 'maridajes-de-cafe-colombiano-y-reposteria',
      title: 'Maridajes de café colombiano y repostería', category: 'Cultura',
      excerpt: 'Qué café elegir para acompañar cada uno de nuestros dulces tradicionales.',
      author: 'Equipo Delicias', date: '2026-05-28', readMins: 4,
      image: IMG.milhojas, fallback: FALLBACK.milhojas,
      body: 'Un café de origen Huila, con notas cítricas, realza la frambuesa de la Tarta Victoria. Para las trufas de cacao puro, preferimos un Nariño de cuerpo intenso. El pandebono pide un tinto campesino, sencillo y caliente.'
    }
  ];

  const testimonials = [
    { name: 'Laura Restrepo', role: 'Cliente desde 2019', text: 'La Tarta de la Abuela es literalmente el postre de mi niñez. Pido una cada cumpleaños y nunca falla.', avatar: 'https://i.pravatar.cc/100?img=5' },
    { name: 'Hotel Miramar', role: 'Cliente corporativo', text: 'Surtimos todos nuestros eventos con Delicias del Ayer. Puntualidad y calidad impecables.', avatar: 'https://i.pravatar.cc/100?img=12' },
    { name: 'Sebastián Gómez', role: 'Food blogger', text: 'El mejor croissant de Bogotá, sin discusión. Las capas se deshacen en la boca.', avatar: 'https://i.pravatar.cc/100?img=33' }
  ];

  // Demo accounts — passwords here only emulate auth for the prototype.
  const users = [
    { id: 'usr_admin', email: 'admin@delicias.com', password: 'admin123', name: 'María Alejandra', role: 'Administrator', phone: '+57 300 123 4567', address: 'Calle 10 # 4-20, Bogotá', avatar: 'https://i.pravatar.cc/100?img=49' },
    { id: 'usr_manager', email: 'manager@delicias.com', password: 'manager123', name: 'Andrés López', role: 'Manager', phone: '+57 311 987 6543', address: 'Carrera 7 # 72-15, Bogotá', avatar: 'https://i.pravatar.cc/100?img=15' },
    { id: 'usr_employee', email: 'empleado@delicias.com', password: 'empleado123', name: 'Lucía Pérez', role: 'Employee', phone: '+57 312 222 1100', address: 'Bogotá', avatar: 'https://i.pravatar.cc/100?img=20' },
    { id: 'usr_driver', email: 'driver@delicias.com', password: 'driver123', name: 'Carlos Ruiz', role: 'Delivery Driver', phone: '+57 315 555 4433', address: 'Bogotá', avatar: 'https://i.pravatar.cc/100?img=8' },
    { id: 'usr_customer', email: 'cliente@ejemplo.com', password: 'cliente123', name: 'María Fernández', role: 'Customer', phone: '+57 320 888 9900', address: 'Avenida 19 # 120-45, Apt 502, Bogotá', avatar: 'https://i.pravatar.cc/100?img=47' }
  ];

  const orders = [
    {
      id: 'ORD-0892', userId: 'usr_customer', customerName: 'María Fernández', customerEmail: 'cliente@ejemplo.com',
      deliveryAddress: 'Avenida 19 # 120-45, Apt 502, Bogotá', paymentMethod: 'Nequi', status: 'En preparación',
      items: [
        { productId: 'prod_abuela', productName: 'Tarta de la Abuela', price: 45.0, quantity: 1, image: IMG.abuela },
        { productId: 'prod_ensaimada', productName: 'Ensaimada Tradicional', price: 12.5, quantity: 1, image: IMG.ensaimada }
      ],
      subtotal: 57.5, shipping: 4.5, discount: 0, total: 62.0, createdAt: '2026-06-24T09:12:00Z'
    },
    {
      id: 'ORD-0891', userId: 'usr_corp', customerName: 'Hotel Miramar (Evento)', customerEmail: 'eventos@hotelmiramar.com',
      deliveryAddress: 'Calle 72 # 5-83, Salón Dorado, Bogotá', paymentMethod: 'Tarjeta de crédito', status: 'En reparto',
      items: [
        { productId: 'prod_victoria', productName: 'Tarta Victoria', price: 32.0, quantity: 10, image: IMG.victoria },
        { productId: 'prod_trufas', productName: 'Trufas de Cacao Puro', price: 18.0, quantity: 5, image: IMG.trufas }
      ],
      subtotal: 410.0, shipping: 40.0, discount: 0, total: 450.0, createdAt: '2026-06-23T15:40:00Z'
    },
    {
      id: 'ORD-0890', userId: 'usr_customer', customerName: 'María Fernández', customerEmail: 'cliente@ejemplo.com',
      deliveryAddress: 'Avenida 19 # 120-45, Apt 502, Bogotá', paymentMethod: 'Contra entrega', status: 'Entregado',
      items: [
        { productId: 'prod_croissant', productName: 'Croissant Francés de Mantequilla', price: 3.5, quantity: 6, image: IMG.croissant }
      ],
      subtotal: 21.0, shipping: 4.5, discount: 2.1, total: 23.4, createdAt: '2026-06-18T08:05:00Z'
    }
  ];

  const coupons = [
    { code: 'BIENVENIDO10', type: 'percent', value: 10, minOrder: 0, desc: '10% en tu primera compra' },
    { code: 'ENVIOGRATIS', type: 'shipping', value: 100, minOrder: 50, desc: 'Envío gratis desde $50' },
    { code: 'DULCE5', type: 'fixed', value: 5, minOrder: 30, desc: '$5 de descuento desde $30' }
  ];

  const suppliers = [
    { id: 'sup_harinas', name: 'Molinos del Valle', product: 'Harinas y fécula', phone: '+57 2 555 1020', lead: '3 días' },
    { id: 'sup_lacteos', name: 'Lácteos La Pradera', product: 'Mantequilla y crema', phone: '+57 1 444 8080', lead: '1 día' },
    { id: 'sup_cacao', name: 'Cacao de Origen Tumaco', product: 'Chocolate 70%', phone: '+57 2 333 7711', lead: '5 días' }
  ];

  const settings = {
    business: 'Delicias del Ayer',
    tagline: 'Repostería tradicional colombiana desde 1920',
    address: 'Calle 10 # 4-20, La Candelaria, Bogotá',
    phone: '+57 1 555 1920',
    whatsapp: '+57 300 123 4567',
    email: 'hola@deliciasdelayer.com',
    hours: 'Lun–Sáb 7:00–19:00 · Dom 8:00–14:00',
    currency: 'USD', taxRate: 0.08, freeShippingFrom: 60, flatShipping: 4.5,
    mapEmbed: 'https://www.google.com/maps?q=La+Candelaria+Bogota&output=embed'
  };

  global.DDA_DATA = { products, categories, blog, testimonials, users, orders, coupons, suppliers, settings, IMG, FALLBACK };
})(window);
