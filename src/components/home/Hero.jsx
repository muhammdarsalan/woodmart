import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { handleImageError } from '../../utils/images';

export default function Hero() {
  return (
    <section className="bg-bg-light">
      <div className="container-page grid min-h-[520px] items-center gap-10 py-12 lg:grid-cols-[1fr_520px]">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-secondary">Furniture That Fits Your Life</p>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight text-primary md:text-6xl">Premium Furniture for Your Home</h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-secondary">Handcrafted furniture delivered across Pakistan from our Islamabad showroom.</p>
          <Button as={Link} to="/shop" className="mt-8">Shop Now</Button>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=85&fit=crop"
            alt="Premium Wood Mart sofa"
            loading="eager"
            decoding="async"
            onError={handleImageError}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
