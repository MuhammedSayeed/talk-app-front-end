"use client"

import clsx from "clsx"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import MessagesSection from "./MessagesSection"
import useChatBoxStore from "@/lib/store/ChatBoxStore"
import { useContext } from "react"
import { ChatContext } from "@/context/chat/ChatContext"
import { AuthContext } from "@/context/auth/AuthContext"
import BlockedByYou from "./Block/BlockedByYou"
import BlockedByUser from "./Block/BlockedByUser"



const ChatBox = () => {
    const { isOpen } = useChatBoxStore();
    const { friendInfo, blockInfo } = useContext(ChatContext);
    const { user } = useContext(AuthContext);

    const isBlockedByYou = blockInfo?.blocked === friendInfo?._id && blockInfo?.blocker === user?._id;
    const isBlockedByFriend = blockInfo?.blocked === user?._id && blockInfo?.blocker === friendInfo?._id;

    console.log(blockInfo);
    



    return (
        <div className={clsx("absolute z-[100] inset-0 w-full h-full bg-bg-color grid grid-rows-[auto_1fr_auto]  md:border md:border-primary-lighter md:z-auto md:static md:h-full md:rounded-lg transition-transform duration-300", isOpen ? "visible" : "invisible")}>
            <ChatHeader />
            <MessagesSection />
            {isBlockedByYou && <BlockedByYou friendId={friendInfo?._id} />}
            {isBlockedByFriend && <BlockedByUser />}
            {blockInfo === null && <MessageInput />}
        </div>
    )
}

export default ChatBox