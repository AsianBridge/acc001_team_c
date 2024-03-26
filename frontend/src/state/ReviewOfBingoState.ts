import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ReviewImageState } from "../types";

export const useReviewImageState = create<ReviewImageState>()(
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
