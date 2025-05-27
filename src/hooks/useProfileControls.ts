import axiosInstance from "@/config/axios";
import { useState } from "react";
import useUtilts from "./useUtilts";

const useProfileControls = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { handleRefetch, handleError } = useUtilts();

    const sendFriendRequest = async (_id: string, refetchKey: string) => {
        setIsLoading(true);
        try {
            const { status } = await axiosInstance.post("/friend-requests", {
                _id
            })
            if (status === 201) {
                handleRefetch(refetchKey);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }
    const cancelPendingFriendRequest = async (_id: string, refetchKey: string) => {
        setIsLoading(true);
        try {
            const { status } = await axiosInstance.delete("/friend-requests/cancel", {
                data: {
                    _id
                }
            })
            if (status === 200) {
                handleRefetch(refetchKey);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }

    const acceptFriendRequest = async (_id: string, refetchKey: string) => {
        setIsLoading(true);
        try {
            const { status } = await axiosInstance.post("/friend-requests/accept", {
                _id
            })
            if (status === 200) {
                handleRefetch(refetchKey);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }
    const declineFriendRequest = async (_id: string, refetchKey: string) => {
        setIsLoading(true);
        try {
            const { status } = await axiosInstance.delete("/friend-requests/decline", {
                data: {
                    _id
                }
            })
            if (status === 200) {
                handleRefetch(refetchKey);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    }
    const removeFriend = async (friendshipId: string, friendId: string, refetchKey: string) => {
        setIsLoading(true);
        try {
            const { status } = await axiosInstance.delete("/friendships", {
                data: {
                    friendshipId,
                    friendId
                }
            })
            if (status === 200) {
                handleRefetch(refetchKey);
            }
        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false);
        }
    }
    const BlockUser = async (_id: string, refetchKey: string) => {
        setIsLoading(true);
        try {
            const { status, data } = await axiosInstance.post("/blocks", {
                _id
            })
            if (status === 200) {
                handleRefetch(refetchKey);
                console.log(data);
            }
        } catch (error) {
            handleError(error);
            console.log("blocked in 38");

        } finally {
            setIsLoading(false);
        }
    }
    const unBlock = async (_id: string, refetchKey: string) => {
        setIsLoading(true);
        try {
            const { status } = await axiosInstance.delete('/blocks', {
                data: {
                    _id
                }
            });
            if (status === 200) {
                handleRefetch(refetchKey)
            }
        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false);
        }
    }

    
    return {
        isLoading,
        sendFriendRequest,
        cancelPendingFriendRequest,
        BlockUser,
        unBlock,
        acceptFriendRequest,
        declineFriendRequest,
        removeFriend
    }
}

export default useProfileControls