export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function truncate(text, length = 100) {
  if (!text || text.length <= length) return text;
  return `${text.slice(0, length).trim()}...`;
}

export function getStarArray(rating) {
  const stars = [];
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push('full');
    else if (i === full && hasHalf) stars.push('half');
    else stars.push('empty');
  }
  return stars;
}

export function groupBy(array, key) {
  return array.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function generateOrderNumber() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getEstimatedDelivery(city = 'Islamabad') {
  const islamabadCities = ['Islamabad', 'Rawalpindi'];
  const days = islamabadCities.includes(city) ? '3-5' : '5-7';
  const date = new Date();
  date.setDate(date.getDate() + (islamabadCities.includes(city) ? 5 : 7));
  return {
    days,
    date: date.toLocaleDateString('en-PK', { weekday: 'long', month: 'long', day: 'numeric' }),
  };
}
