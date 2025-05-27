
const UserProfileSkeleton = () => {
    return (
        <div className="w-full h-96 grid grid-rows-[140px_1fr] space-y-2 animate-pulse ">
            <div className="relative w-full bg-white/5 rounded-lg h-[110px]">
                <div className="absolute size-[126px] bg-[#2e2e2e] -bottom-[46px] left-1/2 transform -translate-x-1/2  rounded-md">
                </div>
            </div>
            <div className="px-6 space-y-4 flex flex-col  justify-center">
                <div className="space-y-4">
                    <div className="w-full space-y-2">
                        <span className="block w-[70px] h-[36px] bg-white/5 rounded-md mx-auto"></span>
                        <span className=" block w-[90px] h-[20px] bg-white/5 rounded-md mx-auto"></span>
                    </div>
                    <div className='flex items-center gap-2 [&>*]:flex-1'>
                        <div className="h-[36px] bg-white/5 rounded-md">
                        </div>
                        <div className="h-[36px] bg-white/5 rounded-md">
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 w-[90px] h-[24px] rounded-md bg-white/5">
                        </div>
                        <div className="flex items-center gap-2 w-[90px] h-[24px] rounded-md bg-white/5">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileSkeleton