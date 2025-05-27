"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Avatar from "../ui/Avatar";
import { useContext } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import NavbarAvatarSkeleton from "../skeleton/NavbarAvatar";
import { useRouter } from "next/navigation";
import MyProfileModalStore from "@/lib/store/MyProfileModalStore";
import useLogout from "@/hooks/useLogout";

const MyProfileNavButton = () => {
    const { user} = useContext(AuthContext);
    const {logout , isLoading} = useLogout();
    const {toggleModal} = MyProfileModalStore();
    const router = useRouter();

    const handleSettingsClick = () => {
        router.push("/settings/account"); // 
    };

    const handleMyProfileClick = () => {
        toggleModal();
    };

    const handleLogout = ()=>{
        logout();
    }


    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="w-fit  h-fit p-0 bg-transparent hover:bg-transparent rounded-full cursor-pointer">
                    {!user ? <NavbarAvatarSkeleton /> : <Avatar  image={user?.profilePic?.src as string} name="dummy" />}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56  text-white border border-primary-lighter shadow-md mr-3 mt-1 rounded-lg">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-primary-lighter" />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleMyProfileClick} className=" cursor-pointer hover:bg-white/10 transition-colors">
                        My Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSettingsClick} className=" cursor-pointer hover:bg-white/10 transition-colors">
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={isLoading} onClick={handleLogout} className=" cursor-pointer hover:bg-white/10 transition-colors">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MyProfileNavButton