"use client"

import { useContext, useEffect, useState } from "react"
import { useDebounce } from "./useDebounce"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { AuthContext } from "@/context/auth/AuthContext"
import { IFriendShip } from "@/interfaces/card"
import axiosInstance from "@/config/axios"
import useInfiniteScroll from "./useInfiniteScroll"

const useFriendsList = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 500 })
    const queryClient = useQueryClient()
    const { user } = useContext(AuthContext);
    const [friendships, setFriendShips] = useState<IFriendShip[]>([]);

    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["friends", `${user?._id}`, debouncedSearchTerm],
        queryFn: async ({ pageParam }) => {
            const response = await axiosInstance.get(`/friendships?page=${pageParam}${debouncedSearchTerm ? `&search=${debouncedSearchTerm}` : ""}`);
            const { metadata, results } = response.data;
            return { metadata, results };
        },
        getNextPageParam: (lastPage) => {
            return lastPage.metadata.hasNextPage
                ? lastPage.metadata.page + 1
                : undefined;
        },
        enabled: !!user?._id,
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    })
    const { lastItemRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isLoading, isFetchingNextPage });
    
    useEffect(() => {
        if (data) {
            const allFriends = data.pages.flatMap(page => page.results.friends || []);
            setFriendShips(allFriends);
        }
    }, [data])
    useEffect(() => {
        queryClient.resetQueries({ queryKey: ["friends", `${user?._id}`, searchTerm] })
    }, [searchTerm, queryClient, user?._id]);

    useEffect(() => {
        if (searchTerm !== undefined) {
            queryClient.invalidateQueries({
                queryKey: ["friends", `${user?._id}`],
            })
        }
    }, [searchTerm, queryClient, user?._id])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

  return {
    handleSearchChange,
    lastItemRef,
    friendships,
    searchTerm,
    hasNextPage,
    isLoading
  }
}

export default useFriendsList