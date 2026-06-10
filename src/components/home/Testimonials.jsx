import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/testimonials';
import StarRating from '../ui/StarRating';
import { fadeInUp } from '../../utils/animations';
import 'swiper/css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop';

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
};

export default function Testimonials() {
  return (
    <section className="py-20 section-light bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag">Testimonials</span>
          <h2 className="font-serif text-3xl md:text-4xl text-darktext mt-2">What Our Clients Say</h2>
        </motion.div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white rounded-lg p-6 border border-beige-dark h-full">
                <StarRating rating={t.rating} size="sm" className="mb-4" />
                <blockquote className="font-serif text-darktext leading-relaxed mb-6">
                  &ldquo;{t.comment}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} loading="lazy" decoding="async" onError={handleImageError} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-darktext text-sm">{t.name}</p>
                    <p className="text-brown-light text-xs">{t.city} · <span className="text-gold">{t.product}</span></p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
