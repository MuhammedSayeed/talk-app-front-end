
import { create } from "zustand";

interface DeleteChatModal {
    isOpen: boolean;
    toggleDeleteChatModal: () => void;
}


const useDeleteChatModalStore = create<DeleteChatModal>((set) => ({
    isOpen: false,
    toggleDeleteChatModal: () => set((state)=>({isOpen : !state.isOpen}))
}))

export default useDeleteChatModalStore;