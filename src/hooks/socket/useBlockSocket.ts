"use client"

import { useEffect, useCallback } from "react"
import { useSocketStore } from "@/lib/store/useSocketStore"
import { IBlockUserEvent } from "@/interfaces/realTimeEvents"

/**
 * Hook to listen for block events via socket
 */

export const useBlockSocket = (userId: string | undefined, activeChatId: string | undefined, friendId: string | undefined, onBlockEvent: (data: IBlockUserEvent) => void,) => {
    const { on, off } = useSocketStore()

    const handleBlockEvent = useCallback((data: IBlockUserEvent) => {
        onBlockEvent(data)
    }, [onBlockEvent])

    useEffect(() => {
        if (!userId || !activeChatId || !friendId) return
        on("block", handleBlockEvent)
        return () => {
            off("block", handleBlockEvent)
        }
    }, [userId, activeChatId, friendId, handleBlockEvent, on, off])
}
