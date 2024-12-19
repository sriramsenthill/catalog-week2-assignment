// src/components/InputField.tsx
import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (name: string, value: string) => void;
    error?: string[];
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, error }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className={`mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-blue-300`}
        />
        {error && <div className="text-red-500 text-sm">{error.join(', ')}</div>}
    </div>
);

export default InputField;
