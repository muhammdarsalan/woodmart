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
  bedroom: {
    'beds': 'Beds & Bed Frames',
    'dressers': 'Dressers & Mirrors',
    'side-tables': 'Side Tables & Nightstands',
  },
  sofas: {
    'three-seater': 'Three-Seater Sofas',
    'l-shaped': 'L-Shaped Sofas',
    'sofa-sets': 'Sofa Sets',
  },
  'coffee-tables': {
    'lift-top': 'Lift-Top Coffee Tables',
    'storage': 'Storage Coffee Tables',
    'designer': 'Designer Coffee Tables',
  },
  'dining-tables': {
    '4-seater': '4-Seater Dining',
    '6-seater': '6-Seater Dining',
    '8-seater': '8-Seater Dining',
  },
  wardrobes: {
    'sliding': 'Sliding Wardrobes',
    'hinged': 'Hinged Wardrobes',
    'walk-in': 'Walk-in Wardrobes',
  },
  'coffee-chairs': {
    'lounge': 'Lounge Chairs',
    'accent': 'Accent Chairs',
    'recliners': 'Recliners',
  },
};

export const getSubcategoryName = (categorySlug, subcategorySlug) => {
  return subcategoryMapping[categorySlug]?.[subcategorySlug] || subcategorySlug;
};

// ALL available bed images (52 files)
const BED_IMAGES = ["bed-1.jpeg", "bed-13.jpeg", "bed-15.jpeg", "bed-16.jpeg", "bed-17.jpeg", "bed-18.jpeg", "bed-19.jpeg", "bed-2.jpeg", "bed-20.jpeg", "bed-21.jpeg", "bed-22.2.jpeg", "bed-22.jpeg", "bed-23.jpeg", "bed-24.jpeg", "bed-25.jpeg", "bed-26.jpeg", "bed-27.jpeg", "bed-28.jpeg", "bed-29.jpeg", "bed-3.jpeg", "bed-30.jpeg", "bed-31.jpeg", "bed-32.jpeg", "bed-33.jpeg", "bed-34.jpeg", "bed-35.jpeg", "bed-36.jpeg", "bed-37.jpeg", "bed-38.jpeg", "bed-39.jpeg", "bed-4.jpeg", "bed-40.jpeg", "bed-42.jpeg", "bed-43.jpeg", "bed-44.jpeg", "bed-45.jpeg", "bed-46.jpeg", "bed-48.jpeg", "bed-5.jpeg", "bed-50.jpeg", "bed-51.jpeg", "bed-52.jpeg", "bed-53.jpeg", "bed-54.jpeg", "bed-55.jpeg", "bed-56.jpeg", "bed-57.jpeg", "bed-6.jpeg", "bed-7.jpeg", "bed-8.jpeg", "bed-9.jpeg", "bed.jpeg"];

// ALL available sofa images (47 files)
const SOFA_IMAGES = ["sofa-1.jpeg", "sofa-10.jpeg", "sofa-11.jpeg", "sofa-12.jpeg", "sofa-13.jpeg", "sofa-14.jpeg", "sofa-15.jpeg", "sofa-16.jpeg", "sofa-17.jpeg", "sofa-18.jpeg", "sofa-19.jpeg", "sofa-2.jpeg", "sofa-20.jpeg", "sofa-21.jpeg", "sofa-22.jpeg", "sofa-23.jpeg", "sofa-24.jpeg", "sofa-25.jpeg", "sofa-26.jpeg", "sofa-27.jpeg", "sofa-29.jpeg", "sofa-3.jpeg", "sofa-4.jpeg", "sofa-40.jpeg", "sofa-43.jpeg", "sofa-44.jpeg", "sofa-45.jpeg", "sofa-46.jpeg", "sofa-47.jpeg", "sofa-48.jpeg", "sofa-49.jpeg", "sofa-5.jpeg", "sofa-50.jpeg", "sofa-51.jpeg", "sofa-52.2.jpeg", "sofa-52.jpeg", "sofa-53.jpeg", "sofa-54.jpeg", "sofa-57.jpeg", "sofa-58.jpeg", "sofa-59.jpeg", "sofa-6.jpeg", "sofa-60.jpeg", "sofa-64.jpeg", "sofa-7.jpeg", "sofa-8.jpeg", "sofa-9.jpeg"];

const imageLibrary = {
  beds: BED_IMAGES.map((n) => `/images/products/beds/${n}`),
  sofas: SOFA_IMAGES.map((n) => `/images/products/sofas/${n}`),
  unsplash: {
    coffeeTable: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1200&q=85&auto=format&fit=crop',
    dining: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1200&q=85&auto=format&fit=crop',
    wardrobe: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop',
    chair: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop',
  },
};

let bedIndex = 0;
let sofaIndex = 0;

