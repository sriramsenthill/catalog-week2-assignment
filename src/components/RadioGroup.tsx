// src/components/RadioGroup.tsx
import React from 'react';

interface RadioGroupProps {
    label: string;
    name: string;
    selectedValue?: string;
    options: Array<{ value: string; label: string }>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioGroup = ({ label, name, selectedValue, options, onChange }: RadioGroupProps) => (
    <fieldset className="mb-4">
        <legend className="block mb-1">{label}</legend>
        {options.map(option => (
            <div key={option.value}>
                <label>
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={onChange}
                    />
                    {option.label}
                </label>
            </div>
        ))}
    </fieldset>
);

export default RadioGroup;
