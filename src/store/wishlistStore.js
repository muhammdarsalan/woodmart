import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: product => set(state => {
        if (state.items.some(item => String(item.id) === String(product.id))) return state;
        return { items: [...state.items, product] };
      }),
      removeItem: id => set(state => ({ items: state.items.filter(item => String(item.id) !== String(id)) })),
      toggleItem: product => {
        let added = false;
        set(state => {
          const exists = state.items.some(item => String(item.id) === String(product.id));
          if (exists) return { items: state.items.filter(item => String(item.id) !== String(product.id)) };
          added = true;
          return { items: [...state.items, product] };
        });
        return added;
      },
      isInWishlist: id => get().items.some(item => String(item.id) === String(id))
    }),
    {
      name: 'woodmart-wishlist',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
