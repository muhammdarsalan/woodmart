export function formatPrice(number) {
  const formatted = new Intl.NumberFormat('en-PK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
  return `PKR ${formatted}`;
}

export function formatDiscount(original, sale) {
  if (!original || original <= sale) return '';
  const percent = Math.round(((original - sale) / original) * 100);
  return `${percent}% OFF`;
}

export function calculateSavings(original, sale) {
  if (!original || original <= sale) return 0;
  return original - sale;
}
