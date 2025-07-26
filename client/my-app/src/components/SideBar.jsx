import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo/logo.png";
import HomeIcon from "../assets/icons/dashboard.png";
import UploadIcon from "../assets/icons/upload.png";
import HistoryIcon from "../assets/icons/history.png";
import LogoutIcon from "../assets/icons/logout.png";

export default function Sidebar() {
    const [navOpen, setNavOpen] = useState(false);
    const [hovering, setHovering] = useState(false);

    const isSidebarOpen = navOpen || hovering;

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            setNavOpen(false);
        }
    };

    const handleSidebarClick = () => {
        // On any screen, toggle sidebar when clicked
        setNavOpen((prev) => !prev);
    };

    return (
        <aside
            className={`
                fixed top-0 left-0 h-screen bg-slate-900 transition-all duration-300 ease-in-out
                flex flex-col gap-5 py-4 font-['Poppins'] z-50
                ${isSidebarOpen ? "w-[200px]" : "w-[64px]"}
            `}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={handleSidebarClick}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-2">
                <img src={Logo} className="w-8" alt="Logo" />
                <div
                    className={`
                        text-white text-lg font-bold overflow-hidden whitespace-nowrap transition-all duration-300
                        ${isSidebarOpen ? "opacity-100 ml-2 w-auto" : "opacity-0 w-0 ml-0"}
                    `}
                >
                    BriefAI
                </div>
            </div>

            {/* Navigation Links */}
            <ul className="pt-5 flex flex-col gap-1 border-t border-slate-400">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `py-3 px-5 flex items-center text-xs ${isActive ? "border-r-4 border-green-400 bg-slate-800" : ""}`
                    }
                    onClick={handleNavClick}
                >
                    <img className="w-5 nav-icon" src={HomeIcon} alt="Home" />
                    <div
                        className={`
                            text-white overflow-hidden whitespace-nowrap transition-all duration-300
                            ${isSidebarOpen ? "opacity-100 ml-4 w-auto" : "opacity-0 w-0 ml-0"}
                        `}
                    >
                        Dashboard
                    </div>
                </NavLink>

                <NavLink
                    to="/uploadbrief"
                    className={({ isActive }) =>
                        `py-3 px-5 flex items-center text-xs ${isActive ? "border-r-4 border-green-400 bg-slate-800" : ""}`
                    }
                    onClick={handleNavClick}
                >
                    <img className="w-5 nav-icon" src={UploadIcon} alt="Upload" />
                    <div
                        className={`
                            text-white overflow-hidden whitespace-nowrap transition-all duration-300
                            ${isSidebarOpen ? "opacity-100 ml-4 w-auto" : "opacity-0 w-0 ml-0"}
                        `}
                    >
                        Upload Brief
                    </div>
                </NavLink>

                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        `py-3 px-5 flex items-center text-xs ${isActive ? "border-r-4 border-green-400 bg-slate-800" : ""}`
                    }
                    onClick={handleNavClick}
                >
                    <img className="w-5 nav-icon" src={HistoryIcon} alt="History" />
                    <div
                        className={`
                            text-white overflow-hidden whitespace-nowrap transition-all duration-300
                            ${isSidebarOpen ? "opacity-100 ml-4 w-auto" : "opacity-0 w-0 ml-0"}
                        `}
                    >
                        History
                    </div>
                </NavLink>
            </ul>

            {/* Logout */}
            <ul className="pt-5 flex flex-col gap-1 border-t border-slate-400 mt-auto">
                <li
                    className="py-3 px-5 flex items-center text-xs cursor-pointer"
                    onClick={() => {
                        handleLogout();
                        handleNavClick();
                    }}
                >
                    <img className="w-5 nav-icon" src={LogoutIcon} alt="Logout" />
                    <div
                        className={`
                            text-white overflow-hidden whitespace-nowrap transition-all duration-300
                            ${isSidebarOpen ? "opacity-100 ml-4 w-auto" : "opacity-0 w-0 ml-0"}
                        `}
                    >
                        Logout
                    </div>
                </li>
            </ul>
        </aside>
    );
}
