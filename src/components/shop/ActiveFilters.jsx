import { X } from 'lucide-react';
import { categories } from '../../data/categories';

export default function ActiveFilters({ filters }) {
  const chips = [];
  if (filters.category) chips.push({ key: 'category', label: categories.find(item => item.slug === filters.category)?.name || filters.category });
  if (filters.material) chips.push({ key: 'material', label: filters.material.split(',').join(', ') });
  if (filters.min) chips.push({ key: 'min', label: 'Min ' + filters.min });
  if (filters.max) chips.push({ key: 'max', label: 'Max ' + filters.max });
  if (!chips.length) return null;
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      {chips.map(chip => (
        <button key={chip.key} type="button" onClick={() => filters.updateParam(chip.key, '')} className="inline-flex items-center gap-2 bg-bg-light px-3 py-2 text-xs text-primary">
          {chip.label}
          <X size={13} />
        </button>
      ))}
      <button type="button" onClick={filters.clearFilters} className="text-xs font-medium underline">Clear all</button>
    </div>
  );
}
