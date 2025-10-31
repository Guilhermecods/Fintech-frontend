import React from "react";

interface MenuButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full bg-gray-100 p-4 rounded-lg flex items-center gap-4 mb-3 hover:bg-gray-200 transition"
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};

export default MenuButton;
