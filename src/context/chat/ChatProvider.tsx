"use client"

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../auth/AuthContext"
import { IChat, IChatUser } from "@/interfaces/chat"
import { IMessage } from "@/interfaces/message"
import { IBlockInfo } from "@/interfaces/block"
import { useDebounce } from "@/hooks/useDebounce"
import { useChatsQuery } from "@/hooks/Queries/useChatsQuery"
import { useBlockInfoQuery } from "@/hooks/Queries/useBlockInfoQuery"
import { useMessagesQuery } from "@/hooks/Queries/useMessagesQuery"
import { useScrollToBottom } from "@/hooks/useScrollToBottom"
import { ChatUtils } from "@/utils/ChatUtils"
import { useChatOperations } from "@/hooks/useChatOperations"
import { useFetchNewChat } from "@/hooks/useFetchNewChat"
import { useMessageHandlers } from "@/hooks/useMessageHandlers"
import { useSocketConnection } from "@/hooks/socket/useSocketConnection"
import { useMessageSocket } from "@/hooks/socket/useMessageSocket"
import { useChatDeleteSocket } from "@/hooks/socket/useChatDeleteSocket"
import { useBlockSocket } from "@/hooks/socket/useBlockSocket"
import { useFriendStatusSocket } from "@/hooks/socket/useFriendStatusSocket"
import { useSearchReset } from "@/hooks/useSearchReset"
import { usePaginationScroll } from "@/hooks/usePaginationScroll"
import { ChatContext } from "./ChatContext"

interface IChatProviderProps {
    children: React.ReactNode
}


export const ChatProvider = ({ children }: IChatProviderProps) => {
    // Refs
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    // Context and store hooks
    const { user } = useContext(AuthContext)

    // state
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true)
    const [chats, setChats] = useState<IChat[] | null>(null)
    const [activeChat, setActiveChat] = useState<IChat | null>(null)
    const [isChatLoading, setIsChatLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [friendInfo, setFriendInfo] = useState<IChatUser | null>(null)
    const [messages, setMessages] = useState<IMessage[]>([])
    const [blockInfo, setBlockInfo] = useState<IBlockInfo | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 500 })

    // Queries
    const chatsQuery = useChatsQuery(user?._id, debouncedSearchTerm)
    const messagesQuery = useMessagesQuery(activeChat?._id)
    const blockData = useBlockInfoQuery(activeChat?._id, friendInfo?._id)

    // Destructure query results
    const { data: chatsData, isLoading: isChatsLoading, hasNextPage: hasNextChatsPage, isFetchingNextPage: isFetchingNextChatsPage, fetchNextPage: fetchNextChatsPage } = chatsQuery
    const { data: messagesData, isLoading: isMessagesLoading, hasNextPage: hasNextMessagesPage, isFetchingNextPage: isFetchingNextMessagesPage, fetchNextPage: fetchNextMessagesPage, } = messagesQuery

    // Scroll handling
    const { scrollToBottom } = useScrollToBottom(messagesEndRef)

    // Extract friend info from a chat
    const extractFriendInfo = useCallback((chat: IChat | null) => {
        return ChatUtils.extractFriendInfo(chat, user?._id as string)
    }, [user?._id])

  

    // Chat operations
    const { createOrGetChat, deleteChat } = useChatOperations({activeChat, setActiveChat, setFriendInfo, setIsChatLoading, setIsLoading, setChats })

    // Fetch new chat
    const { fetchNewChat } = useFetchNewChat(setChats)

    // Message handlers
    const { handleNewMessage, handleDeleteChat, handleSetFriendStatus, handleBlockEvent } = useMessageHandlers({ activeChat, setMessages, setChats, setShouldScrollToBottom, scrollToBottom, setFriendInfo, setBlockInfo, setActiveChat, fetchNewChat })

    // Socket connections
    useSocketConnection(user?._id)
    useMessageSocket(user?._id, activeChat?._id, handleNewMessage)
    useChatDeleteSocket(user?._id, activeChat?._id, handleDeleteChat)
    useBlockSocket(user?._id, activeChat?._id, friendInfo?._id, handleBlockEvent)
    useFriendStatusSocket(friendInfo?._id, handleSetFriendStatus)

    // Search reset
    useSearchReset(user?._id, searchTerm);

    // Pagination scroll
    usePaginationScroll(scrollContainerRef, messagesData, setMessages)

    // Process chats data
    useEffect(() => {
        if (chatsData) {
            setChats(ChatUtils.processChatsData(chatsData))
        }
    }, [chatsData])

    // Reset messages when active chat changes
    useEffect(() => {
        setMessages([])
    }, [activeChat?._id])

    // Set friend info when active chat changes
    useEffect(() => {
        if (activeChat) {
            setFriendInfo(extractFriendInfo(activeChat))
        }
    }, [activeChat, extractFriendInfo])

    // Set block info if exists when active chat changes
    useEffect(() => {
        if (blockData) {
            setBlockInfo(blockData)
        }
    }, [blockData])

    return (
        <ChatContext.Provider
            value={{
                searchTerm,
                setSearchTerm,
                scrollContainerRef,
                shouldScrollToBottom,
                setShouldScrollToBottom,
                chats,
                hasNextChatsPage,
                fetchNextChatsPage: async () => {
                    await fetchNextChatsPage()
                },
                isFetchingNextChatsPage,
                isChatsLoading,
                isFetchingNextMessagesPage,
                hasNextMessagesPage,
                fetchNextMessagesPage: async () => {
                    await fetchNextMessagesPage()
                },
                activeChat,
                setActiveChat,
                isChatLoading,
                friendInfo,
                setIsChatLoading,
                extractFriendInfo,
                createOrGetChat,
                deleteChat,
                isLoading,
                isMessagesLoading,
                messages,
                blockInfo,
                messagesEndRef,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

