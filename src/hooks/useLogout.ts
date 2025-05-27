"use client"

import axiosInstance from "@/config/axios"
import { useSession, signOut } from "next-auth/react"
import { useCallback, useState } from "react"
import useUtilts from "./useUtilts"

const useLogout = () => {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false);
    const { handleError } = useUtilts();

    const logout = useCallback(async () => {
        setIsLoading(true)
        try {
            const { status } = await axiosInstance.post("/users/logout")
            if (status === 200) {
                if (session) signOut({ redirect: false })
                setTimeout(() => {
                    window.location.href = "/login"
                }, 400)
            }

        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        isLoading,
        logout
    }
}

export default useLogout