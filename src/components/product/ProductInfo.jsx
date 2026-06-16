import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import QuantitySelector from '../ui/QuantitySelector';
import StarRating from '../ui/StarRating';
import formatPrice from '../../utils/formatPrice';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';

export default function ProductInfo({ product }) {
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors?.[0]?.name || 'Default');
  const addItem = useCartStore(state => state.addItem);
  const toggleItem = useWishlistStore(state => state.toggleItem);
  const inWishlist = useWishlistStore(state => state.isInWishlist(product.id));

  const addToCart = () => {
    addItem(product, qty, color);
    toast.success('Added to cart');
  };

  return (
    <div>
      <div className="mb-4 text-xs text-secondary">
        <Link to="/">Home</Link> / <Link to={'/shop?category=' + product.category.toLowerCase().replaceAll(' ', '-')}>{product.category}</Link> / <span className="text-primary">{product.name}</span>
      </div>
      <h1 className="text-2xl font-medium text-primary">{product.name}</h1>
      <div className="mt-3 flex items-center gap-3">
        <StarRating rating={product.rating} count={product.reviewCount} />
        <span className="text-xs text-secondary">SKU: {product.sku}</span>
      </div>
      <div className="mt-5 flex items-end gap-3">
        <p className="text-3xl font-semibold text-primary">{formatPrice(product.price)}</p>
        {product.originalPrice > product.price && <p className="pb-1 text-sm text-secondary line-through">{formatPrice(product.originalPrice)}</p>}
      </div>
      <div className="my-6 border-t border-border-light" />
      <div>
        <p className="mb-3 text-sm font-medium">Color: {color}</p>
        <div className="flex gap-2">
          {product.colors.map(item => (
            <button
              key={item.name}
              type="button"
              onClick={() => setColor(item.name)}
              className={'h-8 w-8 rounded-full border-2 ' + (color === item.name ? 'border-primary' : 'border-white ring-1 ring-border-light')}
              style={{ backgroundColor: item.hex }}
              aria-label={item.name}
            />
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <QuantitySelector value={qty} onChange={setQty} max={product.stockCount} />
        <span className="text-sm text-secondary">{product.stockCount} in stock</span>
      </div>
      <Button onClick={addToCart} className="mt-6 w-full">ADD TO CART</Button>
      <button
        type="button"
        onClick={() => { const added = toggleItem(product); toast.success(added ? 'Added to wishlist' : 'Removed from wishlist'); }}
        className="mt-4 flex items-center gap-2 text-sm font-medium text-primary"
      >
        <Heart size={17} className={inWishlist ? 'fill-primary' : ''} />
        Add to Wishlist
      </button>
      <div className="my-6 border-t border-border-light" />
      <dl className="grid gap-3 text-sm">
        <div className="flex justify-between gap-4"><dt className="text-secondary">Material</dt><dd className="font-medium">{product.material}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-secondary">Dimensions</dt><dd className="font-medium">{product.dimensions.width}W x {product.dimensions.height}H x {product.dimensions.depth}D {product.dimensions.unit}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-secondary">Weight</dt><dd className="font-medium">{product.weight}</dd></div>
        <div className="flex justify-between gap-4"><dt className="text-secondary">Warranty</dt><dd className="font-medium">15 years solid wood</dd></div>
      </dl>
      <p className="mt-6 text-sm leading-7 text-secondary">{product.shortDesc}</p>
    </div>
  );
}
