import { Menu as MenuIcon, Search, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useState } from 'react';
import { categories } from '../../data/categories';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useUiStore } from '../../store/uiStore';
import { handleImageError } from '../../utils/images';

export default function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const toggleMobileMenu = useUiStore(state => state.toggleMobileMenu);
  const openDrawer = useCartStore(state => state.openDrawer);
  const cartCount = useCartStore(state => state.getTotalItems());
  const wishCount = useWishlistStore(state => state.items.length);

  const submitSearch = event => {
    event.preventDefault();
    if (query.trim()) navigate('/shop?q=' + encodeURIComponent(query.trim()));
  };

  const linkClass = ({ isActive }) => 'text-sm font-medium transition hover:text-primary ' + (isActive ? 'text-primary' : 'text-secondary');

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border-light bg-white">
      <div className="container-page flex h-full items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button type="button" onClick={toggleMobileMenu} className="p-2 lg:hidden" aria-label="Open menu">
            <MenuIcon size={21} />
          </button>
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo/logo.jpeg" alt="Wood Mart" loading="eager" decoding="async" onError={handleImageError} className="h-10 w-10 object-cover" />
            <span className="text-base font-semibold text-primary">Wood Mart</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/shop" className={linkClass}>Shop</NavLink>
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-1 text-sm font-medium text-secondary transition hover:text-primary">
              Collections <ChevronDown size={14} />
            </MenuButton>
            <MenuItems className="absolute left-0 mt-4 w-52 border border-border-light bg-white p-2 shadow-soft">
              {categories.map(category => (
                <MenuItem key={category.id}>
                  {({ focus }) => (
                    <Link to={'/shop?category=' + category.slug} className={'block px-3 py-2 text-sm ' + (focus ? 'bg-bg-light text-primary' : 'text-secondary')}>
                      {category.name}
                    </Link>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <form onSubmit={submitSearch} className="hidden items-center border border-border-light md:flex">
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search"
              className="h-10 w-44 px-3 text-sm outline-none"
              aria-label="Search products"
            />
            <button type="submit" className="flex h-10 w-10 items-center justify-center" aria-label="Search">
              <Search size={18} />
            </button>
          </form>
          <Link to="/wishlist" className="relative flex h-10 w-10 items-center justify-center" aria-label="Wishlist">
            <Heart size={20} />
            {wishCount > 0 && <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-white">{wishCount}</span>}
          </Link>
          <button type="button" onClick={openDrawer} className="relative flex h-10 w-10 items-center justify-center" aria-label="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-white">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
