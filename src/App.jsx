import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ScrollToTop from './components/ui/ScrollToTop';
import PageTransition from './components/ui/PageTransition';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import { PageSkeleton } from './components/ui/Skeleton';
import ErrorBoundary from './components/ErrorBoundary';
import { useScrollToTop } from './hooks/useScrollToTop';

// Lazy imports wrapped in catch to prevent white screens
const Home = lazy(() =>
  import('./pages/Home').catch(() => ({ default: () => <div>Failed to load page</div> }))
);
const Shop = lazy(() =>
  import('./pages/Shop').catch(() => ({ default: () => <div>Failed to load page</div> }))
);
const ProductDetail = lazy(() =>
  import('./pages/ProductDetail').catch(() => ({ default: () => <div>Failed to load page</div> }))
);
const Cart = lazy(() =>
  import('./pages/Cart').catch(() => ({ default: () => <div>Failed to load page</div> }))
);
const Checkout = lazy(() =>
  import('./pages/Checkout').catch(() => ({ default: () => <div>Failed to load page</div> }))
);
const Wishlist = lazy(() =>
  import('./pages/Wishlist').catch(() => ({ default: () => <div>Failed to load page</div> }))
);
const About = lazy(() =>
  import('./pages/About').catch(() => ({ default: () => <div>Failed to load page</div> }))
);
const Contact = lazy(() =>
  import('./pages/Contact').catch(() => ({ default: () => <div>Failed to load page</div> }))
);
const Blog = lazy(() =>
  import('./pages/Blog').catch(() => ({ default: () => <div>Failed to load page</div> }))
);
const BlogPost = lazy(() =>
  import('./pages/BlogPost').catch(() => ({ default: () => <div>Failed to load page</div> }))
);
const NotFound = lazy(() =>
  import('./pages/NotFound').catch(() => ({ default: () => <div>Failed to load page</div> }))
);

function AppRoutes() {
  const location = useLocation();
  const isCheckout = location.pathname === '/checkout';
  useScrollToTop();

  return (
    <>
      <Navbar minimal={isCheckout} />
      <main className={isCheckout ? '' : 'min-h-screen'}>
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={<PageSkeleton />}>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  </ErrorBoundary>
                }
              />
              <Route
                path="/shop"
                element={
                  <ErrorBoundary>
                    <PageTransition>
                      <Shop />
                    </PageTransition>
                  </ErrorBoundary>
                }
              />
              <Route
                path="/shop/:slug"
                element={
                  <ErrorBoundary>
                    <PageTransition>
                      <ProductDetail />
                    </PageTransition>
                  </ErrorBoundary>
                }
              />
              <Route path="/categories" element={<Navigate to="/shop" replace />} />
              <Route
                path="/cart"
                element={
                  <ErrorBoundary>
                    <PageTransition>
                      <Cart />
                    </PageTransition>
                  </ErrorBoundary>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ErrorBoundary>
                    <PageTransition>
                      <Checkout />
                    </PageTransition>
                  </ErrorBoundary>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ErrorBoundary>
                    <PageTransition>
                      <Wishlist />
                    </PageTransition>
                  </ErrorBoundary>
                }
              />
              <Route
                path="/about"
                element={
                  <ErrorBoundary>
                    <PageTransition>
                      <About />
                    </PageTransition>
                  </ErrorBoundary>
                }
              />
              <Route
                path="/contact"
                element={
                  <ErrorBoundary>
                    <PageTransition>
                      <Contact />
                    </PageTransition>
                  </ErrorBoundary>
                }
              />
              <Route
                path="/blog"
                element={
                  <ErrorBoundary>
                    <PageTransition>
                      <Blog />
                    </PageTransition>
                  </ErrorBoundary>
                }
              />
              <Route
                path="/blog/:slug"
                element={
                  <ErrorBoundary>
                    <PageTransition>
                      <BlogPost />
                    </PageTransition>
                  </ErrorBoundary>
                }
              />
              <Route
                path="*"
                element={
                  <ErrorBoundary>
                    <PageTransition>
                      <NotFound />
                    </PageTransition>
                  </ErrorBoundary>
                }
              />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      {!isCheckout && <Footer />}
      <CartDrawer />
      <WhatsAppButton />
      <ScrollToTop />
      <CustomCursor />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1C0A00',
            color: '#F5ECD7',
            border: '1px solid rgba(196,154,42,0.3)',
          },
          success: { iconTheme: { primary: '#C49A2A', secondary: '#1C0A00' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#F5ECD7' } },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}
