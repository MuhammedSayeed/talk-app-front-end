import clsx from 'clsx'
import React from 'react'



interface IProps {
  position: "left" | "right"
}
const MessageSkeleton = ({ position }: IProps) => {

  const isLeft = position == "left";
  return (
    <div className={clsx("w-full flex animate-pulse", isLeft ? "justify-start" : "justify-end")}>
      <div className="w-fit flex flex-col">
        <div className="flex gap-2">
          {isLeft && (<div className="size-10 rounded-full bg-primary-lighter"></div>)}
          <div className={clsx("flex flex-col gap-1", isLeft ? "items-start" : "items-end")}>
            <span className='bg-primary-lighter rounded-md w-[100px] h-[38.5px]'></span>
            <div className={clsx("w-full flex text-gray-400", isLeft ? "justify-start" : "justify-end")}>
              <span className="w-[35px] h-[12px] bg-primary-lighter rounded-md "></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageSkeleton