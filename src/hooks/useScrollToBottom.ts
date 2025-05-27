"use client"

import { useCallback, type RefObject } from "react"

/**
 * Hook to handle scrolling to the bottom of the chat
 */
export const useScrollToBottom = (messagesEndRef: RefObject<HTMLDivElement | null>) => {
    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
            }
        }, 100)
    }, [messagesEndRef])

    return {scrollToBottom}
}