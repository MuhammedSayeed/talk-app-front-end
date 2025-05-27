import useProfileControls from "@/hooks/useProfileControls";
import { Button } from "../../button";
import toast from "react-hot-toast";
import { useContext } from "react";
import { ChatContext } from "@/context/chat/ChatContext";

const BlockedByYou = ({ friendId }: { friendId: string | undefined }) => {

    const { unBlock } = useProfileControls();
    const { deleteChat, activeChat } = useContext(ChatContext);

    const handleUnblock = () => {
        toast.promise(unBlock(friendId as string, ""), {
            loading: "unBlocking user...",
            success: "user unBlocked",
            error: "Something went wrong",
        })
    }

    const handleDeleteChat = () => {
        
        toast.promise(deleteChat(activeChat?._id as string), {
            loading: "deleting chat...",
            success: "chat deleted",
            error: "Something went wrong",
        })
    }

    return (
        <div className="p-5 text-center space-y-2 border-t">
            <span className="text-white/40 block">You blocked this user</span>
            <div className="flex items-center justify-center gap-2">
                <Button onClick={handleDeleteChat} variant={"outline"} size={"sm"} className="px-6 cursor-pointer">Delete</Button>
                <Button onClick={handleUnblock} variant={"outline"} size={"sm"} className="px-6 cursor-pointer">
                    Unblock
                </Button>
            </div>
        </div>
    )
};

export default BlockedByYou;