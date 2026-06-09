import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch {
      try {
        window.scrollTo(0, 0);
      } catch (err) {
        // ignore
      }
    }
  }, [pathname]);
}

const useScrollToTopHook = useScrollToTop;
export default useScrollToTopHook;
