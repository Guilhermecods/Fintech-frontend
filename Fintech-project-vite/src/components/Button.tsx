import React from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full rounded-lg bg-gray-200 py-2 font-semibold text-gray-800 hover:bg-white transition"
        >
            {text}
        </button>
    );
};

export default Button;
