import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UploadBrief from "../pages/UploadBrief";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                {/* ✅ If someone visits "/" — redirect based on auth */}
                <Route
                    path="/"
                    element={
                        token ? <Navigate to="/uploadbrief" replace /> : <Navigate to="/login" replace />
                    }
                />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/uploadbrief"
                    element={
                        <ProtectedRoute>
                            <UploadBrief /> {/* ✅ Now uses UploadBrief */}
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard /> {/* ✅ Now uses UploadBrief */}
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/mybriefs"
                    element={
                        <ProtectedRoute>
                            <History /> {/* ✅ Now uses UploadBrief */}
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
