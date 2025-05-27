import { create } from "zustand";


interface NotificationsModal {
    isOpen: boolean;
    toggleModal: () => void;
}

const useNotificationsModalStore = create<NotificationsModal>((set) => ({
    isOpen: false,
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen }))
}))

export default useNotificationsModalStore;