import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiInfo } from 'react-icons/fi'
import { MdArrowBackIos } from 'react-icons/md'

const ChatHeaderSkeleton = () => {
    return (
        <div className='flex justify-between items-center px-3 py-4 bg-primary-lighter/40 animate-pulse'>
            <div className="flex items-center gap-3">
                <MdArrowBackIos className="text-gray-300 hover:text-white transition-colors cursor-pointer size-7 md:hidden" />
                <div className="size-fit">
                    <div className="size-12 rounded-full bg-primary-lighter"></div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="w-[150px] h-[20px] bg-primary-lighter rounded-md block"></span>
                    <span className='w-[95px] h-[20px] bg-primary-lighter rounded-md block'></span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <FiInfo className='size-7 text-gray-300 hover:text-white transition-colors cursor-pointer' />
                <BsThreeDotsVertical className='size-7 text-gray-300 hover:text-white transition-colors cursor-pointer' />
            </div>
        </div>
    )
}

export default ChatHeaderSkeleton