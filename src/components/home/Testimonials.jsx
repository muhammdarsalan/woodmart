import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { fadeInUp } from '../../utils/animations';
import 'swiper/css';
import 'swiper/css/pagination';

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28" style={{ background: '#FDFAF4' }}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag">Testimonials</span>
          <h2 className="font-serif text-3xl md:text-5xl text-darktext mt-3 mb-3">What Our Clients Say</h2>
          <p className="text-brown-light max-w-2xl mx-auto">
            Real stories from real Pakistani families who furnished their homes with Wood Mart.
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={t.id} className="h-auto">
              <motion.div
                variants={i % 2 === 0 ? slideFromLeft : slideFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 md:p-8 shadow-md hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col"
                style={{ borderLeft: '4px solid #C49A2A' }}
              >
                <Quote className="w-8 h-8 text-gold mb-4 opacity-30" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote
                  className="text-darktext leading-relaxed mb-6 flex-1 italic"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  &ldquo;{t.comment}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-beige-dark">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-darktext font-bold text-sm shrink-0"
                    style={{ background: '#C49A2A' }}
                  >
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-darktext text-sm">{t.name}</p>
                    <p className="text-gold text-xs font-medium">{t.city}</p>
                    <p className="text-brown-light text-xs italic mt-0.5 truncate">Bought: {t.product}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
