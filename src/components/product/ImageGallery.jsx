import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85&auto=format&fit=crop';

const handleImageError = (e) => {
  if (!e || !e.target) return;
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
};

export default function ImageGallery({ images, name }) {
  const safeImages = Array.isArray(images) && images.length > 0 ? images : [FALLBACK_IMAGE, FALLBACK_IMAGE, FALLBACK_IMAGE, FALLBACK_IMAGE];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    setFadeKey((k) => k + 1);
  }, [activeIndex]);

  return (
    <div>
      <div className="hidden md:block">
        <div
          className="relative w-full h-[500px] overflow-hidden rounded-lg bg-beige cursor-zoom-in group"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={fadeKey}
              src={safeImages[activeIndex]}
              alt={name}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              onError={handleImageError}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isZoomed ? 'scale-110' : 'scale-100'}`}
              style={{ transformOrigin: 'center center' }}
            />
          </AnimatePresence>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4 text-darktext" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-4">
          {safeImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square rounded overflow-hidden border-2 transition-all ${
                activeIndex === i
                  ? 'border-gold shadow-lg scale-95'
                  : 'border-transparent hover:border-beige-dark opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img}
                alt={`${name} ${i + 1}`}
                loading="lazy"
                decoding="async"
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
              {activeIndex === i && (
                <span className="absolute inset-0 ring-2 ring-gold ring-inset rounded pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="md:hidden">
        <Swiper modules={[Pagination]} pagination={{ clickable: true }} className="rounded-lg">
          {safeImages.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={`${name} ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onError={handleImageError}
                className="w-full h-[500px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
