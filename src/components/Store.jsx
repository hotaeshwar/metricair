// src/components/Store.jsx
import React, { useEffect, useRef, useState } from 'react';

/* ── useInView ── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ════════════════════════════════════════
   HARDCODED PRODUCTS
════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1,
    name: 'Nest Learning Thermostat (3rd Gen)',
    category: 'Thermostats',
    price: 249.99,
    badge: 'Best Seller',
    stock: 12,
    description: 'Programs itself. Pays for itself. The Nest Learning Thermostat learns what temperatures you like and builds a schedule around yours.',
    image: null, // replace with '/images/products/nest-thermostat.jpg'
  },
  {
    id: 2,
    name: 'Honeywell Home RTH9585 Wi-Fi Thermostat',
    category: 'Thermostats',
    price: 149.99,
    badge: null,
    stock: 8,
    description: '7-day programmable smart thermostat with colour touchscreen and Wi-Fi connectivity.',
    image: null,
  },
  {
    id: 3,
    name: 'Lennox 16x25x1 MERV-11 Furnace Filter (6-pack)',
    category: 'Filters',
    price: 54.99,
    badge: 'Value Pack',
    stock: 50,
    description: 'Captures dust, pollen, mold spores and pet dander. Compatible with most forced-air furnaces.',
    image: null,
  },
  {
    id: 4,
    name: '20x20x1 MERV-13 High-Efficiency Filter (4-pack)',
    category: 'Filters',
    price: 49.99,
    badge: null,
    stock: 35,
    description: 'Hospital-grade filtration. Traps fine particles including smoke and bacteria. Replace every 90 days.',
    image: null,
  },
  {
    id: 5,
    name: 'AprilAire 700 Whole-Home Humidifier',
    category: 'Humidifiers',
    price: 399.99,
    badge: 'Popular',
    stock: 5,
    description: 'Auto-digital whole-home humidifier for homes up to 4,200 sq ft. Automatic digital control included.',
    image: null,
  },
  {
    id: 6,
    name: 'Honeywell HE360A Bypass Humidifier',
    category: 'Humidifiers',
    price: 189.99,
    badge: null,
    stock: 7,
    description: 'Whole-house bypass humidifier. Works with your existing HVAC system. Easy maintenance design.',
    image: null,
  },
  {
    id: 7,
    name: 'Carbon Monoxide Detector — Kidde KN-COPP-3',
    category: 'Safety',
    price: 39.99,
    badge: 'Essential',
    stock: 20,
    description: 'Plug-in CO alarm with battery backup. Digital display shows CO levels in real time.',
    image: null,
  },
  {
    id: 8,
    name: 'Condensate Pump — Little Giant VCMA-15ULS',
    category: 'Accessories',
    price: 89.99,
    badge: null,
    stock: 10,
    description: 'Automatic condensate removal pump for furnaces, ACs, and dehumidifiers. 115V, 1/30 HP.',
    image: null,
  },
  {
    id: 9,
    name: 'UV Air Purifier — APCO-X Whole-Home',
    category: 'Air Quality',
    price: 499.99,
    badge: 'New',
    stock: 4,
    description: 'In-duct UV-C light air purifier. Destroys mold, bacteria and VOCs at the source.',
    image: null,
  },
  {
    id: 10,
    name: 'Duct Tape — Professional Grade HVAC (72mm × 50m)',
    category: 'Accessories',
    price: 24.99,
    badge: null,
    stock: 100,
    description: 'Heavy-duty foil-backed duct tape. Temperature range −20°C to 100°C. UL-listed.',
    image: null,
  },
  {
    id: 11,
    name: 'Smart Air Quality Monitor — Airthings Wave Plus',
    category: 'Air Quality',
    price: 229.99,
    badge: 'Smart Home',
    stock: 6,
    description: 'Monitors radon, CO₂, humidity, temperature, air pressure and VOCs. App-connected.',
    image: null,
  },
  {
    id: 12,
    name: '3M Filtrete 1500 MPR Filter 20x25x1 (3-pack)',
    category: 'Filters',
    price: 44.99,
    badge: null,
    stock: 60,
    description: 'Captures microscopic particles like smoke and bacteria. True 3-month filter life.',
    image: null,
  },
];

const CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))];

/* ── Product placeholder icon ── */
function ProductPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-white/5">
      <svg className="w-14 h-14 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
      <span className="text-white/20 text-xs">Product Image</span>
    </div>
  );
}

