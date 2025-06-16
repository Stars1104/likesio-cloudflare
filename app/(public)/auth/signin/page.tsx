"use client"
// import { login } from "../../../api/auth/signin/route";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Google from "@/app/components/auth/GoogleLoginButton";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";

const Login = () => {

    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        // Form validation
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        if (!password) {
            toast.error("Please enter your password");
            return;
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        setIsLoading(true);
        try {
            const success = await login(email, password);
            
            if (success) {
                toast.success("Login successful!");
                router.push("/");
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };


    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 sm:space-y-8 transition-all duration-500 hover:shadow-3xl transform hover:-translate-y-1">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#296FF9] to-[#59CEFC] py-2 bg-clip-text text-transparent font-[system-ui] animate-fade-in">
                            Welcome Back
                        </h2>
                        <p className="text-gray-600 mt-2 font-[system-ui] text-sm sm:text-base">Please sign in to continue</p>
                    </div>

                    <div className="space-y-5 sm:space-y-6">
                        <div className="relative group">
                            <label className="block text-gray-700 text-sm font-medium mb-2 font-[system-ui]" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <input
                                    className="w-full font-[system-ui] pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80"
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block font-[system-ui] text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <input
                                    className="w-full font-[system-ui] pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 hover:bg-white/80"
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label className="ml-2 text-gray-600 font-[system-ui] text-sm cursor-pointer" htmlFor="remember">
                                    Remember me
                                </label>
                            </div>
                            <Link href="#" className="text-sm text-blue-600 hover:text-blue-800 font-[system-ui] font-medium transition-colors duration-200 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            onClick={handleLogin}
                            className="w-full font-[system-ui] bg-gradient-to-r text-white from-[#296FF9] to-[#59CEFC] py-3 rounded-xl hover:opacity-90 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl active:translate-y-0 active:shadow-md"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 font-[system-ui] bg-white/90 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="w-full flex justify-center items-center gap-3">
                            <Google />
                        </div>
                    </div>
                    <p className="text-center text-sm text-gray-600 font-[system-ui]">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/auth/signup"
                            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 font-[system-ui] hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;