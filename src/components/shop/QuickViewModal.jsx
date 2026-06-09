import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import StarRating from '../ui/StarRating';
import PriceTag from '../ui/PriceTag';
import QuantitySelector from '../ui/QuantitySelector';
import Button from '../ui/Button';
import { useUiStore } from '../../store/uiStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop';

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
};

export default function QuickViewModal() {
  const product = useUiStore((s) => s.quickViewProduct);
  const closeQuickView = useUiStore((s) => s.closeQuickView);
  const addToCart = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist);

  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  const color = selectedColor || product.colors?.[0]?.name;

  const handleAddToCart = () => {
    addToCart(product, quantity, color);
    openDrawer();
    toast.success('Added to cart');
    closeQuickView();
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product);
    toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  return (
    <Modal isOpen={!!product} onClose={closeQuickView} size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div>
          <img
            src={product.images[activeImage]}
            alt={product.name}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            onError={handleImageError}
            className="w-full aspect-square object-cover rounded-lg"
          />
          <div className="flex gap-2 mt-3">
            {product.images.slice(0, 2).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 rounded overflow-hidden border-2 ${activeImage === i ? 'border-gold' : 'border-transparent'}`}
              >
                <img src={img} alt="" loading="lazy" decoding="async" onError={handleImageError} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-darktext">{product.name}</h2>
          <StarRating rating={product.rating} showCount count={product.reviewCount} className="mt-2" />
          <PriceTag price={product.price} originalPrice={product.originalPrice} size="lg" className="mt-4" />
          <p className="text-brown-light text-sm mt-4">{product.shortDesc}</p>

          {product.colors?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-darktext mb-2">Color: {color}</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 ${color === c.name ? 'border-gold ring-2 ring-gold ring-offset-1' : 'border-beige-dark'}`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <QuantitySelector value={quantity} onChange={setQuantity} />
          </div>

          <div className="flex gap-3 mt-6">
            <Button className="flex-1" variant="dark" onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outline" onClick={handleWishlist} aria-label="Add to wishlist">
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>

          <Link
            to={`/shop/${product.slug}`}
            onClick={closeQuickView}
            className="block text-center text-gold hover:text-gold-light text-sm mt-4 underline"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </Modal>
  );
}
