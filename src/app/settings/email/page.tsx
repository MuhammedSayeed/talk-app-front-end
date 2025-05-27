import EmailAccordionWrapper from '@/components/updateInfo/wrappers/EmailAccordionWrapper'
import { Mail } from 'lucide-react'

const page = () => {
  
  return (
    <div className='w-full space-y-6'>
      <h1 className='text-2xl sm:text-4xl font-bold tracking-wide flex items-center gap-3 '>
        <Mail className='size-8' />
        <span className='inline-block'>Email Center</span>
      </h1>
      <EmailAccordionWrapper/>
    </div>
  )
}

export default page