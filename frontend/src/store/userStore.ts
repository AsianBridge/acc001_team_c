import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserState = { //UserState型
    userID: string | undefined;
    setUserName: (newID: string | undefined) => void;
}

export const useUserState = create<UserState>()(
    persist<UserState>((set) => ({
        userID: undefined,
        setUserName: (newID: string | undefined) => set({ userID: newID }),
    }), {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
    })
);
