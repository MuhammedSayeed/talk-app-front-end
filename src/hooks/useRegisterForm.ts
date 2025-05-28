"use client"
import { registerSchema } from "@/Schemas/forms";
import axiosInstance from "@/config/axios";
import { AuthContext } from "@/context/auth/AuthContext";
import { IErrorResponse } from "@/interfaces/errors";
import { IRegisterFormData } from "@/interfaces/forms";
import useOnBoardingStore from "@/lib/store/OnBoardingStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "./useAuth";

const useRegisterForm = () => {
  const router = useRouter();
  const { register, handleSubmit, setFocus, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) })
  const { setUser } = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(false);
  const { setOnBoarding } = useOnBoardingStore()
  const { handleSetToken } = useAuth();


  const signup = useCallback(async (authData: IRegisterFormData) => {
    setIsloading(true)
    try {
      const { status, data } = await axiosInstance.post("/users/signup", authData);
      if (status === 201) {
        handleSetToken(data?.results?.token);
        setOnBoarding(true);
        setUser(data?.results?.user);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      throw errorObj.response?.data.message || "something went wrong";
    } finally {
      setIsloading(false)
    }
  }, [setOnBoarding, setUser]);

  const onSubmit = async (authData: IRegisterFormData) => {
    toast.promise(signup(authData), {
      loading: "Loading..",
      success: () => {
        router.push("/chats")
        return "Registered successfully"
      },
      error: (err) => err
    })
  }

  useEffect(() => {
    setFocus("username")
  }, [])

  return {
    isLoading,
    onSubmit,
    register,
    handleSubmit,
    errors
  }
}

export default useRegisterForm