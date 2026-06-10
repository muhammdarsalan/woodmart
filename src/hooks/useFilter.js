import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSubcategoryName } from '../data/products';
import useProducts from './useProducts';

const DEFAULT_MIN = 5000;
const DEFAULT_MAX = 500000;

export function useFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useProducts();

  const filters = useMemo(
    () => ({
      category: searchParams.get('category')?.split(',').filter(Boolean) || [],
      subcategory: searchParams.get('subcategory')?.split(',').filter(Boolean) || [],
      minPrice: Number(searchParams.get('minPrice')) || DEFAULT_MIN,
      maxPrice: Number(searchParams.get('maxPrice')) || DEFAULT_MAX,
      materials: searchParams.get('material')?.split(',').filter(Boolean) || [],
      colors: searchParams.get('color')?.split(',').filter(Boolean) || [],
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
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters.category.length) {
      result = result.filter((p) =>
        filters.category.some(
          (c) => p.category.toLowerCase().replace(/\s+/g, '-') === c.toLowerCase() ||
            p.category.toLowerCase() === c.toLowerCase().replace(/-/g, ' ')
        )
      );
    }

    if (filters.subcategory.length) {
      result = result.filter((p) => {
        const categorySlug = p.category.toLowerCase().replace(/\s+/g, '-');
        return filters.subcategory.some((s) => {
          const subcategoryName = getSubcategoryName(categorySlug, s);
          return p.subcategory.toLowerCase() === subcategoryName.toLowerCase() ||
                 p.subcategory.toLowerCase() === s.toLowerCase().replace(/-/g, ' ');
        });
      });
    }

    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    if (filters.materials.length) {
      result = result.filter((p) =>
        filters.materials.some((m) => p.material.toLowerCase() === m.toLowerCase())
      );
    }

    if (filters.colors.length) {
      result = result.filter((p) =>
        p.colors.some((c) =>
          filters.colors.some((fc) => c.name.toLowerCase() === fc.toLowerCase())
        )
      );
    }

    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating);
    }

    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [filters, products]);

  const paginatedProducts = useMemo(() => {
    const perPage = 10;
    const start = (filters.page - 1) * perPage;
    return {
      products: filteredProducts.slice(start, start + perPage),
      total: filteredProducts.length,
      perPage,
      totalPages: Math.ceil(filteredProducts.length / perPage) || 1,
    };
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
