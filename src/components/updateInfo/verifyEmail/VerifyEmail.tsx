"use client"
import { VERIFY_EMAIL_INPUTS_FORM } from '@/constants/forms'
import { Input } from '../../ui/input'
import ErrorMessage from '../../ui/ErrorMessage'
import { AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion'
import { Button } from '../../ui/button'
import { ShieldCheck } from 'lucide-react'
import useVerifyEmail from '@/hooks/useVerifyEmail'

interface IProps {
    onSuccess: () => void
}


const VerifyEmail = ({ onSuccess }: IProps) => {
    
    const {errors , handleSubmit , isLoading , onSubmit , register , resendCode , isUserVerified} = useVerifyEmail({onSuccess});


    const RENDER_INPUTS = VERIFY_EMAIL_INPUTS_FORM.map((i) => (
        <div key={i.id} >
            <label htmlFor={i.id} className="text-[14px]">{i.label}</label>
            <Input {...register(i.name)} id={i.id} type={i.type} className="px-4 py-4 text-base md:text-lg mt-2" />
            {errors[i.name] && <ErrorMessage size='text-xs' message={errors[i.name]?.message as string} />}
        </div>
    ))


    return (
        <AccordionItem value="item-2">
            <AccordionTrigger disabled={isUserVerified} className='cursor-pointer '>
                <div className="flex flex-col">
                    <h2 className='text-lg text-white/80'>Verify Email</h2>
                    {isUserVerified && <span className='text-white text-sm font-normal flex gap-2 items-center'>Your Email Verified <ShieldCheck className='size-5 ' /></span>}
                </div>

            </AccordionTrigger>
            <AccordionContent>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md flex flex-col gap-3 ">
                    <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row gap-3 justify-between">
                        {RENDER_INPUTS}
                    </div>
                    <div className="flex justify-end gap-3 ">
                        <Button onClick={resendCode} type='button' disabled={isLoading} variant={"outline"} className="min-w-[75.3px] min-h-[32px] cursor-pointer" size={"sm"}>
                            Resend Code
                        </Button>
                        <Button type='submit' disabled={isLoading} className="min-w-[75.3px] min-h-[32px] cursor-pointer" size={"sm"}>
                            Confirm
                        </Button>
                    </div>
                </form>
            </AccordionContent>
        </AccordionItem>
    )
}

export default VerifyEmail