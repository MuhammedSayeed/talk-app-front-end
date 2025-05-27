"use client"

import { resetPasswordSchema } from "@/Schemas/forms";
import axiosInstance from "@/config/axios";
import { IErrorResponse } from "@/interfaces/errors";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useResetPasswordForm = ({ token }: { token: string }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(resetPasswordSchema) });
    const resetPassword = async (newPassword: string, token: string) => {
        setIsLoading(true);
        try {
            await axiosInstance.post("/users/reset-password", {
                token,
                newPassword
            })

        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            throw errorObj.response?.data.message || "something went wrong";
        } finally {
            setIsLoading(false);
        }
    }
    const onSubmit = ({ newPassword }: { newPassword: string }) => {
        toast.promise(resetPassword(newPassword, token), {
            loading: "Password is resetting..",
            success: () => {
                router.push("/login");
                return "Password is reset successfully"
            },
            error: (error) => `${error}`
        })
    }
    return {
        isLoading,
        register,
        handleSubmit,
        errors,
        onSubmit
    }
}

export default useResetPasswordForm