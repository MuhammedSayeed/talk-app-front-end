import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import useChatInfoModalStore from "@/lib/store/ChatInfoModalStore";
import useDeleteChatModalStore from "@/lib/store/DeleteChatModalStore";
import { Trash } from "lucide-react"

const DeleteChatButton = () => {
    const { toggleDeleteChatModal } = useDeleteChatModalStore();
    const { isOpen, toggleChatInfoModal } = useChatInfoModalStore();
    const handleOpenDeleteChatModal = () => {
        if (isOpen) toggleChatInfoModal();
        toggleDeleteChatModal();

    }

  return (
    <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                <Button onClick={handleOpenDeleteChatModal} variant={"outline"} size={"icon"} className="p-6 cursor-pointer">
                    <Trash className="size-5.5" />
                </Button>
                </TooltipTrigger>
                <TooltipContent className="z-[99999] font-medium">
                    <p>Delete chat</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default DeleteChatButton