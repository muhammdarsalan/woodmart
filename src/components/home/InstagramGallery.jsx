import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '../../utils/animations';

const images = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/seed/woodmart-ig-${i + 1}/400/400`,
}));

export default function InstagramGallery() {
  return (
    <section className="py-20 section-light bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="section-tag">Instagram</span>
          <h2 className="font-serif text-3xl md:text-4xl text-darktext mt-2">
            Follow Us <a href="https://instagram.com/woodmart.pk" className="text-gold hover:text-gold-light transition-colors">@woodmart.pk</a>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2"
        >
          {images.map((img) => (
            <motion.a
              key={img.id}
              variants={scaleIn}
              href="https://instagram.com/woodmart.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded"
            >
              <img
                src={img.src}
                alt={`Wood Mart Instagram ${img.id}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/60 flex items-center justify-center transition-colors duration-300">
                <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
