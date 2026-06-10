import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Boxes, FolderTree, LogOut, MessageCircle, ShoppingCart, ExternalLink } from 'lucide-react';
import { TOKEN_KEY } from '../../admin/config';

const links = [
  { name: 'Dashboard', to: '/admin/dashboard', icon: BarChart3 },
  { name: 'Products', to: '/admin/products', icon: Boxes },
  { name: 'Categories', to: '/admin/categories', icon: FolderTree },
  { name: 'Orders', to: '/admin/orders', icon: ShoppingCart },
  { name: 'Messages', to: '/admin/messages', icon: MessageCircle, badge: true },
];

function getUnreadCount() {
  try {
    const messages = JSON.parse(localStorage.getItem('woodmart-messages') || '[]');
    return Array.isArray(messages) ? messages.filter((m) => !m.isRead).length : 0;
  } catch {
    return 0;
  }
}

function titleFromPath(pathname) {
  if (pathname.includes('/products/add')) return 'Add Product';
  if (pathname.includes('/products/edit')) return 'Edit Product';
  const current = links.find((link) => pathname.startsWith(link.to));
  return current?.name || 'Admin';
}

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const unread = getUnreadCount();

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      <aside className="lg:fixed lg:inset-y-0 lg:left-0 lg:w-[260px] bg-brown text-white z-30">
        <div className="h-full flex flex-col">
          <div className="px-6 py-6 border-b border-white/10">
            <img src="/logo/logo.jpeg" alt="Wood Mart" className="h-12 w-auto object-contain mb-3" />
            <p className="text-sm text-gold font-medium">Admin Panel</p>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors ${
                      isActive ? 'bg-gold text-brown' : 'text-white hover:text-gold hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1">{link.name}</span>
                  {link.badge && unread > 0 && (
                    <span className="min-w-6 rounded-full bg-red-600 px-2 py-0.5 text-center text-xs text-white">{unread}</span>
                  )}
                </NavLink>
              );
            })}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded text-sm font-medium text-white hover:text-gold hover:bg-white/5 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Visit Website
            </a>
          </nav>
          <button
            onClick={logout}
            className="m-3 flex items-center gap-3 px-4 py-3 rounded text-sm font-medium text-white hover:text-gold hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1 lg:pl-[260px]">
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-darktext">{titleFromPath(pathname)}</h1>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-brown-light">admin@woodmart.pk</span>
            <div className="w-10 h-10 rounded-full bg-gold text-brown flex items-center justify-center font-bold">A</div>
          </div>
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
