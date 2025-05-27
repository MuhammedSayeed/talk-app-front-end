"use client"
import Image from "next/image"
import CoverUploader from "./CoverUploader";

interface IProps {
    imgSrc: string;
    editable?: boolean;
}

const CoverPic = ({ imgSrc, editable = false }: IProps) => {

    return (
        <div className="relative bg-primary-lighter/50 rounded-lg h-[110px] overflow-hidden">
            <Image src={imgSrc || "https://res.cloudinary.com/dndjbkrcv/image/upload/v1744850910/cover_default_ah8ps7.png"} alt='cover-pic' layout="fill" objectFit="cover" />
            {editable && <CoverUploader />}
        </div>
    )
}

export default CoverPic