import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg className="w-48 h-48 text-beige-dark mb-6" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" fill="#F5ECD7" />
        <path d="M60 80h80l-10 60H70L60 80z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M75 80V65a25 25 0 0150 0v15" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="130" cy="130" r="20" fill="#C49A2A" opacity="0.3" />
        <text x="100" y="170" textAnchor="middle" fill="#1C0A00" fontSize="12" fontFamily="serif">Empty</text>
      </svg>
      <h2 className="font-serif text-2xl text-darktext mb-2">Your cart is empty</h2>
      <p className="text-brown-light mb-6 max-w-md">
        Looks like you haven&apos;t added any furniture yet. Explore our collections and find pieces that fit your life.
      </p>
      <Link to="/shop">
        <Button size="lg" variant="dark">Start Shopping</Button>
      </Link>
    </div>
  );
}
