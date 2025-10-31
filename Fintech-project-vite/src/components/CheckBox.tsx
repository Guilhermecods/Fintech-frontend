import React from "react";

interface CheckboxProps {
    label: React.ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer select-none text-gray-700">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
            />
            <span>{label}</span>
        </label>
    );
};

export default Checkbox;
