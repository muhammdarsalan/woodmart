import { formatPrice, formatDiscount } from '../../utils/formatPrice';

export default function PriceTag({
  price,
  originalPrice,
  size = 'md',
  showDiscount = true,
  className = '',
}) {
  const hasDiscount = originalPrice && originalPrice > price;
  const sizes = {
    sm: { price: 'text-base', original: 'text-sm' },
    md: { price: 'text-lg', original: 'text-sm' },
    lg: { price: 'text-2xl', original: 'text-base' },
  };

  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      <span className={`font-bold text-darktext ${sizes[size].price}`}>
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <>
          <span className={`text-beige-muted line-through ${sizes[size].original}`}>
            {formatPrice(originalPrice)}
          </span>
          {showDiscount && (
            <span className="text-xs font-semibold bg-gold text-darktext px-2 py-0.5 rounded">
              {formatDiscount(originalPrice, price)}
            </span>
          )}
        </>
      )}
    </div>
  );
}
