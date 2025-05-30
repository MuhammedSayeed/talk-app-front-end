"use client"

import { updatePasswordSchema } from '@/Schemas/forms';
import axiosInstance from '@/config/axios';
import { AuthContext } from '@/context/auth/AuthContext';
import { IErrorResponse } from '@/interfaces/errors';
import { IUpdatePasswordFormData } from '@/interfaces/forms';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useCallback, useContext, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useCookies from './useCookies';
import useLocalStorage from './useLocalStorage';
import useToken from './useToken';

const useUpdatePassword = () => {
    const { user, updateUserState } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updatePasswordSchema)
    })
    const { setToken } = useCookies();
    const { setOnLocalStorage } = useLocalStorage();
    const { token } = useToken();

    const passwordChangeInfo = useMemo(() => {
        if (!user?.passwordChangedAt) return { canChangePassword: true, date: null };

        const formattedDate = new Date(user.passwordChangedAt).toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        return {
            canChangeEmail: false,
            date: formattedDate,
        };
    }, [user?.passwordChangedAt])

    const isCredentialUser = user?.provider === "credentials";
    const canChangePassword = passwordChangeInfo.canChangePassword;
    const isDisabled = isLoading || !isCredentialUser || !canChangePassword;


    const updatePassword = useCallback(
        async (updatePasswordData: IUpdatePasswordFormData) => {
            setIsLoading(true)
            try {
                const { status, data } = await axiosInstance.patch(`/users/password`, updatePasswordData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (status === 200) {
                    setOnLocalStorage("token", data.results.token)
                    setToken(data.results.token);
                    updateUserState("passwordChangedAt", data.results.passwordChangedAt);
                }
            } catch (error) {
                const errorObj = error as AxiosError<IErrorResponse>;
                throw errorObj.response?.data.message || "something went wrong";
            } finally {
                setIsLoading(false)
            }
        },
        [setIsLoading , token],
    )

    const onSubmit = async (data: IUpdatePasswordFormData) => {
        toast.promise(updatePassword(data), {
            loading: "Updating your password..",
            success: "Password updated successfully",
            error: (error) => `${error}`
        }).then(() => {
            reset({
                newPassword: "",
                password: ""
            })
        })

    }
    return {
        onSubmit,
        handleSubmit,
        register,
        errors,
        isCredentialUser,
        canChangePassword,
        passwordChangeInfo,
        isDisabled
    }
}

export default useUpdatePassword