"use client"

import axiosInstance from "@/config/axios";
import { AuthContext } from "@/context/auth/AuthContext";
import { IErrorResponse } from "@/interfaces/errors";
import { AxiosError } from "axios";
import { useCallback, useContext, useRef, useState } from "react"
import toast from "react-hot-toast";
import useToken from "./useToken";

const useUploadCoverPicture = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUserState } = useContext(AuthContext);
  const {token} = useToken();
  const uploadCoverPicture = useCallback(
    async (formData: FormData) => {
      if (!user?._id || token) return
      setIsLoading(true)
      try {
        const { data, status } = await axiosInstance.patch(`/users/upload-cover-pic?folder=cover-pics/${user._id}`, formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            },
          },
        )
        if (status === 200) {
          updateUserState("coverPic", data.results.coverPic);
        }
      } catch (error) {
        const errorObj = error as AxiosError<IErrorResponse>;
        throw errorObj.response?.data.message || "something went wrong";
      } finally {
        setIsLoading(false)
      }
    },
    [setIsLoading, updateUserState, user?._id ,token],
  )
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('coverPic', file);

    toast.promise(uploadCoverPicture(formData), {
      loading: "Uploading cover picture..",
      success: "Cover picture uploaded",
      error: (error) => `${error}`
    }).then(() => {
      event.target.value = "";
    })
  };
  return {
    isLoading,
    handleButtonClick,
    handleFileChange,
    fileInputRef
  }
}

export default useUploadCoverPicture