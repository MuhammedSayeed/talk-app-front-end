import axiosInstance from "@/config/axios"
import type { IChat } from "@/interfaces/chat"


/**
 * API service for chat-related operations
 */

export class ChatApi {
    /**
     * Creates a new chat or retrieves an existing one with the specified user
     */
    static async createOrGetChat(userId: string, token: string): Promise<IChat | null> {
        try {
            const { data, status } = await axiosInstance.post("/chats", {
                _id: userId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (status === 200) {
                return data?.results.chat
            }
            return null
        } catch {
            return null
        }
    }

    /**
 * Deletes a chat by its ID
 */
    static async deleteChat(chatId: string, token: string): Promise<boolean> {
        try {
            const { status } = await axiosInstance.patch("/chats/delete", { _id: chatId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return status === 200
        } catch {
            return false
        }
    }
    /**
 * Fetches a chat by its ID
 */
    static async getChat(chatId: string, token: string): Promise<IChat | null> {
        try {
            const { data, status } = await axiosInstance.get(`/chats/${chatId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (status === 200) return data?.results.chat
            return null
        } catch{
            return null
        }
    }

}