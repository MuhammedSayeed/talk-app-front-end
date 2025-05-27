import { useCallback, useEffect, useRef } from 'react'

interface props {
    fetchNextPage: () => Promise<unknown>,
    hasNextPage: boolean,
    isLoading: boolean,
    isFetchingNextPage: boolean
}

export default function useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage, isLoading }: props) {

    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadingRef = useRef(false)

    const debounceFetchNextPage = useCallback(() => {
        if (loadingRef.current || !hasNextPage || isFetchingNextPage) return;

        loadingRef.current = true;
        fetchNextPage().finally(() => {
            setTimeout(() => {
                loadingRef.current = false;
            }, 500);
        });
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const lastItemRef = useCallback((node: HTMLDivElement) => {
        if (isLoading || isFetchingNextPage || !hasNextPage) return;

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !loadingRef.current) {
                    debounceFetchNextPage();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '100px',
            }
        );

        if (node) observerRef.current.observe(node);
    }, [isLoading, isFetchingNextPage, hasNextPage, debounceFetchNextPage]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return { lastItemRef };
}