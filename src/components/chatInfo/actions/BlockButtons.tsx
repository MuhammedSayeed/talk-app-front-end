import { ChatContext } from '@/context/chat/ChatContext';
import { useContext } from 'react'
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Shield, ShieldOff } from 'lucide-react';
import useProfileControls from '@/hooks/useProfileControls';
import toast from 'react-hot-toast';

const BlockButtons = () => {
    const { friendInfo, blockInfo } = useContext(ChatContext);
    const { isLoading, BlockUser , unBlock } = useProfileControls();
    const handleBlockUser = () => {
        if (isLoading) return;
        toast.promise(BlockUser(friendInfo?._id as string, ""), {
            loading: "Blocking user...",
            success: "User blocked",
            error: "Something went wrong",
        })
        
    }
    const handleUnblockUser = () => {
        if (isLoading) return;
        toast.promise(unBlock(friendInfo?._id as string, ""), {
            loading: "UnBlocking user...",
            success: "User UnBlocked",
            error: "Something went wrong",
        })
    }

    if (blockInfo === null) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button onClick={handleBlockUser} variant={"outline"} size={"icon"} className="p-6 cursor-pointer">
                            <Shield className="size-5.5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="z-[99999] font-medium">
                        <p>Block user</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={handleUnblockUser} variant={"outline"} size={"icon"} className="p-6 cursor-pointer">
                        <ShieldOff className="size-5.5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="z-[99999] font-medium">
                    <p>Unblock user</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default BlockButtons