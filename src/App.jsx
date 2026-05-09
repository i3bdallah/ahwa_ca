import { useState, useEffect, useMemo, useRef } from 'react';
import { CATEGORIES, PRODUCTS, INSTAGRAM_URL, waLink } from './data';

// ─── Icons ──────────────────────────────────────────────────────────────────
const Icon = {
  Whatsapp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.825 9.825 0 0 1 6.991 2.898 9.826 9.826 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.889 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  ),
  Instagram: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  Tiktok: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  Phone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.65 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.3 1.85.52 2.81.65A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Heart: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};

// ─── Product image placeholder ───────────────────────────────────────────────
function ProductImage({ cat, name, packaging }) {
  if (packaging) {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(180deg, #efe2cb 0%, #d8c4a3 100%)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,.5), transparent 60%)',
        }} />
        <img
          src="/assets/packaging.png"
          alt={name}
          style={{
            height: '115%', width: 'auto', objectFit: 'contain',
            marginBottom: '-8%', position: 'relative', zIndex: 1,
            filter: 'drop-shadow(0 12px 24px rgba(58,32,20,.18))',
          }}
        />
      </div>
    );
  }
  const palettes = {
    turkish: { bg: '#2d1820', stripe: '#3a2028', accent: '#6b2230', label: 'TURKISH' },
    espresso: { bg: '#5a2c20', stripe: '#6b3a2a', accent: '#a35d3f', label: 'ESPRESSO' },
    tea:     { bg: '#3a4520', stripe: '#4a5528', accent: '#8a9b4a', label: 'TEA' },
  };
  const p = palettes[cat] || palettes.turkish;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`stripe-${cat}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="14" height="14" fill={p.bg} />
          <rect width="7" height="14" fill={p.stripe} />
        </pattern>
        <radialGradient id={`glow-${cat}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={p.accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#stripe-${cat})`} />
      <rect width="400" height="300" fill={`url(#glow-${cat})`} />
      <circle cx="200" cy="150" r="60" fill="none" stroke={p.accent} strokeWidth="1" opacity="0.35" />
      <circle cx="200" cy="150" r="92" fill="none" stroke={p.accent} strokeWidth="0.5" opacity="0.25" />
      <text x="200" y="148" textAnchor="middle" fill={p.accent} fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="3" opacity="0.85">{p.label}</text>
      <text x="200" y="166" textAnchor="middle" fill={p.accent} fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5" opacity="0.55">product photo</text>
    </svg>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#" className="brand">
          <img src="/assets/logo.png" alt="Ahwa" />
          <span className="brand-name">AHWA</span>
        </a>
        <div className="nav-links">
          <a className="nav-link" href="#shop">Shop</a>
          <a className="nav-link" href="#story">Our Story</a>
          <a className="nav-link" href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href={waLink()} target="_blank" rel="noreferrer">
          <Icon.Whatsapp style={{ width: 14, height: 14 }} />
          Order on WhatsApp
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="reveal in">
          <div className="eyebrow mono">
            <span className="dot"></span>
            <span>Small-batch roasted · Shipped across Canada</span>
          </div>
          <h1>
            A cup that<br />
            tastes like<br />
            <em>home.</em>
          </h1>
          <p className="hero-sub">
            Coffee beans, ground, Turkish, tea and karak — sourced with care, roasted small-batch, and delivered to your door. The way ahwa was meant to be.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#shop">
              Shop the menu
              <Icon.Arrow className="arrow" style={{ width: 14, height: 14 }} />
            </a>
            <a className="btn btn-ghost" href="#story">Our story</a>
          </div>
          <div className="hero-badges">
            <div className="hero-badge">
              <span className="num">6+</span>
              <span className="lbl mono">products</span>
            </div>
            <div className="hero-badge">
              <span className="num">48h</span>
              <span className="lbl mono">roast to ship</span>
            </div>
            <div className="hero-badge">
              <span className="num">5★</span>
              <span className="lbl mono">local favourite</span>
            </div>
          </div>
        </div>
        <div className="hero-visual reveal in">
          <div className="hero-disc"></div>
          <img className="hero-logo" src="/assets/logo.png" alt="Ahwa logo" />
          <div className="hero-tag t1">
            <span className="ico" style={{ background: '#6b7d3a' }}></span>
            Single origin
          </div>
          <div className="hero-tag t2">
            <span className="ico" style={{ background: '#6b2230' }}></span>
            Small batch roast
          </div>
          <div className="hero-tag t3">
            <span className="ico" style={{ background: '#b88a4a' }}></span>
            Free shipping over $60
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ─────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ['Whole Bean', 'Ground', 'Turkish', 'Tea', 'Karak', 'Yemeni Mokha', 'Cardamom', 'Saffron', 'Hibiscus', 'Mint'];
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((it, i) => (
          <span className="marquee-item" key={i}>{it}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ p, isFav, onFav }) {
  const msg = `Hi Ahwa! I'd like to order: ${p.name} (${p.unit.replace('/ ', '')}) — $${p.price}.`;
  return (
    <article className="card">
      <div className="card-img">
        <ProductImage cat={p.cat} name={p.name} packaging={p.packaging} />
        <span className="card-tag">{p.origin}</span>
        <button className={`card-fav ${isFav ? 'on' : ''}`} onClick={onFav} aria-label="Save">
          <Icon.Heart style={{ width: 14, height: 14 }} />
        </button>
      </div>
      <div className="card-body">
        <h3>{p.name}</h3>
        <p>{p.desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
          {p.notes.map(n => (
            <span key={n} style={{
              fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '.06em',
              background: 'rgba(107,34,48,.06)', color: '#6b2230',
              padding: '4px 8px', borderRadius: 999,
              textTransform: 'uppercase',
            }}>{n}</span>
          ))}
        </div>
        <div className="card-foot">
          <div className="price">
            ${p.price}<span className="unit">{p.unit}</span>
          </div>
          <a className="order-btn" href={waLink(msg)} target="_blank" rel="noreferrer">
            <Icon.Whatsapp className="wa" />
            Order
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────
function Products() {
  const [active, setActive] = useState('all');
  const [favs, setFavs] = useState(() => new Set());
  const filtered = useMemo(
    () => active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === active),
    [active]
  );
  const toggleFav = (id) => setFavs(s => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const counts = useMemo(() => {
    const c = { all: PRODUCTS.length };
    for (const p of PRODUCTS) c[p.cat] = (c[p.cat] || 0) + 1;
    return c;
  }, []);

  return (
    <section className="products" id="shop">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow mono" style={{ color: '#6b7d3a' }}>
              <span className="dot" style={{ background: '#6b7d3a' }}></span>
              <span>The Menu</span>
            </div>
            <h2>Brewed with <em>intention.</em></h2>
          </div>
          <p className="sub">Pick a category — every order is roasted or blended fresh and ships within 48 hours.</p>
        </div>

        <div className="cat-tabs">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`cat-tab ${active === c.id ? 'active' : ''}`}
              onClick={() => setActive(c.id)}
            >
              {c.label}
              <span className="count">{counts[c.id] || 0}</span>
            </button>
          ))}
        </div>

        <div className="grid">
          {filtered.map(p => (
            <ProductCard
              key={p.id}
              p={p}
              isFav={favs.has(p.id)}
              onFav={() => toggleFav(p.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────
function Story() {
  return (
    <section className="story" id="story">
      <div className="wrap story-grid">
        <div>
          <div className="eyebrow mono" style={{ color: '#6b7d3a' }}>
            <span className="dot" style={{ background: '#6b7d3a' }}></span>
            <span>Our Story</span>
          </div>
          <h2>Crafted with care,<br />served with <em>soul.</em></h2>
          <p>
            Ahwa started the way the best things do — a small kitchen, a stovetop dallah, and the smell of cardamom pulling everyone in. We couldn't find the cup we grew up on, so we started making it ourselves.
          </p>
          <p>
            Today we source green beans from family farms in Yemen, Ethiopia, and Colombia, and blend our Turkish coffee from spices we grind ourselves. Small batches. Real people. Coffee the way it was always meant to taste.
          </p>
          <div className="story-stats">
            <div className="story-stat">
              <div className="num">2026</div>
              <div className="lbl mono">est.</div>
            </div>
            <div className="story-stat">
              <div className="num">2+</div>
              <div className="lbl mono">origin farms</div>
            </div>
            <div className="story-stat">
              <div className="num">B2B & B2C</div>
              <div className="lbl mono">Channels</div>
            </div>
          </div>
        </div>
        <div className="story-img" style={{
          background: 'linear-gradient(160deg, #efe2cb 0%, #d8c4a3 100%)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          padding: '40px 0 0',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,.55), transparent 65%)',
          }} />
          <img
            src="/assets/packaging.png"
            alt="Ahwa packaging"
            style={{
              height: '95%', width: 'auto', objectFit: 'contain',
              position: 'relative', zIndex: 1,
              filter: 'drop-shadow(0 18px 36px rgba(58,32,20,.22))',
            }}
          />
          <div className="story-img-cap" style={{ zIndex: 2 }}>
            <span className="l">"Packed with care, in 200g pouches."</span>
            <span className="r">— Ahwa</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: 'general', message: '' });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const upd = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrs(e => ({ ...e, [k]: undefined })); };

  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Please tell us your name';
    if (!form.email.trim()) er.email = 'Email required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'That email looks off';
    if (!form.message.trim() || form.message.trim().length < 8) er.message = 'A few more words please';
    setErrs(er);
    if (Object.keys(er).length === 0) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ name: '', email: '', phone: '', topic: 'general', message: '' });
      }, 4500);
    }
  }

  return (
    <form
      className="form"
      onSubmit={submit}
      noValidate
      name="contact"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="bot-field" />
      {sent && (
        <div className="form-success">
          <Icon.Check style={{ width: 18, height: 18, marginTop: 1, flexShrink: 0 }} />
          <div>
            <strong>Thanks — message received.</strong> We'll reply within a day. For faster orders, ping us on WhatsApp.
          </div>
        </div>
      )}
      <div className="form-row">
        <div className={`field ${errs.name ? 'error' : ''}`}>
          <label>Name</label>
          <input type="text" name="name" value={form.name} onChange={e => upd('name', e.target.value)} placeholder="Your name" />
          {errs.name && <span className="err">{errs.name}</span>}
        </div>
        <div className={`field ${errs.email ? 'error' : ''}`}>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={e => upd('email', e.target.value)} placeholder="you@email.com" />
          {errs.email && <span className="err">{errs.email}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label>Phone (optional)</label>
          <input type="tel" name="phone" value={form.phone} onChange={e => upd('phone', e.target.value)} placeholder="+1 (647) 000-0000" />
        </div>
        <div className="field">
          <label>What's it about?</label>
          <select name="topic" value={form.topic} onChange={e => upd('topic', e.target.value)}>
            <option value="general">General enquiry</option>
            <option value="order">Place an order</option>
            <option value="wholesale">Wholesale / café</option>
            <option value="event">Event / catering</option>
          </select>
        </div>
      </div>
      <div className={`field ${errs.message ? 'error' : ''}`}>
        <label>Message</label>
        <textarea rows="5" name="message" value={form.message} onChange={e => upd('message', e.target.value)} placeholder="Tell us what you're after — quantities, blends, delivery…"></textarea>
        {errs.message && <span className="err">{errs.message}</span>}
      </div>
      <div className="form-foot">
        <span className="note">We reply within 24 hours, often faster.</span>
        <button type="submit" className="btn btn-primary">
          Send message
          <Icon.Arrow className="arrow" style={{ width: 14, height: 14 }} />
        </button>
      </div>
    </form>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        <div>
          <div className="eyebrow mono" style={{ color: '#6b7d3a' }}>
            <span className="dot" style={{ background: '#6b7d3a' }}></span>
            <span>Get in touch</span>
          </div>
          <h2>Say <em>marhaba.</em></h2>
          <p className="contact-intro">
            Questions about a blend? Want a wholesale quote? Catering an event? Drop us a line — or skip the form and message us directly on WhatsApp.
          </p>
          <div className="contact-info">
            <div className="info-row">
              <div className="icon-wrap"><Icon.Whatsapp /></div>
              <div>
                <div className="lbl">WhatsApp</div>
                <a className="val" href={waLink()} target="_blank" rel="noreferrer">+1 (647) 920-2381</a>
              </div>
            </div>
            <div className="info-row">
              <div className="icon-wrap"><Icon.Mail /></div>
              <div>
                <div className="lbl">Email</div>
                <a className="val" href="mailto:hello@ahwa.ca">hello@ahwa.ca</a>
              </div>
            </div>
            <div className="info-row">
              <div className="icon-wrap"><Icon.Clock /></div>
              <div>
                <div className="lbl">Hours</div>
                <span className="val">Mon–Sat · 9:00 – 19:00</span>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand">
              <img src="/assets/logo.png" alt="Ahwa" style={{ height: 42, filter: 'brightness(0) invert(1) opacity(.95)' }} />
              <span className="brand-name">AHWA</span>
            </div>
            <p>
              Small-batch Turkish coffee, espresso, and tea — roasted with care and shipped across Canada.
            </p>
            <div className="footer-socials">
              <a className="social-btn" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><Icon.Instagram /></a>
              <a className="social-btn" href={waLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon.Whatsapp /></a>
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href="#shop">Turkish Coffee</a></li>
              <li><a href="#shop">Espresso</a></li>
              <li><a href="#shop">Tea</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#story">Our story</a></li>
              <li><a href="#contact">Wholesale</a></li>
              <li><a href="#contact">Shipping</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={waLink()} target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href="mailto:hello@ahwa.ca">hello@ahwa.ca</a></li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@ahwa.ca</a></li>
              <li>Mon–Sat · 9–19</li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <span>© 2026 Ahwa Coffee Co. — Roasted with love in Canada.</span>
          <span>ahwa.ca</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating WhatsApp ────────────────────────────────────────────────────────
function WhatsAppFab() {
  return (
    <a className="wa-fab" href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <span className="wa-pulse"></span>
      <Icon.Whatsapp />
      <span className="wa-tooltip">Chat with us</span>
    </a>
  );
}

// ─── Reveal on scroll ─────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useReveal();
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Products />
      <Story />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </>
  );
}
