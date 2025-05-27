import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { cookies } from 'next/headers';
import { MoveRight } from 'lucide-react';

const HomePageActions = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
        return (
            <div>
                <Button size={"lg"} variant={"outline"} className="cursor-pointer">
                    <Link className="tracking-wider flex items-center gap-2 text-[12px]" href={"/chats"}>START CHATTING <MoveRight /> </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-3">
            <Button size={"lg"} variant={"outline"} className="cursor-pointer">
                <Link className="tracking-wider" href={"/register"}>Register</Link>
            </Button>
            <Button size={"lg"} variant={"outline"} className="cursor-pointer">
                <Link className="tracking-wider" href={"/login"}>Login</Link>
            </Button>
        </div>

    )
}

export default HomePageActions