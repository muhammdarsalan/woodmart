import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Only show on first load
    return !sessionStorage.getItem('wm_loaded');
  });

  useEffect(() => {
    if (!show) return undefined;
    sessionStorage.setItem('wm_loaded', '1');
    const timer = setTimeout(() => setShow(false), 1500);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#1C0A00' }}
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-32 h-32 flex items-center justify-center rounded-full"
              style={{ background: 'rgba(196,154,42,0.1)', border: '2px solid rgba(196,154,42,0.4)' }}
            >
              <img
                src="/logo/logo.jpeg"
                alt="Wood Mart"
                className="h-16 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </motion.div>
            <div className="flex items-center gap-2">
              <motion.span
                className="block w-2 h-2 rounded-full bg-gold"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
              />
              <motion.span
                className="block w-2 h-2 rounded-full bg-gold"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
              />
              <motion.span
                className="block w-2 h-2 rounded-full bg-gold"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
              />
            </div>
            <p className="text-gold text-xs uppercase tracking-[0.4em] mt-2">Wood Mart</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
