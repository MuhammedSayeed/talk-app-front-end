import React from 'react'
import { Button } from './ui/button'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { signIn } from 'next-auth/react';
const SocialAuth = () => {

    const handleGoogleLogin = () => {
        signIn("google");
    }

    const handleGithubLogin = () => {
        signIn("github");
    }

    return (
        <div className="flex gap-3 w-full ">
            <Button onClick={handleGoogleLogin} className='flex-1 cursor-pointer' size={"lg"} variant={"outline"} >
                <FaGoogle className='text-gray-200' />
            </Button>
            <Button onClick={handleGithubLogin} className='flex-1 cursor-pointer' size={"lg"} variant={"outline"} >
                <FaGithub />
            </Button>
        </div>
    )
}

export default SocialAuth