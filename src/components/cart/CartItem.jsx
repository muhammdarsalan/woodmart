import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/formatPrice';
import QuantitySelector from '../ui/QuantitySelector';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop';

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
};

export default function CartItem({ item, compact = false }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className={`flex gap-4 ${compact ? 'py-3' : 'p-4 bg-white rounded-lg border border-beige-dark'}`}>
      <Link to={`/shop/${item.slug}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className={`object-cover rounded ${compact ? 'w-16 h-16' : 'w-24 h-24'}`}
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/shop/${item.slug}`}>
          <h3 className={`font-serif text-darktext hover:text-gold transition-colors ${compact ? 'text-sm line-clamp-1' : 'text-lg'}`}>
            {item.name}
          </h3>
        </Link>
        <p className="text-xs text-brown-light mt-0.5">
          {item.material} · {item.selectedColor}
        </p>
        {!compact && (
          <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
            <QuantitySelector
              value={item.quantity}
              onChange={(qty) => updateQuantity(item.id, qty, item.selectedColor)}
              max={99}
            />
            <p className="font-bold text-darktext">{formatPrice(item.price * item.quantity)}</p>
          </div>
        )}
        {compact && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-brown-light">Qty: {item.quantity}</span>
            <span className="text-sm font-semibold text-darktext">{formatPrice(item.price * item.quantity)}</span>
          </div>
        )}
      </div>
      <button
        onClick={() => removeItem(item.id, item.selectedColor)}
        className="p-1 text-beige-muted hover:text-red-600 transition-colors self-start"
        aria-label="Remove item"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
