import React from 'react';

const Modal = ({ title, body, isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg transition-all duration-300 p-6 border border-gray-200">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 transition p-1"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="text-sm text-gray-600 mb-6">
                    {body}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
                    >
                        Close
                    </button>
                    {onConfirm && (
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Confirm
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
