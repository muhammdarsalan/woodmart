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
  { end: 2400, suffix: '+', label: 'Happy Clients', duration: 2000 },
  { end: 500, suffix: '+', label: 'Products', duration: 1500 },
  { end: 15, suffix: '+', label: 'Years Experience', duration: 1000 },
  { end: 3, suffix: '', label: 'Showrooms', duration: 800 },
];

function AnimatedCounter({ end, suffix, duration, label }) {
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
    <div ref={ref} className="text-center">
      <p className="font-serif text-4xl md:text-5xl text-gold mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.65)' }}>{label}</p>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: '#1C0A00', color: '#FFFFFF' }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #C49A2A 0px, #C49A2A 1px, transparent 1px, transparent 30px)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C49A2A 0%, transparent 70%)',
          transform: 'translate(20%, -20%)',
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
          <span className="section-tag" style={{ color: '#E8B84B' }}>Why Wood Mart</span>
          <h2
            className="font-serif text-3xl md:text-5xl mt-3"
            style={{ color: '#FFFFFF' }}
          >
            Crafted with Purpose
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Four reasons why 2,400+ Pakistani families trust us with their homes.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              className="rounded-lg p-6 text-center transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: 'rgba(46, 18, 0, 0.5)',
                border: '1px solid rgba(196,154,42,0.3)',
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ border: '1px solid rgba(196,154,42,0.4)' }}
              >
                <feature.icon className="w-7 h-7" style={{ color: '#C49A2A' }} />
              </div>
              <h3 className="font-serif text-lg mb-2" style={{ color: '#FFFFFF' }}>{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gold/20">
          {counters.map((counter) => (
            <AnimatedCounter key={counter.label} {...counter} />
          ))}
        </div>
      </div>
    </section>
  );
}
