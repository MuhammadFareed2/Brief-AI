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
                fixed top-0 left-0 h-screen bg-slate-900 text-white transition-all duration-300 ease-in-out z-50 shadow-xl
                flex flex-col font-sans border-r border-slate-800
                ${isSidebarOpen ? "w-64" : "w-20"}
            `}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {/* Logo */}
            <div
                className="flex items-center gap-3 px-6 h-20 cursor-pointer border-b border-slate-800/50"
                onClick={handleSidebarClick}
            >
                <img src={Logo} className="w-8 h-8 object-contain" alt="Logo" />
                <div
                    className={`
                        text-lg font-bold tracking-tight overflow-hidden whitespace-nowrap transition-all duration-300
                        ${isSidebarOpen ? "opacity-100 w-auto ml-2" : "opacity-0 w-0"}
                    `}
                >
                    BriefAI
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-6 px-3 flex flex-col gap-2">
                <NavItem
                    to="/dashboard"
                    icon={HomeIcon}
                    label="Dashboard"
                    isOpen={isSidebarOpen}
                    onClick={handleNavClick}
                />
                <NavItem
                    to="/uploadbrief"
                    icon={UploadIcon}
                    label="Upload Brief"
                    isOpen={isSidebarOpen}
                    onClick={handleNavClick}
                />
                <NavItem
                    to="/history"
                    icon={HistoryIcon}
                    label="History"
                    isOpen={isSidebarOpen}
                    onClick={handleNavClick}
                />
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-slate-800/50 mb-2">
                <button
                    className={`
                        w-full flex items-center p-3 rounded-lg transition-colors duration-200
                        hover:bg-slate-800 text-slate-400 hover:text-white group
                    `}
                    onClick={() => {
                        handleLogout();
                        handleNavClick();
                    }}
                >
                    <img className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" src={LogoutIcon} alt="Logout" />
                    <div
                        className={`
                            overflow-hidden whitespace-nowrap transition-all duration-300 font-medium
                            ${isSidebarOpen ? "opacity-100 w-auto ml-3" : "opacity-0 w-0"}
                        `}
                    >
                        Logout
                    </div>
                </button>
            </div>
        </aside>
    );
}

function NavItem({ to, icon, label, isOpen, onClick }) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-all duration-200 group
                ${isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
            }
        >
            <img
                className={`w-5 h-5 transition-opacity ${isOpen ? "mr-3" : "mr-0 mx-auto"}`}
                src={icon}
                alt={label}
                style={{ filter: "brightness(0) invert(1)" }} // Ensure icons are white/light
            />
            <span
                className={`
                    overflow-hidden whitespace-nowrap transition-all duration-300 font-medium
                    ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"}
                `}
            >
                {label}
            </span>
        </NavLink>
    );
}
