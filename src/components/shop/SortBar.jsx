import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
];

export default function SortBar({ filters, setFilter, showing, total, onFilterClick }) {
  const viewMode = useUiStore((s) => s.viewMode);
  const setViewMode = useUiStore((s) => s.setViewMode);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 py-4 px-4 bg-white border border-beige-dark rounded-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={onFilterClick}
          className="lg:hidden flex items-center gap-2 px-4 py-2 border border-beige-dark rounded text-sm text-darktext hover:border-gold transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
        <p className="text-sm text-brown-light">
          Showing {showing.from}–{showing.to} of {total} results
        </p>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={filters.sortBy}
          onChange={(e) => setFilter('sort', e.target.value)}
          className="px-3 py-2 border border-beige-dark rounded text-sm text-darktext bg-white focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Sort products"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <div className="hidden sm:flex border border-beige-dark rounded overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-darktext text-lighttext' : 'text-brown-light hover:bg-beige'}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-darktext text-lighttext' : 'text-brown-light hover:bg-beige'}`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
