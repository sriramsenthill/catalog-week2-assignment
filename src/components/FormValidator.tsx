// src/components/FormValidator.tsx
import React from 'react';
import useForm from '../hooks/useForm';
import InputField from './InputField';
import SelectField from './SelectField';
import RadioGroup from './RadioGroup';
import { Field } from '../types/types';

interface FormValidatorProps {
    fields: Field[];
    validationRules: Record<string, ValidationRule[]>;
}

const FormValidator = ({ fields, validationRules }: FormValidatorProps) => {
    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = { value: '', validationRules: validationRules[field.name] || [] };
        return acc;
    }, {} as Record<string, any>);

    const { values, errors, handleChange, handleSubmit } = useForm(initialValues);

    const onSubmit = () => {
        console.log('Form submitted successfully:', values);
        // Handle successful form submission here (e.g., API call)
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
            }}
            className="p-4 border rounded shadow-md"
        >
            {fields.map((field) => {
                if (field.type === "select") {
                    return (
                        <SelectField
                            key={field.name}
                            label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                            name={field.name}
                            value={values[field.name]?.value || ''}
                            options={field.options!.map(option => ({ value: option.toLowerCase().replace(/ /g, '-'), label: option }))}
                            onChange={handleChange}
                            error={errors[field.name]}
                        />
                    );
                }
                if (field.type === "radio") {
                    return (
                        <RadioGroup
                            key={field.name}
                            label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                            name={field.name}
                            selectedValue={values[field.name]?.value || ''}
                            options={field.options!.map(option => ({ value: option.toLowerCase(), label: option }))}
                            onChange={handleChange}
                        />
                    );
                }

                return (
                    <InputField
                        key={field.name}
                        label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                        name={field.name}
                        type={field.type || "text"}
                        value={values[field.name]?.value || ''}
                        onChange={handleChange}
                        error={errors[field.name]}
                    />
                );
            })}
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Submit
            </button>
        </form>
    );
};

export default FormValidator;
