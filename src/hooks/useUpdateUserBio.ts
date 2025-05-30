"use client"

import { bioSchema } from "@/Schemas/forms";
import axiosInstance from "@/config/axios";
import { AuthContext } from "@/context/auth/AuthContext";
import { IErrorResponse } from "@/interfaces/errors";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useToken from "./useToken";

export const useUpdateUserBio = () => {
    const { user, updateUserState } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const { register, reset, handleSubmit, watch, setFocus, formState: { errors } } = useForm({
        resolver: yupResolver(bioSchema),
    })
    const currentBio = watch("bio");
    const { token } = useToken();

    const isBioChanged = useMemo(() => {
        if (user?.bio) return user?.bio === currentBio;

        return false;
    }, [user?.bio, currentBio])

    const addBio = useCallback(async (bio: string) => {
        setIsLoading(true)
        try {
            const { data, status } = await axiosInstance.patch(`/users/bio`, { bio }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (status === 200) {
                updateUserState("bio", data.results.bio)
            }
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            throw errorObj.response?.data.message || "something went wrong";
        } finally {
            setIsLoading(false)
        }
    }, [setIsLoading, updateUserState , token])

    const onSubmit = async (data: { bio: string }) => {
        toast.promise(addBio(data?.bio), {
            loading: "Updating bio..",
            success: "Bio updated successfully",
            error: (error) => `${error}`
        })
    }
    useEffect(() => {
        if (user?.bio) {
            reset({ bio: user.bio })
        }
        setFocus("bio");
    }, [user])

    return {
        handleSubmit,
        onSubmit,
        errors,
        register,
        isBioChanged,
        isLoading
    }
}
