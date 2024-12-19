// src/hooks/useForm.ts
import { useState, useEffect } from 'react';
import { FormData } from '../types/types';

const useForm = (initialValues: FormData) => {
    const [values, setValues] = useState<FormData>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null); // For managing the timeout

    const validateField = (name: string, value: any) => {
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: { ...prevValues[name], value }
        }));

        // Clear error message when user types
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Clear specific error
        }));

        // Clear previous timeout if it exists
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set a new timeout for validation
        const newTimeout = setTimeout(() => {
            const errorMessage = validateField(name, value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage,
            }));
        }, 800); // 1000 ms delay

        setDebounceTimeout(newTimeout); // Save the timeout ID
    };

    const handleSubmit = (callback: () => void) => {
        let newErrors: Record<string, string> = {};
        let hasErrors = false;

        Object.keys(values).forEach((key) => {
            const value = values[key].value;
            const errorMessage = validateField(key, value);
            if (errorMessage) {
                newErrors[key] = errorMessage;
                hasErrors = true;
            }
        });

        if (hasErrors) {
            setErrors(newErrors); // Set all errors at once
            return; // Prevent submission if there are errors
        }

        callback(); // Call the provided callback function for successful submission
    };

    return { values, errors, handleChange, handleSubmit };
};

export default useForm;
