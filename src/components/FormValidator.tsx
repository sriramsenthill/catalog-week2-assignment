// src/components/FormValidator.tsx
import React from 'react';
import useForm from '../hooks/useForm';
import InputField from './InputField';

interface FormValidatorProps {
    initialValues: { [key: string]: any };
}

const FormValidator: React.FC<FormValidatorProps> = ({ initialValues }) => {
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
            {Object.keys(initialValues).map((key) => (
                <InputField
                    key={key}
                    label={key}
                    name={key}
                    value={values[key]}
                    onChange={handleChange}
                    error={errors[key]}
                />
            ))}
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Submit
            </button>
        </form>
    );
};

export default FormValidator;
