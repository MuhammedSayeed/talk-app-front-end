import { Button } from '@/components/ui/button'
import { Minus } from 'lucide-react'
import React from 'react'
import { FaUserFriends } from "react-icons/fa"
import { BiBlock } from "react-icons/bi"
import useUserProfileStore from '@/lib/store/UserProfileStore'
import useProfileControls from '@/hooks/useProfileControls'

const FriendProfileActions = () => {
    const {profile} = useUserProfileStore();
    const { isLoading , removeFriend, BlockUser } = useProfileControls();

    const handleRemoveFriend = async () => {
        await removeFriend(profile?.friendShipDetails?._id as string, profile?.user._id as string, "user-profile")
    }
    const handleBlockUser = async () => {
        await BlockUser(profile?.user._id as string, "user-profile")
    }
    return (
        <div className='flex gap-2 [&>*]:flex-1 px-6'>
            <Button size={"sm"} >
                Friend <FaUserFriends />
            </Button>
            <Button size={"sm"} disabled={isLoading} onClick={handleRemoveFriend} variant={"outline"} className='cursor-pointer'>
                Remove <Minus />
            </Button>
            <Button size={"sm"} disabled={isLoading} onClick={handleBlockUser} variant={"outline"} className='cursor-pointer'>
                Block <BiBlock />
            </Button>
        </div>
    )
}

export default FriendProfileActions