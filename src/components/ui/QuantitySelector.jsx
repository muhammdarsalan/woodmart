import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  className = '',
}) {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={`inline-flex items-center border border-beige-dark rounded-sm ${className}`}>
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className="p-2 bg-beige text-darktext hover:bg-gold hover:text-darktext transition-colors disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-gold"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-4 py-2 min-w-[3rem] text-center font-medium text-darktext border-x border-beige-dark">
        {value}
      </span>
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className="p-2 bg-beige text-darktext hover:bg-gold hover:text-darktext transition-colors disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-gold"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
