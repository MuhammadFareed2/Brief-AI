import React, { useState } from "react";
import axios from "axios";
import Eye from "../assets/icons/eye.png";
import illustration from "../assets/images/illustration.png";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(
                "https://brief-ai-zeta.vercel.app/api/users/register",
                { email, password }
            );
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setModalMessage(err.response?.data?.message || "Registration failed");
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-white relative">
            {loading && <Loader fullscreen />}
            <Modal
                title="Registration Failed"
                body={modalMessage}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 max-w-7xl w-full items-center">
                <div className="w-full max-w-md mx-auto border border-slate-200 rounded-xl p-6 shadow-md">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <h1 className="text-slate-900 text-3xl font-semibold mb-2">Register</h1>
                            <p className="text-slate-600 text-base">
                                Create your account and join our community.
                            </p>
                        </div>

                        <div>
                            <label className="block mb-2 text-slate-900 text-sm font-medium">Email</label>
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
                            <label className="block mb-2 text-slate-900 text-sm font-medium">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Create a password"
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
                            className="cursor-pointer w-full py-3 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition"
                        >
                            Register
                        </button>

                        <p className="text-center text-sm text-slate-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline font-medium">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>

                <div className="hidden lg:flex justify-center mb-8 lg:mb-0">
                    <img
                        src={illustration}
                        alt="Register Illustration"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
                    />
                </div>
            </div>
        </main>
    );
}
