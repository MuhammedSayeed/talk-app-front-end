"use client"

import { loginSchema } from "@/Schemas/forms";
import axiosInstance from "@/config/axios";
import { AuthContext } from "@/context/auth/AuthContext";
import { IErrorResponse } from "@/interfaces/errors";
import { ILoginFormData } from "@/interfaces/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import useLocalStorage from "./useLocalStorage";

const useLoginForm = () => {
    const { setUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setFocus } = useForm({ resolver: yupResolver(loginSchema) });
    const {handleSetToken} = useAuth();
    const {setOnLocalStorage} = useLocalStorage();

    const signin = useCallback(async (authData: ILoginFormData) => {
        setIsLoading(true)
        try {
            const { status, data } = await axiosInstance.post("/users/signin", authData);
            if (status === 200) {
                setOnLocalStorage("token", data?.results?.token)
                handleSetToken(data?.results?.token);
                setUser(data?.results?.user);
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
                return "Logged in successfully"
            },
            error: (err) => err
        })
    }

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