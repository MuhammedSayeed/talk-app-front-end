"use client"

import { updateNameSchema } from "@/Schemas/forms"
import axiosInstance from "@/config/axios"
import { AuthContext } from "@/context/auth/AuthContext"
import { IErrorResponse } from "@/interfaces/errors"
import { IUpdateNameFormData } from "@/interfaces/forms"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useCookies from "./useCookies"




const useUpdateNameForCredentialsUsers = () => {
    const { register, resetField, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(updateNameSchema)
    })
    const [isLoading, setIsLoading] = useState(false)
    const { updateUserState , user } = useContext(AuthContext);
    const {setToken} = useCookies();

    const updateName = useCallback(async (updateNameData: IUpdateNameFormData): Promise<boolean> => {
        setIsLoading(true)
        try {
            const { data, status } = await axiosInstance.patch(`/users/name`, updateNameData);
            if (status === 200) {
                setToken(data.results.token);
                updateUserState("name", data.results.name);
                return true;
            }
            return false
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            throw errorObj.response?.data.message || "something went wrong";
        } finally {
            setIsLoading(false)
        }
    }, [setIsLoading, updateUserState])

    
    const currentNameValue = watch('name');
    const isNameChanged = currentNameValue !== user?.name;

    const onSubmit = async (data: IUpdateNameFormData) => {
        if (!isNameChanged) return;
        toast.promise(updateName(data), {
            loading: "Updating your name..",
            success: "Name updated successfully",
            error: (error) => `${error}`
        }).then(() => {
            resetField('password')
        })
    }

    useEffect(() => {
        if (user?.name) {
            resetField('name', { defaultValue: user?.name })
        }
    }, [user])

    return {
        isLoading,
         register,
         onSubmit,
         errors,
         handleSubmit,
         isNameChanged
    }
}

export default useUpdateNameForCredentialsUsers