// src/components/FormValidator.tsx
import React from 'react';
import useForm from '../hooks/useForm';
import InputField from './InputField';
import SelectField from './SelectField';
import RadioGroup from './RadioGroup';

interface FormValidatorProps<T> {
    initialValues: { [key in keyof T]: { value?: any; validationRules?: ValidationRule[] } };
}

const FormValidator = <T extends Record<string, any>>({ initialValues }: FormValidatorProps<T>) => {
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
            {Object.keys(initialValues).map((key) => {
                if (key === "city") {
                    return (
                        <SelectField
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            name={key}
                            value={values[key] || ''} // Ensure it's a string for dropdown
                            options={[
                                { value: 'new-york', label: 'New York' },
                                { value: 'los-angeles', label: 'Los Angeles' },
                                { value: 'chicago', label: 'Chicago' },
                                { value: 'houston', label: 'Houston' }
                            ]}
                            onChange={handleChange}
                            error={errors[key]}
                        />
                    );
                }
                if (key === "gender") {
                    return (
                        <RadioGroup
                            key={key}
                            label="Gender"
                            name={key}
                            selectedValue={values[key] || ''} // Ensure it's a string for radio buttons
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' }
                            ]}
                            onChange={handleChange}
                        />
                    );
                }
                const inputType =
                    key === "email" ? "email" :
                        key === "password" ? "password" :
                            key === "age" ? "number" : "text";

                return (
                    <InputField
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        name={key}
                        type={inputType} // Use appropriate input type here
                        value={values[key] || ''} // Ensure it's a string for text input; access .value here if using objects in state.
                        onChange={handleChange}
                        error={errors[key]}
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
