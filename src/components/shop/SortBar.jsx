import { SlidersHorizontal } from 'lucide-react';
import Button from '../ui/Button';
import { useUiStore } from '../../store/uiStore';

export default function SortBar({ count, sort, updateParam }) {
  const toggleFilterDrawer = useUiStore(state => state.toggleFilterDrawer);
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border-light pb-4">
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" size="sm" onClick={toggleFilterDrawer} className="lg:hidden">
          <SlidersHorizontal size={16} />
          Filters
        </Button>
        <p className="text-sm text-secondary">{count} products</p>
      </div>
      <select value={sort} onChange={event => updateParam('sort', event.target.value)} className="input-field w-48 text-sm">
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="rating">Top Rated</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}
