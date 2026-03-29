import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  
  setAuth: (user: User) => void;
  clearAuth: () => void;
  setLoading: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true, // Keep true initially until we verify the HttpOnly cookie's validity

  setAuth: (user) => set({ isAuthenticated: true, user, isLoading: false }),
  clearAuth: () => set({ isAuthenticated: false, user: null, isLoading: false }),
  setLoading: (status) => set({ isLoading: status }),
}));
