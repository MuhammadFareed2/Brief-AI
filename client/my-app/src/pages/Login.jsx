import React, { useState } from "react";
import axios from "axios";
import Eye from "../assets/icons/eye.png";
import illustration from "../assets/images/illustration2.png";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "https://brief-ai-zeta.vercel.app/api/users/login",
                { email, password }
            );
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-white">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 max-w-7xl w-full items-center">
                {/* Form Section */}
                <div className="w-full max-w-md mx-auto border border-slate-200 rounded-xl p-6 shadow-md">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <h1 className="text-slate-900 text-3xl font-semibold mb-2">Login</h1>
                            <p className="text-slate-600 text-base">
                                Sign in to your account and explore a world of possibilities.
                            </p>
                        </div>

                        <div>
                            <label className="block mb-2 text-slate-900 text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-slate-300 rounded-lg py-3 px-4 text-sm text-slate-900 outline-blue-600"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-slate-900 text-sm font-medium">
                                Password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg py-3 px-4 pr-10 text-sm text-slate-900 outline-blue-600"
                                />
                                <img
                                    src={Eye}
                                    alt="Toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="w-5 h-5 absolute right-4 cursor-pointer"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition"
                        >
                            Login
                        </button>

                        <p className="text-center text-sm text-slate-600">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="text-blue-600 hover:underline font-medium">
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Illustration Section */}
                <div className="hidden lg:flex justify-center mb-8 lg:mb-0">

                    <img
                        src={illustration}
                        alt="Login Illustration"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
                    />
                </div>
            </div>
        </main>
    );
}
