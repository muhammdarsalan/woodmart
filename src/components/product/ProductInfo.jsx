import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, MessageCircle, Link2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Badge from '../ui/Badge';
import StarRating from '../ui/StarRating';
import PriceTag from '../ui/PriceTag';
import QuantitySelector from '../ui/QuantitySelector';
import Button from '../ui/Button';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { getEstimatedDelivery } from '../../utils/helpers';

const badgeTypeMap = {
  New: 'new',
  Sale: 'sale',
  Bestseller: 'bestseller',
  'Top Rated': 'toprated',
};

export default function ProductInfo({ product, onReviewsClick }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const addToCart = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const delivery = getEstimatedDelivery('Islamabad');
  const productUrl = window.location.href;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    openDrawer();
    toast.success('Added to cart');
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product);
    toast.success(added ? 'Added to wishlist' : 'Removed from wishlist');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(productUrl);
    toast.success('Link copied!');
  };

  return (
    <div>
      <nav className="text-sm text-brown-light mb-4" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-gold">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?category=${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-gold">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-darktext">{product.name}</span>
      </nav>

      {product.badge && (
        <div className="relative inline-block mb-3">
          <Badge type={badgeTypeMap[product.badge] || 'new'} text={product.badge} className="!relative !top-0 !left-0" />
        </div>
      )}

      <h1 className="font-serif text-3xl text-darktext">{product.name}</h1>

      <button onClick={onReviewsClick} className="mt-2">
        <StarRating rating={product.rating} showCount count={product.reviewCount} />
      </button>

      <p className="text-sm text-beige-muted mt-2">SKU: {product.sku}</p>

      <PriceTag price={product.price} originalPrice={product.originalPrice} size="lg" className="mt-4" />

      <p className="text-brown-light mt-4 leading-relaxed">{product.shortDesc}</p>

      <p className="text-sm text-brown-light mt-2">
        <span className="font-medium">Material:</span> {product.material}
      </p>

      {product.colors?.length > 0 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-darktext mb-2">Color: {selectedColor}</p>
          <div className="flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === c.name ? 'border-gold ring-2 ring-gold ring-offset-2' : 'border-beige-dark'}`}
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 overflow-x-auto">
        <table className="text-sm text-brown-light w-full">
          <tbody>
            <tr className="border-b border-beige-dark">
              <td className="py-2 font-medium">Width</td>
              <td className="py-2">{product.dimensions.width} {product.dimensions.unit}</td>
            </tr>
            <tr className="border-b border-beige-dark">
              <td className="py-2 font-medium">Height</td>
              <td className="py-2">{product.dimensions.height} {product.dimensions.unit}</td>
            </tr>
            <tr className="border-b border-beige-dark">
              <td className="py-2 font-medium">Depth</td>
              <td className="py-2">{product.dimensions.depth} {product.dimensions.unit}</td>
            </tr>
            <tr>
              <td className="py-2 font-medium">Weight</td>
              <td className="py-2">{product.weight}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <QuantitySelector value={quantity} onChange={setQuantity} max={product.stockCount} />
      </div>

      <div className="flex gap-3 mt-6">
        <Button className="flex-1" size="lg" variant="dark" onClick={handleAddToCart} disabled={!product.inStock}>
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <Button variant="outline" size="lg" onClick={handleWishlist}>
          {isInWishlist(product.id) ? '♥ Saved' : '♡ Wishlist'}
        </Button>
      </div>

      <div className="mt-6 p-4 bg-beige rounded-lg text-sm">
        <p className="text-green-700 font-medium">✓ Free delivery in Islamabad</p>
        <p className="text-brown-light mt-1">Estimated delivery: {delivery.date} ({delivery.days} working days)</p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-sm text-brown-light flex items-center gap-1">
          <Share2 className="w-4 h-4" /> Share:
        </span>
        <a
          href={`https://wa.me/923000000000?text=${encodeURIComponent(`Hi! I'm interested in ${product.name} - ${productUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-beige rounded transition-colors"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-green-600" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-beige rounded transition-colors"
          aria-label="Share on Facebook"
        >
          <Share2 className="w-5 h-5 text-blue-600" />
        </a>
        <button onClick={copyLink} className="p-2 hover:bg-beige rounded transition-colors" aria-label="Copy link">
          <Link2 className="w-5 h-5 text-brown" />
        </button>
      </div>
    </div>
  );
}
