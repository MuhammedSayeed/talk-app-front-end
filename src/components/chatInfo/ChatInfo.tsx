"use client"
import dynamic from "next/dynamic";
import ChatInfoContent from './ChatInfoContent'
const DeleteChatModal = dynamic(() => import('./DeleteChatModal'), {ssr: false});

const ChatInfo = () => {
  return (
    <>
      <DeleteChatModal />
      <div className="hidden h-fit 2xl:block 2xl:flex-grow 2xl:max-w-sm border border-primary-lighter p-4 rounded-md space-y-6">
        <ChatInfoContent />
      </div>
    </>
  )
}

export default ChatInfo
