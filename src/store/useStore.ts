import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from '@src/store/createAuthSlice';

export const useStore = create<AuthSlice>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => sessionStorage)
    },
  ),
);

