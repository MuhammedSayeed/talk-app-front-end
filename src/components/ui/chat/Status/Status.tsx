"use client"

import { ChatContext } from "@/context/chat/ChatContext"
import { useContext } from "react"
import ActiveStatus from "./ActiveStatus";
import { formatTime } from "@/lib/timeFormat";



const Status = () => {
    const { friendInfo } = useContext(ChatContext);



    if (friendInfo?.isOnline) {
        return <ActiveStatus />
    }

    if (friendInfo?.lastSeen) {
        return (
            <span className='text-sm text-gray-400 py-[2px]'>
               Last seen {formatTime(friendInfo?.lastSeen)}
            </span>
        )
    }
}

export default Status