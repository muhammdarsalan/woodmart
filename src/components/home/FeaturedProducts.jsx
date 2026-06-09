import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Star } from 'lucide-react';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import toast from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/navigation';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop';

const tabs = ['All', ...categories.map((c) => c.name)];

function ProductCardSlide({ product }) {
  const addToCart = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const primaryImage = product.images?.[0] || FALLBACK_IMAGE;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const color = product.colors?.[0]?.name || product.colors?.[0] || null;
    addToCart(product, 1, color);
    openDrawer();
    toast.success(`${product.name} added to cart`);
  };

  const handleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  return (
    <Link to={`/shop/${product.slug}`} className="group block bg-white rounded-lg overflow-hidden border border-beige-dark hover:border-gold hover:shadow-2xl transition-all duration-300 h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-beige">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-gold text-darktext text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-md">
            {product.badge}
          </span>
        )}
        <button
          onClick={handleWish}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gold transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-darktext'}`} />
        </button>
        <img
          src={primaryImage}
          alt={product.name}
          loading="eager"
          decoding="async"
          onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
          style={{ transition: 'transform 0.7s ease' }}
        />
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className="w-full bg-gold text-darktext text-sm font-medium py-2.5 rounded-sm hover:bg-gold-light transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-widest text-gold mb-1">{product.subcategory || product.category}</p>
        <h3 className="font-serif text-base text-darktext group-hover:text-gold transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-brown-light line-clamp-1 mb-2">{product.material}</p>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-gold text-gold" />
          <span className="text-xs text-brown-light">{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-lg text-darktext font-semibold">
            PKR {product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-brown-light line-through">
              {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('All');

  // Get featured products (Bestseller or Top Rated badge)
  const featured = useMemo(() => {
    return products.filter((p) => p.badge === 'Bestseller' || p.badge === 'Top Rated' || p.isFeatured);
  }, []);

  const filtered = activeTab === 'All'
    ? featured
    : featured.filter((p) => p.category === activeTab);

  // Fallback: if no featured, show all
  const displayProducts = filtered.length > 0 ? filtered : products.slice(0, 12);

  return (
    <section className="py-20 md:py-28 section-light bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="section-tag">Featured Collection</span>
          <h2 className="font-serif text-3xl md:text-5xl text-darktext mt-3 mb-3">Our Best Sellers</h2>
          <p className="text-brown-light max-w-2xl mx-auto">
            Handpicked pieces loved by 2,400+ Pakistani families. Quality craftsmanship that lasts generations.
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-medium transition-all duration-300 rounded-sm ${
                activeTab === tab
                  ? 'bg-gold text-darktext shadow-md'
                  : 'text-brown-light hover:text-darktext hover:bg-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            loop={displayProducts.length > 4}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{
              prevEl: '.featured-prev',
              nextEl: '.featured-next',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {displayProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCardSlide product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="featured-prev absolute left-0 top-1/3 -translate-y-1/2 -translate-x-3 lg:-translate-x-6 z-10 w-12 h-12 bg-white text-darktext border-2 border-gold rounded-full flex items-center justify-center shadow-xl hover:bg-gold transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="featured-next absolute right-0 top-1/3 -translate-y-1/2 translate-x-3 lg:translate-x-6 z-10 w-12 h-12 bg-white text-darktext border-2 border-gold rounded-full flex items-center justify-center shadow-xl hover:bg-gold transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-darktext text-darktext font-medium rounded-sm hover:bg-gold hover:border-gold transition-all duration-300"
          >
            View All Products
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
