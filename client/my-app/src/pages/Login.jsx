import React, { useState } from "react";
import axios from "axios";
import Eye from "../assets/icons/eye.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                // "http://localhost:3000/api/users/login",
                "https://brief-ai-zeta.vercel.app/api/users/login",
                { email, password }
            );
            localStorage.setItem("token", data.token);
            console.log("Login successful:", data);
            navigate("/dashboard");
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="py-6 px-4">
                <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl w-full">
                    <div className="border border-slate-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-lg:mx-auto">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="mb-12">
                                <h1 className="text-slate-900 text-3xl font-semibold">Login</h1>
                                <p className="text-slate-600 text-[15px] mt-6 leading-relaxed">
                                    Sign in to your account and explore a world of possibilities.
                                </p>
                            </div>

                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-4 py-3 rounded-lg outline-blue-600"
                                />
                            </div>

                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full text-sm text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                                    />
                                    <img
                                        src={Eye}
                                        alt="Toggle password"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="!mt-12">
                                <button
                                    type="submit"
                                    className="w-full shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                                >
                                    Login
                                </button>
                                <p className="text-sm !mt-6 text-center text-slate-600">
                                    Don't have an account?{" "}
                                    <a href="/register" className="text-blue-600 font-medium hover:underline ml-1">
                                        Register here
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="max-lg:mt-8">
                        <img
                            src="https://readymadeui.com/login-image.webp"
                            alt="auth visual"
                            className="w-full aspect-[71/50] max-lg:w-4/5 mx-auto block object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
