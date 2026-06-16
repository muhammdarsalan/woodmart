export const FALLBACK_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&fit=crop';

const IMAGE_SETS = {
  'Sofas': [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1519961655809-34fa156820ff?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=900&q=80&fit=crop'
  ],
  'Beds & Dressing': [
    'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1540518614846-7eded47ee0e9?w=900&q=80&fit=crop'
  ],
  'Dining': [
    'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=900&q=80&fit=crop'
  ],
  'Wardrobe': [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?w=900&q=80&fit=crop'
  ],
  'Console': [
    'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1604061986761-d9d0cc41b0d1?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&q=80&fit=crop'
  ],
  'LED Rack': [
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?w=900&q=80&fit=crop'
  ],
  'Coffee Chair': [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=900&q=80&fit=crop',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=900&q=80&fit=crop'
  ]
};

const COLORS = {
  warm: [
    { name: 'Walnut', hex: '#6B4423' },
    { name: 'Sand', hex: '#C7B299' },
    { name: 'Charcoal', hex: '#333333' }
  ],
  calm: [
    { name: 'Oak', hex: '#B8956A' },
    { name: 'Ivory', hex: '#F5F0E8' },
    { name: 'Graphite', hex: '#4A4A4A' }
  ],
  fabric: [
    { name: 'Grey', hex: '#8A8A8A' },
    { name: 'Beige', hex: '#D5C7B1' },
    { name: 'Olive', hex: '#6E735F' }
  ]
};

const REVIEWS = [
  { name: 'Ayesha', city: 'Islamabad', comment: 'Excellent finish and the team helped us choose the right size.' },
  { name: 'Bilal', city: 'Rawalpindi', comment: 'Solid build quality, comfortable, and delivered on the promised day.' },
  { name: 'Mariam', city: 'Lahore', comment: 'Looks premium in the room and feels made to last.' }
];

