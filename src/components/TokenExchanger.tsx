'use client';
import axiosInstance from '@/config/axios';
import { AuthContext } from '@/context/auth/AuthContext';
import useAuth from '@/hooks/useAuth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const TokenExchanger = () => {
  const { setUser } = useContext(AuthContext);
  const { data: session } = useSession();
  const router = useRouter();
  const {handleSetToken} = useAuth();

  const exchangeToken = async () => {
    if (!session?.tempToken) return;
    try {
      const { status, data } = await axiosInstance.get(`/users/auth/exchane-token?token=${session?.tempToken}`)
      if (status === 200) {
        setUser(data?.results?.user)
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