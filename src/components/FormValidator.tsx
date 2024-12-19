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

    const { values, errors, handleChange, handleSubmit, setErrors } = useForm(initialValues);

    const onSubmit = () => {
        const newErrors: Record<string, string> = {};

        // Validate each field only on submit
        fields.forEach(field => {
            const value = values[field.name]?.value;

            // Check for required fields first
            if (!value) {
                newErrors[field.name] = 'This field is required.'; // Set required error message
            } else {
                // Validate against specific rules if the field is not empty
                const errorMessage = validateField(field.name, value);
                if (errorMessage) {
                    newErrors[field.name] = errorMessage; // Set specific error message
                }
            }
        });

        // Special case for radio groups
        fields.forEach(field => {
            if (field.type === "radio" && !values[field.name]?.value) {
                newErrors[field.name] = 'This field is required.'; // Set required error message for radio group
            }
        });

        if (Object.keys(newErrors).length > 0) {
            // If there are errors, set them and prevent submission
            setErrors(newErrors);
            return;
        }

        console.log('Form submitted successfully:', values);
    };

    const validateField = (name: string, value: string) => {
        const fieldRules = values[name]?.validationRules || [];
        let errorMessage = '';

        for (const rule of fieldRules) {
            if (!rule.rule(value)) {
                errorMessage = rule.message;
                break; // Stop checking further rules once an error is found
            }
        }

        return errorMessage; // Return the error message or an empty string if valid
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
                                error={errors[field.name]} // Pass error message to RadioGroup
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
