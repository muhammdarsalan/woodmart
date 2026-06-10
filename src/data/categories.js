export const categories = [
  {
    id: '1',
    name: 'Bedroom',
    slug: 'bedroom',
    description: 'Complete bedroom furniture sets',
    image: '/images/products/beds/bed-1.jpeg',
    subcategories: ['Beds', 'Dressing Tables', 'Side Tables'],
  },
  {
    id: '2',
    name: 'Sofa',
    slug: 'sofa',
    description: 'Premium sofas and sectionals',
    image: '/images/products/sofas/sofa-1.jpeg',
    subcategories: ['Sofas', 'Sofa Sets', 'L-Shape Sofas'],
  },
  {
    id: '3',
    name: 'Coffee Table',
    slug: 'coffee-table',
    description: 'Stylish coffee and center tables',
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80&auto=format&fit=crop',
    subcategories: ['Center Tables', 'Side Tables', 'Nesting Tables'],
  },
  {
    id: '4',
    name: 'Dining Table',
    slug: 'dining-table',
    description: 'Dining tables and chair sets',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80&auto=format&fit=crop',
    subcategories: ['Dining Sets', 'Dining Chairs', 'Dining Tables'],
  },
  {
    id: '5',
    name: 'Wardrobe',
    slug: 'wardrobe',
    description: 'Wardrobes and almirahs',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
    subcategories: ['Sliding Wardrobes', '4-Door Wardrobes', '6-Door Wardrobes'],
  },
  {
    id: '6',
    name: 'Coffee Chair',
    slug: 'coffee-chair',
    description: 'Accent and lounge chairs',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
    subcategories: ['Accent Chairs', 'Lounge Chairs', 'Recliners'],
  },
];

export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug);

export default categories;
