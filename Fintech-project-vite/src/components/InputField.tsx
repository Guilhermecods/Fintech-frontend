import React from "react";

interface InputFieldProps {
    label: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    placeholder,
    value,
    onChange,
}) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
        </div>
    );
};

export default InputField;
