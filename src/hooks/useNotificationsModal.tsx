import Message from "@/components/ui/messages/Message"
import useCustomQuery from "./useCustomQuery"
import { INotificationCard } from "@/interfaces/notifications"
import NotificationCard from "@/components/notifications/NotificationCard"
import useNotificationsModalStore from "@/lib/store/NotificationsModalStore"
import { useEffect } from "react"
import useToken from "./useToken"

const useNotificationsModal = () => {
    const { isOpen, toggleModal } = useNotificationsModalStore();
    const { token } = useToken();
    const { data, isLoading, refetch } = useCustomQuery({
        queryKey: ["notifications"],
        endPoint: "notifications/accept-friend-request",
        config: { headers: { Authorization: `Bearer ${token}` } },
        enabled: (!!token)
    })
    useEffect(() => {
        if (isOpen) {
            refetch();
        }
    }, [isOpen])

    const handleClose = () => toggleModal();



    const RENDER_NOTIFICATIONS = () => {
        if (data?.results?.length === 0) return <Message message="No new Notifications" />
        return data?.results.map(({ acceptedBy, createdAt, _id }: INotificationCard) => (
            <NotificationCard key={_id} acceptedBy={acceptedBy} createdAt={createdAt} />
        ))
    }
    return {
        isOpen,
        isLoading,
        RENDER_NOTIFICATIONS,
        handleClose,
    }
}

export default useNotificationsModal