const seeds = [
  { name: 'Cedarline Three Seat Sofa', category: 'Sofas', subcategory: 'Sofas', price: 95000, originalPrice: 115000, material: 'Sheesham', badge: 'Sale', featured: true, isNew: false, dimensions: [84, 34, 36], stock: 9 },
  { name: 'Rove L-Shape Lounge Sofa', category: 'Sofas', subcategory: 'L-Shape Sofas', price: 185000, originalPrice: 210000, material: 'Teak', badge: 'Bestseller', featured: true, isNew: true, dimensions: [112, 34, 72], stock: 6 },
  { name: 'Noura Compact Apartment Sofa', category: 'Sofas', subcategory: 'Sofas', price: 85000, originalPrice: 0, material: 'MDF', badge: 'New', featured: false, isNew: true, dimensions: [72, 32, 34], stock: 12 },
  { name: 'Heritage Carved Sofa Set', category: 'Sofas', subcategory: 'Sofa Sets', price: 250000, originalPrice: 285000, material: 'Sheesham', badge: 'Top Rated', featured: true, isNew: false, dimensions: [126, 38, 38], stock: 4 },
  { name: 'Oslo Fabric Sofa Pair', category: 'Sofas', subcategory: 'Sofa Sets', price: 145000, originalPrice: 165000, material: 'Pine', badge: 'Sale', featured: false, isNew: false, dimensions: [92, 35, 36], stock: 8 },
  { name: 'Urban Lowline Sofa', category: 'Sofas', subcategory: 'Sofas', price: 118000, originalPrice: 0, material: 'Walnut', badge: null, featured: true, isNew: false, dimensions: [86, 31, 35], stock: 11 },
  { name: 'Milan Tufted Sofa', category: 'Sofas', subcategory: 'Sofas', price: 168000, originalPrice: 198000, material: 'Teak', badge: 'Sale', featured: false, isNew: true, dimensions: [90, 35, 37], stock: 7 },
  { name: 'Vista Corner Sectional', category: 'Sofas', subcategory: 'L-Shape Sofas', price: 225000, originalPrice: 0, material: 'Oak', badge: 'Bestseller', featured: true, isNew: false, dimensions: [120, 34, 78], stock: 5 },
  { name: 'Aurora Queen Bed', category: 'Beds & Dressing', subcategory: 'Beds', price: 98000, originalPrice: 125000, material: 'Sheesham', badge: 'Sale', featured: true, isNew: false, dimensions: [66, 48, 84], stock: 10 },
  { name: 'Serene King Platform Bed', category: 'Beds & Dressing', subcategory: 'Beds', price: 145000, originalPrice: 0, material: 'Walnut', badge: 'Top Rated', featured: true, isNew: true, dimensions: [78, 44, 84], stock: 6 },
  { name: 'Mira Dressing Table Set', category: 'Beds & Dressing', subcategory: 'Dressing Tables', price: 76000, originalPrice: 86000, material: 'MDF', badge: 'Sale', featured: false, isNew: false, dimensions: [48, 72, 18], stock: 9 },
  { name: 'Noor Side Table Pair', category: 'Beds & Dressing', subcategory: 'Side Tables', price: 65000, originalPrice: 0, material: 'Oak', badge: 'New', featured: false, isNew: true, dimensions: [24, 24, 18], stock: 14 },
  { name: 'Kensington Storage Bed', category: 'Beds & Dressing', subcategory: 'Beds', price: 178000, originalPrice: 205000, material: 'Teak', badge: 'Bestseller', featured: true, isNew: false, dimensions: [78, 50, 86], stock: 5 },
  { name: 'Alder Bedroom Suite', category: 'Beds & Dressing', subcategory: 'Beds', price: 200000, originalPrice: 235000, material: 'Sheesham', badge: 'Sale', featured: true, isNew: false, dimensions: [82, 52, 88], stock: 3 },
  { name: 'Luna Low Bed Frame', category: 'Beds & Dressing', subcategory: 'Beds', price: 87000, originalPrice: 0, material: 'Pine', badge: null, featured: false, isNew: true, dimensions: [66, 36, 82], stock: 15 },
  { name: 'Classic Vanity Dresser', category: 'Beds & Dressing', subcategory: 'Dressing Tables', price: 118000, originalPrice: 138000, material: 'Walnut', badge: 'Top Rated', featured: false, isNew: false, dimensions: [54, 76, 20], stock: 6 },
  { name: 'Caspian Six Seat Dining Set', category: 'Dining', subcategory: 'Dining Sets', price: 135000, originalPrice: 158000, material: 'Sheesham', badge: 'Sale', featured: true, isNew: false, dimensions: [72, 30, 40], stock: 7 },
  { name: 'Orion Marble Top Dining', category: 'Dining', subcategory: 'Dining Tables', price: 350000, originalPrice: 0, material: 'Walnut', badge: 'Top Rated', featured: true, isNew: true, dimensions: [96, 30, 44], stock: 2 },
  { name: 'Metro Four Chair Dining', category: 'Dining', subcategory: 'Dining Sets', price: 95000, originalPrice: 112000, material: 'Oak', badge: 'Sale', featured: false, isNew: false, dimensions: [60, 30, 36], stock: 9 },
  { name: 'Haven Dining Chair Pair', category: 'Dining', subcategory: 'Dining Chairs', price: 125000, originalPrice: 0, material: 'Teak', badge: 'New', featured: false, isNew: true, dimensions: [22, 38, 24], stock: 18 },
  { name: 'Sierra Sliding Wardrobe', category: 'Wardrobe', subcategory: 'Sliding Wardrobes', price: 185000, originalPrice: 218000, material: 'MDF', badge: 'Sale', featured: true, isNew: false, dimensions: [84, 84, 24], stock: 5 },
  { name: 'Regal Six Door Wardrobe', category: 'Wardrobe', subcategory: '6-Door', price: 280000, originalPrice: 0, material: 'Sheesham', badge: 'Bestseller', featured: true, isNew: false, dimensions: [120, 90, 24], stock: 3 },
  { name: 'Nova Four Door Wardrobe', category: 'Wardrobe', subcategory: '4-Door', price: 135000, originalPrice: 155000, material: 'Oak', badge: 'Sale', featured: false, isNew: true, dimensions: [72, 84, 22], stock: 7 },
  { name: 'Studio Compact Wardrobe', category: 'Wardrobe', subcategory: '4-Door', price: 85000, originalPrice: 0, material: 'Pine', badge: 'New', featured: false, isNew: true, dimensions: [60, 78, 22], stock: 11 },
  { name: 'Elara Wooden Console Table', category: 'Console', subcategory: 'Console Tables', price: 42000, originalPrice: 52000, material: 'Walnut', badge: 'Sale', featured: true, isNew: false, dimensions: [36, 18, 36], stock: 16 },
  { name: 'Nest Trio LED Rack', category: 'LED Rack', subcategory: 'LED Racks', price: 25000, originalPrice: 0, material: 'MDF', badge: 'New', featured: false, isNew: true, dimensions: [28, 20, 18], stock: 22 },
  { name: 'Madison Glass Console Table', category: 'Console', subcategory: 'Console Tables', price: 85000, originalPrice: 98000, material: 'Teak', badge: 'Top Rated', featured: true, isNew: false, dimensions: [48, 18, 28], stock: 9 },
  { name: 'Reed Minimal LED Rack', category: 'LED Rack', subcategory: 'LED Racks', price: 36000, originalPrice: 42000, material: 'Oak', badge: 'Sale', featured: false, isNew: false, dimensions: [22, 22, 22], stock: 18 },
  { name: 'Cove Accent Coffee Chair', category: 'Coffee Chair', subcategory: 'Accent Chairs', price: 45000, originalPrice: 56000, material: 'Teak', badge: 'Sale', featured: true, isNew: true, dimensions: [28, 34, 30], stock: 13 },
  { name: 'Hush Lounge Chair', category: 'Coffee Chair', subcategory: 'Lounge Chairs', price: 75000, originalPrice: 0, material: 'Walnut', badge: 'Bestseller', featured: true, isNew: false, dimensions: [32, 36, 34], stock: 8 },
  { name: 'Aster Reading Recliner', category: 'Coffee Chair', subcategory: 'Recliners', price: 95000, originalPrice: 118000, material: 'Pine', badge: 'Sale', featured: false, isNew: false, dimensions: [34, 40, 36], stock: 6 },
  { name: 'Nyla Cane Lounge Chair', category: 'Coffee Chair', subcategory: 'Lounge Chairs', price: 35000, originalPrice: 0, material: 'Oak', badge: 'New', featured: false, isNew: true, dimensions: [30, 34, 32], stock: 15 }
];

