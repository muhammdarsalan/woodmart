import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const FREE_DELIVERY_THRESHOLD = 50000;
const DELIVERY_FEE = 1500;

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      promoCode: null,
      promoDiscount: 0,

      addItem: (product, quantity = 1, color = null) => {
        if (!product || !product.id) return;
        try {
          const selectedColor = color || product.colors?.[0]?.name || 'Default';
          set((state) => {
            const existing = state.items.find(
              (item) => item.id === product.id && item.selectedColor === selectedColor
            );
            if (existing) {
              return {
                items: state.items.map((item) =>
                  item.id === product.id && item.selectedColor === selectedColor
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                ),
              };
            }
            return {
              items: [
                ...state.items,
                {
                  id: product.id,
                  slug: product.slug || '',
                  name: product.name || '',
                  price: product.price || 0,
                  image: product.images?.[0] || '',
                  material: product.material || '',
                  selectedColor: selectedColor || 'Default',
                  quantity: quantity || 1,
                },
              ],
            };
          });
        } catch (err) {
          console.error('addItem error:', err);
        }
      },

      removeItem: (id, selectedColor) => {
        if (!id) return;
        set((state) => ({
          items: (state.items || []).filter(
            (item) => !(item.id === id && (!selectedColor || item.selectedColor === selectedColor))
          ),
        }));
      },

      updateQuantity: (id, quantity, selectedColor) => {
        if (!id || quantity < 1) return;
        set((state) => ({
          items: (state.items || []).map((item) =>
            item.id === id && item.selectedColor === selectedColor
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [], promoCode: null, promoDiscount: 0 }),

      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      applyPromoCode: (code) => {
        try {
          if (!code) return { success: false, message: 'Invalid promo code' };
          const upper = String(code).toUpperCase();
          if (upper === 'WOODMART10') {
            const subtotal = get().getSubtotal();
            set({ promoCode: upper, promoDiscount: Math.round(subtotal * 0.1) });
            return { success: true, message: '10% discount applied!' };
          }
          if (upper === 'NEWCUSTOMER') {
            set({ promoCode: upper, promoDiscount: 2000 });
            return { success: true, message: 'PKR 2,000 discount applied!' };
          }
          return { success: false, message: 'Invalid promo code' };
        } catch (err) {
          console.error('applyPromoCode error:', err);
          return { success: false, message: 'Invalid promo code' };
        }
      },

      removePromoCode: () => set({ promoCode: null, promoDiscount: 0 }),

      getTotalItems: () => {
        const items = get().items || [];
        return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
      },

      getSubtotal: () => {
        const items = get().items || [];
        return items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const delivery = get().getDeliveryFee();
        const discount = get().promoDiscount || 0;
        return Math.max(0, subtotal + delivery - discount);
      },
    }),
    {
      name: 'woodmart-cart',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        promoDiscount: state.promoDiscount,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('Cart rehydration error:', error);
          try { localStorage.removeItem('woodmart-cart'); } catch (e) {}
        }
      },
    }
  )
);

export default useCartStore;
