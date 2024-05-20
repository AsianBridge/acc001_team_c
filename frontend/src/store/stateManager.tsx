import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState, UserState } from "../types";
import { AuthUser } from "@aws-amplify/auth";

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

export const useAuthState = create<AuthState>()(
  persist(
    (set) => ({
      authState: undefined,
      setAuthState: (newAuthState?: AuthUser) =>
        set({ authState: newAuthState }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
