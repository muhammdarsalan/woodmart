import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';
import { generateOrderNumber } from '../../utils/helpers';

export default function OrderSuccess({ orderNumber: propOrderNumber }) {
  const clearCart = useCartStore((s) => s.clearCart);
  const orderNumber = propOrderNumber || generateOrderNumber();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12 max-w-lg mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check className="w-10 h-10 text-brown" />
      </motion.div>

      <h2 className="font-serif text-3xl text-darktext mb-2">Order Placed Successfully!</h2>
      <p className="text-brown-light mb-2">Order Number</p>
      <p className="font-serif text-2xl text-gold mb-6">#{orderNumber}</p>
      <p className="text-brown-light mb-8">
        We&apos;ll WhatsApp you within 2 hours to confirm delivery details.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={`https://wa.me/923000000000?text=${encodeURIComponent(`Hi! I'd like to track my order #${orderNumber}`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button icon={MessageCircle} className="w-full sm:w-auto">
            Track on WhatsApp
          </Button>
        </a>
        <Link to="/shop">
          <Button variant="outline" className="w-full sm:w-auto">Continue Shopping</Button>
        </Link>
      </div>
    </motion.div>
  );
}
