import ProductCard from '../ui/ProductCard';
import useProducts from '../../hooks/useProducts';

export default function RelatedProducts({ product }) {
  const products = useProducts();
  const related = products.filter(item => item.category === product.category && item.id !== product.id).slice(0, 4);
  if (!related.length) return null;
  return (
    <section className="section-space border-t border-border-light bg-white">
      <div className="container-page">
        <h2 className="mb-8 text-2xl font-semibold text-primary">Related Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map(item => <ProductCard key={item.id} product={item} />)}
        </div>
      </div>
    </section>
  );
}
