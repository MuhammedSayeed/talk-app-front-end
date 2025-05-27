import { ReactNode } from "react";

interface IProps {
    haeader: ReactNode;
    description?: string;
}
const AuthHeader = ({ haeader, description }: IProps) => {
    return (
        <div className="text-center ">
            <h1 className="text-5xl text-white/90 font-[900] mb-2 tracking-wide">
                {haeader}
            </h1>
            {description && <span className="text-lg md:text-xl text-secondary-green-dark tracking-widest font-medium">{description}</span>}
        </div>
    )
}

export default AuthHeader