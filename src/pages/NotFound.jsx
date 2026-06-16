import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm uppercase tracking-wide text-secondary">404</p>
      <h1 className="mt-2 text-4xl font-semibold text-primary">Page Not Found</h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-secondary">The page you are looking for does not exist or has moved.</p>
      <Button as={Link} to="/" className="mt-6">Go Home</Button>
    </main>
  );
}
