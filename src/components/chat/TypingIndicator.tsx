
import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar';
import { ChatContext } from '@/context/chat/ChatContext';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/auth/AuthContext';
import { useSocketStore } from '@/lib/store/useSocketStore';


const bounceTransition = {
    duration: 1,
    repeat: Infinity,
    ease: "easeInOut",
};

interface Props {
    scrollRef: React.RefObject<HTMLDivElement>;
}

const TypingIndicator = ({ scrollRef }: Props) => {
    const { activeChat, friendInfo } = useContext(ChatContext);
    const [isTyping, setIsTyping] = useState(false);
    const { user } = useContext(AuthContext);
    const { joinRoom, on, off } = useSocketStore();


    const updateTypingStatus = (data: { isTyping: boolean, userId: string }) => {
        if (data.userId !== user?._id) {
            setIsTyping(data.isTyping);
        }
    }

    useEffect(() => {
        if (!activeChat || !user) return;

        joinRoom(`chat-${activeChat._id}`);

        on("typing-indicator", updateTypingStatus)


        return () => {
            off("typing-indicator" , updateTypingStatus);
        };
    }, [activeChat, user])

    useEffect(() => {
        if (!isTyping || !scrollRef.current) return;
        const timeoutId = setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);
        return () => clearTimeout(timeoutId);
    }, [isTyping, scrollRef])

    if (!isTyping) return null;

    return (
        <div className="flex items-center gap-2 ">
            <Avatar size="40px" image={friendInfo?.profilePic.src || process.env.NEXT_PUBLIC_FALLBACK_IMAGE!} name="Unknown" />
            <motion.div className="relative h-fit py-3 px-3  rounded-md bg-primary-lighter flex items-center justify-center gap-1 animate-pulse" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}>
                {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="size-1.5  rounded-full bg-white opacity-40" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ ...bounceTransition, delay: i * 0.3333, }} />
                ))}
            </motion.div>
        </div>

    )
}

export default TypingIndicator