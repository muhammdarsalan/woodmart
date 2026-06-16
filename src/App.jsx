import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './admin/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import CartDrawer from './components/layout/CartDrawer';
import Footer from './components/layout/Footer';
import MobileMenu from './components/layout/MobileMenu';
import Navbar from './components/layout/Navbar';
import QuickViewModal from './components/shop/QuickViewModal';
import ScrollToTopButton from './components/ui/ScrollToTop';
import Skeleton from './components/ui/Skeleton';
import WhatsAppButton from './components/ui/WhatsAppButton';
import useScrollToTop from './hooks/useScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AddEditProduct = lazy(() => import('./pages/admin/AddEditProduct'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));

function wrap(element) {
  return <ErrorBoundary>{element}</ErrorBoundary>;
}

function LoadingFallback() {
  return (
    <div className="container-page py-10">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-6 h-64 w-full" />
    </div>
  );
}

function AppRoutes() {
  useScrollToTop();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      {!isAdmin && <MobileMenu />}
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={wrap(<Home />)} />
            <Route path="/shop" element={wrap(<Shop />)} />
            <Route path="/shop/:slug" element={wrap(<ProductDetail />)} />
            <Route path="/cart" element={wrap(<Cart />)} />
            <Route path="/checkout" element={wrap(<Checkout />)} />
            <Route path="/wishlist" element={wrap(<Wishlist />)} />
            <Route path="/about" element={wrap(<About />)} />
            <Route path="/contact" element={wrap(<Contact />)} />
            <Route path="/privacy-policy" element={wrap(<PrivacyPolicy />)} />
            <Route path="/terms" element={wrap(<Terms />)} />
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={wrap(<AdminLogin />)} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={wrap(<AdminLayout />)}>
                <Route path="dashboard" element={wrap(<AdminDashboard />)} />
                <Route path="products" element={wrap(<AdminProducts />)} />
                <Route path="products/add" element={wrap(<AddEditProduct />)} />
                <Route path="products/edit/:id" element={wrap(<AddEditProduct />)} />
                <Route path="categories" element={wrap(<AdminCategories />)} />
                <Route path="orders" element={wrap(<AdminOrders />)} />
                <Route path="messages" element={wrap(<AdminMessages />)} />
              </Route>
            </Route>
            <Route path="*" element={wrap(<NotFound />)} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      {!isAdmin && <Footer />}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && <QuickViewModal />}
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <ScrollToTopButton />}
      <Toaster position="bottom-center" toastOptions={{ style: { background: '#1A1A1A', color: '#FFFFFF', borderRadius: 0 } }} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
