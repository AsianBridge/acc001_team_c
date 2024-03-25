import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserState = { //UserState型
    userName: string | undefined;
    setUserName: (newName: string | undefined) => void;
}

export const useUserState = create<UserState>()(
    persist<UserState>((set) => ({
        userName: undefined,
        setUserName: (newName: string | undefined) => set({ userName: newName }),
    }), {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
    })
);
