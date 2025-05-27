import { User } from 'lucide-react'
import React from 'react'
import AccountAccordionWrapper from '@/components/updateInfo/wrappers/AccountAccordionWrapper'

const page = () => {
    return (
        <div className='w-full space-y-6'>
            <h1 className='text-2xl sm:text-4xl font-bold tracking-wide flex items-center gap-3'>
                <User className='size-8' />
                Account information
            </h1>
            <AccountAccordionWrapper/>
        </div>
    )
}

export default page