// src/hooks/useForm.ts
import { useState } from 'react';

interface ValidationRule {
    rule: (value: string) => boolean; // Expecting a string for validation
    message: string;
}

const useForm = (initialValues: { [key: string]: { value: string; validationRules?: ValidationRule[] } }) => {
    // Initialize form values as empty strings
    const [values, setValues] = useState<{ [key: string]: string }>(
        Object.keys(initialValues).reduce((acc, key) => {
            acc[key] = ''; // Initialize each field to an empty string
            return acc;
        }, {} as { [key: string]: string })
    );

    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const handleChange = (name: string, value: string) => {
        // Update state with new value
        setValues((prev) => ({ ...prev, [name]: value }));

        // Validate on change
        validateField(name, value);
    };

    const validateField = (name: string, value: string) => {
        const fieldConfig = initialValues[name];
        if (fieldConfig?.validationRules) {
            const fieldErrors = fieldConfig.validationRules
                .filter(rule => !rule.rule(value))
                .map(rule => rule.message);
            setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
        }
    };

    const handleSubmit = (callback: (values: { [key: string]: string }) => void) => {
        const newErrors: { [key: string]: string[] } = {};
        let isValid = true;

        Object.keys(initialValues).forEach(name => {
            const value = values[name];
            validateField(name, value);
            if (errors[name]?.length) {
                newErrors[name] = errors[name];
                isValid = false;
            }
        });

        if (isValid) {
            callback(values);
        } else {
            setErrors(newErrors);
        }
    };

    return { values, errors, handleChange, handleSubmit };
};

export default useForm;
