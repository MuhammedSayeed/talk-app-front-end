
import { create } from "zustand";

interface ChatBox {
    isOpen: boolean;
    toggleChatBox: () => void;
}


const useChatBoxStore = create<ChatBox>((set) => ({
    isOpen: false,
    toggleChatBox: () => set((state)=>({isOpen : !state.isOpen}))
}))

export default useChatBoxStore;