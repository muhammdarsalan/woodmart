import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { handleImageError } from '../../utils/images';

export default function CategoryGrid() {
  return (
    <section className="section-space bg-white">
      <div className="container-page">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-secondary">Collections</p>
            <h2 className="mt-2 text-2xl font-semibold text-primary">Shop by Category</h2>
          </div>
          <Link to="/shop" className="text-sm font-medium underline">View All</Link>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar md:flex-wrap md:justify-center md:overflow-x-visible md:pb-0">
          {categories.map(category => (
            <Link key={category.id} to={'/shop?category=' + category.slug} className="group flex-shrink-0 w-[240px] sm:w-[260px] md:w-[200px] lg:flex-1 lg:max-w-[170px] border border-border-light bg-white p-3 transition hover:border-primary">
              <img src={category.image} alt={category.name} loading="lazy" decoding="async" onError={handleImageError} className="aspect-square w-full object-cover" />
              <div className="flex items-center justify-between px-1 py-4">
                <h3 className="text-base font-medium text-primary">{category.name}</h3>
                <span className="text-xs text-secondary">{category.subcategories.length} types</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
