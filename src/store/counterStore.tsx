import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface CounterStore {
  count: number;
  increasecount: (e: number) => void;
  decreasecount: (e: number) => void;
  reset: () => void;
}

export const useCounterStore = create<CounterStore>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increasecount: (value = 1) =>
          set((state) => ({
            count: state.count + value,
          })),
        decreasecount: (value = 1) =>
          set((state) => ({
            count: state.count - value,
          })),
        reset: () => set({ count: 0 }),
      }),
      {
        name: "counterState-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
