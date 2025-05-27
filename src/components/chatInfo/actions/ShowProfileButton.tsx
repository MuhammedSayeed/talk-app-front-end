import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ChatContext } from "@/context/chat/ChatContext";
import useChatInfoModalStore from "@/lib/store/ChatInfoModalStore";
import useUserProfileStore from "@/lib/store/UserProfileStore";
import { User } from "lucide-react"
import { useContext } from "react";

const ShowProfileButton = () => {
    const { setId, toggleUserProfile } = useUserProfileStore();
    const { isOpen, toggleChatInfoModal } = useChatInfoModalStore();
    const { friendInfo } = useContext(ChatContext);

    const handleShowProfile = () => {
        if (isOpen) toggleChatInfoModal();
        setId(friendInfo?._id as string);
        toggleUserProfile();
    }
    
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleShowProfile} variant={"outline"} size={"icon"} className="p-6 cursor-pointer">
                        <User className="size-5.5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="z-[99999] font-medium">
                    <p>Show profile</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ShowProfileButton