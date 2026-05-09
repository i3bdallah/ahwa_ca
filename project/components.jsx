// Reusable components for Ahwa.

const { useState, useEffect, useRef, useMemo } = React;

const WHATSAPP_NUMBER = '15551234567'; // placeholder
const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg || "Hi Ahwa! I'd like to ask about an order.")}`;

// ─── Icons ───────────────────────────────────────────────────────────
const Icon = {
  Whatsapp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.825 9.825 0 0 1 6.991 2.898 9.826 9.826 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.889 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
    </svg>
  ),
  Instagram: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  ),
  Facebook: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Tiktok: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
    </svg>
  ),
  Pin: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="m3 7 9 6 9-6"/>
    </svg>
  ),
  Phone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.65 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.3 1.85.52 2.81.65A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Heart: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/>
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  Bag: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 7h12l-1 13H7L6 7z"/>
      <path d="M9 7V5a3 3 0 0 1 6 0v2"/>
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  ),
  Leaf: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M11 20A7 7 0 0 1 9.8 6.5C15.5 5 17 4.48 19.5 2.5c1 5 .8 8.16-.5 11C17.5 17 13 21 11 20z"/>
      <path d="M2 22s4-3 8-10"/>
    </svg>
  ),
};

// Category-specific placeholder visual (subtly-striped SVG with mono explainer).
function ProductImage({ cat, name, packaging }) {
  if (packaging) {
    return (
      <div style={{
        width:'100%', height:'100%',
        background:'linear-gradient(180deg, #efe2cb 0%, #d8c4a3 100%)',
        display:'flex', alignItems:'flex-end', justifyContent:'center',
        position:'relative', overflow:'hidden'
      }}>
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(circle at 50% 30%, rgba(255,255,255,.5), transparent 60%)'
        }}/>
        <img src="assets/packaging.png" alt={name} style={{
          height:'115%', width:'auto', objectFit:'contain',
          marginBottom:'-8%', position:'relative', zIndex:1,
          filter:'drop-shadow(0 12px 24px rgba(58,32,20,.18))'
        }}/>
      </div>
    );
  }
  const palettes = {
    beans:   { bg: '#3a1d18', stripe: '#4a2820', accent: '#8a4a3a', label: 'BEANS' },
    ground:  { bg: '#5a2c20', stripe: '#6b3a2a', accent: '#a35d3f', label: 'GROUND' },
    turkish: { bg: '#2d1820', stripe: '#3a2028', accent: '#6b2230', label: 'TURKISH' },
    tea:     { bg: '#3a4520', stripe: '#4a5528', accent: '#8a9b4a', label: 'TEA' },
    karak:   { bg: '#5a3818', stripe: '#6b4520', accent: '#b88a4a', label: 'KARAK' },
  };
  const p = palettes[cat] || palettes.beans;
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`stripe-${cat}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="14" height="14" fill={p.bg}/>
          <rect width="7" height="14" fill={p.stripe}/>
        </pattern>
        <radialGradient id={`glow-${cat}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={p.accent} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={p.bg} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#stripe-${cat})`} />
      <rect width="400" height="300" fill={`url(#glow-${cat})`} />
      <circle cx="200" cy="150" r="60" fill="none" stroke={p.accent} strokeWidth="1" opacity="0.35"/>
      <circle cx="200" cy="150" r="92" fill="none" stroke={p.accent} strokeWidth="0.5" opacity="0.25"/>
      <text x="200" y="148" textAnchor="middle" fill={p.accent} fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="3" opacity="0.85">
        {p.label}
      </text>
      <text x="200" y="166" textAnchor="middle" fill={p.accent} fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5" opacity="0.55">
        product photo
      </text>
    </svg>
  );
}

// Decorative storefront placeholder
function StoryImage() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="story-stripe" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="18" height="18" fill="#3a1d18"/>
          <rect width="9" height="18" fill="#4a2820"/>
        </pattern>
        <radialGradient id="story-glow" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#b88a4a" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#3a1d18" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="url(#story-stripe)"/>
      <rect width="400" height="500" fill="url(#story-glow)"/>
      <circle cx="200" cy="220" r="100" fill="none" stroke="#b88a4a" strokeWidth="1" opacity="0.4"/>
      <circle cx="200" cy="220" r="140" fill="none" stroke="#b88a4a" strokeWidth="0.5" opacity="0.25"/>
      <text x="200" y="220" textAnchor="middle" fill="#b88a4a" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="4" opacity="0.85">
        ROASTERY
      </text>
      <text x="200" y="240" textAnchor="middle" fill="#b88a4a" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5" opacity="0.55">
        in-store photo
      </text>
    </svg>
  );
}

window.Icon = Icon;
window.ProductImage = ProductImage;
window.StoryImage = StoryImage;
window.WHATSAPP_NUMBER = WHATSAPP_NUMBER;
window.waLink = waLink;
