import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserState = { //UserState型
    userName: string;
    setUserName: (newName: string) => void;
}

export const useUserState = create<UserState>()(
    persist<UserState>((set) => ({
        userName: 'Guest',
        setUserName: (newName: string) => set({ userName: newName }),
    }), {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
    })
);
