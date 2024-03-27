import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CroppedImageState } from "../types";

export const useCroppedImgSrcState = create<CroppedImageState>()(
  persist<CroppedImageState>(
    (set) => ({
      croppedImgSrc: "",
      setCroppedImgSrc: (newCroppedImgSrc: string) =>
        set({ croppedImgSrc: newCroppedImgSrc }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
