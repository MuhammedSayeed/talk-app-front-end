import { useInfiniteQuery } from "@tanstack/react-query"
import axiosInstance from "@/config/axios"
import useToken from "../useToken"


/**
 * Custom hook for fetching and paginating messages for a specific chat
 */
export const useMessagesQuery = (chatId: string | undefined) => {
    const { token } = useToken();
    return useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["messages", `${chatId}`],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosInstance.get(`/messages/${chatId}?page=${pageParam}&limit=10`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const { metadata, results } = response.data
            return { metadata, results }
        },
        getNextPageParam: (lastpage) => {
            return lastpage.metadata.hasNextPage ? lastpage.metadata.page + 1 : undefined
        },
        enabled: (!!chatId && !!token),
        gcTime: 0,
        staleTime: 0,
        refetchOnMount: true,
    })
}
