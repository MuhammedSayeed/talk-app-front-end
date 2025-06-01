
"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useTabStore from "@/lib/store/TabStore";

export function TabsSwitch() {
    const {activeTab ,setActiveTab} = useTabStore();

    return (
        <Tabs value={activeTab} defaultValue={activeTab} className="w-full mx-auto">
            <TabsList className="grid w-full grid-cols-2 bg-[#151515]">
                <TabsTrigger value="chats-list" onClick={()=> setActiveTab("chats-list")} className="data-[state=active]:bg-primary-lighter data-[state=active]:text-white cursor-pointer">Chats</TabsTrigger>
                <TabsTrigger value="friends-list" onClick={()=> setActiveTab("friends-list")} className="data-[state=active]:bg-primary-lighter data-[state=active]:text-white cursor-pointer">Friends</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
