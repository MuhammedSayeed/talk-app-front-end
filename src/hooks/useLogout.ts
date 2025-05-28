"use client"
import { useCallback, useState } from "react"
import useUtilts from "./useUtilts"
import useCookies from "./useCookies"

const useLogout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleError } = useUtilts();
    const { clearToken } = useCookies();

   

    const logout = useCallback(async () => {
        setIsLoading(true)
        try {
            await clearToken().then(() => {
                window.location.href = "/login"
            })

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