import ProductCard from '../ui/ProductCard';

export default function NewArrivals({ products }) {
  const arrivals = products.filter(product => product.isNew).slice(0, 4);
  return (
    <section className="section-space bg-white">
      <div className="container-page">
        <h2 className="mb-8 text-2xl font-semibold text-primary">New Arrivals</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {arrivals.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
}
