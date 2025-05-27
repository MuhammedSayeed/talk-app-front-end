"use client"
import { User } from "lucide-react"
import { Button } from "../ui/button"
import ActiveIcon from "../ui/ActiveIcon"
import useFriendRequests from "@/hooks/useFriendRequests"
import dynamic from "next/dynamic"
const FriendRequestsModal = dynamic(() => import('@/components/friendRequest/FriendRequestsModal'), { ssr: false });


const FriendRequestsIcon = () => {
    const {count , handleOpenModal} = useFriendRequests();

    return (
        <>
            <FriendRequestsModal />
            <Button onClick={handleOpenModal} variant={"outline"} className="relative size-12 cursor-pointer rounded-full text-white/50 hover:text-white">
                <User className="size-5" />
                {count > 0 && <ActiveIcon />}
            </Button>
        </>
    )
}

export default FriendRequestsIcon