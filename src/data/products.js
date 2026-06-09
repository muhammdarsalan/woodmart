const makeReviews = (productName, seed) => [
  {
    id: `${seed}-r1`,
    name: 'Ayesha Khan',
    city: 'Islamabad',
    rating: 5,
    date: '2026-03-10',
    comment: `Absolutely love our ${productName}. The quality is exceptional and it looks even better in person than online.`,
  },
  {
    id: `${seed}-r2`,
    name: 'Hassan Malik',
    city: 'Rawalpindi',
    rating: 4,
    date: '2026-01-22',
    comment: `Great purchase from Wood Mart. The ${productName} was delivered on time and assembly was straightforward.`,
  },
  {
    id: `${seed}-r3`,
    name: 'Fatima Rizvi',
    city: 'Lahore',
    rating: 5,
    date: '2025-11-05',
    comment: `Premium craftsmanship on the ${productName}. Worth every rupee. Highly recommend Wood Mart.`,
  },
];

const subcategoryMapping = {
  'living-room': {
    'sofas-sectionals': 'Sofas & Sectionals',
    'coffee-tables': 'Coffee Tables',
    'tv-units': 'TV Units & Entertainment',
    'bookshelves': 'Bookshelves & Display',
    'side-tables': 'Side Tables',
    'recliners': 'Recliners',
  },
  'bedroom': {
    'beds': 'Beds & Bed Frames',
    'wardrobes': 'Wardrobes & Almirahs',
    'dressers': 'Dressers & Mirrors',
    'nightstands': 'Nightstands',
    'chest-of-drawers': 'Chest of Drawers',
    'vanity-tables': 'Vanity Tables',
  },
  'dining': {
    'dining-tables': 'Dining Tables',
    'dining-chairs': 'Dining Chairs',
    'china-cabinets': 'China Cabinets',
    'bar-stools': 'Bar Stools',
    'buffet-tables': 'Buffet Tables',
    'corner-cabinets': 'Corner Cabinets',
  },
  'office': {
    'executive-desks': 'Executive Desks',
    'office-chairs': 'Office Chairs',
    'bookshelves-office': 'Bookshelves',
    'filing-cabinets': 'Filing Cabinets',
    'meeting-tables': 'Meeting Tables',
    'reception-desks': 'Reception Desks',
  },
  'outdoor': {
    'garden-chairs': 'Garden Chairs',
    'outdoor-tables': 'Outdoor Tables',
    'swing-sets': 'Swing Sets',
    'loungers': 'Loungers',
    'benches': 'Benches',
    'planters-stands': 'Planters & Stands',
  },
  'kids': {
    'kids-beds': 'Kids Beds',
    'study-desks': 'Study Desks',
    'toy-storage': 'Toy Storage',
    'kids-wardrobes': 'Kids Wardrobes',
    'bean-bags': 'Bean Bags',
    'bunk-beds': 'Bunk Beds',
  },
};

export const getSubcategoryName = (categorySlug, subcategorySlug) => {
  return subcategoryMapping[categorySlug]?.[subcategorySlug] || subcategorySlug;
};

const imageLibrary = {
  beds: [
    '/images/products/beds/bed-1.jpeg',
    '/images/products/beds/bed-2.jpeg',
    '/images/products/beds/bed-3.jpeg',
    '/images/products/beds/bed-4.jpeg',
    '/images/products/beds/bed-5.jpeg',
    '/images/products/beds/bed-6.jpeg',
    '/images/products/beds/bed-7.jpeg',
    '/images/products/beds/bed-8.jpeg',
    '/images/products/beds/bed-9.jpeg',
  ],
  sofas: [
    '/images/products/sofas/sofa-1.jpeg',
    '/images/products/sofas/sofa-2.jpeg',
    '/images/products/sofas/sofa-3.jpeg',
    '/images/products/sofas/sofa-4.jpeg',
    '/images/products/sofas/sofa-5.jpeg',
    '/images/products/sofas/sofa-6.jpeg',
    '/images/products/sofas/sofa-7.jpeg',
    '/images/products/sofas/sofa-8.jpeg',
    '/images/products/sofas/sofa-9.jpeg',
    '/images/products/sofas/sofa-10.jpeg',
  ],
  unsplash: {
    sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop',
    bed: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80&auto=format&fit=crop',
    wardrobe: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
    dining: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80&auto=format&fit=crop',
    office: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80&auto=format&fit=crop',
    chair: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
    coffeeTable: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80&auto=format&fit=crop',
    tvUnit: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80&auto=format&fit=crop',
    outdoor: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80&auto=format&fit=crop',
    kids: 'https://images.unsplash.com/photo-1617104551722-3b2d51366ba8?w=800&q=80&auto=format&fit=crop',
  },
};

let bedIndex = 0;
let sofaIndex = 0;

