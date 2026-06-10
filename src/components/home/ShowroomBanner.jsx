import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { slideInLeft, slideInRight } from '../../utils/animations';

export default function ShowroomBanner() {
  return (
    <section className="py-20 section-dark bg-brown relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-tag text-gold-light">Visit Us</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mt-2 mb-6">
              Visit Our Islamabad Showroom
            </h2>
            <div className="space-y-4">
              <p className="flex items-start gap-3 text-beige-muted">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                Main G.T. Rd, opposite Science School Rd, T Chowk, Islamabad
              </p>
              <p className="flex items-center gap-3 text-beige-muted">
                <Clock className="w-5 h-5 text-gold shrink-0" />
                Mon-Thu & Sat-Sun: 10:30 AM – 9:30 PM · Friday: Closed
              </p>
              <p className="flex items-center gap-3 text-gold">
                <Phone className="w-5 h-5 shrink-0" />
                0345-9229581
              </p>
            </div>
            <Link to="/contact" className="inline-block mt-8">
              <Button className="bg-gold text-darktext hover:bg-gold-light">Get Directions</Button>
            </Link>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative h-64 lg:h-80 rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #2E1200 0%, #1C0A00 100%)',
            }}
          >
            <p
              className="font-serif font-bold select-none"
              style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', color: 'rgba(196,154,42,0.08)' }}
            >
              WM
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
