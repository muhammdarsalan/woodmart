import { useMemo } from 'react';
import { products as hardcoded } from '../data/products';

export default function useProducts() {
  return useMemo(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('woodmart-products') || '[]');
      const deleted = JSON.parse(localStorage.getItem('woodmart-deleted-products') || '[]');
      const validSaved = Array.isArray(saved) ? saved : [];
      const validDeleted = Array.isArray(deleted) ? deleted.map(String) : [];
      const filtered = hardcoded.filter(product => !validDeleted.includes(String(product.id)));
      return [...validSaved, ...filtered];
    } catch {
      return Array.isArray(hardcoded) ? hardcoded : [];
    }
  }, []);
}