function getProductImages(product) {
  const { category, subcategory, id } = product;
  let images = [];

  if (category === 'Bedroom' && (subcategory === 'Beds' || subcategory === 'Beds & Bed Frames')) {
    const bedCount = imageLibrary.beds.length;
    images = [
      imageLibrary.beds[bedIndex % bedCount],
      imageLibrary.beds[(bedIndex + 1) % bedCount],
      imageLibrary.beds[(bedIndex + 2) % bedCount],
      imageLibrary.beds[(bedIndex + 3) % bedCount],
    ];
    bedIndex++;
  } else if (category === 'Living Room' && (subcategory === 'Sofas' || subcategory === 'Sofas & Sectionals')) {
    const sofaCount = imageLibrary.sofas.length;
    images = [
      imageLibrary.sofas[sofaIndex % sofaCount],
      imageLibrary.sofas[(sofaIndex + 1) % sofaCount],
      imageLibrary.sofas[(sofaIndex + 2) % sofaCount],
      imageLibrary.sofas[(sofaIndex + 3) % sofaCount],
    ];
    sofaIndex++;
  } else if (category === 'Kids' && (subcategory === 'Beds' || subcategory === 'Kids Beds' || subcategory === 'Bunk Beds')) {
    images = [
      imageLibrary.unsplash.kids,
      imageLibrary.unsplash.bed,
      imageLibrary.unsplash.kids,
      imageLibrary.unsplash.bed,
    ];
  } else if (category === 'Living Room' && subcategory === 'Coffee Tables') {
    images = [
      imageLibrary.unsplash.coffeeTable,
      imageLibrary.unsplash.sofa,
      imageLibrary.unsplash.coffeeTable,
      imageLibrary.unsplash.sofa,
    ];
  } else if (category === 'Living Room' && (subcategory === 'TV Units' || subcategory === 'TV Units & Entertainment')) {
    images = [
      imageLibrary.unsplash.tvUnit,
      imageLibrary.unsplash.sofa,
      imageLibrary.unsplash.tvUnit,
      imageLibrary.unsplash.sofa,
    ];
  } else if (category === 'Dining') {
    images = [
      imageLibrary.unsplash.dining,
      imageLibrary.unsplash.chair,
      imageLibrary.unsplash.dining,
      imageLibrary.unsplash.chair,
    ];
  } else if (category === 'Office') {
    images = [
      imageLibrary.unsplash.office,
      imageLibrary.unsplash.chair,
      imageLibrary.unsplash.office,
      imageLibrary.unsplash.chair,
    ];
  } else if (category === 'Bedroom' && (subcategory === 'Wardrobes' || subcategory === 'Wardrobes & Almirahs')) {
    images = [
      imageLibrary.unsplash.wardrobe,
      imageLibrary.unsplash.bed,
      imageLibrary.unsplash.wardrobe,
      imageLibrary.unsplash.bed,
    ];
  } else if (category === 'Outdoor') {
    images = [
      imageLibrary.unsplash.outdoor,
      imageLibrary.unsplash.chair,
      imageLibrary.unsplash.outdoor,
      imageLibrary.unsplash.dining,
    ];
  } else {
    const unsplashList = Object.values(imageLibrary.unsplash).filter(url => typeof url === 'string');
    const idx = id % unsplashList.length;
    images = [
      unsplashList[idx],
      unsplashList[(idx + 1) % unsplashList.length],
      unsplashList[(idx + 2) % unsplashList.length],
      unsplashList[(idx + 3) % unsplashList.length],
    ];
  }

  return images.length === 4 ? images : [images[0], images[0], images[0], images[0]];
}

