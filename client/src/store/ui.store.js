import { create } from 'zustand';

export const useUiStore = create((set) => ({
  isLoading: false,
  setLoading: (status) => set({ isLoading: status }),
  
  toast: null,
  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    setTimeout(() => {
      set({ toast: null });
    }, 3000);
  },
  hideToast: () => set({ toast: null }),
}));
