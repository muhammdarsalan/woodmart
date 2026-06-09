import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop';

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
};

export default function ImageGallery({ images, name }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div>
      <div className="hidden md:block">
        <div
          className="aspect-square overflow-hidden rounded-lg bg-beige mb-4 cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <img
            src={images[activeIndex]}
            alt={name}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            onError={handleImageError}
            className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
            style={{ transformOrigin: 'center center' }}
          />
        </div>
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-20 h-20 rounded overflow-hidden border-2 transition-colors ${activeIndex === i ? 'border-gold' : 'border-transparent hover:border-beige-dark'}`}
              aria-label={`View image ${i + 1}`}
            >
              <img src={img} alt="" loading="lazy" decoding="async" onError={handleImageError} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="md:hidden">
        <Swiper modules={[Pagination]} pagination={{ clickable: true }} className="rounded-lg">
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt={`${name} ${i + 1}`} loading="lazy" decoding="async" onError={handleImageError} className="w-full aspect-square object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
