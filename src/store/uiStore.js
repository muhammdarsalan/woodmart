import { create } from 'zustand';

export const useUiStore = create(set => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  searchQuery: '',
  quickViewProduct: null,
  isFilterDrawerOpen: false,
  toggleMobileMenu: () => set(state => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleSearch: () => set(state => ({ isSearchOpen: !state.isSearchOpen })),
  setSearchQuery: searchQuery => set({ searchQuery }),
  setQuickViewProduct: quickViewProduct => set({ quickViewProduct }),
  clearQuickViewProduct: () => set({ quickViewProduct: null }),
  toggleFilterDrawer: () => set(state => ({ isFilterDrawerOpen: !state.isFilterDrawerOpen }))
}));
