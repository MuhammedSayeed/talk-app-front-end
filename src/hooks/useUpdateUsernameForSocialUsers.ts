"use client"

import { updateUsernameSchemaForSocialUsers } from '@/Schemas/forms';
import axiosInstance from '@/config/axios';
import { AuthContext } from '@/context/auth/AuthContext';
import { IErrorResponse } from '@/interfaces/errors';
import { IUpdateUsernameFormData } from '@/interfaces/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useCookies from './useCookies';
import useLocalStorage from './useLocalStorage';
import useToken from './useToken';

const useUpdateUsernameForSocialUsers = () => {
    const { user, updateUserState } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { setToken } = useCookies();
    const { setOnLocalStorage } = useLocalStorage();
    const { register, resetField, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(updateUsernameSchemaForSocialUsers)
    })
    const { token } = useToken();
    const currentUserNameValue = watch('username');
    const isUserNameChanged = currentUserNameValue !== user?.username;

    const updateUserName = useCallback(
        async (updateUsernameData: IUpdateUsernameFormData) => {
            setIsLoading(true)
            try {
                const { data, status } = await axiosInstance.patch(`/users/username`, updateUsernameData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (status === 200) {
                    updateUserState("username", data.results.username)
                    setToken(data.results.token)
                    setOnLocalStorage("token", data.results.token)
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

    const onSubmit = async (data: { username: string }) => {
        if (!isUserNameChanged) return;
        toast.promise(updateUserName(data), {
            loading: "Updating your username..",
            success: "Username updated successfully",
            error: (error) => `${error}`
        })
    }

    useEffect(() => {
        if (user?.name) {
            resetField('username', { defaultValue: user?.username })
        }
    }, [user])


    return {
        register,
        onSubmit,
        isLoading,
        handleSubmit,
        errors,
        isUserNameChanged
    }
}

export default useUpdateUsernameForSocialUsers