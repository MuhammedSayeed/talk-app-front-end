"use client"

import axiosInstance from "@/config/axios";
import { AuthContext } from "@/context/auth/AuthContext";
import { IErrorResponse } from "@/interfaces/errors";
import { AxiosError } from "axios";
import { useCallback, useContext, useRef, useState } from "react"
import toast from "react-hot-toast";

const useUploadProfilePicture = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user, updateUserState } = useContext(AuthContext);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const uploadProfilePicture = useCallback(async (formData: FormData) => {
        if (!user?._id) return

        setIsLoading(true)
        try {
            const { data, status } = await axiosInstance.patch(`/users/upload-profile-pic?folder=profile-pics/${user._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            )
            if (status === 200) {
                updateUserState("profilePic", data.results.profilePic);
            }
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            throw errorObj.response?.data.message || "something went wrong";
        } finally {
            setIsLoading(false);
        }
    },
        [setIsLoading, updateUserState, user?._id],
    )
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('profilePic', file);
        toast.promise(uploadProfilePicture(formData), {
            loading: "Uploading profile picture..",
            success: "Profile picture uploaded",
            error: (error) => `${error}`
        }).then(() => {
            event.target.value = "";
        })
    };



    return {
        isLoading,
        handleFileChange,
        handleButtonClick,
        fileInputRef
    }
}

export default useUploadProfilePicture