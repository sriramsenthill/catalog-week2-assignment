// src/components/InputField.tsx
import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: string; // This will be used for custom error messages
}

const InputField = ({ label, name, type = "text", value, onChange, error }: InputFieldProps) => {
    return (
        <div className="mb-4 flex flex-col w-full gap-y-2">
            <label className="block mb-1 text-custom-gray font-bold" htmlFor={name}>
                {label} {error && <span className="text-red-500">- Required</span>} {/* Show required message only if there's an error */}
            </label>
            <input
                className={`shadow-slate-300  text-custom-gray rounded-xl p-4 w-full focus:outline-none ${error ? 'border-red-500' : ''}`} // Highlight in red if there's an error
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
        </div>
    );
};

export default InputField;
