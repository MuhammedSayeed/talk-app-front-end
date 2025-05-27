import { Button } from "@/components/ui/button"
import { FaCheck } from "react-icons/fa"
import { BiBlock } from "react-icons/bi"
import useProfileControls from "@/hooks/useProfileControls"
import useUserProfileStore from "@/lib/store/UserProfileStore"

const OutgoingFriendRequestActions = () => {
    const { isLoading, cancelPendingFriendRequest, BlockUser } = useProfileControls();
    const { profile } = useUserProfileStore();
    const handleCancelFriendRequest = async () => {
        await cancelPendingFriendRequest(profile?.pendingFriendRequest?._id as string, "user-profile");
    }
    const handleBlockUser = async () => {
        await BlockUser(profile?.user._id as string, "user-profile");
    }
    return (
        <div className="flex [&>*]:flex-1 gap-2 px-6">
            <Button size={"sm"} disabled={isLoading} onClick={handleCancelFriendRequest} variant={"secondary"} className="cursor-pointer">
                Friend request sent <FaCheck />
            </Button>
            <Button size={"sm"} disabled={isLoading} onClick={handleBlockUser} variant={"outline"} className="cursor-pointer">
                Block <BiBlock />
            </Button>
        </div>
    )
}

export default OutgoingFriendRequestActions