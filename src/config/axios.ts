import axios from "axios";

const axiosInstance = axios.create({
    baseURL :`${process.env.NEXT_PUBLIC_ONLINE_API}/api/v1`,
    withCredentials : false,
    timeout : 20000
})

export default axiosInstance;