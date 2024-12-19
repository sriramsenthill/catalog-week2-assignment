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
    <div className="mb-4 flex flex-col w-full gap-y-2">
        <label className="block mb-1 text-custom-gray font-bold" htmlFor={name}>{label}
            {error && <span className="text-red-500">- Required</span>} {/* Show required message only if there's an error */}

        </label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={` text-custom-gray shadow-slate-300 rounded-xl p-4 w-full  focus:outline-none ${error ? 'border-red-500' : ''}`}
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
