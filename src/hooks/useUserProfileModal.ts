
import useUserProfileStore from "@/lib/store/UserProfileStore";
import { useEffect } from "react";
import useCustomQuery from "./useCustomQuery";

const useUserProfileModal = () => {
    const { id, isOpen, toggleUserProfile, setProfile } = useUserProfileStore();
    const onClose = () => {
        toggleUserProfile();
    }

    const { data, isLoading, refetch } = useCustomQuery({
        queryKey: ['user-profile', `${id}`],
        endPoint: `/users/profile/${id}`,
        config: { withCredentials: true },
        enabled: Boolean(id)
    })


    useEffect(() => {
        if (isOpen && id) {
            refetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, id]);

    useEffect(() => {
        if (data ) {
            setProfile(data?.results)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return {
        onClose,
        isOpen,
        isLoading,
    }
}

export default useUserProfileModal