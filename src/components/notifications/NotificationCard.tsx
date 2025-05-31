import React from 'react'
import Avatar from '../ui/Avatar'
import { INotificationCard } from '@/interfaces/notifications'
import { formatTime } from '@/lib/timeFormat'
import useUtilts from '@/hooks/useUtilts'

const NotificationCard = ({ acceptedBy, createdAt }: INotificationCard) => {
    const formattedTime = formatTime(createdAt)
    const {truncateText} = useUtilts();
    return (
        <div className="w-full bg-white/5 hover:bg-white/10 transition-colors px-2 py-4 sm:p-4 rounded-md">
            <div className="flex items-start justify-between ">
                <div className="flex items-center gap-3">
                    <Avatar image={acceptedBy.profilePic.src || "https://res.cloudinary.com/dndjbkrcv/image/upload/v1744827248/ChatGPT-Image-Apr-16_-2025_-08_12_29-PM_fd12kf.png"} name="dummy" />
                    <div className="flex flex-col justify-end font-medium">
                        <h2 className="text-white font-medium">{truncateText(acceptedBy?.name , 20)}</h2>
                        <p className="text-gray-400 text-sm">has accepted your friend request</p>
                    </div>
                </div>
                <div className="text-gray-400 ">
                    <span className="text-xs">{formattedTime}</span>
                </div>
            </div>
        </div>
    )
}

export default NotificationCard