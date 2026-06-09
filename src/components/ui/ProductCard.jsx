import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Badge from './Badge';
import StarRating from './StarRating';
import PriceTag from './PriceTag';
import Button from './Button';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUiStore } from '../../store/uiStore';
import { fadeInUp } from '../../utils/animations';

const badgeTypeMap = {
  New: 'new',
  Sale: 'sale',
  Bestseller: 'bestseller',
  'Top Rated': 'toprated',
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop';

const handleImageError = (e) => {
  if (!e || !e.target) return;
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
};

export default function ProductCard({
  product,
  viewMode = 'grid',
  showMoveToCart = false,
  onRemove,
}) {
  const productId = product?.id;

  const productImages = Array.isArray(product?.images) && product.images.length > 0
    ? product.images
    : [FALLBACK_IMAGE];
  const primaryImage = productImages[0] || FALLBACK_IMAGE;
  const productSlug = product?.slug || String(productId);

  const [isHovered, setIsHovered] = useState(false);
  const addToCart = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => (productId ? s.isInWishlist(productId) : false));
  const setQuickViewProduct = useUiStore((s) => s.setQuickViewProduct);

  if (!product || !productId) {
    return null;
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const color = product.colors && product.colors.length > 0
        ? (typeof product.colors[0] === 'string' ? product.colors[0] : product.colors[0]?.name)
        : null;
      addToCart(product, 1, color);
      openDrawer();
      toast.success(`${product.name || 'Item'} added to cart`);
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const added = toggleWishlist(product);
      toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
    } catch (err) {
      console.error('Wishlist toggle error:', err);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setQuickViewProduct(product);
    } catch (err) {
      console.error('Quick view error:', err);
    }
  };

  const cardClass = 'group bg-white rounded-lg border border-beige-dark overflow-hidden hover:border-gold hover:shadow-xl transition-all duration-300';

  if (viewMode === 'list') {
    return (
      <motion.div variants={fadeInUp} className={`relative ${cardClass}`}>
        <div className="flex flex-col sm:flex-row">
          <Link to={`/shop/${productSlug}`} className="relative sm:w-64 shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden product-img-container">
            {!product.inStock && <Badge type="outofstock" />}
            {product.badge && product.inStock && <Badge type={badgeTypeMap[product.badge] || 'new'} text={product.badge} />}
            <img
              src={primaryImage}
              alt={product.name || 'Product'}
              loading="lazy"
              decoding="async"
              onError={handleImageError}
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
            />
          </Link>
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <Link to={`/shop/${productSlug}`}>
                <h3 className="font-serif text-xl text-darktext hover:text-gold transition-colors">{product.name || 'Unnamed Product'}</h3>
              </Link>
              <p className="text-sm text-brown-light mt-1">{product.material || ''}</p>
              <StarRating rating={product.rating || 0} showCount count={product.reviewCount || 0} className="mt-2" />
              <p className="text-sm text-brown-light mt-3 line-clamp-2">{product.shortDesc || ''}</p>
            </div>
            <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
              <PriceTag price={product.price || 0} originalPrice={product.originalPrice || 0} />
              <div className="flex w-full sm:w-auto gap-2">
                <button onClick={handleWishlist} className="min-h-11 min-w-11 p-2 border border-beige-dark rounded hover:border-gold transition-colors flex items-center justify-center" aria-label="Toggle wishlist">
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-darktext'}`} />
                </button>
                <Button size="sm" variant="dark" onClick={handleAddToCart} icon={ShoppingBag} className="min-h-11 flex-1 sm:flex-none">
                  {showMoveToCart ? 'Move to Cart' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
          {onRemove && (
            <button onClick={() => onRemove(product.id)} className="absolute top-3 right-3 p-1 bg-white rounded-full shadow hover:bg-red-50" aria-label="Remove from wishlist">
              <span className="text-darktext text-lg">×</span>
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      className={`relative ${cardClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {onRemove && (
        <button
          onClick={() => onRemove(product.id)}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition-colors"
          aria-label="Remove from wishlist"
        >
          ×
        </button>
      )}
      <Link to={`/shop/${productSlug}`} className="block relative aspect-[4/3] overflow-hidden product-img-container">
        {!product.inStock && <Badge type="outofstock" />}
        {product.badge && product.inStock && <Badge type={badgeTypeMap[product.badge] || 'new'} text={product.badge} />}
        <img
          src={primaryImage}
          alt={product.name || 'Product'}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className="w-full h-full object-cover object-center transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 bg-brown/30 flex items-center justify-center gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickView}
            className="min-h-11 min-w-11 p-2.5 bg-white rounded-full shadow hover:bg-gold transition-colors flex items-center justify-center"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5 text-darktext" />
          </button>
          <button
            onClick={handleWishlist}
            className="min-h-11 min-w-11 p-2.5 bg-white rounded-full shadow hover:bg-gold transition-colors flex items-center justify-center"
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-darktext'}`} />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/shop/${productSlug}`}>
          <h3 className="font-serif text-lg text-darktext hover:text-gold transition-colors line-clamp-1">{product.name || 'Unnamed Product'}</h3>
        </Link>
        <p className="text-xs text-brown-light mt-1">{product.material || ''}</p>
        <StarRating rating={product.rating || 0} showCount count={product.reviewCount || 0} size="sm" className="mt-2" />
        <PriceTag price={product.price || 0} originalPrice={product.originalPrice || 0} size="sm" className="mt-2" />
        <div className="mt-3 opacity-100 translate-y-0 transition-all duration-300">
          <Button
            size="sm"
            variant="dark"
            className="w-full min-h-11"
            onClick={handleAddToCart}
            icon={ShoppingBag}
          >
            {showMoveToCart ? 'Move to Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