const productsData = [
  { id: 1, slug: 'heritage-sheesham-sofa', name: 'Heritage Sheesham Sofa', category: 'Living Room', subcategory: 'Sofas', shortDesc: 'Three-seater solid Sheesham sofa with premium upholstery.', description: '<p>Handcrafted from premium Sheesham wood with high-density foam cushions and stain-resistant fabric. Features traditional mortise-and-tenon joinery for lasting durability. Perfect centerpiece for your living room.</p>', price: 185000, originalPrice: 220000, material: 'Sheesham', colors: [{ name: 'Walnut Brown', hex: '#5c3d2e' }, { name: 'Natural Teak', hex: '#8b6914' }, { name: 'Charcoal Grey', hex: '#4a4a4a' }], dimensions: { width: 84, height: 34, depth: 36, unit: 'inches' }, weight: '95 kg', rating: 4.8, reviewCount: 47, badge: 'Bestseller', seed: 'sofa1', inStock: true, stockCount: 12, isNew: false, isFeatured: true, isOnSale: true, tags: ['sofa', 'living room', 'sheesham'], sku: 'WM-LR-SF-001' },
  { id: 2, slug: 'modern-lift-coffee-table', name: 'Modern Lift Coffee Table', category: 'Living Room', subcategory: 'Coffee Tables', shortDesc: 'Lift-top coffee table with hidden storage compartment.', description: '<p>Innovative lift-top mechanism reveals hidden storage for remotes, magazines, and blankets. Crafted from engineered wood with walnut veneer finish. Soft-close hinges for smooth operation.</p>', price: 45000, originalPrice: 52000, material: 'Walnut', colors: [{ name: 'Dark Walnut', hex: '#3e2723' }, { name: 'Espresso', hex: '#2c1810' }], dimensions: { width: 48, height: 18, depth: 24, unit: 'inches' }, weight: '28 kg', rating: 4.6, reviewCount: 32, badge: 'Sale', seed: 'coffee1', inStock: true, stockCount: 20, isNew: false, isFeatured: true, isOnSale: true, tags: ['coffee table', 'storage', 'living room'], sku: 'WM-LR-CT-002' },
  { id: 3, slug: 'elegance-tv-unit', name: 'Elegance TV Unit', category: 'Living Room', subcategory: 'TV Units', shortDesc: 'Wall-mounted TV unit with cable management and shelves.', description: '<p>Sleek wall-mounted design accommodates TVs up to 65 inches. Built-in cable management, tempered glass shelves, and LED backlighting option. MDF construction with premium laminate finish.</p>', price: 68000, originalPrice: 75000, material: 'MDF', colors: [{ name: 'White Oak', hex: '#d4c4a8' }, { name: 'Matte Black', hex: '#1a1a1a' }], dimensions: { width: 72, height: 20, depth: 16, unit: 'inches' }, weight: '35 kg', rating: 4.5, reviewCount: 28, badge: null, seed: 'tvunit1', inStock: true, stockCount: 15, isNew: false, isFeatured: true, isOnSale: true, tags: ['tv unit', 'entertainment', 'living room'], sku: 'WM-LR-TV-003' },
  { id: 4, slug: 'artisan-floating-shelves', name: 'Artisan Floating Shelves Set', category: 'Living Room', subcategory: 'Shelves', shortDesc: 'Set of 3 solid oak floating shelves with hidden brackets.', description: '<p>Minimalist floating shelf set crafted from solid oak. Hidden bracket system creates a clean, floating appearance. Each shelf supports up to 15 kg. Perfect for displaying books, plants, and decor.</p>', price: 22000, originalPrice: 22000, material: 'Oak', colors: [{ name: 'Natural Oak', hex: '#c4a35a' }, { name: 'Dark Oak', hex: '#6b4423' }], dimensions: { width: 36, height: 2, depth: 8, unit: 'inches' }, weight: '8 kg', rating: 4.7, reviewCount: 19, badge: 'Top Rated', seed: 'shelf1', inStock: true, stockCount: 30, isNew: false, isFeatured: false, isOnSale: false, tags: ['shelves', 'storage', 'oak'], sku: 'WM-LR-SH-004' },
  { id: 5, slug: 'comfort-lounge-chair', name: 'Comfort Lounge Chair', category: 'Living Room', subcategory: 'Sofas', shortDesc: 'Accent lounge chair with teak frame and premium fabric.', description: '<p>Elegant accent chair featuring a solid teak frame and plush cushioning. Ergonomic design supports extended reading sessions. Available in multiple fabric options to match your decor.</p>', price: 72000, originalPrice: 85000, material: 'Teak', colors: [{ name: 'Teak Natural', hex: '#a67c00' }, { name: 'Navy Blue', hex: '#1a2744' }], dimensions: { width: 32, height: 38, depth: 34, unit: 'inches' }, weight: '22 kg', rating: 4.4, reviewCount: 15, badge: 'Sale', seed: 'lounge1', inStock: true, stockCount: 8, isNew: true, isFeatured: false, isOnSale: true, tags: ['chair', 'accent', 'teak'], sku: 'WM-LR-CH-005' },
  { id: 6, slug: 'corner-display-shelf', name: 'Corner Display Shelf', category: 'Living Room', subcategory: 'Shelves', shortDesc: 'Five-tier corner shelf unit in Sheesham wood.', description: '<p>Space-saving corner design maximizes unused room corners. Five open shelves for books, plants, and collectibles. Hand-finished Sheesham wood with natural grain patterns.</p>', price: 38000, originalPrice: 38000, material: 'Sheesham', colors: [{ name: 'Sheesham Natural', hex: '#6b3a2a' }], dimensions: { width: 24, height: 72, depth: 24, unit: 'inches' }, weight: '18 kg', rating: 4.3, reviewCount: 11, badge: null, seed: 'corner1', inStock: true, stockCount: 14, isNew: false, isFeatured: false, isOnSale: false, tags: ['shelf', 'corner', 'display'], sku: 'WM-LR-CS-006' },
  { id: 7, slug: 'minimalist-media-console', name: 'Minimalist Media Console', category: 'Living Room', subcategory: 'TV Units', shortDesc: 'Low-profile media console with sliding doors.', description: '<p>Contemporary low-profile design with sliding barn doors concealing storage compartments. Solid pine construction with iron hardware accents. Fits TVs up to 55 inches.</p>', price: 55000, originalPrice: 62000, material: 'Pine', colors: [{ name: 'Whitewash Pine', hex: '#e8e0d0' }, { name: 'Rustic Brown', hex: '#5c4033' }], dimensions: { width: 60, height: 24, depth: 18, unit: 'inches' }, weight: '30 kg', rating: 4.5, reviewCount: 22, badge: null, seed: 'media1', inStock: true, stockCount: 10, isNew: true, isFeatured: false, isOnSale: true, tags: ['media console', 'tv', 'pine'], sku: 'WM-LR-MC-007' },
  { id: 8, slug: 'nesting-coffee-tables', name: 'Nesting Coffee Tables', category: 'Living Room', subcategory: 'Coffee Tables', shortDesc: 'Set of 2 nesting tables in acacia wood.', description: '<p>Versatile nesting table set tucks neatly together when not in use. Acacia wood top with powder-coated steel legs. Ideal for small apartments and flexible entertaining.</p>', price: 32000, originalPrice: 32000, material: 'Acrylic', colors: [{ name: 'Acacia Natural', hex: '#b8860b' }], dimensions: { width: 40, height: 18, depth: 20, unit: 'inches' }, weight: '15 kg', rating: 4.2, reviewCount: 9, badge: 'New', seed: 'nesting1', inStock: true, stockCount: 18, isNew: true, isFeatured: false, isOnSale: false, tags: ['nesting tables', 'coffee table', 'compact'], sku: 'WM-LR-NT-008' },
  { id: 9, slug: 'royal-teak-wardrobe', name: 'Royal Teak Wardrobe', category: 'Bedroom', subcategory: 'Wardrobes', shortDesc: 'Four-door wardrobe with mirror and internal organizers.', description: '<p>Spacious four-door wardrobe crafted from solid teak. Features full-length mirror, hanging rails, adjustable shelves, and velvet-lined jewelry drawer. Soft-close hinges throughout.</p>', price: 245000, originalPrice: 280000, material: 'Teak', colors: [{ name: 'Teak Honey', hex: '#c19a6b' }, { name: 'Dark Teak', hex: '#5c4033' }], dimensions: { width: 80, height: 84, depth: 24, unit: 'inches' }, weight: '120 kg', rating: 4.9, reviewCount: 38, badge: 'Bestseller', seed: 'wardrobe1', inStock: true, stockCount: 6, isNew: false, isFeatured: true, isOnSale: true, tags: ['wardrobe', 'bedroom', 'teak', 'storage'], sku: 'WM-BR-WD-009' },
  { id: 10, slug: 'serenity-platform-bed', name: 'Serenity Platform Bed', category: 'Bedroom', subcategory: 'Beds', shortDesc: 'King-size platform bed with upholstered headboard.', description: '<p>Modern platform bed with button-tufted upholstered headboard. Solid Sheesham wood frame with center support beam. No box spring needed. Under-bed clearance for storage bins.</p>', price: 165000, originalPrice: 190000, material: 'Sheesham', colors: [{ name: 'Walnut', hex: '#5c3d2e' }, { name: 'Grey Fabric', hex: '#808080' }], dimensions: { width: 76, height: 48, depth: 84, unit: 'inches' }, weight: '85 kg', rating: 4.7, reviewCount: 42, badge: 'Sale', seed: 'bed1', inStock: true, stockCount: 8, isNew: false, isFeatured: true, isOnSale: true, tags: ['bed', 'king', 'platform', 'bedroom'], sku: 'WM-BR-BD-010' },
  { id: 11, slug: 'classic-6-drawer-dresser', name: 'Classic 6-Drawer Dresser', category: 'Bedroom', subcategory: 'Dressers', shortDesc: 'Six-drawer dresser with soft-close dovetail drawers.', description: '<p>Timeless six-drawer dresser with hand-cut dovetail joints and soft-close drawer slides. Walnut veneer over engineered wood. Antique brass hardware adds elegant detail.</p>', price: 89000, originalPrice: 95000, material: 'Walnut', colors: [{ name: 'Walnut Brown', hex: '#5c3d2e' }], dimensions: { width: 60, height: 34, depth: 18, unit: 'inches' }, weight: '55 kg', rating: 4.6, reviewCount: 24, badge: null, seed: 'dresser1', inStock: true, stockCount: 11, isNew: false, isFeatured: false, isOnSale: true, tags: ['dresser', 'bedroom', 'storage'], sku: 'WM-BR-DR-011' },
  { id: 12, slug: 'bedside-nightstand-pair', name: 'Bedside Nightstand Pair', category: 'Bedroom', subcategory: 'Nightstands', shortDesc: 'Set of 2 matching nightstands with USB charging port.', description: '<p>Matching pair of nightstands with drawer storage and open shelf. Built-in USB charging port and wireless charging pad on top surface. Solid oak construction.</p>', price: 42000, originalPrice: 48000, material: 'Oak', colors: [{ name: 'Natural Oak', hex: '#c4a35a' }, { name: 'White Wash', hex: '#f5f0e8' }], dimensions: { width: 20, height: 24, depth: 16, unit: 'inches' }, weight: '12 kg each', rating: 4.5, reviewCount: 31, badge: 'Top Rated', seed: 'nightstand1', inStock: true, stockCount: 16, isNew: false, isFeatured: false, isOnSale: true, tags: ['nightstand', 'bedroom', 'pair'], sku: 'WM-BR-NS-012' },
  { id: 13, slug: 'queen-sleigh-bed', name: 'Queen Sleigh Bed', category: 'Bedroom', subcategory: 'Beds', shortDesc: 'Elegant queen sleigh bed in solid pine.', description: '<p>Classic sleigh bed design with curved headboard and footboard. Solid pine construction with rich stain finish. Includes wooden slat support system for mattress.</p>', price: 125000, originalPrice: 125000, material: 'Pine', colors: [{ name: 'Cherry Stain', hex: '#6b1c1c' }, { name: 'Espresso', hex: '#2c1810' }], dimensions: { width: 64, height: 52, depth: 86, unit: 'inches' }, weight: '70 kg', rating: 4.4, reviewCount: 18, badge: null, seed: 'sleigh1', inStock: true, stockCount: 7, isNew: false, isFeatured: false, isOnSale: false, tags: ['bed', 'queen', 'sleigh'], sku: 'WM-BR-SB-013' },
  { id: 14, slug: 'sliding-door-wardrobe', name: 'Sliding Door Wardrobe', category: 'Bedroom', subcategory: 'Wardrobes', shortDesc: 'Two-door sliding wardrobe with mirrored panels.', description: '<p>Space-efficient sliding door wardrobe with full mirrored panels. Internal configuration includes double hanging rail, shelves, and shoe rack. MDF with premium laminate finish.</p>', price: 135000, originalPrice: 150000, material: 'MDF', colors: [{ name: 'White', hex: '#ffffff' }, { name: 'Grey Oak', hex: '#9e9e9e' }], dimensions: { width: 72, height: 80, depth: 22, unit: 'inches' }, weight: '90 kg', rating: 4.3, reviewCount: 20, badge: 'Sale', seed: 'sliding1', inStock: true, stockCount: 9, isNew: true, isFeatured: false, isOnSale: true, tags: ['wardrobe', 'sliding', 'mirror'], sku: 'WM-BR-SW-014' },
  { id: 15, slug: 'vanity-dressing-table', name: 'Vanity Dressing Table', category: 'Bedroom', subcategory: 'Dressers', shortDesc: 'Vanity table with tri-fold mirror and stool.', description: '<p>Complete vanity set with tri-fold mirror, spacious drawer, and matching upholstered stool. Sheesham wood frame with velvet-lined top drawer for jewelry storage.</p>', price: 65000, originalPrice: 65000, material: 'Sheesham', colors: [{ name: 'Rosewood', hex: '#65000b' }, { name: 'Ivory', hex: '#fffff0' }], dimensions: { width: 42, height: 30, depth: 18, unit: 'inches' }, weight: '25 kg', rating: 4.6, reviewCount: 14, badge: 'New', seed: 'vanity1', inStock: true, stockCount: 12, isNew: true, isFeatured: false, isOnSale: false, tags: ['vanity', 'dressing table', 'bedroom'], sku: 'WM-BR-VT-015' },
  { id: 16, slug: 'floating-nightstand', name: 'Floating Nightstand', category: 'Bedroom', subcategory: 'Nightstands', shortDesc: 'Wall-mounted floating nightstand with drawer.', description: '<p>Modern wall-mounted design frees floor space. Single drawer with push-to-open mechanism. Solid walnut construction with natural oil finish.</p>', price: 18000, originalPrice: 18000, material: 'Walnut', colors: [{ name: 'Walnut', hex: '#5c3d2e' }], dimensions: { width: 18, height: 12, depth: 14, unit: 'inches' }, weight: '5 kg', rating: 4.2, reviewCount: 8, badge: null, seed: 'floatns1', inStock: true, stockCount: 25, isNew: false, isFeatured: false, isOnSale: false, tags: ['nightstand', 'floating', 'wall mount'], sku: 'WM-BR-FN-016' },
  { id: 17, slug: 'walnut-dining-table-set', name: 'Walnut Dining Table Set', category: 'Dining', subcategory: 'Tables', shortDesc: '6-seater dining table with matching chairs.', description: '<p>Elegant 6-seater dining set featuring a solid walnut table with butterfly leaf extension and six upholstered dining chairs. Seats 8 when extended. Hand-rubbed oil finish.</p>', price: 285000, originalPrice: 320000, material: 'Walnut', colors: [{ name: 'Walnut', hex: '#5c3d2e' }, { name: 'Cream Upholstery', hex: '#f5f5dc' }], dimensions: { width: 72, height: 30, depth: 40, unit: 'inches' }, weight: '110 kg', rating: 4.8, reviewCount: 35, badge: 'Bestseller', seed: 'dining1', inStock: true, stockCount: 5, isNew: false, isFeatured: true, isOnSale: true, tags: ['dining table', 'set', 'walnut'], sku: 'WM-DN-DT-017' },
  { id: 18, slug: 'farmhouse-dining-chairs', name: 'Farmhouse Dining Chairs Set of 4', category: 'Dining', subcategory: 'Chairs', shortDesc: 'Set of 4 cross-back dining chairs in oak.', description: '<p>Classic farmhouse cross-back design in solid oak. Contoured seat for comfort during long dinners. Stackable for easy storage. Sold as set of 4.</p>', price: 72000, originalPrice: 80000, material: 'Oak', colors: [{ name: 'Natural Oak', hex: '#c4a35a' }, { name: 'Distressed White', hex: '#f0ebe0' }], dimensions: { width: 18, height: 38, depth: 20, unit: 'inches' }, weight: '8 kg each', rating: 4.5, reviewCount: 21, badge: 'Sale', seed: 'dchair1', inStock: true, stockCount: 10, isNew: false, isFeatured: false, isOnSale: true, tags: ['dining chairs', 'oak', 'farmhouse'], sku: 'WM-DN-DC-018' },
  { id: 19, slug: 'glass-top-dining-table', name: 'Glass Top Dining Table', category: 'Dining', subcategory: 'Tables', shortDesc: 'Modern glass top dining table for 4.', description: '<p>Contemporary design with tempered glass top and solid Sheesham wood base. Seats 4 comfortably. Easy to clean surface ideal for daily family meals.</p>', price: 95000, originalPrice: 95000, material: 'Sheesham', colors: [{ name: 'Clear Glass / Sheesham', hex: '#6b3a2a' }], dimensions: { width: 55, height: 30, depth: 32, unit: 'inches' }, weight: '45 kg', rating: 4.4, reviewCount: 16, badge: null, seed: 'glassdt1', inStock: true, stockCount: 8, isNew: true, isFeatured: false, isOnSale: false, tags: ['dining table', 'glass', 'modern'], sku: 'WM-DN-GT-019' },
  { id: 20, slug: 'buffet-sideboard-cabinet', name: 'Buffet Sideboard Cabinet', category: 'Dining', subcategory: 'Cabinets', shortDesc: 'Three-door buffet cabinet with wine rack.', description: '<p>Stunning buffet sideboard with three cabinet doors, three drawers, and built-in wine rack. Teak wood with hand-carved details. Perfect for dining room storage and display.</p>', price: 118000, originalPrice: 135000, material: 'Teak', colors: [{ name: 'Teak Natural', hex: '#a67c00' }], dimensions: { width: 60, height: 36, depth: 18, unit: 'inches' }, weight: '65 kg', rating: 4.7, reviewCount: 19, badge: null, seed: 'buffet1', inStock: true, stockCount: 6, isNew: false, isFeatured: false, isOnSale: true, tags: ['buffet', 'sideboard', 'cabinet'], sku: 'WM-DN-BF-020' },
  { id: 21, slug: 'bar-stool-set', name: 'Bar Stool Set of 2', category: 'Dining', subcategory: 'Chairs', shortDesc: 'Counter-height bar stools with back support.', description: '<p>Stylish counter-height bar stools with padded seat and backrest. Solid iron frame with powder-coated finish. Footrest for comfort. Set of 2.</p>', price: 38000, originalPrice: 38000, material: 'Pine', colors: [{ name: 'Black Frame / Brown Seat', hex: '#1a1a1a' }], dimensions: { width: 16, height: 30, depth: 16, unit: 'inches' }, weight: '6 kg each', rating: 4.3, reviewCount: 12, badge: 'New', seed: 'barstool1', inStock: true, stockCount: 15, isNew: true, isFeatured: false, isOnSale: false, tags: ['bar stool', 'counter height'], sku: 'WM-DN-BS-021' },
  { id: 22, slug: 'executive-oak-desk', name: 'Executive Oak Desk', category: 'Office', subcategory: 'Desks', shortDesc: 'Large executive desk with file drawers and cable management.', description: '<p>Professional executive desk with three file drawers, keyboard tray, and built-in cable management grommets. Solid oak top with steel leg frame. Ample workspace for dual monitors.</p>', price: 145000, originalPrice: 165000, material: 'Oak', colors: [{ name: 'Natural Oak', hex: '#c4a35a' }, { name: 'Espresso', hex: '#2c1810' }], dimensions: { width: 60, height: 30, depth: 30, unit: 'inches' }, weight: '55 kg', rating: 4.8, reviewCount: 29, badge: 'Bestseller', seed: 'desk1', inStock: true, stockCount: 7, isNew: false, isFeatured: true, isOnSale: true, tags: ['desk', 'office', 'executive', 'oak'], sku: 'WM-OF-DK-022' },
  { id: 23, slug: 'ergonomic-office-chair', name: 'Ergonomic Office Chair', category: 'Office', subcategory: 'Chairs', shortDesc: 'High-back ergonomic chair with lumbar support.', description: '<p>Premium ergonomic office chair with adjustable lumbar support, armrests, and seat height. Breathable mesh back with padded seat. 360-degree swivel with smooth-rolling casters.</p>', price: 52000, originalPrice: 60000, material: 'Acrylic', colors: [{ name: 'Black', hex: '#1a1a1a' }, { name: 'Grey', hex: '#808080' }], dimensions: { width: 26, height: 48, depth: 26, unit: 'inches' }, weight: '18 kg', rating: 4.6, reviewCount: 44, badge: 'Top Rated', seed: 'officechair1', inStock: true, stockCount: 20, isNew: false, isFeatured: true, isOnSale: true, tags: ['office chair', 'ergonomic'], sku: 'WM-OF-CH-023' },
  { id: 24, slug: 'classic-oak-bookshelf', name: 'Classic Oak Bookshelf', category: 'Office', subcategory: 'Bookshelves', shortDesc: 'Five-tier open bookshelf in solid oak.', description: '<p>Sturdy five-tier bookshelf with adjustable shelf heights. Solid oak construction supports heavy books and decor. Anti-tip wall anchor included for safety.</p>', price: 48000, originalPrice: 48000, material: 'Oak', colors: [{ name: 'Natural Oak', hex: '#c4a35a' }], dimensions: { width: 36, height: 72, depth: 12, unit: 'inches' }, weight: '32 kg', rating: 4.5, reviewCount: 17, badge: null, seed: 'bookshelf1', inStock: true, stockCount: 13, isNew: false, isFeatured: false, isOnSale: false, tags: ['bookshelf', 'office', 'oak'], sku: 'WM-OF-BS-024' },
  { id: 25, slug: '2-drawer-filing-cabinet', name: '2-Drawer Filing Cabinet', category: 'Office', subcategory: 'Filing Cabinets', shortDesc: 'Lockable 2-drawer filing cabinet with wheels.', description: '<p>Commercial-grade filing cabinet with two full-extension drawers fitting letter and legal files. Central lock secures both drawers. Rolling casters with locking mechanism.</p>', price: 35000, originalPrice: 40000, material: 'MDF', colors: [{ name: 'Matte Black', hex: '#1a1a1a' }, { name: 'White', hex: '#ffffff' }], dimensions: { width: 18, height: 28, depth: 22, unit: 'inches' }, weight: '25 kg', rating: 4.3, reviewCount: 13, badge: 'Sale', seed: 'filing1', inStock: true, stockCount: 11, isNew: false, isFeatured: false, isOnSale: true, tags: ['filing cabinet', 'office', 'storage'], sku: 'WM-OF-FC-025' },
  { id: 26, slug: 'standing-desk-converter', name: 'Standing Desk Converter', category: 'Office', subcategory: 'Desks', shortDesc: 'Adjustable standing desk converter for dual monitors.', description: '<p>Transform any desk into a standing workstation. Gas-spring lift mechanism adjusts from 6 to 19 inches. Holds dual monitors up to 27 inches. Spacious keyboard tray included.</p>', price: 42000, originalPrice: 42000, material: 'MDF', colors: [{ name: 'Black', hex: '#1a1a1a' }], dimensions: { width: 36, height: 19, depth: 24, unit: 'inches' }, weight: '15 kg', rating: 4.4, reviewCount: 26, badge: 'New', seed: 'standing1', inStock: true, stockCount: 14, isNew: true, isFeatured: false, isOnSale: false, tags: ['standing desk', 'converter', 'ergonomic'], sku: 'WM-OF-SD-026' },
  { id: 27, slug: 'teak-outdoor-dining-set', name: 'Teak Outdoor Dining Set', category: 'Outdoor', subcategory: 'Tables', shortDesc: 'Outdoor dining set with table and 4 chairs.', description: '<p>Weather-resistant grade-A teak outdoor dining set. Table with umbrella hole and four stackable chairs. Natural teak oil finish protects against UV and moisture. Perfect for patios and terraces.</p>', price: 175000, originalPrice: 195000, material: 'Teak', colors: [{ name: 'Natural Teak', hex: '#a67c00' }], dimensions: { width: 60, height: 30, depth: 36, unit: 'inches' }, weight: '75 kg', rating: 4.7, reviewCount: 23, badge: 'Sale', seed: 'outdoor1', inStock: true, stockCount: 4, isNew: false, isFeatured: true, isOnSale: true, tags: ['outdoor', 'dining set', 'teak', 'patio'], sku: 'WM-OD-DS-027' },
  { id: 28, slug: 'adirondack-outdoor-chair', name: 'Adirondack Outdoor Chair', category: 'Outdoor', subcategory: 'Chairs', shortDesc: 'Classic Adirondack chair in weather-resistant acacia.', description: '<p>Iconic Adirondack design in sustainably sourced acacia wood. Wide armrests, contoured seat, and reclined back for ultimate relaxation. Pre-treated for outdoor use.</p>', price: 28000, originalPrice: 28000, material: 'Acrylic', colors: [{ name: 'Natural Wood', hex: '#b8860b' }, { name: 'White Wash', hex: '#f5f0e8' }], dimensions: { width: 30, height: 36, depth: 34, unit: 'inches' }, weight: '12 kg', rating: 4.5, reviewCount: 16, badge: null, seed: 'adirondack1', inStock: true, stockCount: 12, isNew: false, isFeatured: false, isOnSale: false, tags: ['outdoor chair', 'adirondack', 'patio'], sku: 'WM-OD-AC-028' },
  { id: 29, slug: 'adventure-kids-bunk-bed', name: 'Adventure Kids Bunk Bed', category: 'Kids', subcategory: 'Beds', shortDesc: 'Twin bunk bed with safety rails and storage drawers.', description: '<p>Sturdy twin bunk bed with full safety rails, integrated ladder, and two under-bed storage drawers. Solid pine construction with non-toxic finish. Converts to two single beds.</p>', price: 98000, originalPrice: 110000, material: 'Pine', colors: [{ name: 'Natural Pine', hex: '#d4a574' }, { name: 'White', hex: '#ffffff' }], dimensions: { width: 42, height: 65, depth: 80, unit: 'inches' }, weight: '60 kg', rating: 4.8, reviewCount: 33, badge: 'Bestseller', seed: 'bunk1', inStock: true, stockCount: 6, isNew: false, isFeatured: true, isOnSale: true, tags: ['bunk bed', 'kids', 'twin'], sku: 'WM-KD-BB-029' },
  { id: 30, slug: 'kids-study-desk-set', name: 'Kids Study Desk Set', category: 'Kids', subcategory: 'Study Desks', shortDesc: 'Adjustable height study desk with bookshelf and chair.', description: '<p>Ergonomic study desk set with height-adjustable desktop, built-in bookshelf, and matching chair. Tilting desktop for reading and writing. Cable hole for lamp and devices.</p>', price: 45000, originalPrice: 45000, material: 'MDF', colors: [{ name: 'Blue', hex: '#4169e1' }, { name: 'Pink', hex: '#ffb6c1' }, { name: 'White', hex: '#ffffff' }], dimensions: { width: 40, height: 30, depth: 24, unit: 'inches' }, weight: '22 kg', rating: 4.6, reviewCount: 27, badge: 'Top Rated', seed: 'studydesk1', inStock: true, stockCount: 15, isNew: true, isFeatured: false, isOnSale: false, tags: ['study desk', 'kids', 'adjustable'], sku: 'WM-KD-SD-030' },
  { id: 31, slug: 'toy-storage-organizer', name: 'Toy Storage Organizer', category: 'Kids', subcategory: 'Toy Storage', shortDesc: '12-bin toy organizer with labeled compartments.', description: '<p>Colorful 12-bin toy storage unit keeps playrooms organized. Removable fabric bins in assorted colors. Sturdy MDF frame with rounded corners for safety. Easy assembly.</p>', price: 22000, originalPrice: 25000, material: 'MDF', colors: [{ name: 'Multi-Color Bins', hex: '#ff6b6b' }], dimensions: { width: 36, height: 36, depth: 12, unit: 'inches' }, weight: '10 kg', rating: 4.4, reviewCount: 19, badge: 'Sale', seed: 'toystorage1', inStock: true, stockCount: 22, isNew: false, isFeatured: false, isOnSale: true, tags: ['toy storage', 'kids', 'organizer'], sku: 'WM-KD-TS-031' },
  { id: 32, slug: 'kids-single-bed', name: 'Kids Single Bed with Storage', category: 'Kids', subcategory: 'Beds', shortDesc: 'Single bed with pull-out trundle and headboard shelf.', description: '<p>Space-saving single bed with pull-out trundle for sleepovers. Built-in headboard shelf for books and nightlight. Solid Sheesham wood with playful yet timeless design.</p>', price: 68000, originalPrice: 68000, material: 'Sheesham', colors: [{ name: 'Natural Wood', hex: '#6b3a2a' }, { name: 'White Wash', hex: '#f5f0e8' }], dimensions: { width: 40, height: 40, depth: 78, unit: 'inches' }, weight: '40 kg', rating: 4.5, reviewCount: 11, badge: 'New', seed: 'kidsbed1', inStock: true, stockCount: 9, isNew: true, isFeatured: false, isOnSale: false, tags: ['kids bed', 'single', 'trundle'], sku: 'WM-KD-BD-032' },
];

