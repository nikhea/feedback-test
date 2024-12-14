import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface UserStore {
  username: string;
  email: string;
  setUserName: (e: string) => void;
  setEmail: (e: string) => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        username: "",
        email: "",
        setUserName: (username: string) => set(() => ({ username })),
        setEmail: (email: string) => set(() => ({ email })),
      }),
      {
        name: "userState-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
