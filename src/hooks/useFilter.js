import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCategorySlug } from '../data/categories';

export default function useFilter(products, perPage = 9) {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const material = searchParams.get('material') || '';
  const sort = searchParams.get('sort') || 'featured';
  const min = Number(searchParams.get('min') || 0);
  const max = Number(searchParams.get('max') || 0);
  const page = Math.max(1, Number(searchParams.get('page') || 1));
  const query = searchParams.get('q') || '';

  const result = useMemo(() => {
    let filtered = [...products];
    if (category) {
      filtered = filtered.filter(product => getCategorySlug(product.category) === category);
    }
    if (subcategory) {
      filtered = filtered.filter(product => getCategorySlug(product.subcategory) === subcategory);
    }
    if (material) {
      const materials = material.split(',').map(item => item.toLowerCase());
      filtered = filtered.filter(product => materials.includes(product.material.toLowerCase()));
    }
    if (query) {
      const lowered = query.toLowerCase();
      filtered = filtered.filter(product => [product.name, product.category, product.subcategory, product.material].join(' ').toLowerCase().includes(lowered));
    }
    if (min > 0) filtered = filtered.filter(product => product.price >= min);
    if (max > 0) filtered = filtered.filter(product => product.price <= max);
    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'newest') filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    if (sort === 'featured') filtered.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const safePage = Math.min(page, totalPages);
    const paginated = filtered.slice((safePage - 1) * perPage, safePage * perPage);
    return { filtered, paginated, totalPages, page: safePage };
  }, [products, category, subcategory, material, sort, min, max, page, query, perPage]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (typeof key === 'object' && key !== null) {
      Object.entries(key).forEach(([k, v]) => {
        if (v === '' || v === null || v === undefined) next.delete(k);
        else next.set(k, String(v));
      });
      next.set('page', '1');
    } else {
      if (value === '' || value === null || value === undefined) next.delete(key);
      else next.set(key, String(value));
      if (key !== 'page') next.set('page', '1');
    }
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams({});

  return {
    category,
    subcategory,
    material,
    sort,
    min,
    max,
    query,
    page: result.page,
    products: result.paginated,
    filteredProducts: result.filtered,
    totalPages: result.totalPages,
    updateParam,
    clearFilters
  };
}
