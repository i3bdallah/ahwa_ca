// Main App for Ahwa.

const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "burgundy",
  "heroVariant": "split",
  "showBadges": true
}/*EDITMODE-END*/;

const PALETTES = {
  burgundy: { primary: '#6b2230', primaryDk: '#4d1722', accent: '#6b7d3a' },
  espresso: { primary: '#3a1d18', primaryDk: '#2a1410', accent: '#b88a4a' },
  olive:    { primary: '#4f5e25', primaryDk: '#3a4419', accent: '#6b2230' },
};

function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#" className="brand">
          <img src="assets/logo.png" alt="Ahwa" />
          <span className="brand-name">AHWA</span>
        </a>
        <div className="nav-links">
          <a className="nav-link" href="#shop">Shop</a>
          <a className="nav-link" href="#story">Our Story</a>
          <a className="nav-link" href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href={waLink()} target="_blank" rel="noreferrer">
          <Icon.Whatsapp style={{width:14,height:14}}/>
          Order on WhatsApp
        </a>
      </div>
    </nav>
  );
}

function Hero({ showBadges }) {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="reveal in">
          <div className="eyebrow mono">
            <span className="dot"></span>
            <span>Roasted in Mississauga · Shipped across Canada</span>
          </div>
          <h1>
            A cup that<br/>
            tastes like<br/>
            <em>home.</em>
          </h1>
          <p className="hero-sub">
            Coffee beans, ground, Turkish, tea and karak — sourced with care, roasted small-batch, and delivered to your door. The way ahwa was meant to be.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#shop">
              Shop the menu
              <Icon.Arrow className="arrow" style={{width:14,height:14}}/>
            </a>
            <a className="btn btn-ghost" href="#story">Our story</a>
          </div>
          {showBadges && (
            <div className="hero-badges">
              <div className="hero-badge">
                <span className="num">12+</span>
                <span className="lbl mono">origins</span>
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
          )}
        </div>
        <div className="hero-visual reveal in">
          <div className="hero-disc"></div>
          <img className="hero-logo" src="assets/logo.png" alt="Ahwa logo"/>
          <div className="hero-tag t1">
            <span className="ico" style={{background:'#6b7d3a'}}></span>
            Single origin
          </div>
          <div className="hero-tag t2">
            <span className="ico" style={{background:'#6b2230'}}></span>
            Small batch roast
          </div>
          <div className="hero-tag t3">
            <span className="ico" style={{background:'#b88a4a'}}></span>
            Free shipping over $60
          </div>
        </div>
      </div>
    </section>
  );
}

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

