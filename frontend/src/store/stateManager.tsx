import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserState } from "../types";

export const useUserState = create<UserState>()(
  persist<UserState>(
    (set) => ({
      userID: "Guest",
      setUserID: (newID: string) => set({ userID: newID }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
