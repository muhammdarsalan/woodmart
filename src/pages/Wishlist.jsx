import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

export default function Wishlist() {
  const items = useWishlistStore(state => state.items);
  const removeItem = useWishlistStore(state => state.removeItem);
  const addItem = useCartStore(state => state.addItem);

  if (!items.length) {
    return (
      <main className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-semibold text-primary">Your wishlist is empty</h1>
        <p className="mt-3 text-sm text-secondary">Save your favorite products and compare them later.</p>
        <Button as={Link} to="/shop" className="mt-6">Browse Products</Button>
      </main>
    );
  }

  return (
    <main className="container-page py-10">
      <h1 className="text-3xl font-semibold text-primary">Wishlist</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(product => (
          <div key={product.id} className="relative">
            <button type="button" onClick={() => removeItem(product.id)} className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center bg-white shadow-sm" aria-label="Remove">
              <X size={16} />
            </button>
            <ProductCard product={product} />
            <Button type="button" variant="outline" className="mt-3 w-full" onClick={() => { addItem(product); toast.success('Moved to cart'); }}>
              Move to Cart
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
