import React, { useContext } from 'react'
import Modal from '../ui/Modal'
import { ChatContext } from '@/context/chat/ChatContext'
import { Button } from '../ui/button';
import useDeleteChatModalStore from '@/lib/store/DeleteChatModalStore';
import toast from 'react-hot-toast';


const DeleteChatModal = () => {
    const { friendInfo, deleteChat, activeChat } = useContext(ChatContext);
    const { isOpen, toggleDeleteChatModal } = useDeleteChatModalStore();
    const handleCloseDeleteChatModal = () => {
        toggleDeleteChatModal();
    }
    const handleDeleteChat = () => {
        if (!activeChat?._id) return;
        toast.promise(deleteChat(activeChat?._id), {
            loading: 'Chat is Deleting...',
            success: 'Deleted successfully',
            error: 'Something went wrong'
        })
    }
    return (
        <Modal isOpen={isOpen} onClose={handleCloseDeleteChatModal}>
            <div className="p-2 space-y-6">
                <div className="space-y-1">
                    <h1 className='text-2xl font-medium'>Are you sure to delete conversation with {friendInfo?.name} ?</h1>
                    <p className='text-sm text-gray-300'>Conversation will be deleted permanently.</p>
                </div>
                <div className="flex justify-end gap-3">
                    <Button className='cursor-pointer' onClick={handleDeleteChat} >Confirm</Button>
                    <Button onClick={handleCloseDeleteChatModal} className='cursor-pointer' variant={"outline"}>Cancel</Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteChatModal