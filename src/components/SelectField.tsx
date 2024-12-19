// src/components/SelectField.tsx
import React from 'react';

interface SelectFieldProps {
    label: string;
    name: string;
    value?: string; // The selected value should be a string
    options: { value: string; label: string }[];
    onChange?: (name: string, value?: string) => void;
    error?: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value = "", options, onChange, error }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
            name={name}
            value={value}
            onChange={(e) => onChange && onChange(name, e.target.value)}
            className={`mt-1 block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring focus:ring-blue-300`}
        >
            <option value="">Select a city</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <div className="text-red-500 text-sm">{error.join(', ')}</div>}
    </div>
);

export default SelectField;
