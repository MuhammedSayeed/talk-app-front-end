import clsx from "clsx";
import { ReactNode } from "react";


interface IProps {
    onClick?: () => void;
    children: ReactNode;
    pointer?: boolean; 
    hoverEffect?: boolean;
    active?: boolean;
}

const Card = ({ children, onClick , pointer , hoverEffect , active = false}: IProps) => {
    return (
        <div onClick={onClick} className={clsx("w-full relative px-4 py-4 bg-primary-light rounded-lg flex justify-between" , pointer && "cursor-pointer" , hoverEffect && "hover:bg-primary-lighter transition" , active && "border bg-primary-lighter/50")}>
            {children}
        </div>
    )
}

export default Card