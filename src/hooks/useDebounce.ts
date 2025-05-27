import { useEffect, useState } from "react";

interface IProps<T> {
    value: T;
    delay: number;
}


export function useDebounce<T>({ value, delay }: IProps<T>) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return ()=>{
            clearTimeout(timer);
        }
    }, [value, delay])

    return debouncedValue;
}