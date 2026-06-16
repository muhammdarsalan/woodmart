export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&fit=crop';

export function handleImageError(event) {
  const image = event.currentTarget;
  if (image && image.src !== FALLBACK_IMAGE) {
    image.src = FALLBACK_IMAGE;
  }
}
