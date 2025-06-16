import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const saveUserInformation = async (id: number, username: string, password: string) => {
    const response = await axios.post(`${backendUrl}/updateusertoken`, { id, username, password });
    return response.data;
}