import { create } from "zustand";

interface searchModal {
    isOpen: boolean;
    toggleModal: () => void;
}


const useSearchModalStore = create<searchModal>((set) => ({
    isOpen: false,
    toggleModal: () => set((state) => ({ isOpen:!state.isOpen })),
}));

export default useSearchModalStore;
