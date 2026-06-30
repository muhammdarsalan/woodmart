import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { products as hardcoded } from '../data/products';

export default function useProducts() {
  const [products, setProducts] = useState(hardcoded);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(hardcoded);
      }
    } catch (err) {
      console.error('Fetch products error:', err);
      setProducts(hardcoded);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, refetch: fetchProducts };
}
