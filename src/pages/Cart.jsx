import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import EmptyCart from '../components/cart/EmptyCart';

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.getTotalItems());

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-serif text-3xl text-darktext mb-8">
          Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={`${item.id}-${item.selectedColor}`} item={item} />
              ))}
              <Link to="/shop" className="inline-block text-gold hover:text-gold-light text-sm mt-4">
                ← Continue Shopping
              </Link>
            </div>
            <div>
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
