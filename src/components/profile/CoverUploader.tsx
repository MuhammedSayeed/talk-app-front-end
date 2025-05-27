"use client"

import { FaCamera } from "react-icons/fa"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import useUploadCoverPicture from "@/hooks/useUploadCoverPicture"

const CoverUploader = () => {

    const {handleButtonClick , handleFileChange , isLoading , fileInputRef} = useUploadCoverPicture();

   

    return (
        <div className="absolute bg-black/30 opacity-0 hover:opacity-100 transition-opacity w-full h-full flex justify-end p-2">
            <Input disabled={isLoading} onChange={handleFileChange} ref={fileInputRef} type='file' accept='image/*' className='hidden' />
            <Button disabled={isLoading} onClick={handleButtonClick} size={"icon"} className='cursor-pointer bg-white/40  hover:bg-white/60 transition-colors text-black '>
                <FaCamera size={22} />
            </Button>
        </div>
    )
}

export default CoverUploader