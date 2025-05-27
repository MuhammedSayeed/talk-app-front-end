import Message from "@/components/ui/messages/Message"
import useCustomQuery from "./useCustomQuery"
import { IFRIEND_REQUEST_NOTIFICATION } from "@/interfaces/friendRequests"
import useFriendRequestModalStore from "@/lib/store/FriendRequestModalStore";
import { useEffect } from "react";
import FriendRequestCard from "@/components/friendRequest/FriendRequestCard";

const useFriendRequestsModal = () => {
    const {isOpen , toggleModal} = useFriendRequestModalStore();

    const { data, isLoading , refetch } = useCustomQuery({
        queryKey: ["friend-requests"],
        endPoint: "/friend-requests",
        config: { withCredentials: true },
        enabled: true
    })
    const handleClose = () => toggleModal();

    

    const RENDER_FRIEND_REQUEST = () => {
        if (isLoading) return <p>Loading...</p>
        if (data?.results?.friendRequests?.length === 0) return <Message message="No new Friend Requests" />
        return data?.results?.friendRequests?.map(({ _id, sender }: IFRIEND_REQUEST_NOTIFICATION) => (
            <FriendRequestCard key={_id} requestId={_id} sender={sender}/>
        ))
    }
    useEffect(() => {
        if (isOpen) {
            refetch();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])
    return {
        isOpen,
        RENDER_FRIEND_REQUEST,
        handleClose
    }
}

export default useFriendRequestsModal