import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaCamera } from 'react-icons/fa';
import useUploadProfilePicture from '@/hooks/useUploadProfilePicture';

const ProfilePicUploader = () => {

    const { isLoading , fileInputRef , handleButtonClick , handleFileChange} = useUploadProfilePicture();
   

    return (
        <div className="bg-black/30 w-full h-full absolute inset-0 opacity-0 hover:opacity-100 transition-opacity cursor-pointer flex justify-center items-center ">
            <Input disabled={isLoading} onChange={handleFileChange} ref={fileInputRef} type='file' accept='image/*' className='hidden' />
            <Button disabled={isLoading} onClick={handleButtonClick} className='cursor-pointer bg-white/40  hover:bg-white/60 transition-colors text-black' size={"icon"}>
                <FaCamera size={22} />
            </Button>
        </div>
    )
}

export default ProfilePicUploader