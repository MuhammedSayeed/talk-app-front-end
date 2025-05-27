import Avatar from "../ui/Avatar"
import FriendRequestActions from "./FriendRequestActions"

interface IProps {
    requestId: string,
    sender: {
        _id: string,
        name: string,
        profilePic: {
            src: string,
            public_id: string,
        }
    }
}

const FriendRequestCard = ({sender , requestId} : IProps) => {
  return (
    <div className="w-full bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-md">
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                    <Avatar image={sender.profilePic.src ||"https://res.cloudinary.com/dndjbkrcv/image/upload/v1744827248/ChatGPT-Image-Apr-16_-2025_-08_12_29-PM_fd12kf.png"} name="dummy" />
                    <div className="flex flex-col justify-end font-medium">
                        <h2 className="text-white font-medium">{sender?.name}</h2>
                        <p className="text-gray-400 text-sm">Sent Friend Request</p>
                    </div>
                </div>
                <div className="h-full">
                <FriendRequestActions requestId={requestId} />
                </div>
            </div>
        </div>
  )
}

export default FriendRequestCard