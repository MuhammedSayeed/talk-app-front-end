"use client"

import axiosInstance from "@/config/axios";
import { AuthContext } from "@/context/auth/AuthContext";
import { ChatContext } from "@/context/chat/ChatContext";
import { useContext, useEffect, useRef } from "react";
import useUtilts from "./useUtilts";


const useTypingIndicator = () => {
    const { user } = useContext(AuthContext)
    const { activeChat } = useContext(ChatContext)
    const { handleError } = useUtilts();


    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isTypingRef = useRef(false);
    const lastTypingEventRef = useRef<number>(0);
    const TYPING_DELAY = 3000;

    const sendTypingStatus = async (isTyping: boolean) => {
        if (!activeChat || !user) return;
        try {

            const { status } = await axiosInstance.patch("/chats/typing", {
                chatId: activeChat?._id,
                isTyping,
                userId: user?._id
            })
            if (status === 200) {
                console.log("typing status updated");
            }
        } catch (error) {
            handleError(error)
        }
    }


    const resetTypingTimeout = () => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = null;
        }
    };

    const startTypingTimeout = () => {
        typingTimeoutRef.current = setTimeout(() => {
            if (isTypingRef.current) {
                sendTypingStatus(false);
                isTypingRef.current = false;
            }
        }, TYPING_DELAY + 500);
    };

    const sendTypingEvent = (typing: boolean) => {
        isTypingRef.current = typing;
        const now = Date.now();
        const userStoppedTyping = typing === false;
        const timeSinceLastEvent = now - lastTypingEventRef.current;
        const userIsStillTypingForAWhile = timeSinceLastEvent > TYPING_DELAY;

        const shouldSend = userStoppedTyping || userIsStillTypingForAWhile;

        if (shouldSend) {
            sendTypingStatus(typing);
            lastTypingEventRef.current = now;
        }
        resetTypingTimeout();

        if (typing) {
            startTypingTimeout()
        }
    }

    // Clean up
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            // Make sure to send stopped typing when unmounting if needed
            if (isTypingRef.current) {
                sendTypingStatus(false);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChat]);

    return {
        sendTypingEvent,
        isTypingRef
    }
}

export default useTypingIndicator