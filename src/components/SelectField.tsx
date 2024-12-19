// src/components/SelectField.tsx
import React from 'react';

interface SelectFieldProps {
    label: string;
    name: string;
    value?: string;
    options: Array<{ value: string; label: string }>;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    error?: string;
}

const SelectField = ({ label, name, value, options, onChange, error }: SelectFieldProps) => (
    <div className="mb-4">
        <label className="block mb-1" htmlFor={name}>{label}</label>
        <select
            className={`border rounded p-2 w-full ${error ? 'border-red-500' : ''}`}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
        >
            <option value="">Select...</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export default SelectField;
