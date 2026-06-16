import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import formatPrice from '../../utils/formatPrice';
import { useCartStore } from '../../store/cartStore';

export default function OrderSummary({ checkout = false }) {
  const subtotal = useCartStore(state => state.getSubtotal());
  const delivery = useCartStore(state => state.getDeliveryFee());
  const total = useCartStore(state => state.getTotal());
  return (
    <aside className="border border-border-light p-5">
      <h2 className="text-base font-semibold text-primary">Order Summary</h2>
      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-secondary">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between"><span className="text-secondary">Delivery</span><span>{delivery === 0 ? 'Free' : formatPrice(delivery)}</span></div>
        {!checkout && <input className="input-field mt-2 text-sm" placeholder="Promo code" />}
        <div className="border-t border-border-light pt-3">
          <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
      </div>
      {!checkout && <Button as={Link} to="/checkout" className="mt-5 w-full">PROCEED TO CHECKOUT</Button>}
    </aside>
  );
}
