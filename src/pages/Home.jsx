import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewArrivals from '../components/home/NewArrivals';
import ShowroomBanner from '../components/home/ShowroomBanner';
import QuickViewModal from '../components/shop/QuickViewModal';
import useProducts from '../hooks/useProducts';

export default function Home() {
  const products = useProducts();
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts products={products} />
      <NewArrivals products={products} />
      <ShowroomBanner />
      <QuickViewModal />
    </>
  );
}
