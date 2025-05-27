/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { AuthContext } from "./AuthContext"
import { useCallback, useEffect, useState } from "react"
import axiosInstance from "@/config/axios"
import { usePathname, useRouter } from "next/navigation"
import useUtilts from "@/hooks/useUtilts"
import { AUTH_CONFIG } from "@/constants/routes"
import { IUser } from "@/interfaces/auth"

interface IAuthProviderProps {
    children: React.ReactNode
}


export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const pathname = usePathname()
    const router = useRouter();
    const { handleError } = useUtilts();

    // State management
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<IUser | null>(null)

    // handlers
    const updateUserState = <K extends keyof IUser>(key: K, value: IUser[K]) => {
        setUser((prev) => {
            if (!prev) return null
            return {
                ...prev,
                [key]: value,
            }
        })
    }

    const getUser = useCallback(async () => {
        setIsLoading(true)
        try {
            const { data, status } = await axiosInstance.get("/users/me");

            if (status === 200) {
                setUser(data.results.user)
            }
        } catch (error) {
            router.push("/login")
            handleError(error)
        } finally {
            setIsLoading(false)
        }
    }, [router, setUser])

    const keepAlive = async () => {
        try {
            await axiosInstance.patch("/users/keep-alive");
        } catch (error) {
            console.error(error)
        }
    }


    // Check if the current path is private and requires authentication
    const isPrivatePath = (path: string) => {
        return AUTH_CONFIG.privatePathPrefixes.some((prefix) => path.startsWith(prefix))
    }
    // Fetch user data if on a private path and user is not loaded
    useEffect(() => {
        if (isPrivatePath(pathname) && !user) {
            getUser()
        }
    }, [pathname, user, getUser])

    // keep user alive while using app
    useEffect(() => {
        if (!user) return;
        keepAlive();
    
        const interval = setInterval(() => {
          keepAlive()
        }, 45000);
        return () => clearInterval(interval);
      }, [user?._id])


    return (
        <AuthContext.Provider value={{ isLoading, user, setUser, updateUserState }}>
            {children}
        </AuthContext.Provider>
    )
}