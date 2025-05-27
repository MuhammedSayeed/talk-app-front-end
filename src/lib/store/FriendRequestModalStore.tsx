
import { create } from "zustand";

interface FriendRequestModal {
    isOpen: boolean;
    toggleModal: () => void;
}


const useFriendRequestModalStore = create<FriendRequestModal>((set) => ({
    isOpen: false,
    toggleModal: () => set((state)=>({isOpen : !state.isOpen}))
}))

export default useFriendRequestModalStore;