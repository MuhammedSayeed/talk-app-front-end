import { IChat, IChatUser } from "@/interfaces/chat"
import useChatBoxStore from "@/lib/store/ChatBoxStore"
import useDeleteChatModalStore from "@/lib/store/DeleteChatModalStore"
import { ChatApi } from "@/services/api/ChatApi"
import { useCallback } from "react"
import useUpdateMessageStatus from "./useUpdateMessageStatus"
import useUtilts from "./useUtilts"
import useToken from "./useToken"


interface UseChatOperationsProps {
  isChatSelected: (id: string) => boolean
  setActiveChat: (chat: IChat | null) => void
  setFriendInfo: (user: IChatUser | null) => void
  setIsChatLoading: (loading: boolean) => void
  setIsLoading: (loading: boolean) => void
  setChats: (updater: (prev: IChat[] | null) => IChat[] | null) => void
}

/**
 * Hook for chat operations like create and delete .. etc
 */
export const useChatOperations = ({ isChatSelected, setActiveChat, setFriendInfo, setIsChatLoading, setIsLoading, setChats }: UseChatOperationsProps) => {
  const { toggleChatBox } = useChatBoxStore();
  const { isOpen, toggleDeleteChatModal } = useDeleteChatModalStore()
  const { markMessageAsRead, updateMessageStatusInChat } = useUpdateMessageStatus({ setChats });
  const { handleError } = useUtilts();
  const { token } = useToken();

  const createOrGetChat = useCallback(async (_id: string) => {
    if (!token) return;
    toggleChatBox()
    if (isChatSelected(_id)) return
    setIsChatLoading(true)
    try {
      const chat = await ChatApi.createOrGetChat(_id, token)
      if (chat) {
        setActiveChat(chat)
        markMessageAsRead(chat._id)
        updateMessageStatusInChat(chat._id);
      }
    } catch (error) {
      handleError(error)
    } finally {
      setIsChatLoading(false)
    }

  }, [isChatSelected, setActiveChat, setIsChatLoading, toggleChatBox, token])

  const deleteChat = useCallback(
    async (_id: string) => {
      if (!token) return;
      setIsLoading(true)
      try {
        const success = await ChatApi.deleteChat(_id, token)
        if (success) {
          setActiveChat(null)
          setFriendInfo(null)
          if (isOpen) toggleDeleteChatModal()
          setChats((prev) => prev?.filter((chat) => chat._id !== _id) || null)
        }
      } catch (error) {
        handleError(error)
      } finally {
        setIsLoading(false)
      }
    },
    [isOpen, setActiveChat, setChats, setFriendInfo, setIsLoading, toggleDeleteChatModal, token],
  )

  return { createOrGetChat, deleteChat }
}