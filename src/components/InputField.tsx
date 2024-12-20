// src/components/InputField.tsx
import React, { useState } from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: string;
}

const InputField = ({ label, name, type = "text", value, onChange, error }: InputFieldProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    return (
        <div className="mb-4 flex flex-col w-full gap-y-2">
            <label className="block mb-1 text-custom-gray font-bold" htmlFor={name}>
                {label} {error && <span className="text-red-500">- Required</span>}
            </label>
            <div className="relative">
                <input
                    className={`shadow-slate-300 text-custom-gray rounded-xl p-4 w-full focus:outline-none transition-colors duration-200 hover:bg-gray-50 ${error ? 'border-red-500' : ''}`}
                    id={name}
                    name={name}
                    type={isPasswordVisible ? "text" : type}
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-gray"
                    >
                        {isPasswordVisible ? 'Hide' : 'Show'}
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default InputField;
