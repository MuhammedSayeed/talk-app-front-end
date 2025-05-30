import useFriendRequestModalStore from "@/lib/store/FriendRequestModalStore";
import useCustomQuery from "./useCustomQuery";
import { AuthContext } from "@/context/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "@/config/axios";
import { useSocketStore } from "@/lib/store/useSocketStore";
import useToken from "./useToken";

const useFriendRequests = () => {
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, toggleModal } = useFriendRequestModalStore();
    const { user } = useContext(AuthContext);
    const { on, off } = useSocketStore();
    const { token } = useToken();
    const { data, refetch } = useCustomQuery({
        queryKey: ["unread-friend-requests", `${isOpen}`],
        endPoint: `/notifications/unread/friend-request`,
        config: { headers: { Authorization: `Bearer ${token}` } },
        enabled: (!!user && !!token),
    });
    const readNotifications = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const { status } = await axiosInstance.patch("/notifications/friend-request", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
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
        toggleModal();
        handleReadNotifications();
    };

    const increaseCount = () => {
        setCount((prevCount) => prevCount + 1);
    };

    useEffect(() => {
        setCount(data?.unreadCount);
    }, [data]);

    // listen for friend request notification
    useEffect(() => {
        if (!user?._id) return;
        on("friend-request-notification", increaseCount)
        return () => {
            off("friend-request-notification", increaseCount)
        };
    }, [user?._id])


    useEffect(() => {
        if (isOpen) {
            refetch();
        }
    }, [isOpen]);

    return {
        count,
        handleOpenModal
    }
}

export default useFriendRequests