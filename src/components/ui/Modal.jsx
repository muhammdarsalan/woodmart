import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-2xl' }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/35" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className={'w-full bg-white shadow-soft ' + maxWidth}>
            <div className="flex items-center justify-between border-b border-border-light px-5 py-4">
              <DialogTitle className="text-base font-semibold text-primary">{title}</DialogTitle>
              <button type="button" onClick={onClose} className="p-2 text-secondary transition hover:text-primary" aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
