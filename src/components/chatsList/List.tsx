import { IoIosChatboxes } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { Input } from '../ui/input'
import ChatCard from './Card'
import { useContext, useMemo } from 'react'
import Message from '../ui/messages/Message'
import { IChat } from '@/interfaces/chat'
import ChatCardSkeleton from '../skeleton/ChatCard'
import { ChatContext } from '@/context/chat/ChatContext'
import { AnimatePresence } from "framer-motion"
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

const ChatsList = () => {
    const { chats, isChatsLoading, fetchNextChatsPage, hasNextChatsPage, isFetchingNextChatsPage, searchTerm, setSearchTerm } = useContext(ChatContext);
    const { lastItemRef } = useInfiniteScroll({ fetchNextPage: fetchNextChatsPage, hasNextPage: hasNextChatsPage, isLoading: isChatsLoading, isFetchingNextPage: isFetchingNextChatsPage });


    const RENDER_SKELETON = useMemo(() =>
        Array(5).fill(null).map((_, index) => <ChatCardSkeleton key={index} />),
        []);


        


    const RENDER_CARDS = () => {
        if (isChatsLoading) return RENDER_SKELETON
        if (chats?.length === 0) {
            return searchTerm ?
                <Message message={`No chats found for "${searchTerm}"`} />
                : <Message message='No chats yet..' />
        }
        return chats?.map((chat: IChat, index) => {
            if (index === chats.length - 1 && hasNextChatsPage) {
                return <div key={chat._id} ref={lastItemRef}>
                    <ChatCard chat={chat} />
                </div>
            }
            return <ChatCard key={chat._id} chat={chat} />
        })
    }
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };



    return (
        <div className="pt-3 grid grid-rows-[auto_1fr] space-y-3">
            <div className="space-y-3">
                <h1 className="text-4xl text-gray-200 font-bold flex items-center gap-2">
                    <span className=" h-full flex items-center mt-1">
                        <IoIosChatboxes size={25} className="text-gray-200" />
                    </span>Chats
                </h1>
                <div className="border border-white/20 flex items-center gap-1 pl-2 rounded-lg remove-outline bg-transparent">
                    <IoSearch className="text-white/50" size={25} />
                    <Input value={searchTerm} onChange={handleSearchChange} className="!bg-transparent py-6 px-0 border-none text-white/50 font-medium placeholder:text-white/50 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Search for a chat" />
                </div>
            </div>
            <div className=" relative w-full h-full max-h-full ">
                <div className="absolute inset-0 overflow-y-auto space-y-3">
                    <AnimatePresence initial={false}>
                        {RENDER_CARDS()}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default ChatsList
