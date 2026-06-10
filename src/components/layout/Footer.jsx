import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Share2, Camera, Play, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animations';

const collections = [
  { name: 'Bedroom', slug: 'bedroom' },
  { name: 'Sofa', slug: 'sofa' },
  { name: 'Coffee Table', slug: 'coffee-table' },
  { name: 'Dining Table', slug: 'dining-table' },
  { name: 'Wardrobe', slug: 'wardrobe' },
  { name: 'Coffee Chair', slug: 'coffee-chair' },
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
      <div className="section-gold bg-gold py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h3
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl text-darktext mb-2"
          >
            Get Exclusive Offers
          </motion.h3>
          <p className="text-darktext/70 mb-6">Subscribe for design inspiration and special deals</p>
          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-darktext font-medium"
            >
              Thank you for subscribing! Check your inbox for a welcome offer.
            </motion.p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-sm text-darktext bg-white border-0 focus:outline-none focus:ring-2 focus:ring-darktext"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-darktext text-lighttext font-medium rounded-sm hover:bg-brown-mid transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
          {error && <p className="text-red-900 text-sm mt-2">{error}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center mb-4 w-fit">
            <img src="/logo/logo.jpeg" alt="Wood Mart" className="h-12 w-auto object-contain brightness-0 invert" />
          </Link>
          <p className="text-beige-muted text-sm italic mb-2">Furniture That Fits Your Life</p>
          <p className="text-white/55 text-sm mb-4">
            Premium solid wood furniture crafted in Islamabad since 2010. Quality, comfort, and timeless design for every home.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Share2, label: 'Facebook' },
              { Icon: Camera, label: 'Instagram' },
              { Icon: Play, label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="p-2 border border-gold/25 rounded text-white/45 hover:border-gold hover:text-gold transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <a href="#" className="p-2 border border-gold/25 rounded text-white/45 hover:border-gold hover:text-gold transition-colors text-xs font-bold flex items-center" aria-label="TikTok">TT</a>
            <a href="https://wa.me/923459229581" className="p-2 border border-gold/25 rounded text-white/45 hover:border-gold hover:text-gold transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-gold mb-4">Collections</h4>
          <ul className="space-y-2">
            {collections.map((col) => (
              <li key={col.slug}>
                <Link to={`/shop?category=${col.slug}`} className="text-white/55 hover:text-gold text-sm transition-colors">
                  {col.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-gold mb-4">Company</h4>
          <ul className="space-y-2">
            {company.map((item) => (
              <li key={item.name}>
                <Link to={item.path} className="text-white/55 hover:text-gold text-sm transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-gold mb-4">Support</h4>
          <ul className="space-y-2">
            {support.map((item) => (
              <li key={item.name}>
                <Link to={item.path} className="text-white/55 hover:text-gold text-sm transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>© 2026 Wood Mart. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">Terms</Link>
            <span>Made in Pakistan 🇵🇰</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
