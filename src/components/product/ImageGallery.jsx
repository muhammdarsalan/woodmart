import { useState } from 'react';
import { handleImageError } from '../../utils/images';

export default function ImageGallery({ product }) {
  const [active, setActive] = useState(product.images?.[0]);
  return (
    <div>
      <div className="flex aspect-square items-center justify-center bg-bg-light">
        <img src={active} alt={product.name} loading="eager" decoding="async" onError={handleImageError} className="h-full w-full object-contain" />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {product.images.map(image => (
          <button
            type="button"
            key={image}
            onClick={() => setActive(image)}
            className={'border p-1 ' + (active === image ? 'border-primary' : 'border-border-light')}
          >
            <img src={image} alt={product.name} loading="lazy" decoding="async" onError={handleImageError} className="aspect-square w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
