import React from 'react';

const Loader = ({ fullscreen = false }) => {
    const containerClass = fullscreen
        ? "fixed inset-0 z-[9999] flex items-center justify-center bg-white/20"
        : "w-full flex items-center justify-center py-4";

    return (
        <div className={containerClass}>
            <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
            </div>
        </div>
    );
};

export default Loader;
