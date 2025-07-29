// Modal.jsx
import React from 'react';

const Modal = ({ title, body, isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-md shadow-md w-full max-w-md mx-4 p-4">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-sm px-2 py-1 rounded hover:bg-gray-100"
                    >
                        ✖
                    </button>
                </div>

                {/* Body */}
                <div className="mb-4">
                    <p className="text-sm text-gray-700">{body}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 border-t pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Close
                    </button>
                    {onConfirm && (
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
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
