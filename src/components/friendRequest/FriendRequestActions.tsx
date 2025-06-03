"use client"
import { FaCheck } from "react-icons/fa6"
import { X } from "lucide-react"
import { Button } from "../ui/button"
import useProfileControls from "@/hooks/useProfileControls"

interface IProps {
    requestId: string
}

const FriendRequestActions = ({ requestId }: IProps) => {
    const { isLoading, acceptFriendRequest, declineFriendRequest } = useProfileControls();
    const handleAcceptFriendRequest = async () => {
        await acceptFriendRequest(requestId, "friend-requests");

    }
    const handleDeclineFriendRequest = async () => {
        await declineFriendRequest(requestId, "friend-requests");

    }
    return (
        <div className="flex items-center gap-3 ">
            <Button disabled={isLoading} onClick={handleAcceptFriendRequest} className="size-9 cursor-pointer rounded-full">
                <FaCheck size={20} />
            </Button>
            <Button disabled={isLoading} variant={"outline"} onClick={handleDeclineFriendRequest} className="size-9 cursor-pointer rounded-full">
                <X />
            </Button>
        </div>
    )
}

export default FriendRequestActions