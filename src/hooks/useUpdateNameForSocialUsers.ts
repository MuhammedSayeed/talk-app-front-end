"use client"

import { updateNameSchemaForSocialUsers } from "@/Schemas/forms";
import axiosInstance from "@/config/axios";
import { AuthContext } from "@/context/auth/AuthContext";
import { IErrorResponse } from "@/interfaces/errors";
import { IUpdateNameFormData } from "@/interfaces/forms";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useCookies from "./useCookies";
import useLocalStorage from "./useLocalStorage";
import useToken from "./useToken";


const useUpdateNameForSocialUsers = () => {
  const { user, updateUserState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)
  const { setToken } = useCookies();
  const { setOnLocalStorage } = useLocalStorage();
  const { register, resetField, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(updateNameSchemaForSocialUsers)
  })
  const { token } = useToken();

  const currentNameValue = watch('name');
  const isNameChanged = currentNameValue !== user?.name;

  const updateName = useCallback(async (updateNameData: IUpdateNameFormData): Promise<boolean> => {
    setIsLoading(true)
    try {
      const { data, status } = await axiosInstance.patch(`/users/name`, updateNameData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (status === 200) {
        setOnLocalStorage("token", data.results.token)
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
  }, [setIsLoading, updateUserState , token])

  const onSubmit = async (data: { name: string }) => {
    if (!isNameChanged) return;
    toast.promise(updateName(data), {
      loading: "Updating your name..",
      success: "Name updated successfully",
      error: (error) => `${error}`
    })
  }

  useEffect(() => {
    if (user?.name) {
      resetField('name', { defaultValue: user?.name })
    }
  }, [user])

  return {
    register,
    isLoading,
    handleSubmit,
    onSubmit,
    errors,
    isNameChanged
  }
}

export default useUpdateNameForSocialUsers