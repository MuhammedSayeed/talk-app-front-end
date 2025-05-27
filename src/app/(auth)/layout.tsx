
import AuthNavbar from "@/components/ui/AuthNavbar/AuthNavbar";
import { ReactNode } from "react"

interface IProps {
    children: ReactNode;
}

const AuthLayout = ({ children }: IProps) => {


    return (
        <div className="min-h-screen backdrop-blur-3xl w-full grid grid-rows-[auto_1fr] sm:gap-0 ">
            <AuthNavbar/>
            <div className="p-5">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout