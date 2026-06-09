import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { X } from 'lucide-react';

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-6xl',
};

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-brown/60 backdrop-blur-sm" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-2xl overflow-hidden`}>
              {title && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-beige-dark">
                  <DialogTitle className="text-lg font-serif font-semibold text-darktext">
                    {title}
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-beige rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-brown" />
                  </button>
                </div>
              )}
              <div className={title ? '' : 'relative'}>
                {!title && (
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-1 hover:bg-beige rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-brown" />
                  </button>
                )}
                {children}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
