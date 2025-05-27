import useCustomQuery from "@/hooks/useCustomQuery"
import type { IBlockInfo } from "@/interfaces/block"

/**
 * Custom hook to fetch block information between users
 */
export const useBlockInfoQuery = (chatId: string | undefined, friendId: string | undefined) : IBlockInfo | null => {
    const {data} = useCustomQuery({
        queryKey: ["getBlock", `${chatId}`, `${friendId}`],
        endPoint: `/blocks/${friendId}`,
        enabled: !!chatId && !!friendId,
    })
    return data?.results || null
}