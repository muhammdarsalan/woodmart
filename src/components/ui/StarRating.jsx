import { Star } from 'lucide-react';
import { getStarArray } from '../../utils/helpers';

export default function StarRating({
  rating = 0,
  size = 'md',
  showCount = false,
  count = 0,
  interactive = false,
  onChange,
  className = '',
}) {
  const sizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const stars = getStarArray(rating);

  const handleClick = (index) => {
    if (interactive && onChange) onChange(index + 1);
  };

  return (
    <div className={`flex items-center gap-1 ${className}`} role={interactive ? 'radiogroup' : 'img'} aria-label={`Rating: ${rating} out of 5 stars`}>
      {stars.map((type, i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => handleClick(i)}
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} focus:outline-none focus:ring-2 focus:ring-gold rounded`}
          aria-label={interactive ? `Rate ${i + 1} stars` : undefined}
        >
          <Star
            className={`${sizes[size]} ${
              type === 'full'
                ? 'fill-gold text-gold'
                : type === 'half'
                  ? 'fill-gold/50 text-gold'
                  : 'fill-none text-beige-dark'
            }`}
          />
        </button>
      ))}
      {showCount && (
        <span className="text-sm text-brown-light ml-1">({count})</span>
      )}
    </div>
  );
}
