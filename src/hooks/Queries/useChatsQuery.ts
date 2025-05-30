import { useInfiniteQuery } from "@tanstack/react-query"
import axiosInstance from "@/config/axios"
import useToken from "../useToken"

/**
 * Custom hook for fetching and paginating chats
 */
export const useChatsQuery = (userId: string | undefined, searchTerm: string) => {
    const { token, isLoading: tokenLoading } = useToken()
    return useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["chats", `${userId}`, searchTerm],
        queryFn: async ({ pageParam = 1 }) => {
            const url = `/chats?page=${pageParam}${searchTerm ? `&search=${searchTerm}` : ""}`
            const response = await axiosInstance.get(url, {
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
        enabled: (!tokenLoading && !!token && !!userId),
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })
}