import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Button from '../ui/Button';

export default function PaymentForm({ defaultValue, onBack, onSubmit }) {
  const [method, setMethod] = useState(defaultValue?.method || 'Cash on Delivery');
  const [paid, setPaid] = useState(defaultValue?.paid || false);
  const canContinue = method !== 'QR Code Payment' || paid;
  const methods = ['Cash on Delivery', 'Bank Transfer', 'Easypaisa', 'JazzCash', 'QR Code Payment'];

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (canContinue) onSubmit({ method, paid });
      }}
      className="space-y-5"
    >
      <div className="grid gap-3">
        {methods.map(option => (
          <label key={option} className={'cursor-pointer border p-4 ' + (method === option ? 'border-primary' : 'border-border-light')}>
            <input type="radio" name="payment" value={option} checked={method === option} onChange={() => setMethod(option)} className="mr-3 accent-primary" />
            <span className="text-sm font-medium">{option}</span>
          </label>
        ))}
      </div>
      {method === 'Bank Transfer' && <Info title="Bank Transfer" lines={['HBL / Meezan account details will be shared on WhatsApp after order confirmation.']} />}
      {method === 'Easypaisa' && <Info title="Easypaisa" lines={['Account: 0345-9229581']} />}
      {method === 'JazzCash' && <Info title="JazzCash" lines={['Account: 0316-5344694']} />}
      {method === 'QR Code Payment' && (
        <div className="border border-border-light p-5">
          <QRCodeSVG value="Wood Mart | Easypaisa: 0345-9229581 | JazzCash: 0316-5344694" size={200} />
          <p className="mt-4 text-sm text-secondary">Scan with Easypaisa or JazzCash</p>
          <label className="mt-4 flex items-center gap-3 text-sm">
            <input type="checkbox" checked={paid} onChange={event => setPaid(event.target.checked)} className="h-4 w-4 accent-primary" />
            I have completed payment
          </label>
          <a href="https://wa.me/923459229581?text=I%20want%20to%20confirm%20my%20Wood%20Mart%20payment" target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-medium underline">
            Send Screenshot on WhatsApp
          </a>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="outline" onClick={onBack}>Back</Button>
        <Button type="submit" disabled={!canContinue}>Review Order</Button>
      </div>
    </form>
  );
}

function Info({ title, lines }) {
  return (
    <div className="border border-border-light bg-bg-light p-4">
      <p className="text-sm font-semibold text-primary">{title}</p>
      {lines.map(line => <p key={line} className="mt-1 text-sm text-secondary">{line}</p>)}
    </div>
  );
}
