import React from "react";
import { AiOutlineUser } from "react-icons/ai";

interface ProfileCardProps {
    name: string;
    id: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, id }) => {
    return (
        
        <div className="bg-gray-200 p-7 rounded-lg flex items-center gap-4 mb-4 justify-center w-sm">
            <div className="  flex items-center  flex-col">
            
                <AiOutlineUser size={50}/>
            
                
                <div className="text-lg font-bold mt-3">{name}</div>
                <p className="text-xs text-gray-600">{id}</p>
            </div>
        </div>
    );
};

export default ProfileCard;