/* ── Cart Drawer ── */
function CartDrawer({ cart, onClose, onRemove, onQtyChange, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#16213e] h-full flex flex-col shadow-2xl border-l border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <div>
            <h2 className="text-white font-black text-xl">Your Cart</h2>
            <p className="text-gray-500 text-xs mt-0.5">{cart.reduce((s,i)=>s+i.qty,0)} item{cart.reduce((s,i)=>s+i.qty,0) !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg className="w-20 h-20 text-white/8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <p className="text-gray-500 text-sm">Your cart is empty</p>
              <button onClick={onClose} className="text-[#e94560] text-sm hover:underline transition-colors">Continue Shopping</button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/8 hover:border-white/15 transition-colors">
                <div className="w-16 h-16 rounded-lg bg-white/8 flex items-center justify-center shrink-0 overflow-hidden">
                  {item.image
                    ? <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                    : <svg className="w-7 h-7 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      </svg>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-snug line-clamp-2">{item.name}</p>
                  <p className="text-[#e94560] font-bold text-sm mt-1">${(item.price * item.qty).toFixed(2)} CAD</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => onQtyChange(item.id, item.qty - 1)}
                      className="w-7 h-7 rounded-lg border border-white/15 text-gray-400 hover:text-white hover:border-white/35 flex items-center justify-center text-sm font-bold transition-all">−</button>
                    <span className="text-white text-sm w-6 text-center font-semibold">{item.qty}</span>
                    <button onClick={() => onQtyChange(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-lg border border-white/15 text-gray-400 hover:text-white hover:border-white/35 flex items-center justify-center text-sm font-bold transition-all">+</button>
                    <button onClick={() => onRemove(item.id)}
                      className="ml-auto text-gray-600 hover:text-red-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 shrink-0 flex flex-col gap-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-400 text-sm">Subtotal</span>
              <span className="text-white font-black text-2xl">${total.toFixed(2)} <span className="text-sm font-normal text-gray-500">CAD</span></span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #e94560 0%, #c73652 100%)' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Proceed to Purchase
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
            </button>
            <p className="text-gray-600 text-xs text-center">You'll be contacted to confirm your order</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Purchase Modal (since no Stripe yet) ── */
function PurchaseModal({ cart, onClose, total }) {
  const [form, setForm]     = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const payload = new FormData();
    payload.append('access_key',  'ba99ae3b-60cc-404c-b207-2a42e86aafb6');
    payload.append('subject',     `Store Order Request – $${total.toFixed(2)} CAD – ${form.name}`);
    payload.append('from_name',   'MetricAir Store');
    payload.append('email',       form.email);
    payload.append('reply_to',    form.email);
    payload.append('to',          'metricairlimited.ca@gmail.com');
    payload.append('message',
      `STORE ORDER REQUEST – METRICAIR\n\n` +
      `Customer: ${form.name}\nEmail:    ${form.email}\nPhone:    ${form.phone}\n\n` +
      `ORDER ITEMS:\n` +
      cart.map(i => `  • ${i.name} × ${i.qty}  =  $${(i.price * i.qty).toFixed(2)} CAD`).join('\n') +
      `\n\nORDER TOTAL: $${total.toFixed(2)} CAD\n\nSubmitted: ${new Date().toLocaleString()}`
    );
    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
      const data = await res.json();
      if (data.success) setStatus('success');
      else throw new Error();
    } catch { setStatus('error'); }
  };

  const inputCls = `w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 outline-none focus:border-[#e94560] focus:ring-1 focus:ring-[#e94560]/20 transition-all duration-200`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose}/>
      <div className="relative w-full max-w-md bg-[#16213e] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">

        {/* Red top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#e94560] to-[#c73652]"/>

        <div className="p-7">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/40 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 className="text-white font-black text-xl">Order Submitted!</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                We've received your order request. Our team will contact you within 24 hours to confirm and arrange payment.
              </p>
              <button onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-lg bg-[#e94560] hover:bg-[#c73652] text-white text-sm font-semibold transition-all duration-300">
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-white font-black text-xl">Complete Your Order</h3>
                  <p className="text-gray-500 text-sm mt-1">Total: <span className="text-[#e94560] font-bold">${total.toFixed(2)} CAD</span></p>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Order summary */}
              <div className="mb-5 p-4 rounded-xl bg-white/5 border border-white/8 flex flex-col gap-1.5 max-h-32 overflow-y-auto">
                {cart.map(i => (
                  <div key={i.id} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 truncate mr-2">{i.name} × {i.qty}</span>
                    <span className="text-white font-semibold shrink-0">${(i.price * i.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text"  name="name"  value={form.name}  onChange={handleChange} placeholder="Full Name *"     required className={inputCls}/>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" required className={inputCls}/>
                <input type="tel"   name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *"  required className={inputCls}/>

                {status === 'error' && (
                  <p className="text-red-400 text-xs">Something went wrong — please try again.</p>
                )}

                <button type="submit" disabled={status === 'sending'}
                  className="w-full py-3.5 rounded-xl bg-[#e94560] hover:bg-[#c73652] text-white font-bold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === 'sending' ? 'Submitting…' : 'Submit Order Request'}
                </button>
                <p className="text-gray-600 text-xs text-center leading-relaxed">
                  We'll contact you within 24 hours to confirm your order and arrange secure payment.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Product Card ── */
function ProductCard({ product, onAddToCart, inView, delay }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      className="group flex flex-col rounded-2xl bg-white/5 border border-white/8 overflow-hidden hover:border-[#e94560]/40 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(233,69,96,0.12)] transition-all duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {product.image
          ? <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
          : <ProductPlaceholder />
        }
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#e94560] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
            {product.badge}
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
            <span className="text-white font-bold text-sm uppercase tracking-widest">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest">{product.category}</span>
        <h3 className="text-white font-bold text-sm leading-snug">{product.name}</h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/8">
          <div>
            <span className="text-white font-black text-xl">${product.price.toFixed(2)}</span>
            <span className="text-gray-600 text-xs ml-1">CAD</span>
          </div>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border transition-all duration-300 ${
              added
                ? 'bg-green-500/15 border-green-500/40 text-green-400'
                : product.stock === 0
                  ? 'bg-white/5 border-white/10 text-gray-600 cursor-not-allowed'
                  : 'bg-[#e94560]/10 border-[#e94560]/40 text-[#e94560] hover:bg-[#e94560] hover:text-white hover:border-[#e94560]'
            }`}
          >
            {added ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN STORE COMPONENT
════════════════════════════════════════ */
export default function Store() {
  const [heroRef,     heroInView]     = useInView(0.05);
  const [productsRef, productsInView] = useInView(0.05);

  const [cart,           setCart]           = useState([]);
  const [cartOpen,       setCartOpen]       = useState(false);
  const [purchaseOpen,   setPurchaseOpen]   = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy,         setSortBy]         = useState('default');
  const [searchQuery,    setSearchQuery]    = useState('');

  /* ── Derived data ── */
  const filtered = PRODUCTS
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name')       return a.name.localeCompare(b.name);
      return 0;
    });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  /* ── Cart helpers ── */
  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const changeQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setTimeout(() => setPurchaseOpen(true), 200);
  };

  return (
    <section className="w-full bg-[#1a1a2e] text-white pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-8 lg:px-16 overflow-hidden min-h-screen">

      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">

        {/* ══ HERO ══ */}
        <div
          ref={heroRef}
          className="text-center max-w-3xl mx-auto"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="text-[#e94560] text-xs font-bold uppercase tracking-widest block mb-4">MetricAir Store</span>
          <h1 className="text-white font-black leading-tight text-4xl sm:text-5xl lg:text-6xl mb-5">
            HVAC Products &<br /><span className="text-[#e94560]">Accessories</span>
          </h1>
          <div className="w-14 h-1 rounded-full bg-[#e94560] mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Premium HVAC products, filters, thermostats and accessories — delivered across the GTA. Add items to your cart and we'll confirm your order within 24 hours.
          </p>
        </div>

        {/* ══ FILTERS BAR ══ */}
        <div
          className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder-gray-500 outline-none focus:border-[#e94560] transition-colors duration-200"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full sm:w-auto bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-gray-300 text-sm outline-none focus:border-[#e94560] transition-colors duration-200 cursor-pointer pr-8"
              style={{ appearance: 'none' }}
            >
              <option value="default"    className="bg-[#16213e]">Sort: Default</option>
              <option value="price-asc"  className="bg-[#16213e]">Price: Low → High</option>
              <option value="price-desc" className="bg-[#16213e]">Price: High → Low</option>
              <option value="name"       className="bg-[#16213e]">Name: A → Z</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

          {/* Cart button */}
          {cartCount > 0 && (
            <button
              onClick={() => setCartOpen(true)}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#e94560] hover:bg-[#c73652] text-white text-sm font-bold transition-all duration-300 hover:scale-[1.02] shrink-0"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Cart ({cartCount}) · ${cartTotal.toFixed(2)}
            </button>
          )}
        </div>

        {/* ══ CATEGORY TABS ══ */}
        <div
          className="flex flex-wrap gap-2"
          style={{
            opacity: heroInView ? 1 : 0,
            transition: 'opacity 0.7s ease 0.3s',
          }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#e94560] border-[#e94560] text-white shadow-[0_0_12px_rgba(233,69,96,0.4)]'
                  : 'bg-transparent border-white/15 text-gray-400 hover:border-white/35 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-gray-600 text-xs self-center">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ══ PRODUCTS GRID ══ */}
        <div ref={productsRef}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <svg className="w-20 h-20 text-white/8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <p className="text-white font-semibold text-lg">No products found</p>
              <p className="text-gray-500 text-sm">
                {searchQuery ? `No results for "${searchQuery}"` : 'No products in this category.'}
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="px-5 py-2.5 rounded-lg border border-white/20 text-gray-300 text-sm hover:border-[#e94560] hover:text-white transition-all duration-200"
              >Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  inView={productsInView}
                  delay={Math.min(i * 0.07, 0.42)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ══ TRUST BADGES ══ */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          style={{
            opacity: productsInView ? 1 : 0,
            transition: 'opacity 0.8s ease 0.4s',
          }}
        >
          {[
            { emoji: '🔒', label: 'Secure Orders',   sub: 'Your data is safe'    },
            { emoji: '🚚', label: 'GTA Delivery',     sub: 'Fast & reliable'      },
            { emoji: '✅', label: 'Genuine Products', sub: 'Verified brands'      },
            { emoji: '💬', label: '24hr Response',    sub: 'We confirm all orders'},
          ].map(b => (
            <div key={b.label} className="flex items-center gap-3 p-4 rounded-xl bg-white/4 border border-white/8 hover:border-white/15 transition-colors duration-200">
              <span className="text-xl shrink-0">{b.emoji}</span>
              <div>
                <p className="text-white text-xs font-semibold">{b.label}</p>
                <p className="text-gray-600 text-xs">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ══ FLOATING CART BUTTON (mobile) ══ */}
      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 sm:hidden flex items-center gap-2 bg-[#e94560] hover:bg-[#c73652] text-white px-5 py-3 rounded-full shadow-2xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Cart ({cartCount}) · ${cartTotal.toFixed(2)}
        </button>
      )}

      {/* ══ CART DRAWER ══ */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onQtyChange={changeQty}
          onCheckout={handleCheckout}
        />
      )}

      {/* ══ PURCHASE MODAL ══ */}
      {purchaseOpen && (
        <PurchaseModal
          cart={cart}
          total={cartTotal}
          onClose={() => { setPurchaseOpen(false); setCart([]); }}
        />
      )}
    </section>
  );
}