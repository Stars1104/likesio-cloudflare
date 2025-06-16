import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { useAuth } from "@/app/contexts/AuthContext";

declare global {
    interface Window {
        google?: any
    }
}

interface GoogleCredentialResponse {
    credential: string,
    select_by?: string
}

const Google: React.FC = () => {
    const router = useRouter();
    const googleSignInRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { googleLogin } = useAuth();

    const handleCredentialResponse = async (response: GoogleCredentialResponse) => {
        setLoading(true);
        try {
            const success = await googleLogin(response.credential);

            if (success) {
                toast.success("Login successful!");
                router.push("/");
            } else {
                toast.error("Login failed, please try again.");
            }
        } catch (error) {
            console.error("Google login failed:", error);
            toast.error("Login failed, please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.google?.accounts) {
                window.google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
                    callback: handleCredentialResponse,
                });

                if (googleSignInRef.current) {
                    window.google.accounts.id.renderButton(googleSignInRef.current, {
                        theme: "outline",
                        size: "large",
                    });
                }
            } else {
                console.error("Google accounts library failed to load.");
            }
        };

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    if (loading) return <Loading />;

    return <div ref={googleSignInRef}></div>;
};

export default Google;