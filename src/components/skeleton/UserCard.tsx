import React from 'react'

const UserCardSkeleton = () => {
    return (
        <div className='w-[450px] h-[80px] rounded-md bg-white/5 p-4 animate-pulse'>
            <div className="flex items-center gap-3 ">
                <div className="size-12 bg-white/10 rounded-full"></div>
                <div className="flex flex-col justify-end gap-1">
                    <span className="w-[74px] h-[24px] bg-white/10 rounded-md"></span>
                    <span className="w-[35px] h-[20px] bg-white/10 rounded-md"></span>
                </div>
            </div>
        </div>
    )
}

export default UserCardSkeleton