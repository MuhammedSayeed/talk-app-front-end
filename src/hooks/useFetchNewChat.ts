"use client"

import { useCallback } from "react"
import type { IChat } from "@/interfaces/chat"
import { ChatApi } from "@/services/api/ChatApi"
import useToken from "./useToken"


/**
 * Hook to fetch a new chat and add it to the chat list
 */

export const useFetchNewChat = (setChats: (updater: (prev: IChat[] | null) => IChat[] | null) => void) => {
    const { token } = useToken();

    const fetchNewChat = useCallback(async (chatId: string) => {
        if (!token) return;
        const newChat = await ChatApi.getChat(chatId, token as string);
        if (!newChat) return;

        setChats((prev) => {
            const alreadyExists = prev?.some((chat) => chat._id === newChat._id);
            if (alreadyExists) return prev;
            const prevChats = prev?.length !== 0 ? prev : null
            return [newChat, ...(prevChats || [])]
        })
    }, [setChats , token])

    return { fetchNewChat }
}

