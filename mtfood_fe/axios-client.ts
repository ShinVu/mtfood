import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const localStorageToken = localStorage.getItem("ACCESS_TOKEN");
    const token = localStorageToken ? JSON.parse(localStorageToken) : null;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosClient;
