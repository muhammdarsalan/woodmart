import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import StepIndicator from '../components/checkout/StepIndicator';
import DeliveryForm from '../components/checkout/DeliveryForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderReview from '../components/checkout/OrderReview';
import OrderSuccess from '../components/checkout/OrderSuccess';
import { generateOrderNumber } from '../utils/helpers';

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const deliveryFee = useCartStore((s) => s.getDeliveryFee());
  const total = useCartStore((s) => s.getTotal());
  const promoDiscount = useCartStore((s) => s.promoDiscount);

  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState(null);
  const [payment, setPayment] = useState('cod');
  const [orderNumber, setOrderNumber] = useState(null);

  if (items.length === 0 && !orderNumber) {
    return <Navigate to="/cart" replace />;
  }

  if (orderNumber) {
    return (
      <div className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <OrderSuccess orderNumber={orderNumber} />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="font-serif text-3xl text-darktext text-center mb-8">Checkout</h1>
        <StepIndicator currentStep={step} />

        <div className="bg-white border border-beige-dark rounded-lg p-6 md:p-8">
          {step === 1 && (
            <DeliveryForm
              defaultValues={delivery}
              onSubmit={(data) => {
                setDelivery(data);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <PaymentForm
              defaultMethod={payment}
              onBack={() => setStep(1)}
              onSubmit={(method) => {
                setPayment(method);
                setStep(3);
              }}
            />
          )}
          {step === 3 && (
            <OrderReview
              delivery={delivery}
              payment={payment}
              items={items}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              discount={promoDiscount}
              total={total}
              onBack={() => setStep(2)}
              onPlaceOrder={() => setOrderNumber(generateOrderNumber())}
            />
          )}
        </div>
      </div>
    </div>
  );
}
