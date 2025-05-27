"use client"

import { forgotPasswordSchema } from "@/Schemas/forms";
import axiosInstance from "@/config/axios";
import { IErrorResponse } from "@/interfaces/errors";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const useForgotPasswordForm = () => {
    const { register, handleSubmit, formState: { errors }, setFocus } = useForm({ resolver: yupResolver(forgotPasswordSchema) });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setFocus("email")
    }, [])

    const forgotPassword = async ({ email }: { email: string }) => {
        setIsLoading(true)
        try {
            await axiosInstance.post("/users/forgot-password", {
                email
            })
            
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            throw errorObj.response?.data.message || "something went wrong";
        } finally {
            setIsLoading(false);
        }
    }

    const onSubmit = ({ email }: { email: string }) => {
        toast.promise(forgotPassword({ email }), {
            loading: "Loading..",
            success: "Check your email address",
            error: (error) => `${error}`
        })
    }


  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading
  }
}

export default useForgotPasswordForm