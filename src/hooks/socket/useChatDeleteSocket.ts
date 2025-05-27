"use client"

import { useEffect, useCallback } from "react"
import { useSocketStore } from "@/lib/store/useSocketStore"

/**
 * Hook to listen for chat deletion events via socket
 */
export const useChatDeleteSocket = (userId: string | undefined, activeChatId: string | undefined, onDeleteChat: (chatId : string) => void) => {

    const { on, off } = useSocketStore()
    const handleDeleteChat = useCallback((chatId : string) => {
        onDeleteChat(chatId)
    },[onDeleteChat])

    useEffect(() => {
        if (!userId) return
        on("chat-deleted", handleDeleteChat)
        return () => {
            off("chat-deleted", handleDeleteChat)
        }
    }, [userId, activeChatId, handleDeleteChat, on, off])
}



