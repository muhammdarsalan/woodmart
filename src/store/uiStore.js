import { create } from 'zustand';

export const useUiStore = create((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  searchQuery: '',
  activeCategory: null,
  viewMode: 'grid',
  isFilterDrawerOpen: false,
  quickViewProduct: null,

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  openMobileMenu: () => set({ isMobileMenuOpen: true }),

  toggleSearch: () =>
    set((state) => ({
      isSearchOpen: !state.isSearchOpen,
      searchQuery: state.isSearchOpen ? '' : state.searchQuery,
    })),
  closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  setActiveCategory: (category) => set({ activeCategory: category }),

  setViewMode: (mode) => set({ viewMode: mode }),

  toggleFilterDrawer: () =>
    set((state) => ({ isFilterDrawerOpen: !state.isFilterDrawerOpen })),
  closeFilterDrawer: () => set({ isFilterDrawerOpen: false }),

  setQuickViewProduct: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),
}));

export default useUiStore;
