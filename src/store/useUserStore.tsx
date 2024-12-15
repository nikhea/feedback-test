/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface UserState {
  user: any | null;
  shouldFetchUser: boolean;
  setUser: (user: any | null) => void;
  setShouldFetchUser: (shouldFetch: boolean) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  shouldFetchUser: false,
  setUser: (user) => set({ user }),
  setShouldFetchUser: (shouldFetch) => set({ shouldFetchUser: shouldFetch }),
}));

export default useUserStore;
