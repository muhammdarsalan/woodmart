import { useState } from 'react';
import { Banknote, Building2, Smartphone } from 'lucide-react';
import Button from '../ui/Button';

const methods = [
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Pay when your furniture arrives',
    icon: Banknote,
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    description: 'Transfer to our bank account',
    icon: Building2,
    details: (
      <div className="mt-3 p-4 bg-cream rounded text-sm space-y-2 text-brown-light">
        <p><strong className="text-darktext">HBL:</strong> 1234-5678-9012-3456 · Wood Mart (Pvt) Ltd</p>
        <p><strong className="text-darktext">Meezan Bank:</strong> 0111-2345-6789-0123 · Wood Mart (Pvt) Ltd</p>
        <p className="text-beige-muted">Send screenshot of transfer via WhatsApp after payment.</p>
      </div>
    ),
  },
  {
    id: 'easypaisa',
    name: 'Easypaisa',
    description: 'Mobile wallet payment',
    icon: Smartphone,
    details: (
      <div className="mt-3 p-4 bg-cream rounded text-sm text-brown-light">
        <p><strong className="text-darktext">Account:</strong> 0300-0000000</p>
        <p className="text-beige-muted mt-1">Send payment screenshot via WhatsApp.</p>
      </div>
    ),
  },
  {
    id: 'jazzcash',
    name: 'JazzCash',
    description: 'Mobile wallet payment',
    icon: Smartphone,
    details: (
      <div className="mt-3 p-4 bg-cream rounded text-sm text-brown-light">
        <p><strong className="text-darktext">Account:</strong> 0300-0000000</p>
        <p className="text-beige-muted mt-1">Send payment screenshot via WhatsApp.</p>
      </div>
    ),
  },
];

export default function PaymentForm({ onSubmit, onBack, defaultMethod }) {
  const [selected, setSelected] = useState(defaultMethod || 'cod');

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-lg text-darktext mb-4">Payment Method</h3>
      {methods.map((method) => (
        <label
          key={method.id}
          className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
            selected === method.id ? 'border-gold bg-cream' : 'border-beige-dark bg-white hover:border-gold/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selected === method.id}
              onChange={() => setSelected(method.id)}
              className="mt-1 accent-gold"
            />
            <method.icon className="w-6 h-6 text-gold shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-darktext">{method.name}</p>
              <p className="text-sm text-brown-light">{method.description}</p>
              {selected === method.id && method.details}
            </div>
          </div>
        </label>
      ))}

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={() => onSubmit(selected)}>Review Order</Button>
      </div>
    </div>
  );
}
