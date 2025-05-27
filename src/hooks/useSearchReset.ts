"use client"

import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

/**
 * Hook to reset queries when search term changes
 */
export const useSearchReset = (userId: string | undefined, searchTerm: string) => {
    const queryClient = useQueryClient()
    useEffect(() => {
        queryClient.resetQueries({ queryKey: ["chats", `${userId}`, searchTerm] })
    }, [searchTerm, queryClient, userId])

    useEffect(() => {
        if (searchTerm !== undefined) {
            queryClient.invalidateQueries({
                queryKey: ["chats", `${userId}`],
            })
        }
    }, [searchTerm, queryClient, userId])

}