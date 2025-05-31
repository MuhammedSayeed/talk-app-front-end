"use client"
import useUserProfileStore from "@/lib/store/UserProfileStore";
import Avatar from "../ui/Avatar"
import { ISearchResults } from "@/interfaces/search";
import Card from "../ui/Card";
import useUtilts from "@/hooks/useUtilts";
interface IProps {
    onClose: () => void;
    user: ISearchResults
}
const UserCard = ({ user, onClose: onCloseSearchModal }: IProps) => {
    const { truncateText } = useUtilts();
    const { setId, toggleUserProfile } = useUserProfileStore();
    const handleOnClick = () => {
        onCloseSearchModal();
        toggleUserProfile();
        setId(user._id);
    }
    return (
        <Card onClick={handleOnClick} pointer>
            <div className="flex items-center gap-3 ">
                <Avatar image={user?.profilePic?.src} name="dummy" />
                <div className="flex flex-col justify-end font-medium">
                    <span className="text-gray-200">{user.name}</span>
                    <span className="text-sm text-gray-400">{truncateText(user.username, 20)}</span>
                </div>
            </div>
        </Card>

    )
}

export default UserCard