import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import RadioGroup from './RadioGroup';
import { Field } from '../types/types';

interface FieldRendererProps {
    field: Field;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error?: string;
}

const FieldRenderer = ({ field, value, onChange, error }: FieldRendererProps) => {
    switch (field.type) {
        case 'select':
            return (
                <SelectField
                    label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    name={field.name}
                    value={value}
                    options={field.options!.map(option => ({ value: option.toLowerCase().replace(/ /g, '-'), label: option }))}
                    onChange={onChange}
                    error={error}
                />
            );
        case 'radio':
            return (
                <RadioGroup
                    label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    name={field.name}
                    selectedValue={value}
                    options={field.options!.map(option => ({ value: option.toLowerCase(), label: option }))}
                    onChange={onChange}
                    error={error}
                />
            );
        default:
            return (
                <InputField
                    label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    name={field.name}
                    type={field.type || "text"}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            );
    }
};

export default FieldRenderer;
