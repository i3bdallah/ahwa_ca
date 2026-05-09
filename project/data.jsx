// Products + content data for Ahwa.

const CATEGORIES = [
  { id: 'all',     label: 'All' },
  { id: 'turkish', label: 'Turkish' },
  { id: 'espresso',label: 'Espresso' },
  { id: 'tea',     label: 'Tea' },
];

const PRODUCTS = [
  {
    id: 't1',
    cat: 'turkish',
    name: 'Turkish Coffee',
    origin: 'Extra Fine Grind',
    desc: 'Slow-roasted, stone-ground to a silken powder. The classic ahwa — rich, bold, traditional.',
    price: 10, unit: '/ 200g',
    notes: ['Dark Cocoa', 'Toasted', 'Smooth'],
  },
  {
    id: 't2',
    cat: 'turkish',
    name: 'Turkish Coffee with Cardamom',
    origin: 'Extra Fine Grind',
    desc: 'Our Turkish coffee blended with green cardamom. Aromatic, warming, the way it was meant to be.',
    price: 10, unit: '/ 200g',
    notes: ['Cardamom', 'Cocoa', 'Spice'],
    packaging: true,
  },
  {
    id: 't3',
    cat: 'turkish',
    name: 'Turkish Extra Cardamom',
    origin: 'Extra Fine · Premium Spiced',
    desc: 'Twice the cardamom — bold, fragrant, unmistakable. For those who like it loud and aromatic.',
    price: 12, unit: '/ 200g',
    notes: ['Cardamom', 'Spice', 'Aromatic'],
    packaging: true,
  },
  {
    id: 'e1',
    cat: 'espresso',
    name: 'Espresso',
    origin: 'Medium-Fine Grind',
    desc: 'House blend ground for espresso machines. Rich crema, full body, balanced finish.',
    price: 10, unit: '/ 200g',
    notes: ['Cocoa', 'Caramel', 'Bold'],
  },
  {
    id: 'tea1',
    cat: 'tea',
    name: 'Green Tea',
    origin: 'Loose Leaf',
    desc: 'Light and refreshing. A clean, gentle cup — perfect any time of day.',
    price: 5, unit: '/ 200g',
    notes: ['Grassy', 'Fresh', 'Light'],
  },
  {
    id: 'tea2',
    cat: 'tea',
    name: 'Adani Tea',
    origin: 'Yemeni Spiced Black Tea',
    desc: 'Strong black tea brewed with milk, cardamom and spices — rich, fragrant, the cup of Aden.',
    price: 10, unit: '/ 200g',
    notes: ['Cardamom', 'Milk', 'Spice'],
  },
];

window.CATEGORIES = CATEGORIES;
window.PRODUCTS = PRODUCTS;
