"use client"
import Avatar from '../ui/Avatar'
import { Button } from '../ui/button'
import { BsChatRightTextFill } from 'react-icons/bs'
import Card from '../ui/Card'
import { IFriend } from '@/interfaces/card'
import { useContext } from 'react'
import { ChatContext } from '@/context/chat/ChatContext'
import useTabStore from '@/lib/store/TabStore'



interface IProps {
    friend: IFriend
}

const FriendCard = ({ friend }: IProps) => {
    const { activeTab, setActiveTab } = useTabStore();

    const { createOrGetChat } = useContext(ChatContext);


    const handleOnClick = () => {
        createOrGetChat(friend._id);
        if (activeTab !== 'chats-list') setActiveTab('chats-list')
    }

    
    return (
        <Card>
            <div className="flex items-center gap-3">
                <Avatar image={friend?.profilePic.src ||process.env.NEXT_PUBLIC_FALLBACK_IMAGE!} name="dummy" />
                <span className="text-gray-200 font-medium">{friend.name}</span>
            </div>
            <div className="flex items-center">
                <Button onClick={handleOnClick} className="text-gray-200 bg-secondary-green-dark/70 hover:bg-secondary-green-dark/90  transition-colors size-9  cursor-pointer rounded-full">
                    <BsChatRightTextFill className='size-4 ' />
                </Button>
            </div>
        </Card>
    )
}

export default FriendCard