const rawProducts = productsData.map((p) => ({
  ...p,
  currency: 'PKR',
  discount: p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0,
  images: getProductImages(p),
  reviews: makeReviews(p.name, p.seed),
}));

// Validate all products on load
const validateProducts = (prods) => {
  return prods.map((p, index) => ({
    id: p.id != null ? String(p.id) : String(index + 1),
    slug: p.slug || p.name?.toLowerCase().replace(/\s+/g, '-') || `product-${index}`,
    name: p.name || 'Unnamed Product',
    category: p.category || 'Uncategorized',
    subcategory: p.subcategory || '',
    shortDesc: p.shortDesc || '',
    description: p.description || '',
    price: Number(p.price) || 0,
    originalPrice: Number(p.originalPrice) || Number(p.price) || 0,
    discount: p.discount || 0,
    currency: 'PKR',
    material: p.material || '',
    colors: Array.isArray(p.colors) ? p.colors : [],
    dimensions: p.dimensions || { width: 0, height: 0, depth: 0, unit: 'inches' },
    weight: p.weight || '',
    rating: Number(p.rating) || 0,
    reviewCount: Number(p.reviewCount) || 0,
    badge: p.badge || null,
    images: Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'],
    inStock: p.inStock !== undefined ? p.inStock : true,
    stockCount: p.stockCount || 10,
    isNew: p.isNew || false,
    isFeatured: p.isFeatured || false,
    isOnSale: p.isOnSale || false,
    tags: Array.isArray(p.tags) ? p.tags : [],
    sku: p.sku || `WM-${String(index + 1).padStart(4, '0')}`,
    reviews: Array.isArray(p.reviews) ? p.reviews : [],
    seed: p.seed || `seed-${index}`,
  }));
};

export const products = validateProducts(rawProducts);

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);

export const getProductById = (id) => products.find((p) => p.id === id);

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);

export const getNewArrivals = () => products.filter((p) => p.isNew);

export const getRelatedProducts = (product, limit = 4) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);

export const materials = ['Sheesham', 'Teak', 'MDF', 'Walnut', 'Oak', 'Pine', 'Acrylic'];

export default products;
