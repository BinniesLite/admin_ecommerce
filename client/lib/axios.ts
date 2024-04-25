import axios from "axios";
import { cookies } from "next/headers";

export const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

httpClient.interceptors.request.use(
    (config) => {
        const token = cookies().get("jwt")?.value

        if (token) {
            config.headers.Authorization =  `Bearer ${token}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
