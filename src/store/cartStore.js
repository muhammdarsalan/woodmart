import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

function makeCartId(product, color) {
  return String(product.id) + ':' + String(color || 'Default');
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      addItem: (product, qty = 1, color) => set(state => {
        const selectedColor = color || product.colors?.[0]?.name || 'Default';
        const cartId = makeCartId(product, selectedColor);
        const existing = state.items.find(item => item.cartId === cartId);
        if (existing) {
          return {
            items: state.items.map(item => item.cartId === cartId ? { ...item, qty: item.qty + qty } : item),
            isDrawerOpen: true
          };
        }
        return {
          items: [
            ...state.items,
            {
              cartId,
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.images?.[0],
              category: product.category,
              color: selectedColor,
              qty
            }
          ],
          isDrawerOpen: true
        };
      }),
      removeItem: id => set(state => ({ items: state.items.filter(item => item.cartId !== id && item.id !== id) })),
      updateQuantity: (id, qty) => set(state => ({
        items: state.items.map(item => item.cartId === id || item.id === id ? { ...item, qty: Math.max(1, Number(qty) || 1) } : item)
      })),
      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set(state => ({ isDrawerOpen: !state.isDrawerOpen })),
      getTotalItems: () => get().items.reduce((total, item) => total + item.qty, 0),
      getSubtotal: () => get().items.reduce((total, item) => total + item.price * item.qty, 0),
      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal > 50000 ? 0 : 1500;
      },
      getTotal: () => get().getSubtotal() + get().getDeliveryFee()
    }),
    {
      name: 'woodmart-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ items: state.items })
    }
  )
);
