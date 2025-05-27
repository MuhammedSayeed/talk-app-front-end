"use client"
import { LOGIN_INPUTS_FORM } from "@/constants/forms"
import { Input } from "./ui/input"
import ErrorMessage from "./ui/ErrorMessage"
import AuthHeader from "./ui/AuthHeader"
import { Button } from "./ui/button"
import SocialAuth from "./SocialAuth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import useLoginForm from "@/hooks/useLoginForm"

interface props {
    error?: string
}

const LoginForm = ({ error }: props) => {
    const router = useRouter();
    const {isLoading , onSubmit , errors , handleSubmit , register} = useLoginForm();

    
    const RENDER_INPUTS = LOGIN_INPUTS_FORM.map((i) => (
        <div className="w-full" key={i.id}>
            <label htmlFor={i.id} className="text-[16px]">{i.label}</label>
            <Input {...register(i.name)} id={i.id} type={i.type} className="px-4 py-5 text-base md:text-lg mt-2" />
            {errors[i.name] && <ErrorMessage message={errors[i.name]?.message as string} />}
        </div>
    ))

    



    return (
        <div className="h-full flex flex-col items-center mx-auto max-w-md md:px-10 md:max-w-md py-5 space-y-5">
            <AuthHeader haeader={<>Welcome <br /> back!</>} description="Login now.." />
            {error && <ErrorMessage message={error} />}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
                <div className="space-y-3">
                    {RENDER_INPUTS}
                </div>
                <div className="space-y-5 flex flex-col items-center">
                    <Button disabled={isLoading} type="submit" className=" w-full cursor-pointer" size={"lg"}>
                        Login
                    </Button>
                    <Link className=" text-white/80 hover:text-white transition-colors" href={"/forgot-password"}>Forgot password?</Link>
                </div>
            </form>
            <div className="w-full">
                <SocialAuth />
            </div>
            <span>
                Not a member?{" "}
                <span onClick={() => router.push("/register")} className="underline cursor-pointer hover:text-gray-300">
                    Register
                </span>
            </span>
        </div>
    )
}

export default LoginForm