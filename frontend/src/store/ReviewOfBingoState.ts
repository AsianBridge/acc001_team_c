import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BingoState } from "../types";

export const useBingoState = create<BingoState>()(
  persist<BingoState>(
    (set) => ({
      BingoID: undefined,
      StoreID: undefined,
      setBingoID: (newBingoID?: string) => set({ BingoID: newBingoID }),
      setStoreID: (newStoreID?: string) => set({ StoreID: newStoreID }),
    }),
    {
      name: "bingo-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
