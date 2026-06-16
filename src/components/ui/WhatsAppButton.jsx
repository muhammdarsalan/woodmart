import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923459229581"
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
      <MessageCircle className="relative" size={22} />
      <span className="pointer-events-none absolute right-14 whitespace-nowrap bg-primary px-3 py-2 text-xs text-white opacity-0 shadow-sm transition group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}
