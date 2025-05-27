import React from 'react'

const ChatCardSkeleton = () => {
    return (
        <div className="w-full relative px-4 py-4 bg-primary-light animate-pulse rounded-lg flex justify-between">
            <div className="flex items-center gap-3 w-full">
                <div className="size-12 rounded-full bg-primary-lighter"></div>
                <div className="flex flex-col justify-end gap-2 ">
                    <span className="w-[75px] h-[24px] rounded-md bg-primary-lighter"></span>
                    <span className="w-[50px] h-[20px] rounded-md bg-primary-lighter block">
                    </span>
                </div>
            </div>
            <span className="w-[52px] h-[19px] rounded-md bg-primary-lighter"></span>
        </div>
    )
}

export default ChatCardSkeleton