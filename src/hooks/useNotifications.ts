import { AuthContext } from "@/context/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import useNotificationsModalStore from "@/lib/store/NotificationsModalStore";
import useCustomQuery from "./useCustomQuery";
import axiosInstance from "@/config/axios";
import { useSocketStore } from "@/lib/store/useSocketStore";
import useToken from "./useToken";

const useNotifications = () => {
    const { user } = useContext(AuthContext);
    const { isOpen, toggleModal } = useNotificationsModalStore();
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { on, off } = useSocketStore();
    const { token } = useToken();
    const { data, refetch } = useCustomQuery({
        queryKey: ["unread-notifications"],
        endPoint: "/notifications/unread/accept-friend-request",
        config: { headers: { Authorization: `Bearer ${token}` } },
        enabled: (!!user && !!token),
    });
    const readNotifications = async () => {
        setIsLoading(true);
        try {
            const { status } = await axiosInstance.patch("/notifications/accept-friend-request" , {} , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (status === 200) {
                setCount(0);
            }
        } catch{
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