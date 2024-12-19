// src/components/FormValidator.tsx
import React from 'react';
import useForm from '../hooks/useForm';
import InputField from './InputField';
import SelectField from './SelectField';
import RadioGroup from './RadioGroup';
import { Field } from '../types/types';
import { validationRules } from '../validation/validationRules'; // Import your validation rules

interface FormValidatorProps {
    fields: Field[];
}

const FormValidator = ({ fields }: FormValidatorProps) => {
    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = { value: '', validationRules: validationRules[field.name] || [] }; // Apply validation rules here
        return acc;
    }, {} as Record<string, any>);

    const { values, errors, handleChange, handleSubmit } = useForm(initialValues);

    const onSubmit = () => {
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
            {fields.map((field, index) => {
                if (field.type === "select") {
                    return (
                        <SelectField
                            key={`${field.name}-${index}`}
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
                        <div className="text-white" key={`${field.name}-${index}`}>
                            <RadioGroup
                                label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                                name={field.name}
                                selectedValue={values[field.name]?.value || ''}
                                options={field.options!.map(option => ({ value: option.toLowerCase(), label: option }))}
                                onChange={handleChange}
                            />
                        </div>
                    );
                }

                return (
                    <InputField
                        key={`${field.name}-${index}`}
                        label={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                        name={field.name}
                        type={field.type || "text"}
                        value={values[field.name]?.value || ''}
                        onChange={handleChange}
                        error={errors[field.name]}
                    />
                );
            })}
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
