import ProductCard from '../ui/ProductCard';

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="border border-border-light py-16 text-center">
        <p className="text-sm text-secondary">No products match these filters.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
