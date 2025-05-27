"use client"
import { useContext } from "react"
import Modal from "../ui/Modal"
import { AuthContext } from "@/context/auth/AuthContext"
import { Button } from "../ui/button"
import MyProfileModalStore from "@/lib/store/MyProfileModalStore"
import { useRouter } from "next/navigation"
import CoverPic from "../profile/CoverPic"
import ProfilePic from "../profile/ProfilePic"
import Header from "../profile/Header"
import { ContactInfo } from "../profile/ContactInfo"

const MyProfileModal = () => {
    const { user } = useContext(AuthContext);
    const { isOpen, toggleModal } = MyProfileModalStore();
    const router = useRouter();
    const hanldeClose = () => {
        toggleModal();
    }
    const handleNavigate = () => {
        hanldeClose();
        router.push("/settings/account");
    }

    return (
        <Modal isOpen={isOpen} onClose={hanldeClose}>
            <div className="w-full h-auto">
                <div className="relative w-full h-[110px]">
                    <CoverPic editable imgSrc={user?.coverPic.src as string} />
                    <ProfilePic editable imgSrc={user?.profilePic.src as string} />
                </div>
                <div className="mt-10 space-y-6">
                    <Header name={user?.name as string} bio={user?.bio as string} />
                    <ContactInfo createdAt={user?.createdAt as string} email={user?.email as string} username={user?.username as string} />
                    <div className="flex justify-end gap-2">
                        <Button onClick={hanldeClose} variant={"outline"} className="cursor-pointer">Close</Button>
                        <Button onClick={handleNavigate} className="cursor-pointer">Settings</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default MyProfileModal