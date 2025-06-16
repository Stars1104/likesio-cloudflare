import axios from "axios";

export const signUp = async (email: string, username: string, password: string) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, { email, username, password });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("ERROR", error);
    }
}