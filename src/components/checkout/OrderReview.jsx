import Button from '../ui/Button';
import formatPrice from '../../utils/formatPrice';

export default function OrderReview({ delivery, payment, items, subtotal, deliveryFee, total, onBack, onSubmit }) {
  return (
    <div className="space-y-6">
      <section className="border border-border-light p-5">
        <h2 className="text-base font-semibold">Delivery Info</h2>
        <p className="mt-3 text-sm text-secondary">{delivery.fullName} | {delivery.phone}</p>
        <p className="mt-1 text-sm text-secondary">{delivery.address}, {delivery.area}, {delivery.city}</p>
      </section>
      <section className="border border-border-light p-5">
        <h2 className="text-base font-semibold">Payment</h2>
        <p className="mt-3 text-sm text-secondary">{payment.method}</p>
      </section>
      <section className="border border-border-light p-5">
        <h2 className="text-base font-semibold">Items</h2>
        <div className="mt-4 space-y-3">
          {items.map(item => (
            <div key={item.cartId} className="flex justify-between gap-4 text-sm">
              <span>{item.name} x {item.qty}</span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2 border-t border-border-light pt-4 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between"><span>Delivery</span><span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span></div>
          <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
      </section>
      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="outline" onClick={onBack}>Back</Button>
        <Button type="button" onClick={onSubmit}>PLACE ORDER</Button>
      </div>
    </div>
  );
}
