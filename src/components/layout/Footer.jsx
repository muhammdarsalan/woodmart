import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border-light bg-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold text-primary">Wood Mart</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-secondary">Furniture That Fits Your Life. Premium furniture crafted for homes across Pakistan.</p>
          <div className="mt-5 space-y-3 text-sm text-secondary">
            <p className="flex gap-2"><MapPin size={16} /> Main G.T. Rd, T Chowk, Islamabad</p>
            <p className="flex gap-2"><Phone size={16} /> 0345-9229581 / 0316-5344694</p>
            <p className="flex gap-2"><Mail size={16} /> szahid701@gmail.com</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-primary">Shop</h3>
          <div className="mt-4 space-y-3 text-sm text-secondary">
            <Link className="block hover:text-primary" to="/shop?category=sofas">Sofas</Link>
            <Link className="block hover:text-primary" to="/shop?category=beds-and-dressing">Beds & Dressing</Link>
            <Link className="block hover:text-primary" to="/shop?category=dining">Dining</Link>
            <Link className="block hover:text-primary" to="/shop?category=wardrobe">Wardrobe</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-primary">Company</h3>
          <div className="mt-4 space-y-3 text-sm text-secondary">
            <Link className="block hover:text-primary" to="/about">About</Link>
            <Link className="block hover:text-primary" to="/contact">Contact</Link>
            <Link className="block hover:text-primary" to="/privacy-policy">Privacy Policy</Link>
            <Link className="block hover:text-primary" to="/terms">Terms & Conditions</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-primary">Hours</h3>
          <p className="mt-4 text-sm leading-6 text-secondary">Mon-Thu & Sat-Sun<br />10:30 AM - 9:30 PM</p>
          <p className="mt-2 text-sm font-medium text-primary">Friday: Closed</p>
          <a href="https://maps.google.com/?q=Main+GT+Road+T+Chowk+Islamabad" target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-medium underline">
            Get Directions
          </a>
        </div>
      </div>
      <div className="border-t border-border-light py-4 text-center text-xs text-secondary">
        © 2026 Wood Mart. All rights reserved.
      </div>
    </footer>
  );
}
