"use client"
import { UPDATE_PASSWORD_INPUTS_FORM } from "@/constants/forms";
import { Input } from "../../ui/input";
import ErrorMessage from "../../ui/ErrorMessage";
import useUpdatePassword from "@/hooks/useUpdatePassword";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const UpdatePassword = () => {
    const { canChangePassword, errors, handleSubmit, isCredentialUser, onSubmit, register, passwordChangeInfo, isDisabled } = useUpdatePassword();



    const RENDER_INPUTS = UPDATE_PASSWORD_INPUTS_FORM.map((i) => (
        <div key={i.id} >
            <label htmlFor={i.id} className="text-[14px]">{i.label}</label>
            <Input disabled={!isCredentialUser || !canChangePassword} {...register(i.name)} id={i.id} type={i.type} className="px-4 py-4 text-base md:text-lg mt-2" />
            {errors[i.name] && <ErrorMessage size='text-xs' message={errors[i.name]?.message as string} />}
        </div>
    ))



    return (
        <AccordionItem value="item-1">
            <AccordionTrigger className='cursor-pointer'>
                <h2 className='text-lg text-white/80'>Change Password</h2>
            </AccordionTrigger>
            <AccordionContent>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md flex flex-col gap-3">
                    <div>
                        <div>
                            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row gap-3 justify-between">
                                {RENDER_INPUTS}
                            </div>
                            {!canChangePassword && <span className='text-white/40 mt-2 inline-block text-sm'>{`Notice : You can't change password till ${passwordChangeInfo.date} `}</span>}
                            {!isCredentialUser && <span className='text-white/40 mt-2 inline-block text-sm'>{`Notice : You can't change your password`}</span>}
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <Button disabled={isDisabled} className="min-w-[75.3px] min-h-[32px] cursor-pointer" size={"sm"}>
                            Confirm
                        </Button>
                    </div>
                </form>
            </AccordionContent>
        </AccordionItem>
    )
}

export default UpdatePassword