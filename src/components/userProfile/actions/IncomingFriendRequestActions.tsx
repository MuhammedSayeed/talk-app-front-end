import { Button } from "@/components/ui/button"
import { X } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { BiBlock } from "react-icons/bi";
import useProfileControls from "@/hooks/useProfileControls";
import useUserProfileStore from "@/lib/store/UserProfileStore";

const IncomingFriendRequestActions = () => {
    const { isLoading, acceptFriendRequest, declineFriendRequest, BlockUser } = useProfileControls();
    const { profile } = useUserProfileStore();

    const handleAcceptFriendRequest = async () => {
        await acceptFriendRequest(profile?.pendingFriendRequest?._id as string, "user-profile");
    }
    const handleDeclineFriendRequest = async () => {
        await declineFriendRequest(profile?.pendingFriendRequest?._id as string, "user-profile");
    }
    const handleBlockUser = async () => {
        await BlockUser(profile?.user._id as string, "user-profile");
    }
    return (
        <div className="flex gap-2 [&>*]:flex-1 px-6">
            <Button size={"sm"} disabled={isLoading} onClick={handleAcceptFriendRequest} className="cursor-pointer">
                Accept <FaCheck />
            </Button>
            <Button size={"sm"} disabled={isLoading} onClick={handleDeclineFriendRequest} variant={"outline"} className="cursor-pointer">
                Decline <X />
            </Button>
            <Button size={"sm"} disabled={isLoading} onClick={handleBlockUser} variant={"outline"} className="cursor-pointer">
                Block <BiBlock />
            </Button>
        </div>
    )
}

export default IncomingFriendRequestActions