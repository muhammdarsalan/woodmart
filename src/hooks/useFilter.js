import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, getSubcategoryName } from '../data/products';

const DEFAULT_MIN = 5000;
const DEFAULT_MAX = 500000;

const safeLower = (val) => {
  if (val == null) return '';
  return String(val).toLowerCase();
};

const safeIncludes = (arr, predicate) => {
  if (!Array.isArray(arr)) return false;
  return arr.some(predicate);
};

const safeTags = (tags) => (Array.isArray(tags) ? tags : []);

export function useFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => ({
      category: (searchParams.get('category') || '').split(',').filter(Boolean),
      subcategory: (searchParams.get('subcategory') || '').split(',').filter(Boolean),
      minPrice: Number(searchParams.get('minPrice')) || DEFAULT_MIN,
      maxPrice: Number(searchParams.get('maxPrice')) || DEFAULT_MAX,
      materials: (searchParams.get('material') || '').split(',').filter(Boolean),
      colors: (searchParams.get('color') || '').split(',').filter(Boolean),
      rating: Number(searchParams.get('rating')) || 0,
      inStockOnly: searchParams.get('inStock') === 'true',
      sortBy: searchParams.get('sort') || 'newest',
      page: Number(searchParams.get('page')) || 1,
      search: searchParams.get('search') || '',
    }),
    [searchParams]
  );

  const setFilter = useCallback(
    (key, value) => {
      try {
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
            next.delete(key);
          } else if (Array.isArray(value)) {
            next.set(key, value.join(','));
          } else {
            next.set(key, String(value));
          }
          if (key !== 'page') next.delete('page');
          return next;
        });
      } catch (err) {
        console.error('setFilter error:', err);
      }
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    try {
      setSearchParams({});
    } catch (err) {
      console.error('clearFilters error:', err);
    }
  }, [setSearchParams]);

  const filteredProducts = useMemo(() => {
    try {
      let result = Array.isArray(products) ? [...products] : [];

      if (filters.search) {
        const q = safeLower(filters.search);
        result = result.filter((p) => {
          const name = safeLower(p.name);
          const cat = safeLower(p.category);
          const mat = safeLower(p.material);
          return (
            name.includes(q) ||
            cat.includes(q) ||
            mat.includes(q) ||
            safeTags(p.tags).some((t) => safeLower(t).includes(q))
          );
        });
      }

      if (filters.category.length) {
        result = result.filter((p) =>
          safeIncludes(filters.category, (c) => {
            const pCatSlug = safeLower(p.category).replace(/\s+/g, '-');
            const cSlug = safeLower(c);
            const cDeSlug = cSlug.replace(/-/g, ' ');
            return pCatSlug === cSlug || safeLower(p.category) === cDeSlug;
          })
        );
      }

      if (filters.subcategory.length) {
        result = result.filter((p) => {
          const categorySlug = safeLower(p.category).replace(/\s+/g, '-');
          return safeIncludes(filters.subcategory, (s) => {
            const subcategoryName = getSubcategoryName(categorySlug, s) || s;
            return (
              safeLower(p.subcategory) === safeLower(subcategoryName) ||
              safeLower(p.subcategory) === safeLower(s).replace(/-/g, ' ')
            );
          });
        });
      }

      result = result.filter((p) => {
        const price = Number(p.price) || 0;
        return price >= filters.minPrice && price <= filters.maxPrice;
      });

      if (filters.materials.length) {
        result = result.filter((p) =>
          safeIncludes(filters.materials, (m) => safeLower(p.material) === safeLower(m))
        );
      }

      if (filters.colors.length) {
        result = result.filter((p) => {
          const colors = Array.isArray(p.colors) ? p.colors : [];
          return colors.some((c) => {
            const name = typeof c === 'string' ? c : c?.name;
            return safeIncludes(filters.colors, (fc) => safeLower(name) === safeLower(fc));
          });
        });
      }

      if (filters.rating > 0) {
        result = result.filter((p) => (Number(p.rating) || 0) >= filters.rating);
      }

      if (filters.inStockOnly) {
        result = result.filter((p) => p.inStock === true);
      }

      switch (filters.sortBy) {
        case 'price-low':
          result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
          break;
        case 'price-high':
          result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
          break;
        case 'popular':
          result.sort((a, b) => (Number(b.reviewCount) || 0) - (Number(a.reviewCount) || 0));
          break;
        case 'rating':
          result.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
          break;
        case 'newest':
        default:
          result.sort((a, b) => ((b.isNew ? 1 : 0)) - ((a.isNew ? 1 : 0)));
          break;
      }

      return result;
    } catch (err) {
      console.error('Filter error:', err);
      return Array.isArray(products) ? products : [];
    }
  }, [filters]);

  const paginatedProducts = useMemo(() => {
    try {
      const perPage = 10;
      const start = (filters.page - 1) * perPage;
      const total = filteredProducts.length;
      return {
        products: filteredProducts.slice(start, start + perPage),
        total,
        perPage,
        totalPages: Math.ceil(total / perPage) || 1,
      };
    } catch (err) {
      console.error('Pagination error:', err);
      return { products: [], total: 0, perPage: 10, totalPages: 1 };
    }
  }, [filteredProducts, filters.page]);

  return {
    filters,
    setFilter,
    clearFilters,
    filteredProducts,
    paginatedProducts,
  };
}

export default useFilter;
