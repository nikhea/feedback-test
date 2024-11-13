import { create } from "zustand";

type MutationState = {
  pendingCount: number;
  incrementPending: () => void;
  decrementPending: () => void;
  getPendingCount: () => number;
};

export const useMutationStore = create<MutationState>((set, get) => ({
  pendingCount: 0,
  incrementPending: () => {
    set((state) => {
      const newCount = state.pendingCount + 1;
      console.log("Incremented: pending mutation", newCount);
      return { pendingCount: newCount };
    });
  },
  decrementPending: () => {
    set((state) => {
      const newCount = state.pendingCount - 1;
      console.log("Decremented: pending mutation", newCount);
      return { pendingCount: newCount };
    });
  },
  getPendingCount: () => get().pendingCount,
}));
