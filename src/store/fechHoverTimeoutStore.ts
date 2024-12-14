import { create } from "zustand";

interface HoverTimeoutStore {
  hoverTimeouts: { [key: string]: NodeJS.Timeout };
  onHoverEnter: (id: string, prefetchFn: () => void, delay?: number) => void;
  onHoverLeave: (id: string) => void;
}

export const useHoverTimeoutStore = create<HoverTimeoutStore>((set, get) => ({
  hoverTimeouts: {},

  onHoverEnter: (id, prefetchFn, delay = 10000) => {
    const timeoutId = setTimeout(prefetchFn, delay);

    set((state) => ({
      hoverTimeouts: { ...state.hoverTimeouts, [id]: timeoutId },
    }));
  },

  onHoverLeave: (id) => {
    const timeoutId = get().hoverTimeouts[id];
    if (timeoutId) {
      clearTimeout(timeoutId);
      set((state) => {
        const updatedTimeouts = { ...state.hoverTimeouts };
        delete updatedTimeouts[id];
        return { hoverTimeouts: updatedTimeouts };
      });
    }
  },
}));
