import { ISearchResults } from "@/interfaces/search";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";
import axiosInstance from "@/config/axios";
import useSearchModalStore from "@/lib/store/SearchModalStore";
import UserCard from "@/components/search/UserCard";
import UserCardSkeleton from "@/components/skeleton/UserCard";
import useInfiniteScroll from "./useInfiniteScroll";
import Message from "@/components/ui/messages/Message";
import useToken from "./useToken";

const useSearchModal = () => {
    const { isOpen, toggleModal } = useSearchModalStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
    const [results, setResults] = useState<ISearchResults[] | []>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const debouncedQuery = useDebounce({ value: searchQuery, delay: 500 });
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { token } = useToken();

    const fetchResults = async (pageParam = 1) => {
        if (pageParam === 1) {
            setIsLoading(true)
        } else {
            setIsFetchingNextPage(true)
        }
        try {
            const { data, status } = await axiosInstance.get(`/users?search=${debouncedQuery}&page=${pageParam}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (status === 200) {
                setResults(prev => pageParam === 1 ? data.results : [...prev, ...data.results]);
                setHasNextPage(data.metadata.hasNextPage);
                setPage(data.metadata.page);
            }
        } catch{

        } finally {
            setIsLoading(false)
            setIsFetchingNextPage(false)

        }
    }
    const onClose = () => {
        setSearchQuery('');
        setResults([]);
        setPage(1);
        setHasNextPage(false);
        if (inputRef.current) inputRef.current.value = '';
        toggleModal()
    };
    const RENDER_SKELETON = Array.from({ length: 4 }).map((_, i) => <UserCardSkeleton key={i} />)

    const fetchNextPage = useCallback(() => {
        if (hasNextPage && !isLoading && !isFetchingNextPage) {
            return fetchResults(page + 1)
        }
        return Promise.resolve();
    }, [hasNextPage, isLoading, isFetchingNextPage, page, debouncedQuery])

    const { lastItemRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isLoading, isFetchingNextPage })



    useEffect(() => {
        if (!debouncedQuery) {
            setResults([]);
            setPage(1);
            setHasNextPage(false);
            return;
        }

        fetchResults(1);
    }, [debouncedQuery]);


    const RENDER_RESULTS = () => {
        if (isLoading) return RENDER_SKELETON;
        if (debouncedQuery && results.length === 0 && searchQuery) return <Message key={"searchquery"} message={`No results for ${debouncedQuery}`} />
        if (!debouncedQuery && results.length === 0 && !searchQuery) return <Message key={"searchquery"} message={"Start searching.."} />
        return results?.map((user, index) => {
            if (index === results.length - 1 && hasNextPage) {
                return (
                    <div key={user._id} ref={lastItemRef}>
                        <UserCard onClose={onClose} key={user._id} user={user} />
                    </div>
                )
            }
            return <UserCard onClose={onClose} key={user._id} user={user} />
        })
    }

    return {
        isOpen,
        onClose,
        inputRef,
        setSearchQuery,
        RENDER_RESULTS,
    }
}

export default useSearchModal