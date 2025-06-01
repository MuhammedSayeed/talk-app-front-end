import useCustomQuery from "@/hooks/useCustomQuery"
import type { IBlockInfo } from "@/interfaces/block"
import useToken from "../useToken"

/**
 * Custom hook to fetch block information between users
 */
export const useBlockInfoQuery = (chatId: string | undefined, friendId: string | undefined): IBlockInfo | null => {
    const { token } = useToken()
    const { data } = useCustomQuery({
        queryKey: ["getBlock", `${chatId}`, `${friendId}`],
        endPoint: `/blocks/${friendId}`,
        enabled: !!chatId && !!friendId && !!token,
        config: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    })
    return data?.results || null
}