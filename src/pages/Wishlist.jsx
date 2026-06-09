import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '../store/wishlistStore';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';

export default function Wishlist() {
  const wishlistItems = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);

  const fullProducts = wishlistItems
    .map((item) => products.find((p) => p.id === item.id))
    .filter(Boolean);

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-serif text-3xl text-darktext mb-8">
          My Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
        </h1>

        {fullProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-beige-dark mx-auto mb-4" />
            <h2 className="font-serif text-xl text-darktext mb-2">Nothing saved yet</h2>
            <p className="text-brown-light mb-6">Save items you love by clicking the heart icon.</p>
            <Link to="/shop">
              <Button variant="dark">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fullProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showMoveToCart
                onRemove={removeItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
