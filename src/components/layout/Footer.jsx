import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, Camera, Play, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const collections = [
  { name: 'Living Room', slug: 'living-room' },
  { name: 'Bedroom', slug: 'bedroom' },
  { name: 'Dining', slug: 'dining' },
  { name: 'Office', slug: 'office' },
  { name: 'Outdoor', slug: 'outdoor' },
  { name: 'Kids', slug: 'kids' },
];

const company = [
  { name: 'About', path: '/about' },
  { name: 'Careers', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Press', path: '/about' },
  { name: 'Sustainability', path: '/about' },
];

const support = [
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/contact' },
  { name: 'Delivery', path: '/contact' },
  { name: 'Warranty', path: '/contact' },
  { name: 'Returns', path: '/contact' },
  { name: 'Track Order', path: '/contact' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="section-dark bg-brown">
      {/* Newsletter bar */}
      <div className="section-gold bg-gold py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h3
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-darktext mb-3"
          >
            Get Exclusive Offers
          </motion.h3>
          <p className="text-darktext/70 mb-6 max-w-xl mx-auto">Subscribe for design inspiration and 10% off your first order</p>
          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-darktext font-medium text-lg"
            >
              ✓ Thank you for subscribing! Check your inbox for a welcome offer.
            </motion.p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 rounded-sm text-darktext bg-white border-0 focus:outline-none focus:ring-2 focus:ring-darktext"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-darktext text-lighttext font-medium rounded-sm hover:bg-brown-mid transition-colors shrink-0 hover:scale-[1.02] transform duration-300"
              >
                Subscribe
              </button>
            </form>
          )}
          {error && <p className="text-red-900 text-sm mt-2">{error}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Link to="/" className="flex items-center mb-4 w-fit">
            <img
              src="/logo/logo.jpeg"
              alt="Wood Mart"
              className="h-12 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>
          <p className="text-gold text-sm italic mb-2 font-serif">Furniture That Fits Your Life</p>
          <p className="text-white/65 text-sm mb-5 leading-relaxed">
            Premium solid wood furniture crafted in Islamabad since 2010. Quality, comfort, and timeless design for every Pakistani home.
          </p>
          <div className="space-y-2 text-sm text-white/65">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span>F-7 Markaz, Islamabad</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <span>0300-0000000</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <span>info@woodmart.pk</span>
            </p>
          </div>
          <div className="flex gap-3 mt-5">
            {[
              { Icon: Share2, label: 'Facebook' },
              { Icon: Camera, label: 'Instagram' },
              { Icon: Play, label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="p-2 border border-gold/25 rounded text-white/65 hover:border-gold hover:text-gold transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <a href="#" className="p-2 border border-gold/25 rounded text-white/65 hover:border-gold hover:text-gold transition-colors text-xs font-bold flex items-center" aria-label="TikTok">TT</a>
            <a href="https://wa.me/923000000000" className="p-2 border border-gold/25 rounded text-white/65 hover:border-gold hover:text-gold transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h4 variants={fadeInUp} className="font-serif text-gold mb-4 text-lg">Collections</motion.h4>
          <ul className="space-y-2">
            {collections.map((col) => (
              <motion.li key={col.slug} variants={fadeInUp}>
                <Link to={`/shop?category=${col.slug}`} className="text-white/65 hover:text-gold text-sm transition-colors">
                  {col.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h4 variants={fadeInUp} className="font-serif text-gold mb-4 text-lg">Company</motion.h4>
          <ul className="space-y-2">
            {company.map((item) => (
              <motion.li key={item.name} variants={fadeInUp}>
                <Link to={item.path} className="text-white/65 hover:text-gold text-sm transition-colors">
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h4 variants={fadeInUp} className="font-serif text-gold mb-4 text-lg">Support</motion.h4>
          <ul className="space-y-2">
            {support.map((item) => (
              <motion.li key={item.name} variants={fadeInUp}>
                <Link to={item.path} className="text-white/65 hover:text-gold text-sm transition-colors">
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="border-t border-gold/10 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© 2026 Wood Mart. All rights reserved.</p>
          <div className="flex gap-4 items-center">
            <Link to="/about" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-gold transition-colors">Terms</Link>
            <span className="text-base">Made in Pakistan 🇵🇰</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
