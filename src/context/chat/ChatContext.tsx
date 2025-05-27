/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { type Dispatch, type RefObject, type SetStateAction, createContext } from "react"
import type { IChat, IChatUser } from "@/interfaces/chat"
import type { IMessage } from "@/interfaces/message"
import type { IBlockInfo } from "@/interfaces/block"

interface IChatContext {
    chats: IChat[] | null
    isChatsLoading: boolean
    setActiveChat: Dispatch<SetStateAction<IChat | null>>
    activeChat: IChat | null
    isChatLoading: boolean
    setIsChatLoading: Dispatch<SetStateAction<boolean>>
    isChatSelected: (_id: string) => boolean
    friendInfo: IChatUser | null
    extractFriendInfo: (chat: IChat | null) => IChatUser | null
    createOrGetChat: (_id: string) => Promise<void>
    deleteChat: (_id: string) => Promise<void>
    isLoading: boolean
    messages: IMessage[]
    isMessagesLoading: boolean
    blockInfo: IBlockInfo | null
    fetchNextChatsPage: () => Promise<void>
    hasNextChatsPage: boolean
    isFetchingNextChatsPage: boolean
    fetchNextMessagesPage: () => Promise<void>
    isFetchingNextMessagesPage: boolean
    hasNextMessagesPage: boolean
    messagesEndRef: RefObject<HTMLDivElement | null>
    shouldScrollToBottom: boolean
    setShouldScrollToBottom: Dispatch<SetStateAction<boolean>>
    scrollContainerRef: RefObject<HTMLDivElement | null>
    searchTerm: string
    setSearchTerm: Dispatch<SetStateAction<string>>
}

export const ChatContext = createContext<IChatContext>({
    chats: null,
    isChatsLoading: false,
    setActiveChat: () => { },
    activeChat: null,
    isChatLoading: false,
    setIsChatLoading: () => { },
    isChatSelected: (_id: string) => false,
    friendInfo: null,
    extractFriendInfo: (chat: IChat | null) => null,
    createOrGetChat: async (_id: string) => { },
    deleteChat: async (_id: string) => { },
    isLoading: false,
    messages: [],
    isMessagesLoading: false,
    blockInfo: null,
    fetchNextChatsPage: async () => { },
    hasNextChatsPage: false,
    isFetchingNextChatsPage: false,
    fetchNextMessagesPage: async () => { },
    isFetchingNextMessagesPage: false,
    hasNextMessagesPage: false,
    messagesEndRef: null as any,
    shouldScrollToBottom: true,
    setShouldScrollToBottom: () => { },
    scrollContainerRef: null as any,
    searchTerm: "",
    setSearchTerm: () => { },
})