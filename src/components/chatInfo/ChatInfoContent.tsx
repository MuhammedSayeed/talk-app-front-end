import Image from 'next/image'
import { useContext } from 'react'
import { MessageCircle } from 'lucide-react'
import { ChatContext } from '@/context/chat/ChatContext'
import { AuthContext } from '@/context/auth/AuthContext'
import { formatTimeDifferentForm } from '@/lib/timeFormat'
import ShowProfileButton from './actions/ShowProfileButton'
import DeleteChatButton from './actions/DeleteChatButton'
import BlockButtons from './actions/BlockButtons'

const ChatInfoContent = () => {
    const { activeChat, friendInfo } = useContext(ChatContext);

    const { user } = useContext(AuthContext);

    const date = activeChat?.createdAt ? formatTimeDifferentForm(activeChat?.createdAt, true) : null;

    const dateOfChat = date && (
        <span className="flex items-center gap-2 text-gray-200">
            <MessageCircle /> Since {date}
        </span>
    );

    return (
        <>
            <div className="w-full flex justify-center">
                <div className="w-[224px] h-[115px] relative">
                    <div className="absolute size-28 left-4 top-1/2 border-4 border-bg-color -translate-y-1/2 rounded-full">
                        <Image
                            src={friendInfo?.profilePic.src || process.env.NEXT_PUBLIC_FALLBACK_IMAGE!}
                            alt={friendInfo?.name || "user"}
                            fill
                            sizes="100%"
                            className="object-cover rounded-full"
                            priority
                        />
                    </div>
                    <div className="absolute size-28 right-4 top-1/2 border-4 border-bg-color -translate-y-1/2 rounded-full">
                        <Image
                            src={user?.profilePic.src || process.env.NEXT_PUBLIC_FALLBACK_IMAGE!}
                            alt={user?.name || "user"}
                            fill
                            sizes="100%"
                            className="object-cover rounded-full"
                            priority
                        />
                    </div>
                </div>
            </div>
            <div className="text-center text-3xl font-bold">
                <h2>Conversation with <br /> {friendInfo?.name}</h2>
            </div>
            <div className="flex items-center justify-center">
                {dateOfChat}
            </div>
            <div className="flex items-center justify-center gap-4">
                <ShowProfileButton />
                <DeleteChatButton />
                <BlockButtons />
            </div>
        </>
    )
}

export default ChatInfoContent