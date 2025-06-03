import { Button } from '@/components/ui/button'
import useProfileControls from '@/hooks/useProfileControls';
import useUserProfileStore from '@/lib/store/UserProfileStore';
import React from 'react'
import { BiBlock } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa6';

const DefaultProfileActions = () => {

    const { isLoading, sendFriendRequest, BlockUser } = useProfileControls();
    const { profile } = useUserProfileStore();
    const handleSendFriendRequest = async () => {
        await sendFriendRequest(profile?.user._id as string, "user-profile")
    }
    const handleBlockUser = async () => {
        await BlockUser(profile?.user._id as string, "user-profile");
    }
    return (
        <div className='flex items-center gap-2 [&>*]:flex-1 px-6'>
            <Button size={"sm"} disabled={isLoading} onClick={handleSendFriendRequest} className='cursor-pointer'>
                Add <FaPlus />
            </Button>
            <Button size={"sm"} disabled={isLoading} onClick={handleBlockUser} variant={"outline"} className='cursor-pointer'>
                Block <BiBlock />
            </Button>
        </div>
    )
}

export default DefaultProfileActions