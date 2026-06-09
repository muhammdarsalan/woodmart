import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from '../../utils/animations';
import { categories } from '../../data/categories';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85&auto=format&fit=crop';

const cardHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -8, transition: { duration: 0.3, ease: 'easeOut' } },
};

const imageHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function CategoryGrid() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4"
        >
          <div>
            <span className="section-tag">Shop by Category</span>
            <h2 className="font-serif text-3xl md:text-5xl text-darktext mt-3">Find Your Style</h2>
            <p className="text-brown-light mt-3 max-w-xl">
              Six carefully curated collections. From bedroom comfort to statement living room pieces.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-gold hover:text-gold-light font-medium text-sm flex items-center gap-1 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              variants={scaleIn}
              className={index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-1' : ''}
            >
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={cardHoverVariants}
                className="h-full"
              >
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group relative block h-[320px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <motion.img
                    variants={imageHoverVariants}
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(0deg, rgba(28,10,0,0.95) 0%, rgba(28,10,0,0.5) 50%, rgba(28,10,0,0.1) 100%)' }}
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="inline-block w-fit px-3 py-1 bg-gold/20 border border-gold/40 text-gold-light text-[10px] uppercase tracking-widest rounded-full mb-3 backdrop-blur-sm">
                      {cat.productCount}+ products
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-1">{cat.name}</h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{cat.description}</p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore Collection
                      <span className="w-7 h-7 bg-gold text-darktext rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
