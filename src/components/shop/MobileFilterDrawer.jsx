import { Dialog, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';
import FilterSidebar from './FilterSidebar';
import { useUiStore } from '../../store/uiStore';

export default function MobileFilterDrawer({ filters }) {
  const open = useUiStore(state => state.isFilterDrawerOpen);
  const toggle = useUiStore(state => state.toggleFilterDrawer);
  return (
    <Dialog open={open} onClose={toggle} className="relative z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <DialogPanel className="fixed inset-y-0 left-0 w-[86vw] max-w-sm overflow-y-auto bg-white p-5 shadow-soft">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-semibold">Filters</h2>
          <button type="button" onClick={toggle} className="p-2" aria-label="Close filters">
            <X size={20} />
          </button>
        </div>
        <FilterSidebar filters={filters} />
      </DialogPanel>
    </Dialog>
  );
}
