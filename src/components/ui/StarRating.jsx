import { Star } from 'lucide-react';

export default function StarRating({ rating = 0, count, size = 14 }) {
  return (
    <div className="flex items-center gap-1 text-primary">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={size}
          className={star <= Math.round(rating) ? 'fill-primary' : 'text-border-light'}
          strokeWidth={1.6}
        />
      ))}
      {count !== undefined && <span className="ml-1 text-xs text-secondary">({count})</span>}
    </div>
  );
}
