import Hero from '../components/home/Hero';
import MarqueeTicker from '../components/home/MarqueeTicker';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyUs from '../components/home/WhyUs';
import Testimonials from '../components/home/Testimonials';
import NewArrivals from '../components/home/NewArrivals';
import ShowroomBanner from '../components/home/ShowroomBanner';
import Newsletter from '../components/home/Newsletter';
import InstagramGallery from '../components/home/InstagramGallery';

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <CategoryGrid />
      <FeaturedProducts />
      <WhyUs />
      <Testimonials />
      <NewArrivals />
      <ShowroomBanner />
      <Newsletter />
      <InstagramGallery />
    </>
  );
}
