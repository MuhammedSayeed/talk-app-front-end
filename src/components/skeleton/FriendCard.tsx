import React from 'react'

const FriendCardSkeleton = () => {
    return (
        <div className="w-full relative px-4 py-4 bg-primary-light animate-pulse rounded-lg flex justify-between">
            <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary-lighter size-12"></div>
                <span className="w-[75px] h-[24px] rounded-md bg-primary-lighter block"></span>
            </div>
            <div className="flex items-center">
                <div className="rounded-full bg-primary-lighter p-4"></div>
            </div>
        </div>
    )
}

export default FriendCardSkeleton