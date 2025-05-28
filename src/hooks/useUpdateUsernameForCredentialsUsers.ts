"use client"

import { updateUsernameSchema } from '@/Schemas/forms';
import axiosInstance from '@/config/axios';
import { AuthContext } from '@/context/auth/AuthContext';
import { IErrorResponse } from '@/interfaces/errors';
import { IUpdateUsernameFormData } from '@/interfaces/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import  { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useCookies from './useCookies';

const useUpdateUsernameForCredentialsUsers = () => {
    const {user , updateUserState} = useContext(AuthContext);
    const [isLoading , setIsLoading] = useState(false); 
    const { register, resetField, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(updateUsernameSchema)
    })
    const {setToken} = useCookies();
    const currentUserNameValue = watch('username');
    const isUserNameChanged = currentUserNameValue !== user?.username;

    const updateUserName = useCallback(
        async (updateUsernameData: IUpdateUsernameFormData) => {
            setIsLoading(true)
            try {
                const { data, status } = await axiosInstance.patch(`/users/username`, updateUsernameData)
                if (status === 200) {
                    updateUserState("username", data.results.username)
                    setToken(data.results.token)
                }
            } catch (error) {
                const errorObj = error as AxiosError<IErrorResponse>;
                throw errorObj.response?.data.message || "something went wrong";
            } finally {
                setIsLoading(false)
            }
        },
        [setIsLoading, updateUserState],
    )


    const onSubmit = async (data: IUpdateUsernameFormData) => {
        if (!isUserNameChanged) return;
        toast.promise(updateUserName(data) , {
            loading: "Updating your username..",
            success: "Username updated successfully",
            error: (error) => `${error}`
        }).then(() => {
            resetField('password')
        })
    }
    useEffect(() => {
        if (user?.name) {
            resetField('username', { defaultValue: user?.username })
        }
    }, [user])

  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
    isLoading,
    isUserNameChanged
  }
}

export default useUpdateUsernameForCredentialsUsers