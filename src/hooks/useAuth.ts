"use client"

import { useRouter } from "next/navigation";
import useCookies from "./useCookies";

const useAuth = () => {
    const router = useRouter();
    const { setToken } = useCookies();

    const handleSetToken = async (token: string) => {
        await setToken(token).then(() => {
            router.push("/")
        })
    }


  return {handleSetToken}
}

export default useAuth