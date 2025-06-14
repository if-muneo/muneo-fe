import axios from "axios";

const api = axios.create({
    //baseURL: import.meta.env.VITE_BASE_URL,
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;