import { IUserProfile } from "@/interfaces/userProfile";
import { create } from "zustand";




interface UserProfileState {
    isOpen : boolean;
    id : string | null;
    profile : IUserProfile | null;
    toggleUserProfile : ()=> void;
    setId : (id : string | null)=> void;
    setProfile : (profile : IUserProfile | null)=> void;
}


const useUserProfileStore = create<UserProfileState>((set)=>({
    isOpen : false,
    id : null,
    profile : null,
    toggleUserProfile: () => set((state) => ({ isOpen: !state.isOpen })),
    setId: (id) => set({ id }),
    setProfile: (profile) => set({ profile })
}))

export default useUserProfileStore;
