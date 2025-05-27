import { IErrorResponse } from "@/interfaces/errors";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const useUtilts = () => {

    const queryClient = useQueryClient();
    const handleRefetch = (key: string) => {
        queryClient.invalidateQueries({ queryKey: [key] });
    };

    const handleError = (error: unknown) => {
        const errorObj = error as AxiosError<IErrorResponse>;
        console.log(errorObj);
        
        toast.error(errorObj.response?.data.message || "Something went wrong");
    };

    const truncateText = (text: string, limit: number) => {
        return text.length > limit ? text.slice(0, limit) + "..." : text;
    }
    return {
        handleRefetch,
        handleError,
        truncateText
    }
}

export default useUtilts