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
    <fieldset className="mb-4 flex flex-col w-full gap-y-2">
        <legend className="block mb-1 text-custom-gray font-bold">{label}</legend>
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
    </fieldset>
);

export default RadioGroup;
