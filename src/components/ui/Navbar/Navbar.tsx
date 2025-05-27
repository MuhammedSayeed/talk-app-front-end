"use client"
import { logo_light_theme } from "@/constants/images"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic";
// Static Components
import NavItems from "./NavItems"
// Dynamic Components
const UserProfileModal = dynamic(() => import('@/components/userProfile/UserProfileModal'), { ssr: false });
const MyProfileModal = dynamic(() => import('@/components/myProfile/MyProfileModal'), { ssr: false });

const Navbar = () => {

    return <>
        <UserProfileModal />
        <MyProfileModal />
        <nav className="fixed left-0 right-0 top-0 z-[50] flex items-center justify-between p-5 border-b-1 backdrop-blur-3xl">
            <Link href={"/"}>
                <div className={`relative w-[90px] sm:w-[110px] h-[40px]`}>
                    <Image
                        src={logo_light_theme}
                        alt="talk-logo"
                        fill
                        priority
                        style={{
                            objectFit: 'contain'
                        }}
                    />
                </div>
            </Link>
            <NavItems />
        </nav>
    </>
}

export default Navbar