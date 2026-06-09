import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import FilterSidebar from './FilterSidebar';
import Button from '../ui/Button';

export default function MobileFilterDrawer({ filters, setFilter, clearFilters, resultCount }) {
  const isOpen = useUiStore((s) => s.isFilterDrawerOpen);
  const closeFilterDrawer = useUiStore((s) => s.closeFilterDrawer);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brown/60 z-50 lg:hidden"
            onClick={closeFilterDrawer}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-cream z-50 lg:hidden rounded-t-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-beige-dark">
              <h3 className="font-serif text-lg text-brown">Filters</h3>
              <button onClick={closeFilterDrawer} aria-label="Close filters">
                <X className="w-6 h-6 text-brown" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterSidebar filters={filters} setFilter={setFilter} clearFilters={clearFilters} />
            </div>
            <div className="p-4 border-t border-beige-dark">
              <Button className="w-full" onClick={closeFilterDrawer}>
                Show {resultCount} Results
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
