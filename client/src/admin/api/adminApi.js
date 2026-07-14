import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api"

const adminApi = axios.create({baseURL});

adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("admin_token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

adminApi.interceptors.response.use(
    (res) => res,
    (err) => {
        if(err.response?.status === 401){
            localStorage.removeItem("admin_token");
            localStorage.removeItem("admin_username");
            window.location.href = "/admin/login";
        }
        return Promise.reject(err);
    }
);

export default adminApi;