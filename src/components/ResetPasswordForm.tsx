"use client"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import ErrorMessage from "./ui/ErrorMessage"
import useResetPasswordForm from "@/hooks/useResetPasswordForm"

const ResetPasswordForm = ({ token }: { token: string }) => {
  const { isLoading, errors , handleSubmit , onSubmit , register } = useResetPasswordForm({token});

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register("newPassword")} placeholder="New Password" id="reset-password-input" type="password" className="px-4 py-5 text-base md:text-lg mt-2 placeholder:text-sm" />
        {errors["newPassword"] && <ErrorMessage message={errors["newPassword"]?.message as string} />}
      </div>
      <Button disabled={isLoading} size={"lg"} className='w-full cursor-pointer'>Confirm</Button>
    </form>
  )
}

export default ResetPasswordForm