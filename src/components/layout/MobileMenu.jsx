import { Dialog, DialogPanel } from '@headlessui/react';
import { Link, NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { categories } from '../../data/categories';
import { useUiStore } from '../../store/uiStore';

export default function MobileMenu() {
  const open = useUiStore(state => state.isMobileMenuOpen);
  const close = useUiStore(state => state.closeMobileMenu);
  const links = [
    ['Home', '/'],
    ['Shop', '/shop'],
    ['About', '/about'],
    ['Contact', '/contact']
  ];

  return (
    <Dialog open={open} onClose={close} className="relative z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <DialogPanel className="fixed inset-y-0 left-0 w-[82vw] max-w-sm bg-white shadow-soft">
        <div className="flex h-16 items-center justify-between border-b border-border-light px-5">
          <Link to="/" onClick={close} className="text-lg font-semibold">Wood Mart</Link>
          <button type="button" onClick={close} className="p-2" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="px-5 py-5">
          <div className="space-y-1">
            {links.map(([label, href]) => (
              <NavLink key={href} to={href} onClick={close} className="block border-b border-border-light py-3 text-sm font-medium">
                {label}
              </NavLink>
            ))}
          </div>
          <p className="mt-8 text-xs uppercase tracking-wide text-secondary">Collections</p>
          <div className="mt-3 space-y-1">
            {categories.map(category => (
              <Link key={category.id} to={'/shop?category=' + category.slug} onClick={close} className="block py-2 text-sm text-primary">
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      </DialogPanel>
    </Dialog>
  );
}
