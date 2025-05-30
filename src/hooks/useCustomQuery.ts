import { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";



interface ICUSTOM_QUERY {
    queryKey: string[];
    endPoint: string;
    config?: AxiosRequestConfig;
    enabled?: boolean;
}

const useCustomQuery = ({ queryKey, endPoint, config, enabled }: ICUSTOM_QUERY) => {
    return useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const { data } = await axiosInstance.get(endPoint, config);
            return data;
        },
        enabled: enabled
    })
}

export default useCustomQuery
