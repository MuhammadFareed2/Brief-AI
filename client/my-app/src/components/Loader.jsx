import React from 'react';

const Loader = ({ fullscreen = false }) => {
    const containerClass = fullscreen
        ? "fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 backdrop-blur-sm"
        : "w-full flex items-center justify-center py-4";

    return (
        <div className={containerClass}>
            <div className="relative w-12 h-12">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
        </div>
    );
};

export default Loader;
