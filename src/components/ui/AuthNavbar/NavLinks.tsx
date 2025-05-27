"use client"

import { usePathname } from 'next/navigation';
import React from 'react'
import { Button } from '../button';
import Link from 'next/link';

const NavLinks = () => {
    const pathname = usePathname();

    const navConfig = {
        "/login": [{ href: "/register", label: "Register" }],
        "/register": [{ href: "/login", label: "Login" }],
        "/forgot-password": [
            { href: "/register", label: "Register" },
            { href: "/login", label: "Login" },
        ],
        "/reset-password": [
            { href: "/register", label: "Register" },
            { href: "/login", label: "Login" }
        ]
    }

    const basePath = pathname?.split('/')[1] ? `/${pathname.split('/')[1]}` : '/';
    const links = navConfig[basePath as keyof typeof navConfig] || [];


    if (links.length === 0) return null

    const RenderLinks = links?.map((link) => (
        < Button key={link.href} variant={"outline"} asChild >
            <Link className='tracking-wider' href={link.href}>{link.label}</Link>
        </Button >
    ))

    return (
        <div className="flex items-center gap-3">
            {RenderLinks}
        </div>
    )
}

export default NavLinks