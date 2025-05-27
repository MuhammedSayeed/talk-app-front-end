"use client"
import { Button } from '../ui/button'
import { IoIosNotifications } from 'react-icons/io'
import ActiveIcon from '../ui/ActiveIcon'
import useNotifications from '@/hooks/useNotifications'
import dynamic from 'next/dynamic'
const NotificationsModal = dynamic(() => import('@/components/notifications/NotificationsModal'), { ssr: false });


const NotificationIcon = () => {
    const {count , handleOpenModal} = useNotifications();
    return (
        <>
            <NotificationsModal />
            <Button onClick={handleOpenModal} variant={"outline"} className="relative size-12 cursor-pointer rounded-full text-white/50 hover:text-white">
                <IoIosNotifications className="size-5" />
                {count > 0 && <ActiveIcon />}
            </Button>
        </>
    )
}

export default NotificationIcon