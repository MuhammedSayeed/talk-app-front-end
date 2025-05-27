import { IoIosNotifications } from "react-icons/io"
import Modal from "../ui/Modal"
import useNotificationsModal from "@/hooks/useNotificationsModal"




const NotificationsModal = () => {
    const { isOpen, handleClose, RENDER_NOTIFICATIONS } = useNotificationsModal();
    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="w-full grid grid-rows-[40px_1fr] gap-4">
                <div className="flex items-center ">
                    <h1 className="text-4xl text-white font-semibold flex items-center gap-2">
                        <IoIosNotifications size={40} /> Notifications
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <div className="w-full max-h-96 overflow-y-auto space-y-2 scrollbar-hide">
                        {RENDER_NOTIFICATIONS()}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default NotificationsModal