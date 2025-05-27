"use client"

import { loginSchema } from "@/Schemas/forms";
import axiosInstance from "@/config/axios";
import { AuthContext } from "@/context/auth/AuthContext";
import { IErrorResponse } from "@/interfaces/errors";
import { ILoginFormData } from "@/interfaces/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const useLoginForm = () => {
    const router = useRouter();
    const { setUser , user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setFocus } = useForm({ resolver: yupResolver(loginSchema) });

    const signin = useCallback(async (authData: ILoginFormData) => {
        setIsLoading(true)
        try {
            const { status, data } = await axiosInstance.post("/users/signin", authData);
            if (status === 200) {
                setUser(data?.results?.user)
            }
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            throw errorObj.response?.data.message || "something went wrong";
        } finally {
            setIsLoading(false)
        }
    }, [setUser])

    const onSubmit = async (authData: ILoginFormData) => {
        toast.promise(signin(authData), {
            loading: "Loading..",
            success: () => {
                router.push("/chats")
                return "Logged in successfully"
            },
            error: (err) => err
        })
    }

    console.log(user);
    

    useEffect(() => {
        setFocus("emailOrUsername")
    }, [])
    return {
        isLoading,
        onSubmit,
        register,
        handleSubmit,
        errors,
    }
}

export default useLoginForm