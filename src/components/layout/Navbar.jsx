import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUiStore } from '../../store/uiStore';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/formatPrice';
import { debounce } from '../../utils/helpers';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Collections', path: '/shop', mega: true },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '/blog' },
];

const LIGHT_NAV_PREFIXES = ['/about', '/contact', '/shop', '/cart', '/wishlist', '/blog', '/checkout'];

function isLightNavPage(pathname) {
  if (pathname === '/') return false;
  return LIGHT_NAV_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

const LOGO_URL = '/logo/logo.jpeg';

export default function Navbar({ minimal = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const megaTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLightNav = isLightNavPage(pathname);
  const navMode = isLightNav ? 'navbar-light' : 'navbar-dark';

  const totalItems = useCartStore((s) => s.getTotalItems());
  const toggleDrawer = useCartStore((s) => s.toggleDrawer);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const isSearchOpen = useUiStore((s) => s.isSearchOpen);
  const searchQuery = useUiStore((s) => s.searchQuery);
  const toggleSearch = useUiStore((s) => s.toggleSearch);
  const closeSearch = useUiStore((s) => s.closeSearch);
  const setSearchQuery = useUiStore((s) => s.setSearchQuery);
  const toggleMobileMenu = useUiStore((s) => s.toggleMobileMenu);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) closeSearch();
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeSearch();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeSearch]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      const q = query.toLowerCase();
      const results = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.material.toLowerCase().includes(q)
        )
        .slice(0, 6);
      setSearchResults(results);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleResultClick = (slug) => {
    closeSearch();
    navigate(`/shop/${slug}`);
  };

  const linkClass = scrolled && isLightNav
    ? 'nav-link text-darktext hover:text-gold'
    : isLightNav
      ? 'nav-link text-darktext hover:text-gold'
      : 'nav-link text-white/85 hover:text-gold';

  const iconClass = scrolled && isLightNav
    ? 'nav-icon text-darktext hover:text-gold'
    : isLightNav
      ? 'nav-icon text-darktext hover:text-gold'
      : 'nav-icon text-lighttext hover:text-gold';

  // Logo: white version for dark/scrolled-transparent navbar, normal for light nav
  const logoFilter = isLightNav
    ? 'none'
    : 'brightness(0) invert(1)';

  if (minimal) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-brown shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={LOGO_URL}
              alt="Wood Mart"
              className="h-10 w-auto object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>
          <Link to="/cart" className="text-lighttext hover:text-gold text-sm">Back to Cart</Link>
        </div>
      </header>
    );
  }

  const headerBg = scrolled
    ? isLightNav
      ? 'bg-white border-b border-beige-dark shadow-sm'
      : 'navbar-scrolled'
    : 'bg-transparent';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navMode} ${headerBg} ${scrolled && !isLightNav ? 'shadow-lg' : ''}`}
        style={scrolled && !isLightNav ? { background: 'rgba(28,10,0,0.97)', backdropFilter: 'blur(12px)' } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={LOGO_URL}
                alt="Wood Mart"
                className="h-10 w-auto object-contain transition-all duration-300"
                style={{ filter: logoFilter }}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (link.mega) {
                      clearTimeout(megaTimeoutRef.current);
                      setMegaOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (link.mega) {
                      megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 100);
                    }
                  }}
                >
                  <Link
                    to={link.path}
                    className={`${linkClass} text-sm font-medium tracking-wide transition-colors`}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleSearch}
                className={`p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded ${iconClass}`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                to="/wishlist"
                className={`relative p-2 transition-colors ${iconClass}`}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-darktext text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleDrawer}
                className={`relative p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded ${iconClass}`}
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gold text-darktext text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={toggleMobileMenu}
                className={`p-2 lg:hidden ${iconClass}`}
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <MegaMenu
          isOpen={megaOpen}
          onClose={() => setMegaOpen(false)}
          onMouseEnter={() => {
            clearTimeout(megaTimeoutRef.current);
            setMegaOpen(true);
          }}
          onMouseLeave={() => {
            megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 100);
          }}
        />

        {isSearchOpen && (
          <div ref={searchRef} className="absolute top-full left-0 right-0 bg-brown border-t border-gold/20 shadow-xl" style={{ background: 'rgba(28,10,0,0.97)', backdropFilter: 'blur(12px)' }}>
            <div className="max-w-3xl mx-auto px-4 py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-beige-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search furniture..."
                  className="w-full pl-12 pr-12 py-3 bg-brown-mid border border-gold/30 rounded text-lighttext placeholder-beige-muted focus:outline-none focus:ring-2 focus:ring-gold"
                  autoFocus
                  aria-label="Search products"
                />
                <button onClick={closeSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-beige-muted hover:text-gold" aria-label="Close search">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="mt-2 bg-brown-mid rounded border border-gold/20 overflow-hidden">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleResultClick(product.slug)}
                      className="flex items-center gap-4 w-full p-3 hover:bg-brown-light transition-colors text-left"
                    >
                      <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded" loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format&fit=crop'; }} />
                      <div className="flex-1">
                        <p className="text-lighttext text-sm font-medium">{product.name}</p>
                        <p className="text-gold text-xs">{formatPrice(product.price)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      <MobileMenu />
    </>
  );
}
