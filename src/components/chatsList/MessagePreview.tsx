"use client";
import useUtilts from "@/hooks/useUtilts";
import { ILastMessage } from "@/interfaces/chat";
import { Image as ImageIcon } from 'lucide-react'



interface Props {
    message: ILastMessage,
    isFromLoggedInUser: boolean
}
const MessagePreview = ({ message, isFromLoggedInUser }: Props) => {
    const { truncateText } = useUtilts();
    const isUnReadMessage = !isFromLoggedInUser && !message.isRead;

    if (message?.type === "image") {
        return (
            <span className='flex items-center gap-2'>
                {isFromLoggedInUser && <span>You : </span>}
                <div className="flex items-center gap-1">
                    sent a photo <ImageIcon className='size-5' />
                </div>
            </span>
        )
    }

    const content = message?.content || "";

    return (
        <span className='flex items-center justify-between gap-2'>
            <div className="flex items-center gap-2">
                {isFromLoggedInUser && <span>You : </span>}
                {truncateText(content, 28)}
            </div>
            {isUnReadMessage && <span className="rounded-full size-1.5 bg-secondary-green"></span>}
        </span>
    )
}

export default MessagePreview