function getProductImages(product) {
  const { category, subcategory } = product;
  let images = [];

  if (category === 'Bedroom' && subcategory === 'Beds & Bed Frames') {
    const bedCount = imageLibrary.beds.length;
    images = [
      imageLibrary.beds[(bedIndex * 2) % bedCount],
      imageLibrary.beds[(bedIndex * 2 + 13) % bedCount],
      imageLibrary.beds[(bedIndex * 2 + 27) % bedCount],
      imageLibrary.beds[(bedIndex * 2 + 41) % bedCount],
    ];
    bedIndex++;
  } else if (category === 'Bedroom' && subcategory === 'Dressers & Mirrors') {
    const bedCount = imageLibrary.beds.length;
    const offset = 5;
    images = [
      imageLibrary.beds[(bedIndex + offset) % bedCount],
      imageLibrary.beds[(bedIndex + offset + 11) % bedCount],
      imageLibrary.beds[(bedIndex + offset + 23) % bedCount],
      imageLibrary.beds[(bedIndex + offset + 37) % bedCount],
    ];
    bedIndex++;
  } else if (category === 'Bedroom' && subcategory === 'Side Tables & Nightstands') {
    const bedCount = imageLibrary.beds.length;
    const offset = 17;
    images = [
      imageLibrary.beds[(bedIndex + offset) % bedCount],
      imageLibrary.beds[(bedIndex + offset + 7) % bedCount],
      imageLibrary.beds[(bedIndex + offset + 19) % bedCount],
      imageLibrary.beds[(bedIndex + offset + 31) % bedCount],
    ];
    bedIndex++;
  } else if (category === 'Sofas') {
    const sofaCount = imageLibrary.sofas.length;
    images = [
      imageLibrary.sofas[(sofaIndex * 2) % sofaCount],
      imageLibrary.sofas[(sofaIndex * 2 + 9) % sofaCount],
      imageLibrary.sofas[(sofaIndex * 2 + 19) % sofaCount],
      imageLibrary.sofas[(sofaIndex * 2 + 31) % sofaCount],
    ];
    sofaIndex++;
  } else if (category === 'Coffee Chairs') {
    const sofaCount = imageLibrary.sofas.length;
    const offset = 11;
    images = [
      imageLibrary.sofas[(sofaIndex + offset) % sofaCount],
      imageLibrary.sofas[(sofaIndex + offset + 7) % sofaCount],
      imageLibrary.sofas[(sofaIndex + offset + 17) % sofaCount],
      imageLibrary.sofas[(sofaIndex + offset + 29) % sofaCount],
    ];
    sofaIndex++;
  } else if (category === 'Coffee Tables') {
    images = [
      imageLibrary.unsplash.coffeeTable,
      imageLibrary.unsplash.coffeeTable,
      imageLibrary.unsplash.coffeeTable,
      imageLibrary.unsplash.coffeeTable,
    ];
  } else if (category === 'Dining Tables') {
    images = [
      imageLibrary.unsplash.dining,
      imageLibrary.unsplash.dining,
      imageLibrary.unsplash.dining,
      imageLibrary.unsplash.dining,
    ];
  } else if (category === 'Wardrobes') {
    images = [
      imageLibrary.unsplash.wardrobe,
      imageLibrary.unsplash.wardrobe,
      imageLibrary.unsplash.wardrobe,
      imageLibrary.unsplash.wardrobe,
    ];
  } else {
    images = [
      imageLibrary.unsplash.chair,
      imageLibrary.unsplash.chair,
      imageLibrary.unsplash.chair,
      imageLibrary.unsplash.chair,
    ];
  }

  return images.length === 4 ? images : [images[0], images[0], images[0], images[0]];
}

