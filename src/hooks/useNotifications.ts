import { AuthContext } from "@/context/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import useUtilts from "./useUtilts";
import useNotificationsModalStore from "@/lib/store/NotificationsModalStore";
import useCustomQuery from "./useCustomQuery";
import axiosInstance from "@/config/axios";
import { useSocketStore } from "@/lib/store/useSocketStore";

const useNotifications = () => {
    const { user } = useContext(AuthContext);
    const { handleError } = useUtilts();
    const { isOpen, toggleModal } = useNotificationsModalStore();
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const {on , off} = useSocketStore();
    const { data , refetch} = useCustomQuery({
        queryKey: ["unread-notifications"],
        endPoint: "/notifications/unread/accept-friend-request",
        config: { withCredentials: true },
        enabled: !!user, // Only fetch if user exists
    });
    const readNotifications = async () => {
        setIsLoading(true);
        try {
            const { status } = await axiosInstance.patch("/notifications/accept-friend-request");
            if (status === 200) {
                setCount(0);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleReadNotifications = async () => {
        if (isLoading || count === 0) return;
        await readNotifications();
    };
    const handleOpenModal = () => {
        toggleModal()
        handleReadNotifications();
    };
    useEffect(() => {
        if (data) {
            setCount(data?.unreadCount);
        }
    }, [data]);

    const increaseCount = () => {
        setCount((prevCount) => prevCount + 1);
    };
    useEffect(() => {
        if (!user?._id) return;

        on("accept-friend-request-notification", increaseCount)

        return () => {
         off("accept-friend-request-notification", increaseCount)
        };
    }, [user?._id]);
    useEffect(() => {
        if (isOpen) {
            refetch();
        }
    }, [isOpen]);

  return {
    handleOpenModal,
    count
  }
}

export default useNotifications