function slugify(value) {
  return String(value).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function pickImages(category, index) {
  const set = IMAGE_SETS[category] || [FALLBACK_PRODUCT_IMAGE];
  return [0, 1, 2, 3].map(offset => set[(index + offset) % set.length]);
}

function reviewFor(index, rating) {
  return REVIEWS.map((review, reviewIndex) => ({
    id: 'rv-' + index + '-' + reviewIndex,
    name: review.name,
    city: review.city,
    rating: Math.min(5, Math.max(4, Number((rating - reviewIndex * 0.15).toFixed(1)))),
    date: '2026-0' + ((reviewIndex % 5) + 1) + '-12',
    comment: review.comment
  }));
}

function makeProduct(seed, index) {
  const originalPrice = seed.originalPrice || seed.price;
  const discount = originalPrice > seed.price ? Math.round(((originalPrice - seed.price) / originalPrice) * 100) : 0;
  const rating = Number((4.5 + ((index % 5) * 0.1)).toFixed(1));
  const colorGroup = seed.category === 'Sofas' || seed.category === 'Coffee Chair' ? COLORS.fabric : index % 2 === 0 ? COLORS.warm : COLORS.calm;
  return {
    id: 'wm-' + String(index + 1).padStart(3, '0'),
    slug: slugify(seed.name),
    name: seed.name,
    category: seed.category,
    subcategory: seed.subcategory,
    shortDesc: 'Premium ' + seed.subcategory.toLowerCase() + ' designed for Pakistani homes.',
    description: '<p>' + seed.name + ' combines durable materials, clean proportions, and everyday comfort for modern homes.</p><ul><li>Hand-finished surfaces and reinforced joinery.</li><li>Available for delivery across Pakistan.</li><li>Backed by Wood Mart showroom support.</li></ul>',
    price: seed.price,
    originalPrice: originalPrice,
    discount: discount,
    currency: 'PKR',
    material: seed.material,
    colors: colorGroup,
    dimensions: { width: seed.dimensions[0], height: seed.dimensions[1], depth: seed.dimensions[2], unit: 'inches' },
    weight: String(28 + index * 3) + ' kg',
    rating: rating,
    reviewCount: 18 + index * 3,
    badge: seed.badge,
    images: pickImages(seed.category, index),
    inStock: true,
    stockCount: seed.stock,
    isNew: seed.isNew,
    isFeatured: seed.featured,
    isOnSale: discount > 0,
    tags: [slugify(seed.material), slugify(seed.subcategory), seed.category === 'Beds & Dressing' ? 'bedroom-furniture' : 'home-furniture'],
    sku: 'WM-' + seed.category.replace(/[^A-Z]/gi, '').slice(0, 3).toUpperCase() + '-' + String(index + 101),
    reviews: reviewFor(index + 1, rating)
  };
}

export function validateProducts(list) {
  if (!Array.isArray(list) || list.length !== 32) {
    throw new Error('Wood Mart catalog must contain exactly 32 products.');
  }
  const required = ['id', 'slug', 'name', 'category', 'subcategory', 'shortDesc', 'description', 'price', 'originalPrice', 'discount', 'currency', 'material', 'colors', 'dimensions', 'weight', 'rating', 'reviewCount', 'images', 'inStock', 'stockCount', 'isNew', 'isFeatured', 'isOnSale', 'tags', 'sku', 'reviews'];
  const distribution = { 'Beds & Dressing': 0, 'Sofas': 0, 'Dining': 0, 'Coffee Chair': 0, 'Console': 0, 'LED Rack': 0, 'Wardrobe': 0 };
  list.forEach(product => {
    required.forEach(key => {
      if (!(key in product)) {
        throw new Error('Product missing required key: ' + key);
      }
    });
    if (!Object.prototype.hasOwnProperty.call(distribution, product.category)) {
      throw new Error('Invalid category: ' + product.category);
    }
    if (!Array.isArray(product.images) || product.images.length < 4) {
      throw new Error(product.name + ' must include four images.');
    }
    distribution[product.category] += 1;
  });
  const expected = { 'Beds & Dressing': 8, 'Sofas': 8, 'Dining': 4, 'Coffee Chair': 4, 'Console': 2, 'LED Rack': 2, 'Wardrobe': 4 };
  Object.keys(expected).forEach(category => {
    if (distribution[category] !== expected[category]) {
      throw new Error(category + ' must contain ' + expected[category] + ' products.');
    }
  });
  return list;
}

export const products = validateProducts(seeds.map(makeProduct));

export function getProductBySlug(slug) {
  try {
    return products.find(product => product.slug === slug) || null;
  } catch {
    return null;
  }
}

export function getProductById(id) {
  try {
    return products.find(product => String(product.id) === String(id)) || null;
  } catch {
    return null;
  }
}

export function getFeaturedProducts(limit = 8) {
  try {
    return products.filter(product => product.isFeatured).slice(0, limit);
  } catch {
    return [];
  }
}

export function getNewArrivals(limit = 8) {
  try {
    return products.filter(product => product.isNew).slice(0, limit);
  } catch {
    return [];
  }
}

export function getRelatedProducts(product, limit = 4) {
  try {
    if (!product) return products.slice(0, limit);
    return products.filter(item => item.category === product.category && item.id !== product.id).slice(0, limit);
  } catch {
    return [];
  }
}
