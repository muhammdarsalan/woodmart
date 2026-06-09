// Clean, focused category list as requested by client
export const categories = [
  {
    id: 'bedroom',
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Beds, dressers, side tables and complete bedroom sets crafted for restful Pakistani nights.',
    image: '/images/products/beds/bed-1.jpeg',
    productCount: 30,
    subcategories: [
      { name: 'Beds & Bed Frames', slug: 'beds' },
      { name: 'Dressers & Mirrors', slug: 'dressers' },
      { name: 'Side Tables & Nightstands', slug: 'side-tables' },
    ],
  },
  {
    id: 'sofas',
    name: 'Sofas',
    slug: 'sofas',
    description: 'Premium handcrafted sofas and sectionals in Sheesham, teak and walnut for your living room.',
    image: '/images/products/sofas/sofa-1.jpeg',
    productCount: 25,
    subcategories: [
      { name: 'Three-Seater Sofas', slug: 'three-seater' },
      { name: 'L-Shaped Sofas', slug: 'l-shaped' },
      { name: 'Sofa Sets', slug: 'sofa-sets' },
    ],
  },
  {
    id: 'coffee-tables',
    name: 'Coffee Tables',
    slug: 'coffee-tables',
    description: 'Solid wood coffee tables with storage, lift-top and designer finishes.',
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1200&q=85&auto=format&fit=crop',
    productCount: 8,
    subcategories: [
      { name: 'Lift-Top Coffee Tables', slug: 'lift-top' },
      { name: 'Storage Coffee Tables', slug: 'storage' },
      { name: 'Designer Coffee Tables', slug: 'designer' },
    ],
  },
  {
    id: 'dining-tables',
    name: 'Dining Tables',
    slug: 'dining-tables',
    description: 'Elegant 4 to 8 seater dining tables and complete sets for family gatherings.',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1200&q=85&auto=format&fit=crop',
    productCount: 12,
    subcategories: [
      { name: '4-Seater Dining', slug: '4-seater' },
      { name: '6-Seater Dining', slug: '6-seater' },
      { name: '8-Seater Dining', slug: '8-seater' },
    ],
  },
  {
    id: 'wardrobes',
    name: 'Wardrobes',
    slug: 'wardrobes',
    description: 'Spacious wardrobes with mirrors, organizers and soft-close hinges in solid wood.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop',
    productCount: 10,
    subcategories: [
      { name: 'Sliding Wardrobes', slug: 'sliding' },
      { name: 'Hinged Wardrobes', slug: 'hinged' },
      { name: 'Walk-in Wardrobes', slug: 'walk-in' },
    ],
  },
  {
    id: 'coffee-chairs',
    name: 'Coffee Chairs',
    slug: 'coffee-chairs',
    description: 'Accent and lounge chairs that complete your living room with elegance.',
    image: '/images/products/sofas/sofa-2.jpeg',
    productCount: 15,
    subcategories: [
      { name: 'Lounge Chairs', slug: 'lounge' },
      { name: 'Accent Chairs', slug: 'accent' },
      { name: 'Recliners', slug: 'recliners' },
    ],
  },
];

export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug);

export default categories;
