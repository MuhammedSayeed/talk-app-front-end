"use client"
import { IMessage } from "@/interfaces/message"
import clsx from "clsx"
import { useContext } from "react"
import { ChatContext } from "@/context/chat/ChatContext"
import { format } from "date-fns";
import Image from "next/image"
import Avatar from "../ui/Avatar"


interface IProps {
    message: IMessage
}

const Message = ({ message }: IProps) => {
    const { friendInfo } = useContext(ChatContext);
    const isSentByFriend = message.sender === friendInfo?._id;



    const messageContent = () => {
        if (message.type === "text") {
            return (
                <div className={clsx("w-fit max-w-72 break-words whitespace-pre-wrap rounded-md px-3 py-2 text-white font-normal text-[15px]", isSentByFriend ? "bg-primary-lighter " : "bg-secondary-green-dark/70")}>
                    {message.content}
                </div>
            )
        } else if (message.type === "image") {
            return (
                <Image className="rounded-md" src={message.content as string} alt={message._id} width={200} height={200} />
            )
        }
    }

    return (
        <div   className={clsx("w-full flex", isSentByFriend ? "justify-start" : "justify-end")}>
            <div className="w-fit flex flex-col">
                <div className="flex gap-2">
                    {isSentByFriend && (<Avatar size="40px" image={friendInfo.profilePic.src} name="Unknown" />)}
                    <div className={clsx("flex flex-col gap-1 ", isSentByFriend ? "items-start" : "items-end")}>
                        {messageContent()}
                        <div className={clsx("w-full flex text-gray-400", isSentByFriend ? "justify-start" : "justify-end")}>
                            <span className="text-[10px]">{format(message?.createdAt, "h:mm a")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message