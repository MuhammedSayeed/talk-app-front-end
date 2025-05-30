/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { AuthContext } from "./AuthContext"
import { useCallback, useEffect, useState } from "react"
import axiosInstance from "@/config/axios"
import { usePathname, useRouter } from "next/navigation"
import useUtilts from "@/hooks/useUtilts"
import { AUTH_CONFIG } from "@/constants/routes"
import { IUser } from "@/interfaces/auth"
import useToken from "@/hooks/useToken"

interface IAuthProviderProps {
    children: React.ReactNode
}


export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const pathname = usePathname()
    const router = useRouter();
    const { handleError } = useUtilts();
    const { token } = useToken();


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
        if (!token) return;
        setIsLoading(true)
        try {
            const { data, status } = await axiosInstance.get("/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (status === 200) {
                setUser(data.results.user)
            }
        } catch{
            router.push("/login")

        } finally {
            setIsLoading(false)
        }
    }, [router, setUser, token])

    const keepAlive = async () => {
        if (!token) return;
        try {
            await axiosInstance.patch("/users/keep-alive", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
        } catch{
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
    // Keep user alive
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