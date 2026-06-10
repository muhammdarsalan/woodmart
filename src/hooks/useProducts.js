import { useMemo } from 'react';
import { products as hardcoded } from '../data/products';

export function readProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem('woodmart-products') || '[]');
    const deleted = JSON.parse(localStorage.getItem('woodmart-deleted-products') || '[]');
    const filtered = hardcoded.filter((p) => !deleted.includes(String(p.id)) && !deleted.includes(p.id));
    return [...(Array.isArray(saved) ? saved : []), ...filtered];
  } catch {
    return hardcoded;
  }
}

export default function useProducts() {
  return useMemo(() => readProducts(), []);
}
