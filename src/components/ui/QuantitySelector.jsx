import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  const update = next => onChange(Math.min(max, Math.max(min, Number(next) || min)));
  return (
    <div className="inline-grid h-11 grid-cols-[40px_48px_40px] border border-border-light">
      <button type="button" onClick={() => update(value - 1)} className="flex items-center justify-center hover:bg-bg-light" aria-label="Decrease quantity">
        <Minus size={15} />
      </button>
      <input
        value={value}
        onChange={event => update(event.target.value)}
        className="border-x border-border-light text-center text-sm outline-none"
        aria-label="Quantity"
      />
      <button type="button" onClick={() => update(value + 1)} className="flex items-center justify-center hover:bg-bg-light" aria-label="Increase quantity">
        <Plus size={15} />
      </button>
    </div>
  );
}
