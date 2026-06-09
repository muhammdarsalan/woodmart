import { formatPrice } from '../../utils/formatPrice';
import Button from '../ui/Button';

const paymentLabels = {
  cod: 'Cash on Delivery',
  bank: 'Bank Transfer',
  easypaisa: 'Easypaisa',
  jazzcash: 'JazzCash',
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop';

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
};

export default function OrderReview({ delivery, payment, items, subtotal, deliveryFee, discount, total, onBack, onPlaceOrder }) {
  return (
    <div className="space-y-6">
      <div className="bg-beige rounded-lg p-5">
        <h3 className="font-serif text-lg text-darktext mb-3">Delivery Information</h3>
        <div className="text-sm text-brown-light space-y-1">
          <p className="font-medium text-darktext">{delivery.fullName}</p>
          <p>{delivery.phone}</p>
          {delivery.email && <p>{delivery.email}</p>}
          <p>{delivery.address1}{delivery.address2 ? `, ${delivery.address2}` : ''}</p>
          <p>{delivery.area}, {delivery.city}</p>
          {delivery.notes && <p className="italic">Note: {delivery.notes}</p>}
        </div>
      </div>

      <div className="bg-beige rounded-lg p-5">
        <h3 className="font-serif text-lg text-darktext mb-2">Payment Method</h3>
        <p className="text-sm text-brown-light">{paymentLabels[payment]}</p>
      </div>

      <div>
        <h3 className="font-serif text-lg text-darktext mb-4">Order Items</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={`${item.id}-${item.selectedColor}`} className="flex gap-4 items-center">
              <img src={item.image} alt={item.name} loading="lazy" decoding="async" onError={handleImageError} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className="font-medium text-darktext text-sm">{item.name}</p>
                <p className="text-xs text-brown-light">{item.selectedColor} · Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-darktext text-sm">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-beige-dark pt-4 space-y-2 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between"><span>Delivery</span><span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span></div>
        {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
        <div className="flex justify-between font-serif text-lg font-bold text-darktext pt-2 border-t border-beige-dark">
          <span>Total</span><span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button size="lg" onClick={onPlaceOrder}>Place Order</Button>
      </div>
    </div>
  );
}
