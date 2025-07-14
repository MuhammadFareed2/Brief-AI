import React, { useState } from "react";
import axios from "axios";
import Eye from "../assets/icons/eye.png";
import illustration from "../assets/images/illustration.png";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "https://brief-ai-zeta.vercel.app/api/users/register",
                // "http://localhost:3000/api/users/register",
                { email, password }
            );

            console.log("✅ Token received:", data.token);

            localStorage.setItem("token", data.token);

            navigate("/dashboard");
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-white">
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl w-full items-center">
                {/* Form Section */}
                <div className="w-full max-w-md mx-auto border border-slate-200 rounded-xl p-8 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.1)]">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <h1 className="text-slate-900 text-3xl font-semibold mb-4">Register</h1>
                            <p className="text-slate-600 text-base leading-relaxed">
                                Create your account and join our community.
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
                            className="w-full py-3 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition"
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

                {/* Illustration Section */}
                <div className="flex justify-center">
                    <img
                        src={illustration}
                        alt="Register Illustration"
                        className="w-full max-w-lg object-contain"
                    />
                </div>
            </div>
        </main>
    );
}


