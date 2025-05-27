
// ChatManager class - Handles chat-related operations
import { IMessage } from "@/interfaces/message";
import { IChat } from "@/interfaces/chat";

export class ChatManager {

    static createChatDto(message: IMessage) {
        return {
            sender: message.sender,
            content: message.content,
            createdAt: message.createdAt,
            type: message.type
        }
    }
    // Move a chat to the top of the list
    static moveChatToTop(chats: IChat[], index: number): IChat[] {
        if (index < 0 || index >= chats.length) return chats;

        const result = [...chats];
        const [chat] = result.splice(index, 1);
        return [chat, ...result];
    }
    // Update a specific chat with new message info
    static updateChatWithMessage(chat: IChat, message: IMessage): IChat {
        return {
            ...chat,
            lastMessage: {
                sender: message.sender,
                content: message.content,
                createdAt: message.createdAt,
                type: message.type,
                isRead : message.isRead,
                _id : message._id
            }
        }
    }
    // Update chats list with a new message
    static updateChatsWithMessage(chats: IChat[], message: IMessage): IChat[] {
        const chatIndex = chats.findIndex(chat => chat._id === message.chat);

        if (chatIndex === -1) return chats;

        // Update the specific chat

        const updatedChats = [...chats];
        updatedChats[chatIndex] = this.updateChatWithMessage(chats[chatIndex], message);

        // Move updated chat to the top
        return this.moveChatToTop(updatedChats, chatIndex);
    }
}


