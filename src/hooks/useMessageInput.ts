"use client"

import axiosInstance from "@/config/axios";
import { ChatContext } from "@/context/chat/ChatContext";
import { ImageMessage, TextMessage } from "@/interfaces/message";
import { Message } from "@/types/messages";
import { FormEvent, useCallback, useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import useTypingIndicator from "./useTypingIndicator";
import useUtilts from "./useUtilts";
import useToken from "./useToken";

const useMessageInput = () => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const { activeChat } = useContext(ChatContext);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { isTypingRef, sendTypingEvent } = useTypingIndicator();
    const [message, setMessage] = useState("");
    const [isLoading , setIsLoading] = useState(false);
    const { handleError } = useUtilts()
    const { token } = useToken();

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newMessage = e.target.value;
        setMessage(newMessage);
        if (newMessage.length > 0 && !isTypingRef.current) {
            sendTypingEvent(true);
        } else if (newMessage.length === 0 && isTypingRef.current) {
            sendTypingEvent(false);
        }

    };
    const prepareTextMessageRequest = (message: TextMessage) => {
        return {
            body: {
                type: message.type,
                chat: message.chat,
                content: message.content
            },
            urlQuery: "",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }
    const prepareImageMessageRequest = (message: ImageMessage) => {
        const formData = new FormData();
        formData.append('chatMedia', message.file);
        formData.append('chat', message.chat);
        formData.append('type', message.type);
        return {
            body: formData,
            urlQuery: `?folder=chat-media/${message.chat}`,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        };
    }
    const prepareMessageRequest = (message: Message) => {
        return message.type === "text" ? prepareTextMessageRequest(message) : prepareImageMessageRequest(message);
    }
    const sendMessageApiCall = async (message: Message) => {
        const { body, headers, urlQuery } = prepareMessageRequest(message);
        setIsLoading(true)
        try {
            const { status } = await axiosInstance.post(`/messages${urlQuery}`, body, {
                headers
            });
            if (status === 201) {
                sendTypingEvent(false);
            }
        } catch (error) {
            handleError(error);
        }finally{
            setIsLoading(false);
        }
    }
    const handleSendMessage = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const content = message.trim();
        if (!content || !activeChat?._id) return;
        setMessage("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
        await sendMessageApiCall({
            chat: activeChat._id,
            type: "text",
            content: content
        })
    }, [activeChat?._id, message]);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !activeChat?._id) return;
        const formData = new FormData();
        formData.append('chatMedia', file);
        formData.append('chat', activeChat?._id as string);
        formData.append('type', "image");

        toast.promise(
            sendMessageApiCall({
                chat: activeChat?._id,
                type: 'image',
                file: file
            }),
            {
                loading: "Sending image...",
                success: "Image sent!",
                error: "Failed to send image"
            }
        ).then(() => {
            event.target.value = "";
        })
    };

    return {
        handleInputChange,
        handleFileChange,
        fileInputRef,
        handleButtonClick,
        handleSendMessage,
        message,
        isLoading,
        textareaRef
    }
}

export default useMessageInput