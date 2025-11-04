import type { ReactNode } from "react";


interface ButtonSquareHomeProps {
    icon: ReactNode;
    color: string;
}

const ButtonSquareHome: React.FC<ButtonSquareHomeProps> = ({ icon, color }) => {
    return (
        <button
            className={`rounded-lg p-5 w-16 h-16 flex items-center justify-center hover:bg-gray-100 ${color}`}
            
        >
            {icon}
        </button>
    );
};

export default ButtonSquareHome;
