import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, ShoppingBag, Star } from 'lucide-react';
import { getNewArrivals } from '../../data/products';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop';

function ArrivalCard({ product }) {
  const addToCart = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const primaryImage = product.images?.[0] || FALLBACK_IMAGE;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors?.[0]?.name || null);
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
    <motion.div variants={fadeInUp} className="group relative bg-white rounded-lg overflow-hidden border border-beige-dark hover:border-gold hover:shadow-2xl transition-all duration-300">
      <Link to={`/shop/${product.slug}`} className="block">
        <div className="relative h-[260px] overflow-hidden bg-beige">
          <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-gold text-darktext text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-darktext rounded-full" />
            New
          </span>
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
            loading="lazy"
            decoding="async"
            onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
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
          <p className="text-xs text-brown-light mb-2">{product.material}</p>
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
    </motion.div>
  );
}

export default function NewArrivals() {
  // Get 4 new arrivals, fall back to bestseller if no new
  let newProducts = getNewArrivals().slice(0, 4);
  if (newProducts.length < 4) {
    newProducts = newProducts.concat(
      getNewArrivals().slice(0, 4 - newProducts.length)
    );
  }

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag">Just Arrived</span>
          <h2 className="font-serif text-3xl md:text-5xl text-darktext mt-3 mb-3">New Arrivals</h2>
          <p className="text-brown-light max-w-xl mx-auto">
            The latest additions to our showroom. Fresh designs crafted for modern Pakistani homes.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {newProducts.map((product) => (
            <ArrivalCard key={product.id} product={product} />
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            to="/shop?sort=newest"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-darktext font-medium rounded-sm hover:bg-gold-light transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            View All New Arrivals
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
