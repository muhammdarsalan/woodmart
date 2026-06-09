import { useState } from 'react';
import { Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';
import { formatPrice } from '../../utils/formatPrice';

export default function PromoCode() {
  const [code, setCode] = useState('');
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const removePromoCode = useCartStore((s) => s.removePromoCode);
  const promoCode = useCartStore((s) => s.promoCode);
  const promoDiscount = useCartStore((s) => s.promoDiscount);

  const handleApply = () => {
    const result = applyPromoCode(code);
    if (result.success) {
      toast.success(result.message);
      setCode('');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-beige-muted" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Promo code"
            className="w-full pl-10 pr-4 py-2.5 border border-beige-dark rounded-sm bg-cream text-darktext placeholder-beige-muted focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            aria-label="Promo code"
          />
        </div>
        <Button size="sm" variant="dark" onClick={handleApply} disabled={!code.trim()}>
          Apply
        </Button>
      </div>
      {promoCode && (
        <div className="flex items-center justify-between text-sm bg-green-50 px-3 py-2 rounded border border-green-200">
          <span className="text-green-800">{promoCode} applied (-{formatPrice(promoDiscount)})</span>
          <button onClick={removePromoCode} className="text-green-700 hover:text-red-600 text-xs underline">
            Remove
          </button>
        </div>
      )}
      <p className="text-xs text-beige-muted">Try WOODMART10 or NEWCUSTOMER</p>
    </div>
  );
}
