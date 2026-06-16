import { Link } from 'react-router-dom';
import ActiveFilters from '../components/shop/ActiveFilters';
import FilterSidebar from '../components/shop/FilterSidebar';
import MobileFilterDrawer from '../components/shop/MobileFilterDrawer';
import ProductGrid from '../components/shop/ProductGrid';
import QuickViewModal from '../components/shop/QuickViewModal';
import SortBar from '../components/shop/SortBar';
import Button from '../components/ui/Button';
import { getCategoryBySlug } from '../data/categories';
import useFilter from '../hooks/useFilter';
import useProducts from '../hooks/useProducts';

export default function Shop() {
  const allProducts = useProducts();
  const filters = useFilter(allProducts, 9);
  const category = filters.category ? getCategoryBySlug(filters.category) : null;

  return (
    <main className="bg-white">
      <section className="border-b border-border-light bg-bg-light py-10">
        <div className="container-page">
          <p className="text-xs text-secondary"><Link to="/">Home</Link> / Shop</p>
          <h1 className="mt-3 text-3xl font-semibold text-primary">{category?.name || 'Shop All Products'}</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-secondary">{category?.description || 'Browse premium sofas, beds, dining sets, wardrobes, tables, and chairs from Wood Mart.'}</p>
        </div>
      </section>
      <section className="container-page grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} />
        </div>
        <div>
          <SortBar count={filters.filteredProducts.length} sort={filters.sort} updateParam={filters.updateParam} />
          <ActiveFilters filters={filters} />
          <ProductGrid products={filters.products} />
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: filters.totalPages }, (_, index) => (
              <Button
                key={index + 1}
                type="button"
                variant={filters.page === index + 1 ? 'primary' : 'outline'}
                size="sm"
                onClick={() => filters.updateParam('page', index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </section>
      <MobileFilterDrawer filters={filters} />
      <QuickViewModal />
    </main>
  );
}
