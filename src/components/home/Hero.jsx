import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const stats = [
  { value: '2,400+', label: 'Clients' },
  { value: '500+', label: 'Products' },
  { value: '15+', label: 'Years' },
  { value: '3', label: 'Showrooms' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0d0500 0%, #1C0A00 50%, #2a1200 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #C49A2A 0px,
            #C49A2A 1px,
            transparent 1px,
            transparent 20px
          )`,
        }}
      />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #C49A2A 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-32 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 border border-gold/40 rounded-full text-gold text-sm mb-6"
          >
            Est. 2010 · Islamabad, Pakistan
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="font-serif text-cream leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
          >
            Furniture That{' '}
            <em className="text-gold not-italic">Fits Your Life</em>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-cream/70 text-lg md:text-xl max-w-xl mb-8 leading-relaxed"
          >
            Premium solid wood furniture handcrafted in Islamabad. Free delivery, 15-year warranty, and showrooms you can visit today.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-12">
            <Link to="/shop">
              <Button size="lg">Explore Collections</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-cream text-cream hover:bg-gold hover:text-brown hover:border-gold">
                Book a Visit
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gold/20"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl md:text-3xl text-gold">{stat.value}</p>
                <p className="text-cream/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-gold animate-bounce" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
