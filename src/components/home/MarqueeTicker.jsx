const items = [
  'Premium Solid Wood',
  'Handcrafted in Pakistan',
  'Free Delivery Islamabad',
  '15-Year Warranty',
  '2,400+ Happy Clients',
  'Custom Orders Welcome',
  'Home & Office Furniture',
];

const tickerText = items.map((item) => `${item} ◆ `).join('');

export default function MarqueeTicker() {
  return (
    <div
      className="bg-gold overflow-hidden border-y-2 border-darktext/10"
      style={{ height: '48px' }}
    >
      <div
        className="flex whitespace-nowrap h-full items-center animate-marquee"
        style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '13px',
          letterSpacing: '2px',
          fontWeight: 500,
        }}
      >
        <span className="text-darktext px-4 inline-block">
          {tickerText.repeat(3)}
        </span>
        <span className="text-darktext px-4 inline-block" aria-hidden="true">
          {tickerText.repeat(3)}
        </span>
      </div>
    </div>
  );
}
