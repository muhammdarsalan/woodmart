import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ExternalLink, LayoutDashboard, LogOut, MessageSquare, Package, ShoppingBag, Tags } from 'lucide-react';
import { TOKEN_KEY } from '../../admin/config';
import { readStorage } from '../../utils/storage';
import { supabase } from '../../lib/supabase';

export default function AdminLayout() {
  const navigate = useNavigate();
  const unread = readStorage('woodmart-messages', []).filter(message => !message.isRead).length;
  const links = [
    ['Dashboard', '/admin/dashboard', LayoutDashboard],
    ['Products', '/admin/products', Package],
    ['Categories', '/admin/categories', Tags],
    ['Orders', '/admin/orders', ShoppingBag],
    ['Messages', '/admin/messages', MessageSquare]
  ];
  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(TOKEN_KEY);
    navigate('/admin/login');
  };
  return (
    <main className="min-h-screen bg-bg-light lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="bg-primary p-4 text-white lg:min-h-screen">
        <div className="px-3 py-4">
          <p className="text-lg font-semibold">Wood Mart</p>
          <p className="mt-1 text-xs text-white/60">Admin Panel</p>
        </div>
        <nav className="mt-4 space-y-1">
          {links.map(([label, href, Icon]) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) => 'flex items-center justify-between px-3 py-3 text-sm transition ' + (isActive ? 'bg-white text-primary' : 'text-white/75 hover:bg-white/10 hover:text-white')}
            >
              <span className="flex items-center gap-3"><Icon size={18} />{label}</span>
              {label === 'Messages' && unread > 0 && <span className="bg-accent-red px-2 py-0.5 text-xs text-white">{unread}</span>}
            </NavLink>
          ))}
          <a href="/" className="flex items-center gap-3 px-3 py-3 text-sm text-white/75 hover:bg-white/10 hover:text-white">
            <ExternalLink size={18} /> Visit Website
          </a>
          <button type="button" onClick={logout} className="flex w-full items-center gap-3 px-3 py-3 text-left text-sm text-white/75 hover:bg-white/10 hover:text-white">
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>
      <section>
        <header className="flex h-16 items-center justify-between border-b border-border-light bg-white px-6">
          <p className="text-sm font-semibold text-primary">Dashboard</p>
          <p className="text-xs text-secondary">admin@woodmart.pk</p>
        </header>
        <div className="p-5 md:p-8">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
