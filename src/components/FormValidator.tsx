// src/components/FormValidator.tsx
import React from 'react';
import useForm from '../hooks/useForm';
import { Field } from '../types/types';
import { validationRules } from '../validation/validationRules';
import { validateForm } from '../utils/formValidation';
import FieldRenderer from './FieldRenderer';

interface FormValidatorProps {
    fields: Field[];
}

const FormValidator = ({ fields }: FormValidatorProps) => {
    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = { value: '', validationRules: validationRules[field.name] || [] };
        return acc;
    }, {} as Record<string, any>);

    const { values, errors, handleChange, handleSubmit, setErrors } = useForm(initialValues);

    const onSubmit = () => {
        const newErrors = validateForm(fields.map(f => f.name), values);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Form submitted successfully:', values);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
            }}
            className="bg-white bg-opacity-50 p-6 rounded-2xl max-w-md mx-auto"
        >
            {fields.map((field, index) => (
                <FieldRenderer
                    key={`${field.name}-${index}`}
                    field={field}
                    value={values[field.name]?.value || ''}
                    onChange={handleChange}
                    error={errors[field.name]}
                />
            ))}
            <button
                type="submit"
                className="flex font-bold items-center justify-center w-full bg-[#cd7092] rounded-full p-2 px-4 text-white cursor-pointer mt-4"
            >
                Submit
            </button>
        </form>
    );
};

export default FormValidator;
