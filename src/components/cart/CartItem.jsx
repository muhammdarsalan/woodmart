import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import QuantitySelector from '../ui/QuantitySelector';
import formatPrice from '../../utils/formatPrice';
import { handleImageError } from '../../utils/images';

export default function CartItem({ item, onRemove, onQty }) {
  return (
    <div className="grid gap-4 border-b border-border-light py-5 md:grid-cols-[90px_1fr_120px_150px_120px_40px] md:items-center">
      <img src={item.image} alt={item.name} loading="lazy" decoding="async" onError={handleImageError} className="h-24 w-24 object-cover" />
      <div>
        <Link to={'/shop/' + item.slug} className="text-sm font-medium text-primary">{item.name}</Link>
        <p className="mt-1 text-xs text-secondary">{item.category} | {item.color}</p>
      </div>
      <p className="text-sm">{formatPrice(item.price)}</p>
      <QuantitySelector value={item.qty} onChange={qty => onQty(item.cartId, qty)} />
      <p className="text-sm font-semibold">{formatPrice(item.price * item.qty)}</p>
      <button type="button" onClick={() => onRemove(item.cartId)} className="text-secondary hover:text-accent-red" aria-label="Remove">
        <Trash2 size={18} />
      </button>
    </div>
  );
}
