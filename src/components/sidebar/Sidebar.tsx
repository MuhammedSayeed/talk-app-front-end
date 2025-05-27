'use client'
import { sidebarItems } from '@/constants/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();


    const RENDER_SIDEBAR_ITEMS = sidebarItems.map((item) => {
        const isActive = pathname === item.link;
        return (
            <Link href={item.link} key={item.title} className={`flex items-center gap-4 p-3 cursor-pointer  hover:bg-secondary/40 hover:text-white ${isActive ? "text-white bg-secondary/40" : "text-white/60"} transition-colors rounded-md`}>
                <item.icon className='size-6 md:size-7' />
                <div className="md:flex flex-col hidden">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-xs">{item.desc}</span>
                </div>
            </Link>
        )
    })
    return (
        <div className='h-full w-fit md:w-[345px] border-r-1 px-3 py-6 flex flex-col gap-y-5 '>
            {RENDER_SIDEBAR_ITEMS}
        </div>
    )
}

export default Sidebar