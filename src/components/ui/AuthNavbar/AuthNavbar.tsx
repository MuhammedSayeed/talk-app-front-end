import { logo_light_theme } from '@/constants/images';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import NavLinks from './NavLinks';

const AuthNavbar = () => {

    return (
        <div className="sticky top-0 z-[50] flex justify-between p-5 border-b-1   backdrop-blur-3xl">
            <Link href={"/"} className="relative w-[110px] h-[40px]">
                <Image
                    src={logo_light_theme}
                    alt="talk-logo"
                    fill
                    priority
                    sizes="110px"
                    style={{
                        objectFit: 'contain'
                    }}
                />
            </Link>
            <NavLinks />
        </div>
    )
}

export default AuthNavbar