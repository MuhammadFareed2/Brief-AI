import React from "react";
import Sidebar from "./SideBar";

export default function Layout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-[64px] md:ml-[200px] p-4">
                {children}
            </main>
        </div>
    );
}
