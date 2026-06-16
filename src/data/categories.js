export const categories = [
  {
    id: 'cat-beds-dressing',
    name: 'Beds & Dressing',
    slug: 'beds-and-dressing',
    description: 'Beds, dressing tables, and side tables crafted for everyday living.',
    subcategories: ['Beds', 'Dressing Tables', 'Side Tables'],
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=900&q=80&fit=crop'
  },
  {
    id: 'cat-sofas',
    name: 'Sofas',
    slug: 'sofas',
    description: 'Comfort-focused sofa designs for compact apartments and family lounges.',
    subcategories: ['Sofas', 'Sofa Sets', 'L-Shape Sofas'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&fit=crop'
  },
  {
    id: 'cat-dining',
    name: 'Dining',
    slug: 'dining',
    description: 'Dining sets and tables for family meals, hosting, and formal rooms.',
    subcategories: ['Dining Sets', 'Dining Chairs', 'Dining Tables'],
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=900&q=80&fit=crop'
  },
  {
    id: 'cat-coffee-chair',
    name: 'Coffee Chair',
    slug: 'coffee-chair',
    description: 'Accent, lounge, and recliner chairs made for quiet corners.',
    subcategories: ['Accent Chairs', 'Lounge Chairs', 'Recliners'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop'
  },
  {
    id: 'cat-console',
    name: 'Console',
    slug: 'console',
    description: 'Elegant console tables and storage units for hallways and living spaces.',
    subcategories: ['Console Tables', 'Storage Units'],
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=900&q=80&fit=crop'
  },
  {
    id: 'cat-led-rack',
    name: 'LED Rack',
    slug: 'led-rack',
    description: 'Modern entertainment centers, TV consoles, and LED racks.',
    subcategories: ['LED Racks', 'TV Consoles'],
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&q=80&fit=crop'
  },
  {
    id: 'cat-wardrobe',
    name: 'Wardrobe',
    slug: 'wardrobe',
    description: 'Spacious wardrobes with clean storage layouts and durable finishes.',
    subcategories: ['Sliding Wardrobes', '4-Door', '6-Door'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop'
  }
];

export function getCategoryBySlug(slug) {
  return categories.find(category => category.slug === slug) || null;
}

export function getCategorySlug(name) {
  return String(name || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
