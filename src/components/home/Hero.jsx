import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MapPin, Sparkles } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const stats = [
  { value: 2400, suffix: '+', label: 'Happy Clients' },
  { value: 500, suffix: '+', label: 'Products' },
  { value: 15, suffix: '+', label: 'Years' },
  { value: 3, suffix: '', label: 'Showrooms' },
];

function Counter({ end, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return undefined;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

export default function Hero() {
  const words = ['Furniture', 'That'];
  const italicWords = ['Fits', 'Your', 'Life'];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/products/sofas/sofa-1.jpeg"
          alt="Premium sofa"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(28,10,0,0.85) 0%, rgba(28,10,0,0.65) 50%, rgba(28,10,0,0.75) 100%)' }}
      />
      {/* Gold corner glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C49A2A 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-24 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left content - 60% */}
          <div className="lg:col-span-3 text-center lg:text-left">
            {/* Pill tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/50 rounded-full text-gold text-xs md:text-sm mb-6"
            >
              <Sparkles className="w-3 h-3" />
              Est. 2010 · Islamabad, Pakistan
            </motion.div>

            {/* H1 with stagger */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-serif text-cream leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
            >
              <span className="block">
                {words.map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="inline-block mr-3">
                    {word}
                  </motion.span>
                ))}
              </span>
              <em className="block text-gold not-italic italic mt-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                {italicWords.map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="inline-block mr-3">
                    {word}
                  </motion.span>
                ))}
              </em>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-cream/80 text-base md:text-lg max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0"
            >
              Premium handcrafted furniture for homes and offices across Pakistan.
              Visit our showroom in Islamabad.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12 justify-center lg:justify-start"
            >
              <Link to="/shop">
                <button className="group inline-flex items-center justify-center gap-2 bg-gold text-darktext font-medium px-7 py-3.5 rounded-sm transition-all duration-300 hover:bg-gold-light hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-darktext">
                  Explore Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/contact">
                <button className="inline-flex items-center justify-center gap-2 border-2 border-cream text-cream font-medium px-7 py-3.5 rounded-sm transition-all duration-300 hover:bg-gold hover:border-gold hover:text-darktext focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-darktext">
                  <Phone className="w-4 h-4" />
                  Book a Visit
                </button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gold/20"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl md:text-3xl text-gold">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-cream/70 text-xs md:text-sm mt-1 tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right floating cards - 40% */}
          <div className="hidden lg:block lg:col-span-2 relative h-[500px]">
            {/* Big sofa card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 right-0 w-72 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
              style={{ transform: 'rotate(-2deg)' }}
            >
              <img
                src="/images/products/sofas/sofa-2.jpeg"
                alt="Featured Sofa"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = '/images/products/sofas/sofa-1.jpeg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darktext/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-widest text-gold-light">Bestseller</p>
                <p className="font-serif text-lg">Heritage Sheesham</p>
              </div>
            </motion.div>

            {/* Small bed card */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-8 left-0 w-56 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
              style={{ transform: 'rotate(2deg)' }}
            >
              <img
                src="/images/products/beds/bed-1.jpeg"
                alt="Featured Bed"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = '/images/products/beds/bed-2.jpeg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darktext/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[10px] uppercase tracking-widest text-gold-light">New</p>
                <p className="font-serif text-base">Platform Bed</p>
              </div>
            </motion.div>

            {/* Floating tag */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 left-1/4 bg-white rounded-full px-4 py-2 shadow-2xl flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-xs font-medium text-darktext">3 Showrooms</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-gold/60 rounded-full flex justify-center pt-2"
        >
          <span className="block w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
