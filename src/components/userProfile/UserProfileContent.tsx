import React, { useContext } from 'react'
import CoverPic from '../profile/CoverPic'
import ProfilePic from '../profile/ProfilePic'
import useUserProfileStore from '@/lib/store/UserProfileStore'
import UserProfileActions from './UserProfileActions'
import { AuthContext } from '@/context/auth/AuthContext'
import Header from '../profile/Header'
import { ContactInfo } from '../profile/ContactInfo'

const UserProfileContent = () => {
    const { profile } = useUserProfileStore();
    const { user } = useContext(AuthContext);

    const isUserBlockedLoggedInUser = profile?.blockDetails?.blocked == user?._id;


    return (
        <div className="w-full h-auto">
            <div className="relative w-full h-[110px]">
                <CoverPic imgSrc={profile?.user.coverPic.src as string} />
                <ProfilePic imgSrc={profile?.user.profilePic.src as string} />
            </div>
            <div className="mt-10 space-y-6">
                {!isUserBlockedLoggedInUser && <Header name={profile?.user.name as string} bio={profile?.user.bio as string} />}
                <UserProfileActions />
                {!isUserBlockedLoggedInUser && <ContactInfo createdAt={profile?.user.createdAt as string} email={profile?.user.email as string} username={profile?.user.username as string} />}
            </div>
        </div>
    )
}

export default UserProfileContent