/* eslint-disable @typescript-eslint/no-explicit-any */
import { IChat, IChatUser } from "@/interfaces/chat";
import { IMessage } from "@/interfaces/message";

export class ChatUtils {

    /**
 * Updates the chats list with a new message
 */
    static updateChatsWithMessage(chats: IChat[], newMessage: IMessage, activeChatId: string): IChat[] {
        const chatIndex = chats.findIndex((chat) => chat._id === newMessage.chat);
        if (chatIndex === -1) return chats;
        const updatedChats = [...chats]
        const chatToUpdate = { ...updatedChats[chatIndex] }
        let isRead = newMessage.isRead;

        // If the active chat is the one that received the message, mark it as read
        if (activeChatId && activeChatId === newMessage.chat) isRead = true;

        // Update the last message
        chatToUpdate.lastMessage = {
            _id: newMessage?._id,
            content: newMessage.content,
            sender: newMessage.sender,
            createdAt: newMessage.createdAt,
            type: newMessage.type,
            isRead: isRead
        }

        // Remove the chat from its current position
        updatedChats.splice(chatIndex, 1)

        // Add it to the beginning of the array
        return [chatToUpdate, ...updatedChats]
    }

    /**
   * Processes chat data from paginated results into a flat array of unique chats
   */
    static processChatsData(data: any): IChat[] {
        if (!data) return []

        // Flatten all pages and remove duplicates by ID
        const allResults = data.pages.flatMap((page: any) => page.results)
        return Array.from(new Map(allResults.map((chat: any) => [chat._id, chat] as [string, IChat])).values()) as IChat[]
    }


    /**
      * Extracts friend info from a chat
      */
    static extractFriendInfo(chat: IChat | null, userId: string): IChatUser | null {
        return chat?.users?.find((u) => u._id !== userId) || null
    }

}