"use client"
import UserProfileSkeleton from "../skeleton/UserProfile"
import Modal from "../ui/Modal"
import UserProfileContent from "./UserProfileContent"
import useUserProfileModal from "@/hooks/useUserProfileModal"

const UserProfileModal = () => {
    const { isOpen, onClose, isLoading } = useUserProfileModal();


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {isLoading ? <UserProfileSkeleton /> : <UserProfileContent/>}
        </Modal>
    )
}

export default UserProfileModal