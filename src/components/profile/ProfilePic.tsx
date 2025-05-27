import Image from "next/image";
import ProfilePicUploader from "./ProfilePicUploader";



interface IProps {
    imgSrc: string;
    editable?: boolean;
}

const ProfilePic = ({ imgSrc, editable = false }: IProps) => {


    return (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-10">
            <div className="size-32 relative  border-gray-200 rounded-lg overflow-hidden">
                <Image className='rounded-lg border-3 border-[#1b1b1b]' alt="Profile Avatar" src={imgSrc || "https://res.cloudinary.com/dndjbkrcv/image/upload/v1744827248/ChatGPT-Image-Apr-16_-2025_-08_12_29-PM_fd12kf.png"} layout="fill" objectFit="cover" />
                {editable && <ProfilePicUploader/>}
            </div>
        </div>
    )
}

export default ProfilePic