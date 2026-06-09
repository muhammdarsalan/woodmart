import { X } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';

export default function ActiveFilters({ filters, setFilter, clearFilters }) {
  const tags = [];

  filters.category.forEach((c) => tags.push({ key: 'category', value: c, label: c.replace(/-/g, ' ') }));
  filters.subcategory.forEach((s) => tags.push({ key: 'subcategory', value: s, label: s }));
  filters.materials.forEach((m) => tags.push({ key: 'material', value: m, label: m }));
  filters.colors.forEach((c) => tags.push({ key: 'color', value: c, label: c }));
  if (filters.rating > 0) tags.push({ key: 'rating', value: filters.rating, label: `${filters.rating}★+` });
  if (filters.inStockOnly) tags.push({ key: 'inStock', value: 'true', label: 'In Stock' });
  if (filters.minPrice > 5000 || filters.maxPrice < 500000) {
    tags.push({
      key: 'price',
      value: 'range',
      label: `${formatPrice(filters.minPrice)} – ${formatPrice(filters.maxPrice)}`,
    });
  }

  if (tags.length === 0) return null;

  const removeTag = (tag) => {
    if (tag.key === 'price') {
      setFilter('minPrice', null);
      setFilter('maxPrice', null);
    } else if (tag.key === 'rating') {
      setFilter('rating', null);
    } else if (tag.key === 'inStock') {
      setFilter('inStock', null);
    } else {
      const current = filters[tag.key === 'material' ? 'materials' : tag.key === 'color' ? 'colors' : tag.key] || [];
      setFilter(tag.key === 'material' ? 'material' : tag.key, current.filter((v) => v !== tag.value));
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {tags.map((tag) => (
        <span
          key={`${tag.key}-${tag.value}`}
          className="inline-flex items-center gap-1 px-3 py-1 bg-beige text-darktext text-sm rounded-full capitalize"
        >
          {tag.label}
          <button onClick={() => removeTag(tag)} aria-label={`Remove ${tag.label} filter`}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button onClick={clearFilters} className="text-sm text-gold hover:text-gold-light underline">
        Clear all
      </button>
    </div>
  );
}
