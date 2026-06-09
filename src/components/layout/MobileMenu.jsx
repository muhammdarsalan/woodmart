import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { categories } from '../../data/categories';
import { useUiStore } from '../../store/uiStore';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' },
];

export default function MobileMenu() {
  const isOpen = useUiStore((s) => s.isMobileMenuOpen);
  const closeMobileMenu = useUiStore((s) => s.closeMobileMenu);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brown/60 z-50 lg:hidden"
            onClick={closeMobileMenu}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-full max-w-sm bg-brown z-50 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gold/20">
              <Link to="/" onClick={closeMobileMenu} className="flex items-center shrink-0">
                <img src="/logo/logo.jpeg" alt="Wood Mart" className="h-10 w-auto object-contain" />
              </Link>
              <button onClick={closeMobileMenu} className="p-2 text-cream hover:text-gold" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className="block py-3 text-lg text-cream hover:text-gold border-b border-gold/10 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-b border-gold/10">
                <button
                  onClick={() => setCollectionsOpen(!collectionsOpen)}
                  className="flex items-center justify-between w-full py-3 text-lg text-cream hover:text-gold"
                >
                  Collections
                  <ChevronDown className={`w-5 h-5 transition-transform ${collectionsOpen ? 'rotate-180' : ''}`} />
                </button>
                {collectionsOpen && (
                  <div className="pl-4 pb-3 space-y-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={closeMobileMenu}
                        className="block py-2 text-cream/70 hover:text-gold text-sm"
                      >
                        {cat.icon} {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="p-6 border-t border-gold/20 space-y-4">
              <a href="tel:+923000000000" className="flex items-center gap-2 text-cream hover:text-gold">
                <Phone className="w-5 h-5" /> 0300-0000000
              </a>
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream hover:text-gold"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <div className="flex gap-4 pt-2">
                {['Facebook', 'Instagram', 'YouTube', 'TikTok'].map((social) => (
                  <a key={social} href="#" className="text-cream/60 hover:text-gold text-sm" aria-label={social}>
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
