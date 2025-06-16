import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const login = async (email: string, password: string) => {
    const response = await axios.post(`${backendUrl}/login`, { email, password });
    return response.data;
};

export const signOut = async () => {
    const response = await axios.post(`${backendUrl}/logout`);
    return response.data;
}

export const googleLogin = async (token: string) => {
    const response = await axios.post(`${backendUrl}/googleLogin`, { token });
    return response.data;
}