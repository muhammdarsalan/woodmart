import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop';

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = FALLBACK_IMAGE;
};

export default function MegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave }) {
  const handleSubcategoryClick = (categorySlug, subcategorySlug) => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 bg-white border-t-2 border-gold shadow-2xl z-40"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-10 py-10">
            <div className="grid grid-cols-6 gap-8">
              {categories.map((cat) => (
                <div key={cat.id} className="space-y-4">
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    onClick={onClose}
                    className="flex flex-col items-start"
                  >
                    <div className="w-20 h-20 rounded overflow-hidden mb-2 flex-shrink-0">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        decoding="async"
                        onError={handleImageError}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-serif text-darktext font-semibold text-sm hover:text-gold transition-colors border-b-2 border-gold pb-1">
                      {cat.name}
                    </h3>
                  </Link>

                  <ul className="space-y-1.5">
                    {cat.subcategories.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          to={`/shop?category=${cat.slug}&subcategory=${sub.slug}`}
                          onClick={() => handleSubcategoryClick(cat.slug, sub.slug)}
                          className="text-xs text-brown-muted hover:text-gold hover:pl-1 transition-all duration-200 block cursor-pointer"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-beige-dark mt-8 pt-6 flex items-center justify-between">
              <Link
                to="/shop"
                onClick={onClose}
                className="text-gold font-medium text-sm hover:text-gold-dark flex items-center gap-1 transition-colors"
              >
                View All Collections
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop?new=true"
                onClick={onClose}
                className="text-brown-muted font-medium text-sm hover:text-brown transition-colors flex items-center gap-1"
              >
                New Arrivals
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
