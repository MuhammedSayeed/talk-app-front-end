'use client';
import axiosInstance from '@/config/axios';
import { AuthContext } from '@/context/auth/AuthContext';
import useAuth from '@/hooks/useAuth';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const TokenExchanger = () => {
  const { setUser } = useContext(AuthContext);
  const { data: session } = useSession();
  const router = useRouter();
  const { handleSetToken } = useAuth();
  const { setOnLocalStorage } = useLocalStorage();

  const exchangeToken = async () => {
    if (!session?.tempToken) return;
    try {
      const { status, data } = await axiosInstance.get(`/users/auth/exchange-token?token=${session?.tempToken}`)
      if (status === 200) {
        setUser(data?.results?.user)
        setOnLocalStorage("token", data.results.token)
        handleSetToken(data?.results?.token)
      }
    } catch {
      router.push("/login");
    }
  }

  useEffect(() => {


    exchangeToken();

  }, [session])

  return (
    <span>Loading...</span>
  )
}

export default TokenExchanger