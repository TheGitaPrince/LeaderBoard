import axios from "axios"

const authAxios = axios.create({
    baseURL: import.meta.env.VITE_BASE_USERS_URL,
    withCredentials: true,
});

export default authAxios;