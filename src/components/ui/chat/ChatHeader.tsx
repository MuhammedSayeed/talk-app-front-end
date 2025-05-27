"use client"
import { MdArrowBackIos } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Avatar from '../Avatar'
import { useContext } from 'react'
import { ChatContext } from '@/context/chat/ChatContext'
import ChatHeaderSkeleton from '@/components/skeleton/ChatHeader'
import useChatBoxStore from '@/lib/store/ChatBoxStore'
import useChatInfoModalStore from '@/lib/store/ChatInfoModalStore'
import Status from './Status/Status'

const ChatHeader = () => {
    const { toggleChatBox } = useChatBoxStore();
    const { isChatLoading, friendInfo , blockInfo } = useContext(ChatContext);
    const { toggleChatInfoModal } = useChatInfoModalStore();

    const closeChatBox = () => {
        toggleChatBox();
    }

    const handleOpenChatInfo = () => {
        toggleChatInfoModal();
    }



    if (isChatLoading) return <ChatHeaderSkeleton />



    return (
        <div className='flex justify-between items-center px-3 py-4 bg-primary-lighter/40 '>
            <div className="flex items-center gap-3">
                <MdArrowBackIos onClick={closeChatBox} className="text-gray-300 hover:text-white transition-colors cursor-pointer size-7 md:hidden" />
                <div className="size-fit">
                    <Avatar name={friendInfo?.name as string} image={friendInfo?.profilePic.src || process.env.NEXT_PUBLIC_FALLBACK_IMAGE!} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl text-gray-100 font-medium">{friendInfo?.name}</span>
                    {!blockInfo && <Status/>}
                </div>
            </div>
            <div className="flex items-center gap-3">
                <BsThreeDotsVertical onClick={handleOpenChatInfo} className='size-7 text-gray-300 hover:text-white transition-colors cursor-pointer 2xl:hidden' />
            </div>
        </div>
    )
}

export default ChatHeader