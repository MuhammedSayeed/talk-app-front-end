"use client"

import { useContext } from "react"
import { ChatContext } from "@/context/chat/ChatContext"
import dynamic from "next/dynamic"
// Static Components
import EmptyState from "@/components/ui/EmptyState"
import { TabsSwitch } from "@/components/Tabs/Tabs"
import TabsContent from "@/components/Tabs/TabsContent"
import ChatBox from "@/components/chat/ChatBox"
// Dynamic Components
const OnBoardingModal = dynamic(() => import('@/components/onBoarding/OnBoardingModal'), { ssr: false })
const ChatInfo = dynamic(() => import('@/components/chatInfo/ChatInfo'), { ssr: false })
const ChatInfoModal = dynamic(() => import('@/components/chatInfo/ChatInfoModal'), { ssr: false })


const ChatsPage = () => {
  const { activeChat } = useContext(ChatContext);


  return (
    <>
      <OnBoardingModal />
      <div className="h-full md:flex 2xl:justify-center  gap-4 px-5 py-8">
        <div className="w-full h-full md:max-w-[345px] grid grid-rows-[36px_1fr] ">
          <TabsSwitch />
          <TabsContent />
        </div>
        <div className="h-full w-full 2xl:max-w-3xl">
          {activeChat ? <ChatBox /> : <EmptyState />}
        </div>
        {activeChat && <ChatInfo />}
        {activeChat && <ChatInfoModal />}
      </div>
    </>
  )
}

export default ChatsPage