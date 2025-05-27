import Image from "next/image";
interface IProps {
    name: string;
    image: string;
    size?: string;
    pointer?: boolean;
}

const Avatar = ({ size = "48px", image, name, pointer = false }: IProps) => {


    return (
        <div className="relative ">
            <div style={{
                width: size,
                height: size,
                minWidth: size,
                minHeight: size,
            }} className={` rounded-full relative overflow-hidden ${pointer && "cursor-pointer"}`}>
                <Image
                    alt={name || "User Avatar"}
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
            </div>
        </div>
    )
}

export default Avatar;