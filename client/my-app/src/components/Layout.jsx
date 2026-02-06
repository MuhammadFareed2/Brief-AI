import React from "react";
import Sidebar from "./SideBar";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <main className="transition-all duration-300 ease-in-out p-8 pl-24 md:pl-28 lg:pl-32 pt-10">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

