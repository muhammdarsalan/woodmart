import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeliveryForm from '../components/checkout/DeliveryForm';
import OrderReview from '../components/checkout/OrderReview';
import OrderSuccess from '../components/checkout/OrderSuccess';
import PaymentForm from '../components/checkout/PaymentForm';
import StepIndicator from '../components/checkout/StepIndicator';
import Button from '../components/ui/Button';
import { useCartStore } from '../store/cartStore';
import formatPrice from '../utils/formatPrice';

const emptyDelivery = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  area: '',
  notes: ''
};

export default function Checkout() {
  const items = useCartStore(state => state.items);
  const subtotal = useCartStore(state => state.getSubtotal());
  const deliveryFee = useCartStore(state => state.getDeliveryFee());
  const total = useCartStore(state => state.getTotal());
  const clearCart = useCartStore(state => state.clearCart);
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState(emptyDelivery);
  const [payment, setPayment] = useState({ method: 'Cash on Delivery', paid: false });
  const [successId, setSuccessId] = useState('');

  const placeOrder = () => {
    const id = 'WM-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    const order = {
      id,
      date: new Date().toISOString(),
      customer: delivery,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod: payment.method,
      status: 'Pending'
    };
    const saved = JSON.parse(localStorage.getItem('woodmart-orders') || '[]');
    localStorage.setItem('woodmart-orders', JSON.stringify([order, ...saved]));
    clearCart();
    setSuccessId(id);
  };

  if (successId) {
    return <main className="container-page py-14"><OrderSuccess orderId={successId} /></main>;
  }

  if (items.length === 0) {
    return (
      <main className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-semibold text-primary">Your cart is empty</h1>
        <Button as={Link} to="/shop" className="mt-6">Continue Shopping</Button>
      </main>
    );
  }

  return (
    <main className="container-page py-10">
      <h1 className="mb-8 text-3xl font-semibold text-primary">Checkout</h1>
      <StepIndicator step={step} />
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <section className="border border-border-light p-5">
          {step === 1 && <DeliveryForm defaultValues={delivery} onSubmit={data => { setDelivery(data); setStep(2); }} />}
          {step === 2 && <PaymentForm defaultValue={payment} onBack={() => setStep(1)} onSubmit={data => { setPayment(data); setStep(3); }} />}
          {step === 3 && (
            <OrderReview
              delivery={delivery}
              payment={payment}
              items={items}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              onBack={() => setStep(2)}
              onSubmit={placeOrder}
            />
          )}
        </section>
        <aside className="border border-border-light p-5">
          <h2 className="text-base font-semibold">Items</h2>
          <div className="mt-4 space-y-3">
            {items.map(item => (
              <div key={item.cartId} className="flex justify-between gap-4 text-sm">
                <span>{item.name} x {item.qty}</span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
