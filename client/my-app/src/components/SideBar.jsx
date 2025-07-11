import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo/logo.png";
import HomeIcon from "../assets/icons/dashboard.png";
import UploadIcon from "../assets/icons/upload.png";

import LogoutIcon from "../assets/icons/logout.png";

export default function Sidebar() {
    const [navOpen, setNavOpen] = useState(
        () => JSON.parse(localStorage.getItem("navOpen")) || false
    );

    const handleToggle = () => {
        const newState = !navOpen;
        setNavOpen(newState);
        localStorage.setItem("navOpen", JSON.stringify(newState));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            setNavOpen(false);
            localStorage.setItem("navOpen", "false");
        }
    };

    return (
        <>
            {/* Toggle button for mobile */}
            <button
                className="md:hidden flex items-center justify-center text-white z-50 h-10 w-10 rounded-md bg-green-900 absolute top-2 right-2"
                onClick={handleToggle}
            >
                ☰
            </button>

            <aside
                className={`
          fixed top-0 left-0 h-screen bg-slate-900 transition-all duration-300 ease-in-out
          flex flex-col gap-5 py-4 font-['Poppins']
          ${navOpen ? "w-[200px]" : "w-[64px]"}
          md:${navOpen ? "w-[200px]" : "w-[64px]"} md:hover:w-[200px] group z-50
        `}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-2">
                    <img src={Logo} className="w-8" alt="Logo" />
                    <div
                        className={`
              text-white text-lg font-bold overflow-hidden whitespace-nowrap transition-all duration-300
              ${navOpen ? "opacity-100 ml-2 w-auto" : "opacity-0 w-0 ml-0"}
              md:${navOpen ? "opacity-100 ml-2 w-auto" : "opacity-0 w-0 ml-0"}
              md:group-hover:opacity-100 md:group-hover:w-auto md:group-hover:ml-2
            `}
                    >
                        BriefAI
                    </div>
                </div>

                {/* Links */}
                <ul className="pt-5 flex flex-col gap-1 border-t border-slate-400">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `py-3 px-5 flex items-center text-xs ${isActive ? "border-r-4 border-green-400 bg-slate-800" : ""
                            }`
                        }
                        onClick={handleNavClick}
                    >
                        <img className="w-5 nav-icon" src={HomeIcon} alt="Home" />
                        <div
                            className={`
                text-white overflow-hidden whitespace-nowrap transition-all duration-300
                ${navOpen ? "opacity-100 ml-4 w-auto" : "opacity-0 w-0 ml-0"}
                md:${navOpen ? "opacity-100 ml-4 w-auto" : "opacity-0 w-0 ml-0"}
                md:group-hover:opacity-100 md:group-hover:w-auto md:group-hover:ml-4
              `}
                        >
                            Dashboard
                        </div>
                    </NavLink>

                    <NavLink
                        to="/uploadbrief"
                        className={({ isActive }) =>
                            `py-3 px-5 flex items-center text-xs ${isActive ? "border-r-4 border-green-400 bg-slate-800" : ""
                            }`
                        }
                        onClick={handleNavClick}
                    >
                        <img className="w-5 nav-icon" src={UploadIcon} alt="Upload" />
                        <div
                            className={`
                text-white overflow-hidden whitespace-nowrap transition-all duration-300
                ${navOpen ? "opacity-100 ml-4 w-auto" : "opacity-0 w-0 ml-0"}
                md:${navOpen ? "opacity-100 ml-4 w-auto" : "opacity-0 w-0 ml-0"}
                md:group-hover:opacity-100 md:group-hover:w-auto md:group-hover:ml-4
              `}
                        >
                            Upload Brief
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
                ${navOpen ? "opacity-100 ml-4 w-auto" : "opacity-0 w-0 ml-0"}
                md:${navOpen ? "opacity-100 ml-4 w-auto" : "opacity-0 w-0 ml-0"}
                md:group-hover:opacity-100 md:group-hover:w-auto md:group-hover:ml-4
              `}
                        >
                            Logout
                        </div>
                    </li>
                </ul>
            </aside>
        </>
    );
}
