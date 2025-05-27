"use client"

import { AuthContext } from "@/context/auth/AuthContext";
import { useContext } from "react";
import useUtilts from "./useUtilts";
import { IChat } from "@/interfaces/chat";
import axiosInstance from "@/config/axios";


interface IProps {
    setChats: (updater: (prev: IChat[] | null) => IChat[] | null) => void
}

const useUpdateMessageStatus = ({ setChats }: IProps) => {
    const { user } = useContext(AuthContext);
    const { handleError } = useUtilts();

    const updateMessageStatusInChat = (chatId: string) => {
        setChats((prev) => {
            if (!prev) return prev;
            return prev.map(chat => {
                if (chat._id === chatId && chat.lastMessage.sender !== user?._id && chat.lastMessage && !chat.lastMessage.isRead) {
                    return {
                        ...chat,
                        lastMessage: {
                            ...chat.lastMessage,
                            isRead: true
                        }
                    }
                }
                return chat;
            })
        }
        )
    }
    const markMessageAsRead = async (chatId: string) => {
        try {
            const { status } = await axiosInstance.patch(`/messages/mark-seen/${chatId}`);
            if (status === 200) {
                // updateMessageStatusInChat(chatId);
            }
        } catch (error) {
            handleError(error)
        }
    }

    return { markMessageAsRead , updateMessageStatusInChat}
}

export default useUpdateMessageStatus