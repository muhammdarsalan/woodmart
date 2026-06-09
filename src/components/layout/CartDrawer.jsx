import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/formatPrice';
import CartItem from '../cart/CartItem';
import Button from '../ui/Button';

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.getTotalItems());
  const subtotal = useCartStore((s) => s.getSubtotal());
  const deliveryFee = useCartStore((s) => s.getDeliveryFee());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brown/60 z-50"
            onClick={closeDrawer}
          />
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 bg-brown">
              <h2 className="font-serif text-xl text-lighttext">
                Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </h2>
              <button onClick={closeDrawer} className="p-1 text-lighttext hover:text-gold transition-colors" aria-label="Close cart">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 bg-white">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-beige-dark mb-4" />
                  <p className="text-brown-light text-lg">Your cart is empty</p>
                  <Link to="/shop" onClick={closeDrawer} className="mt-4">
                    <Button variant="dark">Start Shopping</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-beige">
                  {items.map((item) => (
                    <CartItem key={`${item.id}-${item.selectedColor}`} item={item} compact />
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-beige-dark p-5 space-y-4 bg-cream">
                <div className="flex justify-between text-sm">
                  <span className="text-brown-light">Subtotal</span>
                  <span className="font-bold text-darktext">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brown-light">Delivery</span>
                  <span className="font-bold text-darktext">
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                {subtotal <= 50000 && (
                  <p className="text-xs text-beige-muted">Free delivery on orders above PKR 50,000</p>
                )}
                <div className="flex gap-3">
                  <Link to="/cart" onClick={closeDrawer} className="flex-1">
                    <Button variant="outline" className="w-full bg-white border-darktext text-darktext">View Cart</Button>
                  </Link>
                  <Link to="/checkout" onClick={closeDrawer} className="flex-1">
                    <Button className="w-full bg-gold text-darktext hover:bg-gold-light border-gold">Checkout</Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
