import FriendRequestsIcon from '@/components/friendRequest/FriendRequestsIcon'
import MyProfileNavButton from '@/components/myProfile/MyProfileNavButton'
import NotificationIcon from '@/components/notifications/NotificationIcon'
import SearchIcon from '@/components/search/SearchIcon'
import React from 'react'

const NavItems = () => {
  return (
    <div className='flex gap-2 sm:gap-3'>
      <SearchIcon />
      <FriendRequestsIcon />
      <NotificationIcon/>
      <MyProfileNavButton/>
    </div>
  )
}

export default NavItems