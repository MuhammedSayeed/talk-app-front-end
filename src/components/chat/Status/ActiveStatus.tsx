
const ActiveStatus = () => {
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center space-x-2">
                <div className="w-[8px] h-[8px] rounded-full bg-secondary-green animate-pulse"></div>
            </div>
            <span className="text-gray-400">Online</span>
        </div>
    )

}

export default ActiveStatus