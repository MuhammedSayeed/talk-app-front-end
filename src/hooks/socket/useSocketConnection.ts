"use client"

import { useEffect } from "react"
import { useSocketStore } from "@/lib/store/useSocketStore"

/**
 * Hook to manage socket connection
 */
export const useSocketConnection = (userId: string | undefined) => {
    const { connect, disconnect } = useSocketStore();

    useEffect(() => {
        if (!userId) return
        connect()
        return () => {
            disconnect()
        }
    }, [userId, connect, disconnect])
}