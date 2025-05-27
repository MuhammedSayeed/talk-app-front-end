import { Button } from "@/components/ui/button"
import useProfileControls from "@/hooks/useProfileControls";
import useUserProfileStore from "@/lib/store/UserProfileStore";
import { BiBlock } from "react-icons/bi";

const UnblockActions = () => {
    const { isLoading, unBlock } = useProfileControls();
    const { profile } = useUserProfileStore();
    const handleUnblock = async () => {
        await unBlock(profile?.user._id as string, "user-profile");
    }
    return (
        <div className="flex [&>*]:flex-1 px-6">
            <Button size={"sm"} disabled={isLoading} onClick={handleUnblock} className="cursor-pointer">
                Unblock <BiBlock />
            </Button>
        </div>
    )
}

export default UnblockActions