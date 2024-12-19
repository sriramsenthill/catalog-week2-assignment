// src/components/RadioGroup.tsx
import React from 'react';

interface RadioGroupProps {
    label: string;
    name: string;
    selectedValue?: string;
    options: Array<{ value: string; label: string }>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    error?: string;
}

const RadioGroup = ({ label, name, selectedValue, options, onChange, error }: RadioGroupProps) => (
    <fieldset className="mb-4 flex flex-col w-full gap-y-2">
        <label className="block mb-1 text-custom-gray font-bold" htmlFor={name}>
            {label} {error && <span className="text-red-500">- Required</span>} {/* Show required message only if there's an error */}
        </label>
        <div className="flex items-center space-x-4">
            {options.map(option => (
                <div key={option.value} className="flex items-center">
                    <label className="text-custom-gray flex items-center">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={onChange}
                            className="mr-2"
                        />
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </fieldset>
);

export default RadioGroup;
