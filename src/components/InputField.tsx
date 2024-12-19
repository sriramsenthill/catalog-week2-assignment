// src/components/InputField.tsx
import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: string;
}

const InputField = ({ label, name, type = "text", value, onChange, error }: InputFieldProps) => (
    <div className="mb-4">
        <label className="block mb-1" htmlFor={name}>{label}</label>
        <input
            className={`border rounded p-2 w-full ${error ? 'border-red-500' : ''}`}
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export default InputField;
