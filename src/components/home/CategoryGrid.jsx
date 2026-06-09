import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories';
import { fadeInUp, staggerContainer, scaleIn } from '../../utils/animations';

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="section-tag">Collections</span>
            <h2 className="font-serif text-3xl md:text-4xl text-darktext mt-2">Shop by Room</h2>
          </div>
          <Link to="/shop" className="text-gold hover:text-gold-light font-medium text-sm flex items-center gap-1 transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              variants={scaleIn}
              className={index === 0 ? 'sm:col-span-2' : ''}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group relative block aspect-[16/10] rounded-lg overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(0deg, rgba(28,10,0,0.90) 0%, rgba(28,10,0,0.2) 60%, transparent 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="text-2xl mb-2 block">{cat.icon}</span>
                  <h3 className="font-serif text-xl text-white">{cat.name}</h3>
                  <p className="text-white/60 text-sm mt-1">{cat.productCount} products</p>
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gold text-darktext rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
