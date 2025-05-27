"use client"

import { useEffect, useCallback } from "react"
import { useSocketStore } from "@/lib/store/useSocketStore"
import type { IMessage } from "@/interfaces/message"


/**
 * Hook to listen for new messages via socket
 */
export const useMessageSocket = (userId: string | undefined, activeChatId: string | undefined, onNewMessage: (message: IMessage) => void,) => {
    const { on, off } = useSocketStore();

    const handleNewMessage = useCallback((message: IMessage) => {
        onNewMessage(message)
    }, [onNewMessage]);

    useEffect(() => {
        if (!userId) return
        on("new-message", handleNewMessage)
        return () => {
            off("new-message", handleNewMessage)
        }
    }, [userId, activeChatId, handleNewMessage, on, off])
}