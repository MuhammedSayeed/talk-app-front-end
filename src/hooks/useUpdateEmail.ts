"use client"

import { updateEmailSchema } from "@/Schemas/forms";
import axiosInstance from "@/config/axios";
import { AuthContext } from "@/context/auth/AuthContext";
import { IErrorResponse } from "@/interfaces/errors";
import { IUpdateEmailFormData } from "@/interfaces/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


interface IProps {
    onSuccess: () => void
}

const useUpdateEmail = ({ onSuccess }: IProps) => {
    const { user, updateUserState } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { register, resetField, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(updateEmailSchema)
    })
    const emailChangeInfo = useMemo(() => {
        if (!user?.emailChangedAt) return { canChangeEmail: true, date: null };

        const formattedDate = new Date(user.emailChangedAt).toLocaleString('en-GB', {
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
    }, [user?.emailChangedAt]);
    const isCredentialUser = user?.provider === "credentials";
    const currentEmailValue = watch('email');
    const isEmailChanged = currentEmailValue !== user?.email;
    const canChangeEmail = emailChangeInfo.canChangeEmail;
    const isDisabled = isLoading || !isCredentialUser  || !canChangeEmail

    

    const updateEmail = useCallback(
        async (updateEmailData: IUpdateEmailFormData) => {
            setIsLoading(true)
            try {

                const { data, status } = await axiosInstance.patch(`/users/email`, updateEmailData);
                if (status === 200) {
                    updateUserState("email", data.results.email)
                    updateUserState("verified", data.results.verified)
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
    const onSubmit = async (data: IUpdateEmailFormData) => {
        toast.promise(updateEmail(data), {
            loading: "Updating your email..",
            success: "Email updated successfully",
            error: (error) => `${error}`
        }).then(() => {
            resetField('password');
            onSuccess();
        })
    }

    useEffect(() => {
        if (user?.name) {
            resetField('email', { defaultValue: user?.email })
        }
    }, [user])

    return {
        onSubmit,
        handleSubmit,
        register,
        errors,
        isCredentialUser,
        emailChangeInfo,
        canChangeEmail,
        isDisabled,
        isEmailChanged
    }
}

export default useUpdateEmail