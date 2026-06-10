import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ImageGallery from '../components/product/ImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import RelatedProducts from '../components/product/RelatedProducts';

export default function ProductDetail() {
  const { slug } = useParams();
  const products = useProducts();

  // Defensive lookup — never throw, never crash
  let product = null;
  try {
    product = products.find((p) => p.slug === slug);
  } catch (err) {
    console.error('ProductDetail lookup error:', err);
    product = null;
  }

  const reviewsRef = useRef(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-4 pt-24">
        <div className="text-6xl mb-4">🪵</div>
        <h2 className="font-serif text-3xl text-brown mb-3">
          Product Not Found
        </h2>
        <p className="text-brown-light mb-6 max-w-md">
          This product may have been removed or the link is incorrect. Browse our catalog to find something you'll love.
        </p>
        <Link
          to="/shop"
          className="bg-gold text-brown px-8 py-3 font-semibold hover:bg-gold-light transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  let related = [];
  try {
    related = products.filter((p) => p.category === product.category && String(p.id) !== String(product.id)).slice(0, 4);
  } catch (err) {
    console.error('Related products error:', err);
    related = [];
  }

  const scrollToReviews = () => {
    try {
      reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <ImageGallery images={product.images} name={product.name} />
          <ProductInfo product={product} onReviewsClick={scrollToReviews} />
        </div>
        <ProductTabs product={product} reviewsRef={reviewsRef} />
        <RelatedProducts products={related} />
      </div>
    </div>
  );
}
