import axiosInstance from "@/config/axios"
import type { IChat } from "@/interfaces/chat"


/**
 * API service for chat-related operations
 */

export class ChatApi {
    /**
     * Creates a new chat or retrieves an existing one with the specified user
     */
    static async createOrGetChat(userId: string): Promise<IChat | null> {
        try {
            const { data, status } = await axiosInstance.post("/chats", {
                _id: userId,
            })

            if (status === 200) {
                return data?.results.chat
            }
            return null
        } catch{
            return null
        }
    }

    /**
 * Deletes a chat by its ID
 */
    static async deleteChat(chatId: string): Promise<boolean> {
        try {
            const { status } = await axiosInstance.patch("/chats/delete", { _id: chatId })
            return status === 200
        } catch{
            return false
        }
    }
    /**
 * Fetches a chat by its ID
 */
    static async getChat(chatId: string): Promise<IChat | null> {
        try {
            const { data, status } = await axiosInstance.get(`/chats/${chatId}`)
            if (status === 200) return data?.results.chat
            return null
        } catch{
            return null
        }
    }

}