"use client"
import { REGISTER_INPUTS_FORM } from "@/constants/forms"
import AuthHeader from "./ui/AuthHeader"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import SocialAuth from "./SocialAuth"
import { useRouter } from "next/navigation"
import ErrorMessage from "./ui/ErrorMessage"
import useRegisterForm from "@/hooks/useRegisterForm"

const RegisterForm = () => {
  const router = useRouter();
  const { isLoading, onSubmit , errors , handleSubmit , register } = useRegisterForm();

  const RENDER_INPUTS = REGISTER_INPUTS_FORM.map((i) => (
    <div className="w-full" key={i.id}>
      <label htmlFor={i.id} className="text-[16px]">{i.label}</label>
      <Input {...register(i.name)} id={i.id} type={i.type} className="px-4 py-5 text-base md:text-lg mt-2" />
      {errors[i.name] && <ErrorMessage message={errors[i.name]?.message as string} />}
    </div>
  ))

  return (
    <div className="h-full flex flex-col items-center mx-auto max-w-md md:px-10 md:max-w-md py-5 space-y-5">
      <AuthHeader haeader={<>Register To <br /> Start Chatting!</>} description="Hurry up!" />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="space-y-3">
          {RENDER_INPUTS}
        </div>
        <Button disabled={isLoading} className="w-full cursor-pointer" size={"lg"}>
          Register
        </Button>
      </form>
      <div className="w-full">
        <SocialAuth />
      </div>
      <span>
        Already have an account?{" "}
        <span onClick={() => router.push("/login")} className="underline cursor-pointer hover:text-gray-300">
          Login
        </span>
      </span>
    </div>
  )
}

export default RegisterForm