
import { create } from "zustand";

interface ChatInfoModal {
    isOpen: boolean;
    toggleChatInfoModal: () => void;
}


const useChatInfoModalStore = create<ChatInfoModal>((set) => ({
    isOpen: false,
    toggleChatInfoModal: () => set((state)=>({isOpen : !state.isOpen}))
}))

export default useChatInfoModalStore;