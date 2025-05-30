"use client"

import { verifyEmailSchema } from "@/Schemas/forms"
import axiosInstance from "@/config/axios"
import { AuthContext } from "@/context/auth/AuthContext"
import { IErrorResponse } from "@/interfaces/errors"
import { IVerifyEmailFormData } from "@/interfaces/forms"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import { useCallback, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useCookies from "./useCookies"
import useLocalStorage from "./useLocalStorage"
import useToken from "./useToken"


interface IProps {
    onSuccess: () => void
}


const useVerifyEmail = ({ onSuccess }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { updateUserState, user } = useContext(AuthContext);
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(verifyEmailSchema)
    })
    const { setToken } = useCookies();
    const { setOnLocalStorage } = useLocalStorage();
    const { token } = useToken();

    const isUserVerified = user?.verified;

    const requestANewCode = useCallback(async () => {
        if (!token) return;
        setIsLoading(true)
        try {
            await axiosInstance.post("/codes", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            throw errorObj.response?.data.message || "something went wrong";

        } finally {
            setIsLoading(false)
        }
    }, [setIsLoading ,token])
    const verifyEmail = useCallback(async (verifyCodeData: IVerifyEmailFormData) => {
        if (!token) return;
        setIsLoading(true)
        try {
            const { status, data } = await axiosInstance.post("/users/verify-email", verifyCodeData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (status === 200) {
                updateUserState("verified", data.results.verified)
                setOnLocalStorage("token", data.results.token)
                await setToken(data.results.token);
            }

        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            throw errorObj.response?.data.message || "something went wrong";

        } finally {
            setIsLoading(false)
        }
    },
        [setIsLoading, updateUserState , token],
    )
    const onSubmit = async (data: IVerifyEmailFormData) => {
        toast.promise(verifyEmail(data), {
            loading: "Verifying account..",
            success: () => {
                onSuccess()
                reset({
                    code: "",
                    password: ""
                })
                return "Account verified"
            },
            error: (err) => err
        })
        await verifyEmail(data).then(() => {

        })
    }
    const resendCode = async () => {
        toast.promise(requestANewCode(), {
            loading: "Loading..",
            success: () => {
                reset({
                    code: "",
                    password: ""
                })
                return "Check your email"
            },
            error: (err) => err
        })
    }
    return {
        register,
        errors,
        handleSubmit,
        onSubmit,
        resendCode,
        isLoading,
        isUserVerified
    }
}

export default useVerifyEmail