import PasswordAccordionWrapper from '@/components/updateInfo/wrappers/PasswordAccordionWrapper'
import { KeyRound } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='w-full space-y-6'>
      <h1 className='text-2xl sm:text-4xl font-bold tracking-wide flex items-center gap-3 '>
        <KeyRound className='size-8' />
        <span className='inline-block'>Password</span>
      </h1>
      <PasswordAccordionWrapper />
    </div>
  )
}

export default page