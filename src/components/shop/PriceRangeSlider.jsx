export default function PriceRangeSlider({ min, max, minValue, maxValue, onChange }) {
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1000);
    onChange(value, maxValue);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1000);
    onChange(minValue, value);
  };

  return (
    <div className="space-y-4">
      <div className="relative h-2">
        <div className="absolute inset-0 bg-beige-dark rounded" />
        <div
          className="absolute h-full bg-gold rounded"
          style={{
            left: `${((minValue - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brown"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-brown"
          aria-label="Maximum price"
        />
      </div>
      <div className="flex gap-3">
        <input
          type="number"
          value={minValue}
          onChange={(e) => onChange(Number(e.target.value), maxValue)}
          className="w-full px-3 py-2 border border-beige-dark rounded text-sm text-brown focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Minimum price input"
        />
        <span className="text-brown/40 self-center">—</span>
        <input
          type="number"
          value={maxValue}
          onChange={(e) => onChange(minValue, Number(e.target.value))}
          className="w-full px-3 py-2 border border-beige-dark rounded text-sm text-brown focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Maximum price input"
        />
      </div>
    </div>
  );
}
