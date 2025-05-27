
import { create } from "zustand";

interface MyProfileModal {
    isOpen: boolean;
    toggleModal: () => void;
}


const MyProfileModalStore = create<MyProfileModal>((set) => ({
    isOpen: false,
    toggleModal: () => set((state)=>({isOpen : !state.isOpen}))
}))

export default MyProfileModalStore;