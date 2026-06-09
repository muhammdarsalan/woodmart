import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.jsx';

// Safe localStorage cleanup on app start
try {
  const keysToValidate = ['woodmart-cart', 'woodmart-wishlist', 'woodmart-products'];
  keysToValidate.forEach(key => {
    try {
      const val = localStorage.getItem(key);
      if (val) JSON.parse(val); // test if valid JSON
    } catch {
      localStorage.removeItem(key); // remove corrupted data
      console.warn(`Cleared corrupted localStorage key: ${key}`);
    }
  });
} catch (e) {
  console.warn('localStorage not available:', e);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
