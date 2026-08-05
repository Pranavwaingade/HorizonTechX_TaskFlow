import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    console.log("TOKEN =>", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("HEADERS =>", config.headers);

    return config;
});

export default API;