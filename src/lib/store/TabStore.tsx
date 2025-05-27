import { create } from "zustand";


type ActiveTab = "chats-list" | "friends-list";


interface TabState {
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
}

const useTabStore = create<TabState>((set) => ({
    activeTab: "chats-list",
    setActiveTab: (tab) => set({ activeTab: tab })
}))

export default useTabStore;
