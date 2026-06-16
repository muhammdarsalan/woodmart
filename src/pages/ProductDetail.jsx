import { Link, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import ImageGallery from '../components/product/ImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductTabs from '../components/product/ProductTabs';
import ReviewSection from '../components/product/ReviewSection';
import RelatedProducts from '../components/product/RelatedProducts';
import QuickViewModal from '../components/shop/QuickViewModal';
import useProducts from '../hooks/useProducts';

export default function ProductDetail() {
  const { slug } = useParams();
  const products = useProducts();
  const product = products.find(item => item.slug === slug);

  if (!product) {
    return (
      <main className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-semibold text-primary">Product not found</h1>
        <p className="mt-3 text-sm text-secondary">The product may have been removed or renamed.</p>
        <Button as={Link} to="/shop" className="mt-6">Back to Shop</Button>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="container-page grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <ImageGallery product={product} />
        <ProductInfo product={product} />
      </section>
      <ProductTabs product={product} />
      <RelatedProducts product={product} />
      <ReviewSection product={product} />
      <QuickViewModal />
    </main>
  );
}
