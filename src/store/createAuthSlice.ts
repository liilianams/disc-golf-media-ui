import { StateCreator } from 'zustand';

export type AuthSlice = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated: isAuthenticated });
  },
});


