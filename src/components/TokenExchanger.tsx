'use client';
import axiosInstance from '@/config/axios';
import { AuthContext } from '@/context/auth/AuthContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const TokenExchanger = () => {
  const { setUser } = useContext(AuthContext);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const exchangeToken = async () => {
      if (!session?.tempToken) return;
      try {
        const { status, data } = await axiosInstance.get(`/users/auth/exchane-token?token=${session?.tempToken}`)
        if (status === 200) {
          setUser(data?.results?.user)
          setTimeout(() => {
            router.push("/")
          }, 200);
        }
      } catch {
        router.push("/login");
      }
    }

    exchangeToken();

  }, [session])

  return (
    <span>Loading...</span>
  )
}

export default TokenExchanger