function ProductCard({ p, isFav, onFav }) {
  const msg = `Hi Ahwa! I'd like to order: ${p.name} (${p.unit.replace('/ ','')}) — $${p.price}.`;
  return (
    <article className="card">
      <div className="card-img">
        <ProductImage cat={p.cat} name={p.name} packaging={p.packaging}/>
        <span className="card-tag">{p.origin}</span>
        <button className={`card-fav ${isFav?'on':''}`} onClick={onFav} aria-label="Save">
          <Icon.Heart style={{width:14,height:14}}/>
        </button>
      </div>
      <div className="card-body">
        <h3>{p.name}</h3>
        <p>{p.desc}</p>
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:6}}>
          {p.notes.map(n => (
            <span key={n} style={{
              fontSize:10, fontFamily:'JetBrains Mono, monospace', letterSpacing:'.06em',
              background:'rgba(107,34,48,.06)', color:'#6b2230',
              padding:'4px 8px', borderRadius:999,
              textTransform:'uppercase'
            }}>{n}</span>
          ))}
        </div>
        <div className="card-foot">
          <div className="price">
            ${p.price}<span className="unit">{p.unit}</span>
          </div>
          <a className="order-btn" href={waLink(msg)} target="_blank" rel="noreferrer">
            <Icon.Whatsapp className="wa"/>
            Order
          </a>
        </div>
      </div>
    </article>
  );
}

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
    for (const p of PRODUCTS) c[p.cat] = (c[p.cat]||0)+1;
    return c;
  }, []);
  return (
    <section className="products" id="shop">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow mono" style={{color:'#6b7d3a'}}>
              <span className="dot" style={{background:'#6b7d3a'}}></span>
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
              className={`cat-tab ${active===c.id?'active':''}`}
              onClick={() => setActive(c.id)}
            >
              {c.label}
              <span className="count">{counts[c.id]||0}</span>
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

function Story() {
  return (
    <section className="story" id="story">
      <div className="wrap story-grid">
        <div>
          <div className="eyebrow mono" style={{color:'#6b7d3a'}}>
            <span className="dot" style={{background:'#6b7d3a'}}></span>
            <span>Our Story</span>
          </div>
          <h2>From Cairo<br/>to your <em>kettle.</em></h2>
          <p>
            Ahwa began in a small kitchen in Mississauga — three siblings, one stovetop dallah, and the smell of cardamom that pulled the neighbours in. We started roasting because we couldn't find the cup we grew up on.
          </p>
          <p>
            Today we source green beans from family farms in Yemen, Ethiopia, and Colombia, and blend our karak and Turkish coffee from spices we grind ourselves. Small batches. Real people. Coffee the way it was always meant to taste.
          </p>
          <div className="story-stats">
            <div className="story-stat">
              <div className="num">2019</div>
              <div className="lbl mono">est.</div>
            </div>
            <div className="story-stat">
              <div className="num">7</div>
              <div className="lbl mono">origin farms</div>
            </div>
            <div className="story-stat">
              <div className="num">3,400+</div>
              <div className="lbl mono">happy cups</div>
            </div>
          </div>
        </div>
        <div className="story-img" style={{
          background:'linear-gradient(160deg, #efe2cb 0%, #d8c4a3 100%)',
          display:'flex', alignItems:'flex-end', justifyContent:'center',
          padding:'40px 0 0'
        }}>
          <div style={{
            position:'absolute', inset:0,
            background:'radial-gradient(circle at 50% 30%, rgba(255,255,255,.55), transparent 65%)'
          }}/>
          <img src="assets/packaging.png" alt="Ahwa packaging"
            style={{
              height:'95%', width:'auto', objectFit:'contain',
              position:'relative', zIndex:1,
              filter:'drop-shadow(0 18px 36px rgba(58,32,20,.22))'
            }}/>
          <div className="story-img-cap" style={{zIndex:2}}>
            <span className="l">"Packed with care, in 200g pouches."</span>
            <span className="r">— Ahwa Roastery</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', topic:'general', message:'' });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const upd = (k,v) => { setForm(f => ({...f,[k]:v})); setErrs(e => ({...e,[k]:undefined})); };

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
        setForm({ name:'', email:'', phone:'', topic:'general', message:'' });
      }, 4500);
    }
  }

  return (
    <form className="form" onSubmit={submit} noValidate>
      {sent && (
        <div className="form-success">
          <Icon.Check style={{width:18,height:18,marginTop:1,flexShrink:0}}/>
          <div>
            <strong>Thanks — message received.</strong> We'll reply within a day. For faster orders, ping us on WhatsApp.
          </div>
        </div>
      )}
      <div className="form-row">
        <div className={`field ${errs.name?'error':''}`}>
          <label>Name</label>
          <input type="text" value={form.name} onChange={e=>upd('name', e.target.value)} placeholder="Your name"/>
          {errs.name && <span className="err">{errs.name}</span>}
        </div>
        <div className={`field ${errs.email?'error':''}`}>
          <label>Email</label>
          <input type="email" value={form.email} onChange={e=>upd('email', e.target.value)} placeholder="you@email.com"/>
          {errs.email && <span className="err">{errs.email}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label>Phone (optional)</label>
          <input type="tel" value={form.phone} onChange={e=>upd('phone', e.target.value)} placeholder="+1 (555) 000-0000"/>
        </div>
        <div className="field">
          <label>What's it about?</label>
          <select value={form.topic} onChange={e=>upd('topic', e.target.value)}>
            <option value="general">General enquiry</option>
            <option value="order">Place an order</option>
            <option value="wholesale">Wholesale / café</option>
            <option value="event">Event / catering</option>
          </select>
        </div>
      </div>
      <div className={`field ${errs.message?'error':''}`}>
        <label>Message</label>
        <textarea rows="5" value={form.message} onChange={e=>upd('message', e.target.value)} placeholder="Tell us what you're after — quantities, blends, delivery…"></textarea>
        {errs.message && <span className="err">{errs.message}</span>}
      </div>
      <div className="form-foot">
        <span className="note">We reply within 24 hours, often faster.</span>
        <button type="submit" className="btn btn-primary">
          Send message
          <Icon.Arrow className="arrow" style={{width:14,height:14}}/>
        </button>
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        <div>
          <div className="eyebrow mono" style={{color:'#6b7d3a'}}>
            <span className="dot" style={{background:'#6b7d3a'}}></span>
            <span>Get in touch</span>
          </div>
          <h2>Say <em>marhaba.</em></h2>
          <p className="contact-intro">
            Questions about a blend? Want a wholesale quote? Catering an event? Drop us a line — or skip the form and message us directly on WhatsApp.
          </p>
          <div className="contact-info">
            <div className="info-row">
              <div className="icon-wrap"><Icon.Whatsapp/></div>
              <div>
                <div className="lbl">WhatsApp</div>
                <a className="val" href={waLink()} target="_blank" rel="noreferrer">+1 (555) 123-4567</a>
              </div>
            </div>
            <div className="info-row">
              <div className="icon-wrap"><Icon.Mail/></div>
              <div>
                <div className="lbl">Email</div>
                <a className="val" href="mailto:hello@ahwa.ca">hello@ahwa.ca</a>
              </div>
            </div>
            <div className="info-row">
              <div className="icon-wrap"><Icon.Pin/></div>
              <div>
                <div className="lbl">Roastery</div>
                <span className="val">2410 Dundas St W, Mississauga ON</span>
              </div>
            </div>
            <div className="info-row">
              <div className="icon-wrap"><Icon.Clock/></div>
              <div>
                <div className="lbl">Hours</div>
                <span className="val">Mon–Sat · 9:00 – 19:00</span>
              </div>
            </div>
          </div>
        </div>
        <ContactForm/>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand">
              <img src="assets/logo.png" alt="Ahwa" style={{height:42, filter:'brightness(0) invert(1) opacity(.95)'}}/>
              <span className="brand-name">AHWA</span>
            </div>
            <p>
              Small-batch coffee, Turkish, tea, and karak — roasted in Mississauga and shipped across Canada.
            </p>
            <div className="footer-socials">
              <a className="social-btn" href="#" aria-label="Instagram"><Icon.Instagram/></a>
              <a className="social-btn" href="#" aria-label="Facebook"><Icon.Facebook/></a>
              <a className="social-btn" href="#" aria-label="TikTok"><Icon.Tiktok/></a>
              <a className="social-btn" href={waLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon.Whatsapp/></a>
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href="#shop">Whole bean</a></li>
              <li><a href="#shop">Ground</a></li>
              <li><a href="#shop">Turkish</a></li>
              <li><a href="#shop">Tea</a></li>
              <li><a href="#shop">Karak</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#story">Our story</a></li>
              <li><a href="#">Wholesale</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li>2410 Dundas St W</li>
              <li>Mississauga, ON</li>
              <li>hello@ahwa.ca</li>
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

function WhatsAppFab() {
  return (
    <a className="wa-fab" href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <span className="wa-pulse"></span>
      <Icon.Whatsapp/>
      <span className="wa-tooltip">Chat with us</span>
    </a>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply palette
  useEffect(() => {
    const p = PALETTES[t.palette] || PALETTES.burgundy;
    const r = document.documentElement.style;
    r.setProperty('--burgundy', p.primary);
    r.setProperty('--burgundy-dk', p.primaryDk);
    r.setProperty('--olive', p.accent);
  }, [t.palette]);

  return (
    <>
      <Nav/>
      <Hero showBadges={t.showBadges}/>
      <Marquee/>
      <Products/>
      <Story/>
      <Contact/>
      <Footer/>
      <WhatsAppFab/>

      <TweaksPanel>
        <TweakSection label="Theme"/>
        <TweakRadio
          label="Palette"
          value={t.palette}
          options={['burgundy','espresso','olive']}
          onChange={(v)=>setTweak('palette', v)}
        />
        <TweakSection label="Hero"/>
        <TweakToggle
          label="Show badges"
          value={t.showBadges}
          onChange={(v)=>setTweak('showBadges', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
