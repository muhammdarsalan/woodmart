import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function OrderSuccess({ orderId }) {
  return (
    <div className="mx-auto max-w-xl border border-border-light p-8 text-center">
      <p className="text-sm uppercase tracking-wide text-secondary">Order Placed</p>
      <h1 className="mt-2 text-3xl font-semibold text-primary">{orderId}</h1>
      <p className="mt-4 text-sm leading-6 text-secondary">We will WhatsApp you within 2 hours to confirm your Wood Mart order.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button as="a" href="https://wa.me/923459229581" target="_blank" rel="noreferrer">WhatsApp</Button>
        <Button as={Link} to="/shop" variant="outline">Continue Shopping</Button>
      </div>
    </div>
  );
}
