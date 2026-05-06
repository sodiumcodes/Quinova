import { create } from 'zustand';
import { getToken, setToken as setLocalToken, removeToken } from '../utils/token.utils';

export const useAuthStore = create((set) => ({
  user: null,
  token: getToken() || null,
  isAuthenticated: !!getToken(),
  
  setAuth: (user, token) => {
    setLocalToken(token);
    set({ user, token, isAuthenticated: true });
  },
  
  clearAuth: () => {
    removeToken();
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
