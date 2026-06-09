const badgeStyles = {
  new: 'bg-darktext text-gold',
  sale: 'bg-gold text-darktext',
  bestseller: 'bg-brown-mid text-gold-light',
  toprated: 'bg-beige text-darktext border border-gold',
  outofstock: 'bg-[#F5F5F5] text-[#999999]',
};

const badgeLabels = {
  new: 'New',
  sale: 'Sale',
  bestseller: 'Bestseller',
  toprated: 'Top Rated',
  outofstock: 'Out of Stock',
};

export default function Badge({ type, text, className = '' }) {
  const normalizedType = type?.toLowerCase().replace(/\s+/g, '') || 'new';
  const label = text || badgeLabels[normalizedType] || type;

  return (
    <span
      className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm ${badgeStyles[normalizedType] || badgeStyles.new} ${className}`}
    >
      {label}
    </span>
  );
}
