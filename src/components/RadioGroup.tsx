// src/components/RadioGroup.tsx
import React from 'react';

interface RadioGroupProps {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    selectedValue?: string;
    onChange?: (name: string, value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, selectedValue = '', onChange }) => (
    <fieldset className="mb-4">
        <legend className="block text-sm font-medium text-gray-700">{label}</legend>
        <div className="mt-1">
            {options.map((option) => (
                <label key={option.value} className="inline-flex items-center mr-4">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={() => onChange && onChange(name, option.value)}
                        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <span className="ml-2">{option.label}</span>
                </label>
            ))}
        </div>
    </fieldset>
);

export default RadioGroup;
