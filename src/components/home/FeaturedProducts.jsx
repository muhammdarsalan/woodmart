import { Link } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';

export default function FeaturedProducts({ products }) {
  const featured = products.filter(product => product.isFeatured).slice(0, 8);
  return (
    <section className="section-space border-t border-border-light bg-white">
      <div className="container-page">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-primary">Featured Products</h2>
          <Link to="/shop" className="text-sm font-medium underline">View All</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} />)}
        </div>
      </div>
    </section>
  );
}
