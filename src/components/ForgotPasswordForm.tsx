"use client"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import ErrorMessage from "./ui/ErrorMessage"
import useForgotPasswordForm from "@/hooks/useForgotPasswordForm"

const ForgotPasswordForm = () => {


    const {errors , handleSubmit , isLoading , onSubmit , register} = useForgotPasswordForm();

    


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="email-input-reset-password" className="text-[16px]">Email</label>
                <Input {...register("email")} id="email-input-reset-password" type="email" className="px-4 py-5 text-base md:text-lg mt-2" />
                {errors["email"] && <ErrorMessage message={errors["email"]?.message as string} />}
            </div>
            <Button disabled={isLoading} size={"lg"} className='w-full cursor-pointer'>Send Reset Link</Button>
        </form>
    )
}

export default ForgotPasswordForm