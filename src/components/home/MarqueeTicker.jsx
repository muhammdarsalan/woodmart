const items = [
  'Premium Solid Wood',
  'Custom Orders',
  'Free Delivery Islamabad',
  '15-Year Warranty',
  'Home & Office',
  "Pakistan's #1",
];

const tickerContent = items.map((item) => `${item} ◆ `).join('');

export default function MarqueeTicker() {
  return (
    <div className="section-gold bg-gold py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-darktext font-medium text-sm tracking-wide px-4">
          {tickerContent.repeat(4)}
        </span>
        <span className="text-darktext font-medium text-sm tracking-wide px-4" aria-hidden="true">
          {tickerContent.repeat(4)}
        </span>
      </div>
    </div>
  );
}
