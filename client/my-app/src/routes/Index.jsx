import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                {/* ✅ If someone goes to "/" — decide where to go */}
                <Route
                    path="/"
                    element={
                        token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
                    }
                />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
