import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-16 bg-cream">
      <div className="text-center px-4">
        <p className="font-serif text-8xl md:text-9xl text-gold leading-none">404</p>
        <h1 className="font-serif text-2xl md:text-3xl text-darktext mt-4 mb-3">Page not found</h1>
        <p className="text-brown-light max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to beautiful furniture.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button size="lg">Go to Homepage</Button>
          </Link>
          <Link to="/shop">
            <Button size="lg" variant="outline">Browse Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
