import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const items = useCartStore(state => state.items);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);

  if (items.length === 0) {
    return (
      <main className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-semibold text-primary">Your cart is empty</h1>
        <p className="mt-3 text-sm text-secondary">Add furniture pieces you love and come back here to checkout.</p>
        <Button as={Link} to="/shop" className="mt-6">Shop Products</Button>
      </main>
    );
  }

  return (
    <main className="container-page py-10">
      <h1 className="text-3xl font-semibold text-primary">Cart</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        <section>
          <div className="hidden border-b border-border-light pb-3 text-xs uppercase tracking-wide text-secondary md:grid md:grid-cols-[90px_1fr_120px_150px_120px_40px]">
            <span>Image</span><span>Name</span><span>Price</span><span>Qty</span><span>Total</span><span></span>
          </div>
          {items.map(item => <CartItem key={item.cartId} item={item} onRemove={removeItem} onQty={updateQuantity} />)}
        </section>
        <OrderSummary />
      </div>
    </main>
  );
}
