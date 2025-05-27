import BioAccordionWrapper from '@/components/updateInfo/wrappers/BioAccordionWrapper'
import { Cloud } from 'lucide-react'
import React from 'react'

const page = () => {
    return (
        <div className='w-full space-y-6'>
            <h1 className='text-2xl sm:text-4xl font-bold tracking-wide flex items-center gap-3 '>
                <Cloud className='size-8' />
                <span className='inline-block'>Bio</span>
            </h1>
            <BioAccordionWrapper />
        </div>
    )
}

export default page