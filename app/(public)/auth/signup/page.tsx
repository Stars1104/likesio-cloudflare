"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Google from "@/app/components/auth/GoogleLoginButton";
import { Lock, User, Mail } from "lucide-react";
// import { useAuth } from "@/app/contexts/AuthContext";
import { signUp } from "@/app/api/auth/signup/route";

const Signup = () => {
    const router = useRouter();
    // const { register } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignUp = async () => {
        // Form validation
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        if (!username) {
            toast.error("Please enter your username");
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
        if (password !== confirm) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const success = await signUp(email, username, password);
            
            if (success) {
                toast.success("Account created successfully!");
                router.push("/auth/signin");
            } else {
                toast.error("Registration failed. This email may already be registered.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="w-full max-w-md mx-auto">
                <div className="backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 space-y-6 sm:space-y-8 transition-all duration-500 hover:shadow-3xl bg-white/80 border border-white/20">
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#296FF9] via-[#3B82F6] to-[#59CEFC] py-2 bg-clip-text text-transparent font-[system-ui] animate-gradient">
                            Sign Up
                        </h2>
                        <p className="text-gray-600 mt-2 font-[system-ui] text-base sm:text-lg">Create your account to get started</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <div className="relative group">
                            <label className="block text-gray-700 text-sm font-semibold mb-1.5 sm:mb-2 font-[system-ui]" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <input
                                    className="w-full font-[system-ui] pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm sm:text-base"
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full flex md:flex-row flex-col justify-center items-center gap-3">
                            <div className="relative w-full group">
                                <label className="block text-gray-700 text-sm font-semibold mb-1.5 sm:mb-2 font-[system-ui]" htmlFor="Usename">
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                    <input
                                        className="w-full font-[system-ui] pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm sm:text-base"
                                        type="text"
                                        id="Usename"
                                        placeholder="Choose a username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <label className="block font-[system-ui] text-gray-700 text-sm font-semibold mb-1.5 sm:mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <input
                                    className="w-full font-[system-ui] pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm sm:text-base"
                                    type="password"
                                    id="password"
                                    placeholder="Create a password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="relative group">
                            <label className="block font-[system-ui] text-gray-700 text-sm font-semibold mb-1.5 sm:mb-2" htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <input
                                    className="w-full font-[system-ui] pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 hover:bg-white/90 text-sm sm:text-base"
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Confirm your password"
                                    required
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full font-[system-ui] bg-gradient-to-r text-white from-[#296FF9] via-[#3B82F6] to-[#59CEFC] py-3 sm:py-4 rounded-lg sm:rounded-xl hover:opacity-90 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl font-semibold text-base sm:text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            onClick={handleSignUp}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 sm:px-4 font-[system-ui] bg-white/80 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="w-full flex justify-center items-center gap-3">
                            <Google />
                        </div>
                    </div>

                    <p className="text-center text-sm text-gray-600 font-[system-ui]">
                        Already have an account?{" "}
                        <Link href="/auth/signin" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 font-[system-ui] hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;