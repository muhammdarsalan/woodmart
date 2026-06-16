import Button from '../ui/Button';
import { categories } from '../../data/categories';

const materials = ['Sheesham', 'Teak', 'MDF', 'Walnut', 'Oak', 'Pine'];

export default function FilterSidebar({ filters }) {
  const selectedMaterials = filters.material ? filters.material.split(',') : [];
  const toggleMaterial = material => {
    const lowered = material.toLowerCase();
    const next = selectedMaterials.includes(lowered)
      ? selectedMaterials.filter(item => item !== lowered)
      : [...selectedMaterials, lowered];
    filters.updateParam('material', next.join(','));
  };

  return (
    <aside className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-semibold text-primary">Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <label key={category.id} className="flex cursor-pointer items-center gap-3 text-sm text-secondary">
              <input
                type="checkbox"
                checked={filters.category === category.slug}
                onChange={() => {
                  const isSelected = filters.category === category.slug;
                  filters.updateParam({
                    category: isSelected ? '' : category.slug,
                    subcategory: ''
                  });
                }}
                className="h-4 w-4 accent-primary"
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-semibold text-primary">Price Range</h3>
        <div className="grid grid-cols-2 gap-3">
          <input className="input-field text-sm" type="number" min="0" placeholder="Min" defaultValue={filters.min || ''} onBlur={event => filters.updateParam('min', event.target.value)} />
          <input className="input-field text-sm" type="number" min="0" placeholder="Max" defaultValue={filters.max || ''} onBlur={event => filters.updateParam('max', event.target.value)} />
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-semibold text-primary">Material</h3>
        <div className="space-y-3">
          {materials.map(material => (
            <label key={material} className="flex cursor-pointer items-center gap-3 text-sm text-secondary">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material.toLowerCase())}
                onChange={() => toggleMaterial(material)}
                className="h-4 w-4 accent-primary"
              />
              {material}
            </label>
          ))}
        </div>
      </div>
      <Button type="button" variant="outline" onClick={filters.clearFilters} className="w-full">Clear All</Button>
    </aside>
  );
}
