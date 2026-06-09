import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../ui/ProductCard';
import { fadeInUp } from '../../utils/animations';
import 'swiper/css';
import 'swiper/css/navigation';

const tabs = ['All', 'Living Room', 'Bedroom', 'Office'];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered =
    activeTab === 'All'
      ? products.filter((p) => p.isFeatured)
      : products.filter((p) => p.isFeatured && p.category === activeTab);

  return (
    <section className="py-20 section-light bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="section-tag">Featured</span>
          <h2 className="font-serif text-3xl md:text-4xl text-darktext mt-2">Our Best Sellers</h2>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap bg-white rounded-lg p-2 border border-beige-dark inline-flex mx-auto w-full sm:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? 'border-gold text-darktext'
                  : 'border-transparent text-brown-light hover:text-darktext'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1.2}
            navigation={{
              prevEl: '.featured-prev',
              nextEl: '.featured-next',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {filtered.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="featured-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-darktext text-lighttext rounded-full flex items-center justify-center shadow-lg hover:bg-gold hover:text-darktext transition-colors hidden lg:flex" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="featured-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-darktext text-lighttext rounded-full flex items-center justify-center shadow-lg hover:bg-gold hover:text-darktext transition-colors hidden lg:flex" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
