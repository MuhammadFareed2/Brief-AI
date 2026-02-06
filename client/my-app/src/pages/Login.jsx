import React, { useState } from "react";
import axios from "axios";
import Eye from "../assets/icons/eye.png";
import illustration from "../assets/images/illustration2.png";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(
                "https://brief-ai-zeta.vercel.app/api/users/login",
                { email, password }
            );
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setModalMessage(err.response?.data?.message || "Login failed");
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-slate-100">
            {loading && <Loader fullscreen />}
            <Modal
                title="Login Failed"
                body={modalMessage}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
                {/* Form Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                        <p className="text-slate-500">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-900 placeholder:text-slate-400 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    <img src={Eye} alt="Toggle" className="w-5 h-5 opacity-60" />
                                </button>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 transition-all duration-200 transform active:scale-[0.98]"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline">
                            Create an account
                        </Link>
                    </div>
                </div>

                {/* Illustration/Image Section */}
                <div className="hidden md:flex w-1/2 bg-indigo-600 relative items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-700 opacity-90"></div>
                    <div className="relative z-10 p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">BriefAI</h2>
                        <p className="text-indigo-100 text-lg">
                            Streamline your workflow with AI-powered briefs.
                            Intelligent, fast, and secure.
                        </p>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white opacity-10"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white opacity-10"></div>
                </div>
            </div>
        </main>
    );
}
