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
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
};

export default function ProductCard({
  product,
  viewMode = 'grid',
  showMoveToCart = false,
  onRemove,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const addToCart = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const setQuickViewProduct = useUiStore((s) => s.setQuickViewProduct);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors?.[0]?.name);
    openDrawer();
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const cardClass = 'group bg-white rounded-lg border border-beige-dark overflow-hidden hover:border-gold hover:shadow-lg transition-all';

  if (viewMode === 'list') {
    return (
      <motion.div variants={fadeInUp} className={`relative ${cardClass}`}>
        <div className="flex flex-col sm:flex-row">
          <Link to={`/shop/${product.slug}`} className="relative sm:w-64 shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden">
            {!product.inStock && <Badge type="outofstock" />}
            {product.badge && product.inStock && <Badge type={badgeTypeMap[product.badge] || 'new'} text={product.badge} />}
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              decoding="async"
              onError={handleImageError}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
            />
          </Link>
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <Link to={`/shop/${product.slug}`}>
                <h3 className="font-serif text-xl text-darktext hover:text-gold transition-colors">{product.name}</h3>
              </Link>
              <p className="text-sm text-brown-light mt-1">{product.material}</p>
              <StarRating rating={product.rating} showCount count={product.reviewCount} className="mt-2" />
              <p className="text-sm text-brown-light mt-3 line-clamp-2">{product.shortDesc}</p>
            </div>
            <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
              <PriceTag price={product.price} originalPrice={product.originalPrice} />
              <div className="flex gap-2">
                <button onClick={handleWishlist} className="p-2 border border-beige-dark rounded hover:border-gold transition-colors" aria-label="Toggle wishlist">
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-darktext'}`} />
                </button>
                <Button size="sm" variant="dark" onClick={handleAddToCart} icon={ShoppingBag}>
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
      <Link to={`/shop/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden">
        {!product.inStock && <Badge type="outofstock" />}
        {product.badge && product.inStock && <Badge type={badgeTypeMap[product.badge] || 'new'} text={product.badge} />}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className={`w-full h-full object-cover transition-transform duration-400 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-brown/20 flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={handleQuickView}
            className="p-2.5 bg-white rounded-full shadow hover:bg-gold transition-colors"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5 text-darktext" />
          </button>
          <button
            onClick={handleWishlist}
            className="p-2.5 bg-white rounded-full shadow hover:bg-gold transition-colors"
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-darktext'}`} />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/shop/${product.slug}`}>
          <h3 className="font-serif text-lg text-darktext hover:text-gold transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-xs text-brown-light mt-1">{product.material}</p>
        <StarRating rating={product.rating} showCount count={product.reviewCount} size="sm" className="mt-2" />
        <PriceTag price={product.price} originalPrice={product.originalPrice} size="sm" className="mt-2" />
        <div className={`mt-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 sm:opacity-100 sm:translate-y-0'}`}>
          <Button
            size="sm"
            variant="dark"
            className="w-full"
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