const productsData = [
    { name: 'Royal Sheesham King Bed', material: 'Sheesham', color: 'Walnut Brown', price: 65000, originalPrice: 76700, badge: 'Bestseller', desc: 'Handcrafted king-size platform bed in solid Sheesham wood with upholstered headboard and under-bed storage.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Heritage Platform Bed', material: 'Teak', color: 'Natural Teak', price: 72300, originalPrice: 72300, badge: 'Sale', desc: 'Modern platform bed with button-tufted upholstered headboard, center support beam and storage drawers.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Classic Sleigh Bed', material: 'Walnut', color: 'Espresso', price: 79600, originalPrice: 79600, badge: 'New', desc: 'Elegant queen sleigh bed with curved headboard and footboard, hand-rubbed cherry finish.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Executive Storage Bed', material: 'Pine', color: 'Honey Oak', price: 86900, originalPrice: 102542, badge: 'Top Rated', desc: 'King-size bed with four spacious storage drawers, soft-close runners and brass hardware.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Modern Low-Profile Bed', material: 'Oak', color: 'Dark Walnut', price: 94200, originalPrice: 94200, badge: null, desc: 'Sleek low-profile platform bed with floating appearance, hidden LED ambient lighting.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Vintage Four-Poster Bed', material: 'Mahogany', color: 'Mahogany', price: 101500, originalPrice: 101500, badge: null, desc: 'Statement four-poster bed crafted from grade-A teak, hand-carved columns and ornate crown.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Industrial Metal-Wood Bed', material: 'MDF', color: 'Charcoal Grey', price: 108800, originalPrice: 128384, badge: 'Bestseller', desc: 'Industrial-style bed with solid pine planks and powder-coated steel frame.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Carved Headboard Bed', material: 'Pine & Steel', color: 'Cream', price: 116100, originalPrice: 116100, badge: 'New', desc: 'Hand-carved headboard with traditional Pakistani motifs, premium mahogany finish.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Linen Upholstered Bed', material: 'Mahogany', color: 'White Wash', price: 123400, originalPrice: 123400, badge: 'Sale', desc: 'Soft linen-upholstered bed with tufted headboard, hardwood internal frame.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Rustic Farmhouse Bed', material: 'Reclaimed Pine', color: 'Rustic Brown', price: 130700, originalPrice: 154226, badge: null, desc: 'Rustic farmhouse-style bed crafted from reclaimed pine with visible wood grain.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Velvet Tufted Bed', material: 'Pine & Linen', color: 'Antique White', price: 138000, originalPrice: 138000, badge: 'Bestseller', desc: 'Luxury velvet-tufted headboard bed with deep button detail and gold metal legs.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Compact Single Bed', material: 'Sheesham', color: 'Walnut Brown', price: 145300, originalPrice: 145300, badge: 'Sale', desc: 'Space-saving single bed ideal for small bedrooms, pull-out trundle option available.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Mirror-Panel Headboard Bed', material: 'Teak', color: 'Natural Teak', price: 152600, originalPrice: 180068, badge: 'New', desc: 'Modern bed with built-in mirror panels on headboard, soft-close drawers underneath.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Bunk Bed with Storage', material: 'Walnut', color: 'Espresso', price: 159900, originalPrice: 159900, badge: 'Top Rated', desc: 'Twin bunk bed with safety rails, integrated ladder and two under-bed storage drawers.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Trundle Day Bed', material: 'Pine', color: 'Honey Oak', price: 167200, originalPrice: 167200, badge: null, desc: 'Versatile day bed with pull-out trundle, perfect for guest rooms and sleepovers.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Mid-Century Modern Bed', material: 'Oak', color: 'Dark Walnut', price: 174500, originalPrice: 205910, badge: null, desc: 'Mid-century inspired bed with tapered legs, clean lines and walnut veneer.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Cane Headboard Bed', material: 'Mahogany', color: 'Mahogany', price: 181800, originalPrice: 181800, badge: 'Bestseller', desc: 'Hand-woven cane headboard with solid teak frame, classic colonial charm.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Storage Headboard Bed', material: 'MDF', color: 'Charcoal Grey', price: 189100, originalPrice: 189100, badge: 'New', desc: 'Smart bed with built-in shelving and cubbies in the headboard for books and lamps.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Art Deco Bed Frame', material: 'Pine & Steel', color: 'Cream', price: 196400, originalPrice: 231752, badge: 'Sale', desc: 'Art deco style bed with geometric headboard pattern, gold leaf accents.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Scandinavian Minimalist Bed', material: 'Mahogany', color: 'White Wash', price: 203700, originalPrice: 203700, badge: null, desc: 'Scandinavian-style bed in light oak with clean lines, slatted base, easy assembly.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Heavy-Duty Storage Bed', material: 'Reclaimed Pine', color: 'Rustic Brown', price: 211000, originalPrice: 211000, badge: 'Bestseller', desc: 'Extra-large storage bed with 6 drawers and hydraulic lift mechanism.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Wrought Iron Wood Bed', material: 'Pine & Linen', color: 'Antique White', price: 218300, originalPrice: 257594, badge: 'Sale', desc: 'Hand-forged wrought iron bed with solid pine slats, vintage Victorian style.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Bookshelf Headboard Bed', material: 'Sheesham', color: 'Walnut Brown', price: 225600, originalPrice: 225600, badge: 'New', desc: 'Bookshelf headboard with adjustable shelves and integrated reading lights.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'King Poster Bed', material: 'Teak', color: 'Natural Teak', price: 232900, originalPrice: 232900, badge: 'Top Rated', desc: 'Grand king poster bed in solid teak, traditional craftsmanship for master bedrooms.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Captain Storage Bed', material: 'Walnut', color: 'Espresso', price: 240200, originalPrice: 283436, badge: null, desc: 'Captain bed with 6 built-in storage drawers, perfect for kids and teens.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Modern Wingback Bed', material: 'Pine', color: 'Honey Oak', price: 247500, originalPrice: 247500, badge: null, desc: 'Tall wingback headboard in charcoal linen, solid wood frame, statement piece.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Classic Mahogany Bed', material: 'Oak', color: 'Dark Walnut', price: 254800, originalPrice: 254800, badge: 'Bestseller', desc: 'Hand-finished mahogany bed with traditional turned posts, premium quality.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Studio Apartment Bed', material: 'Mahogany', color: 'Mahogany', price: 262100, originalPrice: 309278, badge: 'New', desc: 'Compact studio bed with hidden storage and fold-down desk, perfect for small spaces.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Round Designer Bed', material: 'MDF', color: 'Charcoal Grey', price: 269400, originalPrice: 269400, badge: 'Sale', desc: 'Designer round bed with circular headboard, LED ambient lighting, premium upholstery.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Cottage Style Bed', material: 'Pine & Steel', color: 'Cream', price: 276700, originalPrice: 276700, badge: null, desc: 'Cottage-style bed in distressed white finish with turned posts and decorative finials.', category: 'Bedroom', subcategory: 'Beds & Bed Frames', subcategorySlug: 'beds' },
    { name: 'Mirrored Dresser Set', material: 'Mahogany', color: 'White Wash', price: 284000, originalPrice: 335120, badge: 'Bestseller', desc: 'Six-drawer dresser with matching mirror, hand-cut dovetail joints and soft-close slides.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'Classic Vanity Dresser', material: 'Reclaimed Pine', color: 'Rustic Brown', price: 291300, originalPrice: 291300, badge: 'Sale', desc: 'Traditional vanity dresser with tri-fold mirror and velvet-lined jewelry drawer.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'Modern 6-Drawer Dresser', material: 'Pine & Linen', color: 'Antique White', price: 298600, originalPrice: 298600, badge: 'New', desc: 'Sleek modern dresser with 6 spacious drawers, push-to-open mechanism and steel legs.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'Tallboy Dresser', material: 'Sheesham', color: 'Walnut Brown', price: 305900, originalPrice: 360962, badge: 'Top Rated', desc: 'Tall vertical dresser with 5 large drawers, perfect for small bedrooms.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'Wide Dresser with Mirror', material: 'Teak', color: 'Natural Teak', price: 313200, originalPrice: 313200, badge: null, desc: 'Wide 8-drawer dresser with matching mirror, brass hardware throughout.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'Vintage Dresser', material: 'Walnut', color: 'Espresso', price: 320500, originalPrice: 320500, badge: null, desc: 'Vintage-inspired dresser with hand-painted finish, hand-forged metal pulls.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'Sheesham Chest of Drawers', material: 'Pine', color: 'Honey Oak', price: 327800, originalPrice: 386804, badge: 'Bestseller', desc: 'Solid Sheesham chest with 4 deep drawers, mortise-and-tenon joinery.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'Industrial Dresser', material: 'Oak', color: 'Dark Walnut', price: 335100, originalPrice: 335100, badge: 'New', desc: 'Industrial-style dresser with metal corner brackets and riveted hardware.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'White Wash Dresser', material: 'Mahogany', color: 'Mahogany', price: 342400, originalPrice: 342400, badge: 'Sale', desc: 'Light white-wash dresser with 6 drawers, distressed finish for coastal charm.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'Antique Washstand', material: 'MDF', color: 'Charcoal Grey', price: 349700, originalPrice: 412646, badge: null, desc: 'Antique-style washstand with marble top and towel rails.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'Mid-Century Dresser', material: 'Pine & Steel', color: 'Cream', price: 357000, originalPrice: 357000, badge: 'Bestseller', desc: 'Mid-century modern dresser with splayed legs, 4 drawers, walnut veneer.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'Rattan Front Dresser', material: 'Mahogany', color: 'White Wash', price: 364300, originalPrice: 364300, badge: 'Sale', desc: 'Dresser with hand-woven rattan drawer fronts, solid oak frame.', category: 'Bedroom', subcategory: 'Dressers & Mirrors', subcategorySlug: 'dressers' },
    { name: 'Bedside Table Pair', material: 'Reclaimed Pine', color: 'Rustic Brown', price: 371600, originalPrice: 438488, badge: 'New', desc: 'Matching pair of nightstands with drawer and open shelf, USB charging port.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Modern Nightstand', material: 'Pine & Linen', color: 'Antique White', price: 378900, originalPrice: 378900, badge: 'Top Rated', desc: 'Sleek modern nightstand with 2 drawers, push-to-open mechanism and cable management.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Floating Nightstand', material: 'Sheesham', color: 'Walnut Brown', price: 386200, originalPrice: 386200, badge: null, desc: 'Wall-mounted floating nightstand with single drawer, modern minimalist design.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Vintage Nightstand Pair', material: 'Teak', color: 'Natural Teak', price: 393500, originalPrice: 464330, badge: null, desc: 'Vintage-style pair of nightstands with turned legs and ceramic drawer pulls.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Charging Nightstand', material: 'Walnut', color: 'Espresso', price: 400800, originalPrice: 400800, badge: 'Bestseller', desc: 'Nightstand with built-in wireless charging pad and USB-C port.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Marble Top Nightstand', material: 'Pine', color: 'Honey Oak', price: 408100, originalPrice: 408100, badge: 'New', desc: 'Luxury nightstand with genuine marble top, gold metal legs and 2 drawers.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Rattan Nightstand', material: 'Oak', color: 'Dark Walnut', price: 415400, originalPrice: 490172, badge: 'Sale', desc: 'Nightstand with hand-woven rattan drawer front, solid oak frame.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Industrial Side Table', material: 'Mahogany', color: 'Mahogany', price: 422700, originalPrice: 422700, badge: null, desc: 'Industrial-style side table with steel frame and solid wood top, single drawer.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Three-Drawer Nightstand', material: 'MDF', color: 'Charcoal Grey', price: 430000, originalPrice: 430000, badge: 'Bestseller', desc: 'Tall nightstand with 3 drawers, perfect for extra bedroom storage.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Compact Side Table', material: 'Pine & Steel', color: 'Cream', price: 437300, originalPrice: 516014, badge: 'Sale', desc: 'Compact bedside table ideal for small spaces, single drawer with shelf.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Designer Bedside', material: 'Mahogany', color: 'White Wash', price: 444600, originalPrice: 444600, badge: 'New', desc: 'Designer bedside table with hand-carved details, premium mahogany finish.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Minimalist Side Table', material: 'Reclaimed Pine', color: 'Rustic Brown', price: 451900, originalPrice: 451900, badge: 'Top Rated', desc: 'Minimalist nightstand with single drawer, clean lines and tapered legs.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Storage Ottoman', material: 'Pine & Linen', color: 'Antique White', price: 459200, originalPrice: 541856, badge: null, desc: 'Multi-functional ottoman side table with hidden storage and cushioned top.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Two-Tier Side Table', material: 'Sheesham', color: 'Walnut Brown', price: 466500, originalPrice: 466500, badge: null, desc: 'Two-tier side table with lower shelf, perfect for books and magazines.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'C-Shaped Side Table', material: 'Teak', color: 'Natural Teak', price: 473800, originalPrice: 473800, badge: 'Bestseller', desc: 'C-shaped side table slides under bed for laptop use, modern design.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Heritage Nightstand', material: 'Walnut', color: 'Espresso', price: 481100, originalPrice: 567698, badge: 'New', desc: 'Heritage nightstand in solid teak with hand-carved details and brass pulls.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Round Side Table', material: 'Pine', color: 'Honey Oak', price: 488400, originalPrice: 488400, badge: 'Sale', desc: 'Round side table with turned pedestal base, single drawer.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },
    { name: 'Open Shelf Nightstand', material: 'Oak', color: 'Dark Walnut', price: 495700, originalPrice: 495700, badge: null, desc: 'Modern open-shelf nightstand with cable management and clean lines.', category: 'Bedroom', subcategory: 'Side Tables & Nightstands', subcategorySlug: 'side-tables' },

    { name: 'Heritage Sheesham Sofa', material: 'Sheesham', color: 'Walnut Brown', price: 45000, originalPrice: 51749, badge: 'Bestseller', desc: 'Three-seater solid Sheesham sofa with premium upholstery, traditional joinery, high-density foam cushions.', category: 'Sofas', subcategory: 'Three-Seater Sofas', subcategorySlug: 'three-seater' },
    { name: 'Modern L-Shape Sectional', material: 'Teak', color: 'Charcoal Grey', price: 51500, originalPrice: 51500, badge: 'Sale', desc: 'L-shaped sectional sofa with reversible chaise, performance fabric upholstery, deep seating.', category: 'Sofas', subcategory: 'L-Shaped Sofas', subcategorySlug: 'l-shaped' },
    { name: 'Luxury Chesterfield', material: 'Walnut', color: 'Cream', price: 58000, originalPrice: 58000, badge: 'New', desc: 'Classic Chesterfield with deep button tufting, rolled arms, nailhead trim and premium leather.', category: 'Sofas', subcategory: 'Sofa Sets', subcategorySlug: 'sofa-sets' },
    { name: 'Classic Three-Seater', material: 'Pine', color: 'Navy Blue', price: 64500, originalPrice: 64500, badge: 'Top Rated', desc: 'Timeless three-seater sofa with rolled arms, premium down-blend cushions, hardwood frame.', category: 'Sofas', subcategory: 'Three-Seater Sofas', subcategorySlug: 'three-seater' },
    { name: 'Velvet L-Shape Sofa', material: 'Oak', color: 'Beige', price: 71000, originalPrice: 81650, badge: null, desc: 'Plush velvet L-shape sofa with gold metal legs, deep seating for ultimate comfort.', category: 'Sofas', subcategory: 'L-Shaped Sofas', subcategorySlug: 'l-shaped' },
    { name: 'Comfort Recliner Set', material: 'Mahogany', color: 'Forest Green', price: 77500, originalPrice: 77500, badge: 'Bestseller', desc: 'Three-piece recliner set with power headrests, USB charging ports, console storage.', category: 'Sofas', subcategory: 'Sofa Sets', subcategorySlug: 'sofa-sets' },
    { name: 'Royal Velvet Sofa', material: 'Pine & Steel', color: 'Burgundy', price: 84000, originalPrice: 84000, badge: 'Bestseller', desc: 'Royal velvet sofa with tufted back, hand-carved Sheesham frame, gold metal accents.', category: 'Sofas', subcategory: 'Three-Seater Sofas', subcategorySlug: 'three-seater' },
    { name: 'Leather Reclining Sofa', material: 'Pine & Linen', color: 'Black', price: 90500, originalPrice: 90500, badge: 'Sale', desc: 'Top-grain leather reclining sofa with power recline, adjustable headrest, lumbar support.', category: 'Sofas', subcategory: 'L-Shaped Sofas', subcategorySlug: 'l-shaped' },
    { name: 'Linen Upholstered Sofa', material: 'Pine & Velvet', color: 'Grey', price: 97000, originalPrice: 111549, badge: 'New', desc: 'Belgian linen-upholstered sofa with down-wrapped cushions, solid pine frame, machine-washable covers.', category: 'Sofas', subcategory: 'Sofa Sets', subcategorySlug: 'sofa-sets' },
    { name: 'Mid-Century Sofa', material: 'Pine & Leather', color: 'Tan', price: 103500, originalPrice: 103500, badge: 'Top Rated', desc: 'Mid-century modern sofa with walnut sled base, premium wool upholstery, tapered legs.', category: 'Sofas', subcategory: 'Three-Seater Sofas', subcategorySlug: 'three-seater' },
    { name: 'Italian Leather Sofa', material: 'Walnut & Wool', color: 'Mustard', price: 110000, originalPrice: 110000, badge: null, desc: 'Top-grain Italian leather sofa with hand-stitched details, solid wood legs, 8-way hand-tied springs.', category: 'Sofas', subcategory: 'L-Shaped Sofas', subcategorySlug: 'l-shaped' },
    { name: 'Modular Sectional', material: 'Sheesham', color: 'Cognac', price: 116500, originalPrice: 116500, badge: 'Bestseller', desc: 'Modular sectional with 5 configurable pieces, machine-washable covers, family-sized seating.', category: 'Sofas', subcategory: 'Sofa Sets', subcategorySlug: 'sofa-sets' },
    { name: 'Traditional Carved Sofa', material: 'Teak', color: 'Brown', price: 123000, originalPrice: 141450, badge: 'Bestseller', desc: 'Traditional carved sofa with hand-carved Sheesham frame, premium fabric, ornate details.', category: 'Sofas', subcategory: 'Three-Seater Sofas', subcategorySlug: 'three-seater' },
    { name: 'Contemporary Sofa Set', material: 'Walnut', color: 'Emerald Green', price: 129500, originalPrice: 129500, badge: 'Sale', desc: 'Contemporary sofa set with matching loveseat and chair, stain-resistant fabric, hardwood frame.', category: 'Sofas', subcategory: 'L-Shaped Sofas', subcategorySlug: 'l-shaped' },
    { name: 'Corner Sofa Bed', material: 'Pine', color: 'Red Mahogany', price: 136000, originalPrice: 136000, badge: 'New', desc: 'Corner sofa bed with pull-out mattress, hidden storage, perfect for studio apartments.', category: 'Sofas', subcategory: 'Sofa Sets', subcategorySlug: 'sofa-sets' },
    { name: 'Tufted Back Sofa', material: 'Oak', color: 'Walnut Brown', price: 142500, originalPrice: 142500, badge: 'Top Rated', desc: 'Tufted back sofa with deep button detail, rolled arms, premium velvet upholstery.', category: 'Sofas', subcategory: 'Three-Seater Sofas', subcategorySlug: 'three-seater' },
    { name: 'Scandinavian Sofa', material: 'Mahogany', color: 'Charcoal Grey', price: 149000, originalPrice: 171350, badge: null, desc: 'Scandinavian sofa with clean lines, oak legs, premium woven fabric, removable cushions.', category: 'Sofas', subcategory: 'L-Shaped Sofas', subcategorySlug: 'l-shaped' },
    { name: 'Family Size Sectional', material: 'Pine & Steel', color: 'Cream', price: 155500, originalPrice: 155500, badge: 'Bestseller', desc: 'Family-sized sectional with 6 seats, reversible chaise, performance fabric, stain-resistant.', category: 'Sofas', subcategory: 'Sofa Sets', subcategorySlug: 'sofa-sets' },
    { name: 'Lounge Sofa', material: 'Pine & Linen', color: 'Navy Blue', price: 162000, originalPrice: 162000, badge: 'Bestseller', desc: 'Lounge sofa with extra-deep seating, plush cushions, perfect for movie nights.', category: 'Sofas', subcategory: 'Three-Seater Sofas', subcategorySlug: 'three-seater' },
    { name: 'Designer Curved Sofa', material: 'Pine & Velvet', color: 'Beige', price: 168500, originalPrice: 168500, badge: 'Sale', desc: 'Designer curved sofa with unique silhouette, premium velvet, gold metal base, statement piece.', category: 'Sofas', subcategory: 'L-Shaped Sofas', subcategorySlug: 'l-shaped' },
    { name: 'Compact Apartment Sofa', material: 'Pine & Leather', color: 'Forest Green', price: 175000, originalPrice: 201249, badge: 'New', desc: 'Compact apartment sofa with slim profile, perfect for small spaces, modern design.', category: 'Sofas', subcategory: 'Sofa Sets', subcategorySlug: 'sofa-sets' },
    { name: 'Reclining Theater Sofa', material: 'Walnut & Wool', color: 'Burgundy', price: 181500, originalPrice: 181500, badge: 'Top Rated', desc: 'Reclining theater sofa with cup holders, USB ports, LED lighting, premium leather.', category: 'Sofas', subcategory: 'Three-Seater Sofas', subcategorySlug: 'three-seater' },
    { name: 'Classic Rolled Arm Sofa', material: 'Sheesham', color: 'Black', price: 188000, originalPrice: 188000, badge: null, desc: 'Classic rolled-arm sofa with nailhead trim, premium linen, hardwood frame, 8-way hand-tied.', category: 'Sofas', subcategory: 'L-Shaped Sofas', subcategorySlug: 'l-shaped' },
    { name: 'Modern Track Arm Sofa', material: 'Teak', color: 'Grey', price: 194500, originalPrice: 194500, badge: 'Bestseller', desc: 'Modern track-arm sofa with clean lines, performance fabric, deep seating, hardwood frame.', category: 'Sofas', subcategory: 'Sofa Sets', subcategorySlug: 'sofa-sets' },
    { name: 'Convertible Sofa Bed', material: 'Walnut', color: 'Tan', price: 201000, originalPrice: 231149, badge: 'Bestseller', desc: 'Convertible sofa bed with easy-pull mechanism, memory foam mattress, perfect for guests.', category: 'Sofas', subcategory: 'Three-Seater Sofas', subcategorySlug: 'three-seater' },
    { name: 'Modular Corner Sofa', material: 'Pine', color: 'Mustard', price: 207500, originalPrice: 207500, badge: 'Sale', desc: 'Modular corner sofa with configurable layout, premium fabric, machine-washable covers.', category: 'Sofas', subcategory: 'L-Shaped Sofas', subcategorySlug: 'l-shaped' },
    { name: 'Vintage Inspired Sofa', material: 'Oak', color: 'Cognac', price: 214000, originalPrice: 214000, badge: 'New', desc: 'Vintage-inspired sofa with tufted back, turned wooden legs, premium velvet, classic charm.', category: 'Sofas', subcategory: 'Sofa Sets', subcategorySlug: 'sofa-sets' },
    { name: 'Lounge Chair Accent', material: 'Mahogany', color: 'Brown', price: 220500, originalPrice: 220500, badge: 'Top Rated', desc: 'Lounge accent chair with deep seat, premium fabric, solid wood frame, modern silhouette.', category: 'Coffee Chairs', subcategory: 'Lounge Chairs', subcategorySlug: 'lounge' },
    { name: 'Reading Lounge Chair', material: 'Pine & Steel', color: 'Emerald Green', price: 227000, originalPrice: 261049, badge: null, desc: 'Reading lounge chair with high back, plush cushions, perfect for libraries and studies.', category: 'Coffee Chairs', subcategory: 'Accent Chairs', subcategorySlug: 'accent' },
    { name: 'Swivel Lounge Chair', material: 'Pine & Linen', color: 'Red Mahogany', price: 233500, originalPrice: 233500, badge: 'Bestseller', desc: 'Swivel lounge chair with 360-degree rotation, premium upholstery, solid wood base.', category: 'Coffee Chairs', subcategory: 'Recliners', subcategorySlug: 'recliners' },
    { name: 'Velvet Accent Chair', material: 'Pine & Velvet', color: 'Walnut Brown', price: 240000, originalPrice: 240000, badge: 'Bestseller', desc: 'Velvet accent chair with channel tufting, gold metal legs, statement piece for any room.', category: 'Coffee Chairs', subcategory: 'Lounge Chairs', subcategorySlug: 'lounge' },
    { name: 'Rattan Accent Chair', material: 'Pine & Leather', color: 'Charcoal Grey', price: 246500, originalPrice: 246500, badge: 'Sale', desc: 'Rattan accent chair with hand-woven rattan back, solid wood frame, bohemian charm.', category: 'Coffee Chairs', subcategory: 'Accent Chairs', subcategorySlug: 'accent' },
    { name: 'Modern Accent Chair', material: 'Walnut & Wool', color: 'Cream', price: 253000, originalPrice: 290950, badge: 'New', desc: 'Modern accent chair with clean lines, premium fabric, solid wood legs, versatile design.', category: 'Coffee Chairs', subcategory: 'Recliners', subcategorySlug: 'recliners' },
    { name: 'Wingback Accent Chair', material: 'Sheesham', color: 'Navy Blue', price: 259500, originalPrice: 259500, badge: 'Top Rated', desc: 'Wingback accent chair with tall back, premium fabric, perfect for reading nooks.', category: 'Coffee Chairs', subcategory: 'Lounge Chairs', subcategorySlug: 'lounge' },
    { name: 'Cocktail Accent Chair', material: 'Teak', color: 'Beige', price: 266000, originalPrice: 266000, badge: null, desc: 'Cocktail accent chair with curved back, premium velvet, gold metal legs, mid-century style.', category: 'Coffee Chairs', subcategory: 'Accent Chairs', subcategorySlug: 'accent' },
    { name: 'Slipper Accent Chair', material: 'Walnut', color: 'Forest Green', price: 272500, originalPrice: 272500, badge: 'Bestseller', desc: 'Slipper accent chair with low profile, armless design, premium fabric, versatile.', category: 'Coffee Chairs', subcategory: 'Recliners', subcategorySlug: 'recliners' },
    { name: 'Leather Accent Chair', material: 'Pine', color: 'Burgundy', price: 279000, originalPrice: 320850, badge: 'Bestseller', desc: 'Leather accent chair with top-grain leather, solid wood frame, classic design.', category: 'Coffee Chairs', subcategory: 'Lounge Chairs', subcategorySlug: 'lounge' },
    { name: 'Boucle Accent Chair', material: 'Oak', color: 'Black', price: 285500, originalPrice: 285500, badge: 'Sale', desc: 'Boucle accent chair with textured fabric, sculptural shape, modern statement piece.', category: 'Coffee Chairs', subcategory: 'Accent Chairs', subcategorySlug: 'accent' },
    { name: 'Mid-Century Accent', material: 'Mahogany', color: 'Grey', price: 292000, originalPrice: 292000, badge: 'New', desc: 'Mid-century accent chair with tapered legs, premium wool, walnut frame, iconic design.', category: 'Coffee Chairs', subcategory: 'Recliners', subcategorySlug: 'recliners' },
    { name: 'Recliner Chair', material: 'Pine & Steel', color: 'Tan', price: 298500, originalPrice: 298500, badge: 'Top Rated', desc: 'Recliner chair with power recline, USB charging, premium leather, lumbar support.', category: 'Coffee Chairs', subcategory: 'Lounge Chairs', subcategorySlug: 'lounge' },
    { name: 'Push-Back Recliner', material: 'Pine & Linen', color: 'Mustard', price: 305000, originalPrice: 350750, badge: null, desc: 'Push-back recliner with manual operation, premium fabric, hardwood frame, classic design.', category: 'Coffee Chairs', subcategory: 'Accent Chairs', subcategorySlug: 'accent' },
    { name: 'Power Recliner', material: 'Pine & Velvet', color: 'Cognac', price: 311500, originalPrice: 311500, badge: 'Bestseller', desc: 'Power recliner with infinite positions, USB ports, premium leather, headrest adjustment.', category: 'Coffee Chairs', subcategory: 'Recliners', subcategorySlug: 'recliners' },
    { name: 'Massage Recliner', material: 'Pine & Leather', color: 'Brown', price: 318000, originalPrice: 318000, badge: 'Bestseller', desc: 'Massage recliner with heat therapy, 8 massage motors, premium leather, remote control.', category: 'Coffee Chairs', subcategory: 'Lounge Chairs', subcategorySlug: 'lounge' },
    { name: 'Lounge Recliner', material: 'Walnut & Wool', color: 'Emerald Green', price: 324500, originalPrice: 324500, badge: 'Sale', desc: 'Lounge recliner with extended footrest, premium fabric, perfect for relaxation.', category: 'Coffee Chairs', subcategory: 'Accent Chairs', subcategorySlug: 'accent' },
    { name: 'Theater Recliner', material: 'Sheesham', color: 'Red Mahogany', price: 331000, originalPrice: 380649, badge: 'New', desc: 'Theater recliner with cup holder, LED lighting, premium leather, USB charging.', category: 'Coffee Chairs', subcategory: 'Recliners', subcategorySlug: 'recliners' },
    { name: 'Lift Recliner', material: 'Teak', color: 'Walnut Brown', price: 337500, originalPrice: 337500, badge: 'Top Rated', desc: 'Lift recliner with power lift assistance, perfect for elderly, premium fabric, easy exit.', category: 'Coffee Chairs', subcategory: 'Lounge Chairs', subcategorySlug: 'lounge' },
    { name: 'Rocker Recliner', material: 'Walnut', color: 'Charcoal Grey', price: 344000, originalPrice: 344000, badge: null, desc: 'Rocker recliner with smooth rocking motion, premium fabric, solid wood frame.', category: 'Coffee Chairs', subcategory: 'Accent Chairs', subcategorySlug: 'accent' },
    { name: 'Wall-Hugger Recliner', material: 'Pine', color: 'Cream', price: 350500, originalPrice: 350500, badge: 'Bestseller', desc: 'Wall-hugger recliner with space-saving design, premium leather, full recline within 4 inches of wall.', category: 'Coffee Chairs', subcategory: 'Recliners', subcategorySlug: 'recliners' },

    { name: 'Modern Lift Coffee Table', material: 'Walnut', color: 'Dark Walnut', price: 45000, originalPrice: 52000, badge: 'Sale', desc: 'Innovative lift-top mechanism reveals hidden storage for remotes, magazines, and blankets. Soft-close hinges.', category: 'Coffee Tables', subcategory: 'Lift-Top Coffee Tables', subcategorySlug: 'lift-top' },
    { name: 'Storage Coffee Table', material: 'Sheesham', color: 'Natural', price: 38000, originalPrice: 38000, badge: 'New', desc: 'Spacious hidden storage compartment with lift-top design and soft-close hinges, hand-finished.', category: 'Coffee Tables', subcategory: 'Storage Coffee Tables', subcategorySlug: 'storage' },
    { name: 'Designer Marble Coffee Table', material: 'MDF & Marble', color: 'Black & Gold', price: 65000, originalPrice: 75000, badge: 'Top Rated', desc: 'Luxury coffee table with genuine marble top, gold metal base, modern designer piece.', category: 'Coffee Tables', subcategory: 'Designer Coffee Tables', subcategorySlug: 'designer' },
    { name: 'Round Coffee Table', material: 'Sheesham', color: 'Walnut', price: 32000, originalPrice: 38000, badge: 'New', desc: 'Round coffee table with turned pedestal base, hand-finished Sheesham, classic design.', category: 'Coffee Tables', subcategory: 'Designer Coffee Tables', subcategorySlug: 'designer' },
    { name: 'Nesting Coffee Tables', material: 'Acacia', color: 'Natural', price: 35000, originalPrice: 35000, badge: null, desc: 'Set of 2 nesting coffee tables in acacia wood with steel legs, space-saving design.', category: 'Coffee Tables', subcategory: 'Designer Coffee Tables', subcategorySlug: 'designer' },
    { name: 'Industrial Coffee Table', material: 'Pine & Steel', color: 'Charcoal', price: 42000, originalPrice: 48000, badge: 'Sale', desc: 'Industrial-style coffee table with reclaimed pine top and powder-coated steel base.', category: 'Coffee Tables', subcategory: 'Storage Coffee Tables', subcategorySlug: 'storage' },
    { name: 'Glass Top Coffee Table', material: 'Sheesham & Glass', color: 'Natural', price: 38000, originalPrice: 45000, badge: null, desc: 'Modern glass-top coffee table with solid Sheesham base, easy to clean surface.', category: 'Coffee Tables', subcategory: 'Designer Coffee Tables', subcategorySlug: 'designer' },
    { name: 'Live Edge Coffee Table', material: 'Suar Wood', color: 'Natural', price: 58000, originalPrice: 68000, badge: 'Bestseller', desc: 'Live edge coffee table with unique natural wood edge, statement piece for modern living.', category: 'Coffee Tables', subcategory: 'Designer Coffee Tables', subcategorySlug: 'designer' },
    { name: 'Walnut Dining Table Set', material: 'Walnut', color: 'Walnut', price: 285000, originalPrice: 320000, badge: 'Bestseller', desc: '6-seater dining set with solid walnut table and butterfly leaf extension, plus 6 upholstered chairs.', category: 'Dining Tables', subcategory: '6-Seater Dining', subcategorySlug: '6-seater' },
    { name: 'Modern 4-Seater Dining', material: 'Sheesham', color: 'Natural Teak', price: 125000, originalPrice: 145000, badge: 'Sale', desc: 'Modern 4-seater dining table in solid Sheesham with sleek tapered legs, seats 4 comfortably.', category: 'Dining Tables', subcategory: '4-Seater Dining', subcategorySlug: '4-seater' },
    { name: 'Farmhouse Dining Table', material: 'Reclaimed Pine', color: 'Weathered Grey', price: 195000, originalPrice: 225000, badge: 'New', desc: 'Rustic farmhouse dining table crafted from reclaimed pine, perfect for family gatherings.', category: 'Dining Tables', subcategory: '6-Seater Dining', subcategorySlug: '6-seater' },
    { name: '8-Seater Marble Dining', material: 'Marble & Sheesham', color: 'White & Walnut', price: 385000, originalPrice: 445000, badge: 'Top Rated', desc: 'Statement 8-seater dining table with genuine marble top and solid Sheesham base.', category: 'Dining Tables', subcategory: '8-Seater Dining', subcategorySlug: '8-seater' },
    { name: 'Glass Top Dining Table', material: 'Sheesham & Glass', color: 'Clear & Sheesham', price: 145000, originalPrice: 165000, badge: null, desc: 'Modern glass-top dining table with Sheesham base, seats 4, easy-clean surface.', category: 'Dining Tables', subcategory: '4-Seater Dining', subcategorySlug: '4-seater' },
    { name: 'Round Dining Table', material: 'Teak', color: 'Teak Honey', price: 215000, originalPrice: 245000, badge: 'Bestseller', desc: 'Round dining table in solid teak, seats 6, perfect for intimate family meals.', category: 'Dining Tables', subcategory: '6-Seater Dining', subcategorySlug: '6-seater' },
    { name: 'Extendable Dining Table', material: 'Oak', color: 'Light Oak', price: 245000, originalPrice: 285000, badge: 'Sale', desc: 'Extendable dining table in solid oak, seats 6 closed, 8 when extended, with butterfly leaf.', category: 'Dining Tables', subcategory: '8-Seater Dining', subcategorySlug: '8-seater' },
    { name: 'Counter Height Dining', material: 'Pine', color: 'White Wash', price: 165000, originalPrice: 195000, badge: 'New', desc: 'Counter-height dining table with 4 stools, modern farmhouse style, perfect for kitchens.', category: 'Dining Tables', subcategory: '4-Seater Dining', subcategorySlug: '4-seater' },
    { name: 'Royal Teak Wardrobe', material: 'Teak', color: 'Teak Honey', price: 245000, originalPrice: 280000, badge: 'Bestseller', desc: 'Spacious 4-door wardrobe in solid teak with full-length mirror, hanging rails and velvet-lined jewelry drawer.', category: 'Wardrobes', subcategory: 'Hinged Wardrobes', subcategorySlug: 'hinged' },
    { name: 'Sliding Door Wardrobe', material: 'MDF', color: 'White', price: 135000, originalPrice: 150000, badge: 'Sale', desc: 'Modern sliding door wardrobe with full mirrored panels, double hanging rail and shoe rack.', category: 'Wardrobes', subcategory: 'Sliding Wardrobes', subcategorySlug: 'sliding' },
    { name: 'Walk-in Closet System', material: 'MDF', color: 'Grey', price: 285000, originalPrice: 325000, badge: 'Top Rated', desc: 'Custom walk-in closet system with hanging rails, shelves, drawers, shoe rack and LED lighting.', category: 'Wardrobes', subcategory: 'Walk-in Wardrobes', subcategorySlug: 'walk-in' },
    { name: 'Classic 3-Door Wardrobe', material: 'Pine', color: 'Cherry Stain', price: 115000, originalPrice: 135000, badge: 'New', desc: 'Classic 3-door wardrobe in solid pine with hanging rail, shelves and full-length mirror.', category: 'Wardrobes', subcategory: 'Hinged Wardrobes', subcategorySlug: 'hinged' },
    { name: 'Industrial Wardrobe', material: 'Pine & Steel', color: 'Charcoal', price: 165000, originalPrice: 195000, badge: null, desc: 'Industrial-style wardrobe with steel frame, solid pine panels and metal hardware.', category: 'Wardrobes', subcategory: 'Hinged Wardrobes', subcategorySlug: 'hinged' },
    { name: 'Compact Sliding Wardrobe', material: 'MDF', color: 'Oak', price: 95000, originalPrice: 110000, badge: 'Sale', desc: 'Compact sliding wardrobe perfect for small bedrooms, 2 sliding doors, hanging rail and shelf.', category: 'Wardrobes', subcategory: 'Sliding Wardrobes', subcategorySlug: 'sliding' },
];

const rawProducts = productsData.map((p) => ({
  ...p,
  currency: 'PKR',
  discount: p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0,
  images: getProductImages(p),
  reviews: makeReviews(p.name, p.seed),
}));

const validateProducts = (prods) => {
  return prods.map((p, index) => ({
    id: p.id != null ? String(p.id) : String(index + 1),
    slug: p.slug || p.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || `product-${index}`,
    name: p.name || 'Unnamed Product',
    category: p.category || 'Uncategorized',
    subcategory: p.subcategory || '',
    shortDesc: p.desc || '',
    description: `<p>${p.desc || ''}</p>`,
    price: Number(p.price) || 0,
    originalPrice: Number(p.originalPrice) || Number(p.price) || 0,
    discount: p.discount || 0,
    currency: 'PKR',
    material: p.material || '',
    colors: p.color ? [{ name: p.color, hex: '#888888' }] : [],
    dimensions: { width: 0, height: 0, depth: 0, unit: 'inches' },
    weight: '',
    rating: Number(p.rating) || 4.5,
    reviewCount: Number(p.reviewCount) || 25,
    badge: p.badge || null,
    images: Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'],
    inStock: p.inStock !== undefined ? p.inStock : true,
    stockCount: p.stockCount || 10,
    isNew: p.isNew || (p.badge === 'New'),
    isFeatured: p.isFeatured || (p.badge === 'Bestseller' || p.badge === 'Top Rated'),
    isOnSale: p.isOnSale || (p.badge === 'Sale'),
    tags: [p.subcategorySlug, p.category.toLowerCase().replace(/\s+/g, '-')].filter(Boolean),
    sku: `WM-${String(index + 1).padStart(4, '0')}`,
    reviews: Array.isArray(p.reviews) ? p.reviews : [],
    seed: p.seed || `seed-${index}`,
    subcategorySlug: p.subcategorySlug,
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

export const materials = ['Sheesham', 'Teak', 'Walnut', 'Pine', 'Oak', 'Mahogany', 'MDF'];
export default products;
