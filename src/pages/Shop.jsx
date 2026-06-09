import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFilter } from '../hooks/useFilter';
import { useUiStore } from '../store/uiStore';
import { categories } from '../data/categories';
import { getSubcategoryName } from '../data/products';
import FilterSidebar from '../components/shop/FilterSidebar';
import MobileFilterDrawer from '../components/shop/MobileFilterDrawer';
import SortBar from '../components/shop/SortBar';
import ProductGrid from '../components/shop/ProductGrid';
import ActiveFilters from '../components/shop/ActiveFilters';
import QuickViewModal from '../components/shop/QuickViewModal';
import Button from '../components/ui/Button';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const { filters, setFilter, clearFilters, paginatedProducts } = useFilter();
  const toggleFilterDrawer = useUiStore((s) => s.toggleFilterDrawer);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const { products, total, perPage, totalPages } = paginatedProducts;
  const showingFrom = total === 0 ? 0 : (filters.page - 1) * perPage + 1;
  const showingTo = Math.min(filters.page * perPage, total);

  const categorySlug = searchParams.get('category');
  const subcategorySlug = searchParams.get('subcategory');
  const selectedCategory = categories.find((c) => c.slug === categorySlug);
  const subcategoryName = categorySlug && subcategorySlug ? getSubcategoryName(categorySlug, subcategorySlug) : null;

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="section-dark bg-brown py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-beige-muted mb-2" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-gold">Shop</Link>
            {selectedCategory && (
              <>
                <span className="mx-2">/</span>
                <Link to={`/shop?category=${categorySlug}`} className="hover:text-gold">{selectedCategory.name}</Link>
              </>
            )}
            {subcategoryName && (
              <>
                <span className="mx-2">/</span>
                <span className="text-lighttext">{subcategoryName}</span>
              </>
            )}
          </nav>
          <h1 className="font-serif text-3xl md:text-4xl text-white">
            {subcategoryName ? subcategoryName : selectedCategory ? selectedCategory.name : 'Shop All Furniture'}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8">
          <div className="hidden lg:block">
            <FilterSidebar filters={filters} setFilter={setFilter} clearFilters={clearFilters} />
          </div>

          <div className="flex-1 min-w-0">
            <ActiveFilters filters={filters} setFilter={setFilter} clearFilters={clearFilters} />
            <SortBar
              filters={filters}
              setFilter={setFilter}
              showing={{ from: showingFrom, to: showingTo }}
              total={total}
              onFilterClick={toggleFilterDrawer}
            />
            <ProductGrid products={products} loading={loading} />

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.page <= 1}
                  onClick={() => setFilter('page', filters.page - 1)}
                  icon={ChevronLeft}
                >
                  Previous
                </Button>
                <span className="text-sm text-brown-light">
                  Page {filters.page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={filters.page >= totalPages}
                  onClick={() => setFilter('page', filters.page + 1)}
                  icon={ChevronRight}
                  iconPosition="right"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
        resultCount={total}
      />
      <QuickViewModal />
    </div>
  );
}
