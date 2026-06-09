import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/923000000000?text=Hi%20Wood%20Mart!%20I%27m%20interested%20in%20your%20furniture.';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-brown text-lighttext text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        Chat with us on WhatsApp
      </span>
      <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: 'rgba(37,211,102,0.4)' }} />
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ background: '#25D366', color: '#FFFFFF' }}
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" fill="currentColor" />
      </a>
    </div>
  );
}
