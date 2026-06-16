import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Badge from './Badge';
import formatPrice from '../../utils/formatPrice';
import { handleImageError } from '../../utils/images';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUiStore } from '../../store/uiStore';

export default function ProductCard({ product, priority = false }) {
  const addItem = useCartStore(state => state.addItem);
  const toggleItem = useWishlistStore(state => state.toggleItem);
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id));
  const setQuickViewProduct = useUiStore(state => state.setQuickViewProduct);

  const addToCart = event => {
    event.preventDefault();
    addItem(product, 1, product.colors?.[0]?.name);
    toast.success('Added to cart');
  };

  const toggleWishlist = event => {
    event.preventDefault();
    const added = toggleItem(product);
    toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  const quickView = event => {
    event.preventDefault();
    setQuickViewProduct(product);
  };

  return (
    <Link to={'/shop/' + product.slug} className="group block">
      <div className="relative aspect-square overflow-hidden bg-bg-light">
        {product.badge && (
          <Badge tone={product.isOnSale ? 'red' : 'dark'} className="absolute left-3 top-3 z-10">
            {product.badge}
          </Badge>
        )}
        <img
          src={product.images?.[0]}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={handleImageError}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
          <button type="button" onClick={quickView} className="flex h-10 w-10 items-center justify-center bg-white text-primary shadow-sm" aria-label="Quick view">
            <Eye size={18} />
          </button>
          <button type="button" onClick={toggleWishlist} className="flex h-10 w-10 items-center justify-center bg-white text-primary shadow-sm" aria-label="Wishlist">
            <Heart size={18} className={isInWishlist ? 'fill-primary' : ''} />
          </button>
        </div>
        <button
          type="button"
          onClick={addToCart}
          className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-primary px-4 py-3 text-sm font-medium text-white transition group-hover:translate-y-0"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
      <div className="pt-3">
        <p className="text-sm font-medium text-primary">{product.name}</p>
        <p className="mt-1 text-xs text-secondary">{product.category}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[15px] font-semibold text-primary">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-secondary line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
