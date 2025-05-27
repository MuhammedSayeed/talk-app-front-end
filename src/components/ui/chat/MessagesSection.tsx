"use client"
import Message from './Message';
import { ChatContext } from '@/context/chat/ChatContext';
import { useContext, useEffect, useMemo } from 'react';
import MessageSkeleton from '@/components/skeleton/Message';
import TypingIndicator from './TypingIndicator';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const MessagesSection = () => {

    const { scrollContainerRef, activeChat, shouldScrollToBottom, setShouldScrollToBottom, isMessagesLoading, messagesEndRef, messages, hasNextMessagesPage, fetchNextMessagesPage, isFetchingNextMessagesPage } = useContext(ChatContext);
    const { lastItemRef } = useInfiniteScroll({ fetchNextPage: fetchNextMessagesPage, hasNextPage: hasNextMessagesPage, isFetchingNextPage: isFetchingNextMessagesPage, isLoading: isMessagesLoading })
    const RenderSkeletons = useMemo(() =>
        Array(8).fill(null).map((_, index) => {
            const positon = index % 2 === 0 ? "left" : "right";
            return <MessageSkeleton key={index} position={positon} />
        }),
        []);


    const RenderedMessages = () => {
        if (isMessagesLoading) return RenderSkeletons;
        return messages.map((message) => {
            return <Message key={message._id} message={message} />
        });
    }
    useEffect(() => {
        if (shouldScrollToBottom && messages && messages.length > 0 && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" }); // 
            setShouldScrollToBottom(false); // 
        }
    }, [messages, shouldScrollToBottom, messagesEndRef, setShouldScrollToBottom]);

    useEffect(() => {
        if (activeChat) {
            setShouldScrollToBottom(true);
        }
    }, [activeChat?._id]);

    return (
        <div className='relative w-full h-full'>
            <div className="w-full max-h-full absolute inset-0 flex flex-col justify-end pb-3 px-3">
                <div ref={scrollContainerRef} className="overflow-y-auto ">
                    <div className="flex flex-col-reverse gap-3 mr-1">
                        <TypingIndicator scrollRef={messagesEndRef as React.RefObject<HTMLDivElement>} />
                        {RenderedMessages()}
                        <div ref={lastItemRef} />
                    </div>
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </div>
    )
}

export default MessagesSection