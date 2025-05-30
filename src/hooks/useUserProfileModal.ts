
import useUserProfileStore from "@/lib/store/UserProfileStore";
import { useEffect } from "react";
import useCustomQuery from "./useCustomQuery";
import useToken from "./useToken";

const useUserProfileModal = () => {
    const { id, isOpen, toggleUserProfile, setProfile } = useUserProfileStore();
    const { token } = useToken();
    const onClose = () => {
        toggleUserProfile();
    }

    const { data, isLoading, refetch } = useCustomQuery({
        queryKey: ['user-profile', `${id}`],
        endPoint: `/users/profile/${id}`,
        config: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        },
        enabled: (!!id && !!token)
    })


    useEffect(() => {
        if (isOpen && id) {
            refetch();
        }
    }, [isOpen, id]);

    useEffect(() => {
        if (data) {
            setProfile(data?.results)
        }
    }, [data])

    return {
        onClose,
        isOpen,
        isLoading,
    }
}

export default useUserProfileModal