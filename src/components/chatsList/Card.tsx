import React, { memo, useCallback, useContext } from 'react'
import Avatar from '../ui/Avatar'
import Card from '../ui/Card'
import { IChat } from '@/interfaces/chat'
import { ChatContext } from '@/context/chat/ChatContext'
import { motion } from "framer-motion"
import MessagePreview from './MessagePreview'
import { AuthContext } from '@/context/auth/AuthContext'
import MessageTimestamp from './MessageTimestamp'

interface IProps {
    chat: IChat
}

const ANIMATION_CONFIG = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, height: 0 },
    transition: {
        type: "spring",
        stiffness: 800,
        damping: 60,
        opacity: { duration: 0.2 }
    }
}


const ChatCard = ({ chat }: IProps) => {
    const { user } = useContext(AuthContext);
    const { extractFriendInfo, createOrGetChat, activeChat  } = useContext(ChatContext);

    // Derived values
    const friend = extractFriendInfo(chat);
    const lastMessage = chat?.lastMessage;
    const isMessageFromUser = lastMessage?.sender === user?._id;
    const timeOfLastMessage = lastMessage?.createdAt;


    const handleSelectChat = useCallback(() => {
        if (!friend) return;
        createOrGetChat(friend?._id)
    }, [friend, createOrGetChat])


    return (
        <motion.div layout {...ANIMATION_CONFIG} >
            <Card onClick={handleSelectChat} pointer hoverEffect active={activeChat?._id === chat._id}>
                <div className="flex items-center gap-3 w-full">
                    <Avatar image={friend?.profilePic.src || process.env.NEXT_PUBLIC_FALLBACK_IMAGE!} name="dummy" />
                    <div className="w-full flex flex-col justify-end  font-medium ">
                        <span className="text-gray-200">{friend?.name}</span>
                        <div className="w-full text-sm text-gray-400">
                            <MessagePreview message={lastMessage} isFromLoggedInUser={isMessageFromUser} />
                        </div>
                    </div>
                </div>
                <div className=" absolute top-4 right-4 w-fit h-fit">
                    <MessageTimestamp timestamp={timeOfLastMessage} />
                </div>
            </Card>
        </motion.div>
    )
}

export default memo(ChatCard)