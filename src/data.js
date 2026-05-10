import catalog from '../content/products.yaml';

export const WHATSAPP_NUMBER = '16479202381';
export const INSTAGRAM_URL = 'https://www.instagram.com/ahwa.ca';

export const waLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg || "Hi Ahwa! I'd like to ask about an order.")}`;

export const CATEGORIES = catalog.categories;

export const PRODUCTS = catalog.products.map((p) => ({
  ...p,
  desc: p.description,
}));
