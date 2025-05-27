import React from 'react'
import Modal from '../ui/Modal'
import ChatInfoContent from './ChatInfoContent'
import useChatInfoModalStore from '@/lib/store/ChatInfoModalStore'
import { Button } from '../ui/button'
import dynamic from 'next/dynamic'
const DeleteChatModal = dynamic(() => import('./DeleteChatModal'), {ssr: false});

const ChatInfoModal = () => {
    const { isOpen, toggleChatInfoModal } = useChatInfoModalStore();

    const handleClose = () => {
        toggleChatInfoModal()
    }
    return (
        <>
            <DeleteChatModal />
            <Modal isOpen={isOpen} onClose={handleClose}>
                <div className="space-y-6 ">
                    <ChatInfoContent />
                    <div className="flex justify-end">
                        <Button className='cursor-pointer' variant={"outline"} onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ChatInfoModal