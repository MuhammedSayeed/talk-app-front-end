"use client"
import { useContext } from "react"
import { AuthContext } from "@/context/auth/AuthContext"
import useUserProfileStore from "@/lib/store/UserProfileStore";
import { ProfileStatus } from "@/types/userProfile";
import DefaultProfileActions from "./actions/DefaultProfileActions";
import FriendProfileActions from "./actions/FriendProfileActions";
import OutgoingFriendRequestActions from "./actions/OutgoingFriendRequestActions";
import IncomingFriendRequestActions from "./actions/IncomingFriendRequestActions";
import BlockMessage from "../ui/messages/BlockMessage";
import UnblockActions from "./actions/UnblockActions";


const UserProfileActions = () => {
    const { user } = useContext(AuthContext);
    const { profile } = useUserProfileStore();
    const isUserBlockedByLoggedInUser = profile?.blockDetails?.blocker == user?._id;
    const isLoggedInUserWhoSentRequest = profile?.isPendingFriendRequest && profile.pendingFriendRequest?.sender == user?._id;

    const getProfileStatus = () => {
        if (profile?.isBlocked) {
            return isUserBlockedByLoggedInUser ? "blockedByLoggedInUser" : "blockedByProfile"
        }
        if (profile?.isPendingFriendRequest) {
            return isLoggedInUserWhoSentRequest ? "pendingByProfile" : "pendingByLoggedInUser"
        }
        if (profile?.isFriend) {
            return "friend";
        }
        return "default";
    }

    const renderActionsByStatus = (status: ProfileStatus) => {
        switch (status) {
            case "blockedByLoggedInUser":
                return <UnblockActions />
            case "blockedByProfile":
                return <BlockMessage name={profile?.user.name as string} />
            case "pendingByLoggedInUser":
                return <IncomingFriendRequestActions />
            case "pendingByProfile":
                return <OutgoingFriendRequestActions />
            case "friend":
                return <FriendProfileActions />
            case "default":
                return <DefaultProfileActions />
        }
    }

    const profileActions = () => {
        const status = getProfileStatus();
        return renderActionsByStatus(status);
    }

    return profileActions();
}

export default UserProfileActions