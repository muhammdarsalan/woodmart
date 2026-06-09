import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Gem, Hammer, Truck, Shield } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from '../../utils/animations';

const features = [
  { icon: Gem, title: 'Premium Materials', description: 'Solid Sheesham, teak, and oak sourced from certified sustainable forests across Pakistan.' },
  { icon: Hammer, title: 'Master Craftsmen', description: 'Each piece is handcrafted by artisans with decades of experience in traditional woodworking.' },
  { icon: Truck, title: 'Free Delivery', description: 'Complimentary delivery and professional assembly in Islamabad on orders above PKR 50,000.' },
  { icon: Shield, title: '15-Year Warranty', description: 'Industry-leading structural warranty on all solid wood frames. We stand behind our craftsmanship.' },
];

const counters = [
  { end: 2400, suffix: '+', label: 'Happy Clients' },
  { end: 500, suffix: '+', label: 'Products' },
  { end: 15, suffix: '+', label: 'Years Experience' },
  { end: 3, suffix: '', label: 'Showrooms' },
];

function AnimatedCounter({ end, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return undefined;
    const duration = 2000;
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
  }, [started, end]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-4xl text-gold">{count.toLocaleString()}{suffix}</p>
      <p className="text-lighttext text-sm mt-1">{label}</p>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section className="py-20 section-dark bg-brown relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #C49A2A 0px, #C49A2A 1px, transparent 1px, transparent 30px)',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-tag text-gold-light">Why Wood Mart</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white mt-2">Crafted with Purpose</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              className="bg-brown-mid/50 border border-gold/30 rounded-lg p-6 text-center hover:border-gold/50 transition-colors"
            >
              <div className="w-14 h-14 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-lg text-white mb-2">{feature.title}</h3>
              <p className="text-beige-muted text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {counters.map((counter) => (
            <AnimatedCounter key={counter.label} {...counter} />
          ))}
        </div>
      </div>
    </section>
  );
}
