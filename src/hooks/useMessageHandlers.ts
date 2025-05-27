"use client"

import { IBlockInfo } from "@/interfaces/block"
import { IChat, IChatUser } from "@/interfaces/chat"
import { IMessage } from "@/interfaces/message"
import { IBlockUserEvent } from "@/interfaces/realTimeEvents"
import { IUserStatus } from "@/interfaces/status"
import { ChatUtils } from "@/utils/ChatUtils"
import { useCallback } from "react"
import useUpdateMessageStatus from "./useUpdateMessageStatus"

interface UseMessageHandlersProps {
    activeChat: IChat | null
    setMessages: (updater: (prev: IMessage[]) => IMessage[]) => void
    setChats: (updater: (prev: IChat[] | null) => IChat[] | null) => void
    setShouldScrollToBottom: (value: boolean) => void
    scrollToBottom: () => void
    fetchNewChat: (chatId: string) => Promise<void>
    setActiveChat: (chat: IChat | null) => void
    setFriendInfo: React.Dispatch<React.SetStateAction<IChatUser | null>>;
    setBlockInfo: (blockInfo: IBlockInfo | null) => void
}
/**
 * Hook for handling various message and chat events
 */
export const useMessageHandlers = ({ activeChat, fetchNewChat, scrollToBottom, setActiveChat, setBlockInfo, setChats, setFriendInfo, setMessages, setShouldScrollToBottom }: UseMessageHandlersProps) => {
    
    const {markMessageAsRead} = useUpdateMessageStatus({ setChats });

    const handleNewMessage = useCallback((newMessage: IMessage) => {
        if (activeChat && activeChat?._id === newMessage.chat) {
            setShouldScrollToBottom(true)
            setMessages((prev) => [newMessage, ...prev])
            markMessageAsRead(newMessage.chat)
        }

        // Update chats list with the new message
        setChats((prev) => {
            if (!prev) return prev

            const chatIndex = prev.findIndex((chat) => chat._id === newMessage.chat)
            if (chatIndex !== -1) return ChatUtils.updateChatsWithMessage(prev, newMessage , activeChat?._id as string)

            // Fetch the new chat if it doesn't exist in the list
            fetchNewChat(newMessage.chat)
            return prev
        })
        setTimeout(scrollToBottom, 0)

    }, [activeChat, fetchNewChat, scrollToBottom, setChats, setMessages, setShouldScrollToBottom]);

    const handleDeleteChat = useCallback((chatId : string) => {
        console.log(chatId);
        
        if (activeChat?._id === chatId) {
            setActiveChat(null)
            setFriendInfo(null)
        }
        setChats((prev) => prev?.filter((chat) => chat._id !== chatId) || null)
        
    },[activeChat, setActiveChat, setChats, setFriendInfo])
    const handleSetFriendStatus = useCallback((data: IUserStatus) => {
        setFriendInfo((prev) => {
            if (!prev) return prev
            return {
                ...prev,
                isOnline: data.isOnline,
                lastSeen: data.lastSeen,
            }
        })
    }, [setFriendInfo])

    const handleBlockEvent = useCallback(
        (data: IBlockUserEvent) => {
            setBlockInfo(data.blockStatus ? data.blockInfo : null)
        },
        [setBlockInfo],
    )

    return {
        handleNewMessage,
        handleDeleteChat,
        handleSetFriendStatus,
        handleBlockEvent
    }

}