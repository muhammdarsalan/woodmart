import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { categories } from '../../data/categories';
import { materials, products } from '../../data/products';
import PriceRangeSlider from './PriceRangeSlider';

const allColors = [...new Map(
  products.flatMap((p) => p.colors.map((c) => [c.name, c]))
).values()];

function AccordionSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-beige-dark py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left font-semibold text-darktext"
      >
        {title}
        <ChevronDown className={`w-4 h-4 text-brown-light transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ filters, setFilter, clearFilters }) {
  const toggleArrayFilter = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilter(key, updated);
  };

  return (
    <aside className="w-full lg:w-[280px] shrink-0 bg-white border border-beige-dark rounded-lg p-4 lg:border-r lg:rounded-none lg:border-0 lg:pr-6 lg:bg-transparent">
      <h3 className="font-serif text-lg text-darktext mb-4">Filters</h3>

      <AccordionSection title="Categories">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((cat) => (
            <div key={cat.id}>
              <label className="flex items-center gap-2 text-sm text-brown-light cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category.includes(cat.slug)}
                  onChange={() => toggleArrayFilter('category', cat.slug)}
                  className="rounded border-beige-dark accent-gold"
                />
                {cat.name}
              </label>
              <div className="ml-6 mt-1 space-y-1">
                {cat.subcategories.map((sub) => (
                  <label key={sub.slug} className="flex items-center gap-2 text-xs text-brown-light cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.subcategory.includes(sub.slug)}
                      onChange={() => toggleArrayFilter('subcategory', sub.slug)}
                      className="rounded border-beige-dark accent-gold"
                    />
                    {sub.name}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Price Range">
        <PriceRangeSlider
          min={5000}
          max={500000}
          minValue={filters.minPrice}
          maxValue={filters.maxPrice}
          onChange={(min, max) => {
            setFilter('minPrice', min);
            setFilter('maxPrice', max);
          }}
        />
      </AccordionSection>

      <AccordionSection title="Material">
        <div className="space-y-2">
          {materials.map((mat) => (
            <label key={mat} className="flex items-center gap-2 text-sm text-brown-light cursor-pointer">
              <input
                type="checkbox"
                checked={filters.materials.includes(mat)}
                onChange={() => toggleArrayFilter('material', mat)}
                className="rounded border-beige-dark accent-gold"
              />
              {mat}
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Color">
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleArrayFilter('color', color.name)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                filters.colors.includes(color.name)
                  ? 'border-gold ring-2 ring-gold ring-offset-2'
                  : 'border-beige-dark'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`Filter by ${color.name}`}
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Rating">
        <div className="space-y-2">
          {[
            { value: 4, label: '4★ & above' },
            { value: 3, label: '3★ & above' },
            { value: 0, label: 'All ratings' },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm text-brown-light cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === opt.value}
                onChange={() => setFilter('rating', opt.value)}
                className="accent-gold"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Availability">
        <label className="flex items-center gap-2 text-sm text-brown-light cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilter('inStock', e.target.checked ? 'true' : null)}
            className="rounded border-beige-dark accent-gold"
          />
          In Stock only
        </label>
      </AccordionSection>

      <button
        onClick={clearFilters}
        className="w-full mt-4 py-2 text-sm font-medium text-gold hover:text-gold-light transition-colors"
      >
        Clear All Filters
      </button>
    </aside>
  );
}
