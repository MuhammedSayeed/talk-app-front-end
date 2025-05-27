
"use client"
import { formatTime } from '@/lib/timeFormat'
interface props {
    timestamp: string
}
const MessageTimestamp = ({ timestamp }: props) => {

    if (!timestamp) return null;
    
    return (
        <span className="text-sm text-gray-400 font-medium">
            {formatTime(timestamp)}
        </span>
    )
}

export default MessageTimestamp