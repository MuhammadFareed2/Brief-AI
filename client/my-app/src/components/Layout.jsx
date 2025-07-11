import React from "react";
import Sidebar from "./SideBar";

export default function Layout({ children }) {
    return (
        <>
            <Sidebar />
            <main className="min-h-screen p-4 pl-[64px]">

                {children}
            </main>
        </>
    );
}

