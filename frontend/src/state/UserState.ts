import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ReviewImageState, UserState } from "../types";

export const useUserState = create<UserState>()(
  persist<UserState>(
    (set) => ({
      userID: undefined,
      setUserID: (newID: string | undefined) => set({ userID: newID }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const  useReviewImageState = create<ReviewImageState>()(
  persist<ReviewImageState>(
    (set) => ({
      reviewImageID: undefined,
      setReviewImageID: (newID: string | undefined) => set({ reviewImageID: newID }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
