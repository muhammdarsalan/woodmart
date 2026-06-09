import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!product || !product.id) return;
        try {
          set((state) => {
            const items = state.items || [];
            if (items.some((item) => item.id === product.id)) return state;
            return {
              items: [
                ...items,
                {
                  id: product.id,
                  slug: product.slug || '',
                  name: product.name || '',
                  price: product.price || 0,
                  originalPrice: product.originalPrice || 0,
                  image: product.images?.[0] || '',
                  material: product.material || '',
                  rating: product.rating || 0,
                  reviewCount: product.reviewCount || 0,
                  badge: product.badge || null,
                  discount: product.discount || 0,
                  colors: product.colors || [],
                  inStock: product.inStock !== false,
                },
              ],
            };
          });
        } catch (err) {
          console.error('wishlist addItem error:', err);
        }
      },

      removeItem: (id) => {
        if (!id) return;
        set((state) => ({
          items: (state.items || []).filter((item) => item.id !== id),
        }));
      },

      toggleItem: (product) => {
        if (!product || !product.id) return false;
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(product.id)) {
          removeItem(product.id);
          return false;
        }
        addItem(product);
        return true;
      },

      isInWishlist: (id) => {
        if (!id) return false;
        const items = get().items || [];
        return items.some((item) => item.id === id);
      },
    }),
    {
      name: 'woodmart-wishlist',
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Wishlist rehydration error:', error);
          try { localStorage.removeItem('woodmart-wishlist'); } catch (e) {}
        }
      },
    }
  )
);

export default useWishlistStore;
