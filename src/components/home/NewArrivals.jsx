import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getNewArrivals } from '../../data/products';
import ProductCard from '../ui/ProductCard';
import Button from '../ui/Button';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export default function NewArrivals() {
  const newProducts = getNewArrivals().slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-tag">Just Arrived</span>
          <h2 className="font-serif text-3xl md:text-4xl text-darktext mt-2">New Arrivals</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/shop?sort=newest">
            <Button variant="outline">View All New Arrivals</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
