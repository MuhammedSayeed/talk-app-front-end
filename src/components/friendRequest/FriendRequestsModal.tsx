import React from 'react'
import Modal from '../ui/Modal'
import { User } from 'lucide-react'
import useFriendRequestsModal from '@/hooks/useFriendRequestsModal'


const FriendRequestsModal = () => {
    const { RENDER_FRIEND_REQUEST, isOpen, handleClose } = useFriendRequestsModal();

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="w-full grid grid-rows-[40px_1fr] gap-4">
                <div className="flex items-center ">
                    <h1 className="text-3xl text-white font-semibold flex items-center gap-2">
                        <span ><User size={40} /></span>Friend Requests
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <div className="w-full max-h-96 overflow-y-auto space-y-2 scrollbar-hide">
                        {RENDER_FRIEND_REQUEST()}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default FriendRequestsModal