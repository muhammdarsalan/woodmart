import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import { fadeInUp } from '../../utils/animations';

export default function RelatedProducts({ products }) {
  if (!products.length) return null;

  return (
    <section className="py-12">
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-serif text-2xl text-darktext mb-8"
      >
        You May Also Like
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
