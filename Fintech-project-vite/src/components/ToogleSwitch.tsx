import React from "react";

interface ToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="sr-only"
                />
                <div
                    className={`w-10 h-5 rounded-full transition ${checked ? "bg-green-900" : "bg-gray-300"
                        }`}
                ></div>
                <div
                    className={`dot absolute left-1 top-0.5 bg-white w-4 h-4 rounded-full transition ${checked ? "translate-x-5" : ""
                        }`}
                ></div>
            </div>
        </label>
    );
};

export default ToggleSwitch;
