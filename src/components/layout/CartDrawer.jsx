import { Dialog, DialogPanel } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { X, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import QuantitySelector from '../ui/QuantitySelector';
import formatPrice from '../../utils/formatPrice';
import { handleImageError } from '../../utils/images';
import { useCartStore } from '../../store/cartStore';

export default function CartDrawer() {
  const isOpen = useCartStore(state => state.isDrawerOpen);
  const closeDrawer = useCartStore(state => state.closeDrawer);
  const items = useCartStore(state => state.items);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const subtotal = useCartStore(state => state.getSubtotal());

  return (
    <Dialog open={isOpen} onClose={closeDrawer} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <DialogPanel className="fixed inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-soft">
        <div className="flex h-16 items-center justify-between border-b border-border-light px-5">
          <h2 className="text-base font-semibold">Cart</h2>
          <button type="button" onClick={closeDrawer} className="p-2" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm text-secondary">Your cart is empty.</p>
              <Button as={Link} to="/shop" onClick={closeDrawer} className="mt-4">Shop Now</Button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map(item => (
                <div key={item.cartId} className="grid grid-cols-[82px_1fr] gap-4">
                  <img src={item.image} alt={item.name} loading="lazy" decoding="async" onError={handleImageError} className="h-20 w-20 object-cover" />
                  <div>
                    <div className="flex justify-between gap-3">
                      <Link to={'/shop/' + item.slug} onClick={closeDrawer} className="text-sm font-medium text-primary">{item.name}</Link>
                      <button type="button" onClick={() => removeItem(item.cartId)} className="text-secondary hover:text-accent-red" aria-label="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-secondary">{item.color}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <QuantitySelector value={item.qty} onChange={qty => updateQuantity(item.cartId, qty)} />
                      <span className="text-sm font-semibold">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-border-light p-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-secondary">Subtotal</span>
              <span className="font-semibold text-primary">{formatPrice(subtotal)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button as={Link} to="/cart" onClick={closeDrawer} variant="outline">View Cart</Button>
              <Button as={Link} to="/checkout" onClick={closeDrawer}>Checkout</Button>
            </div>
          </div>
        )}
      </DialogPanel>
    </Dialog>
  );
}
