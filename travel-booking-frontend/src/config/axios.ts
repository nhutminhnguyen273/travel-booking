import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import env from "./env";

const API_BASE_URL = env.apiBaseUrl;

// Tạo instance của Axios
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Redirect về login nếu không có quyền
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;