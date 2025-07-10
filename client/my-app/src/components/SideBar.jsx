import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/icons/eye.png";
import HomeIcon from "../assets/icons/eye.png";
import UploadIcon from "../assets/icons/eye.png";
import LogoutIcon from "../assets/icons/eye.png";

export default function Sidebar() {
    const [navOpen, setNavOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            setNavOpen(false);
        }
    };

    return (
        <>
            {/* Toggle button for mobile */}
            <button
                className="md:hidden flex items-center justify-center text-white z-10 h-10 w-10 rounded-md bg-green-900 absolute top-2 right-2"
                onClick={() => setNavOpen(!navOpen)}
            >
                H
            </button>

            <aside
                className={`
          h-screen absolute md:sticky top-0 py-4 flex flex-col gap-5 
          font-['Poppins'] bg-slate-900 transition-all duration-300 ease-in-out
          ${navOpen ? "w-[200px]" : "w-[64px]"}
          md:w-[64px] md:hover:w-[200px] group
        `}
            >
                <div className="flex items-center gap-3 px-2">
                    <img src={Logo} className="w-8" alt="Logo" />
                </div>

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
                md:opacity-0 md:w-0 md:ml-0 md:group-hover:opacity-100 md:group-hover:w-auto md:group-hover:ml-4
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
                md:opacity-0 md:w-0 md:ml-0 md:group-hover:opacity-100 md:group-hover:w-auto md:group-hover:ml-4
              `}
                        >
                            Upload Brief
                        </div>
                    </NavLink>
                </ul>

                <ul className="pt-5 flex flex-col gap-1 border-t border-slate-400">
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
                md:opacity-0 md:w-0 md:ml-0 md:group-hover:opacity-100 md:group-hover:w-auto md:group-hover:ml-4
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
