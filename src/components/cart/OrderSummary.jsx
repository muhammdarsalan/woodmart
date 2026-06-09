import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../ui/Button';
import PromoCode from './PromoCode';

export default function OrderSummary({ showCheckoutButton = true }) {
  const subtotal = useCartStore((s) => s.getSubtotal());
  const deliveryFee = useCartStore((s) => s.getDeliveryFee());
  const total = useCartStore((s) => s.getTotal());
  const promoDiscount = useCartStore((s) => s.promoDiscount);

  return (
    <div className="bg-white rounded-lg border border-beige-dark p-6 sticky top-28">
      <h3 className="font-serif text-xl text-darktext mb-6">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-brown-light">Subtotal</span>
          <span className="font-medium text-darktext">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brown-light">Delivery</span>
          <span className="font-medium text-darktext">
            {deliveryFee === 0 ? (
              <span className="text-green-700">FREE</span>
            ) : (
              formatPrice(deliveryFee)
            )}
          </span>
        </div>
        {promoDiscount > 0 && (
          <div className="flex justify-between text-green-700">
            <span>Discount</span>
            <span>-{formatPrice(promoDiscount)}</span>
          </div>
        )}
      </div>

      <div className="my-6">
        <PromoCode />
      </div>

      <div className="border-t border-beige-dark pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-serif text-lg text-darktext">Total</span>
          <span className="font-serif font-bold text-darktext" style={{ fontSize: '1.3rem' }}>{formatPrice(total)}</span>
        </div>
      </div>

      {showCheckoutButton && (
        <Link to="/checkout">
          <Button className="w-full" size="lg">Proceed to Checkout</Button>
        </Link>
      )}

      <div className="mt-6 pt-4 border-t border-beige-dark">
        <p className="text-xs text-beige-muted text-center mb-3">Accepted Payments</p>
        <div className="flex justify-center gap-3 flex-wrap">
          {['COD', 'Bank Transfer', 'Easypaisa', 'JazzCash'].map((method) => (
            <span key={method} className="text-xs px-2 py-1 bg-beige rounded text-brown-light">
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
