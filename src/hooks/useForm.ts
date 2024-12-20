// src/hooks/useForm.ts
import { useState } from 'react';
import { FormData, ValidationRule } from '../types/types';

interface UseFormReturn {
    values: FormData;
    errors: Record<string, string>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (callback: () => void) => void;
    setErrors: (errors: Record<string, string>) => void; // Add setErrors to return type
}

const useForm = (initialValues: FormData): UseFormReturn => {
    const [values, setValues] = useState<FormData>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    const validateField = (name: string, value: any) => {
        const fieldRules: ValidationRule[] = values[name]?.validationRules || [];
        let errorMessage = '';

        for (const rule of fieldRules) {
            if (!rule.rule(value)) {
                errorMessage = rule.message;
                break;
            }
        }

        return errorMessage;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: { ...prevValues[name], value }
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            const errorMessage = validateField(name, value);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage,
            }));
        }, 800);

        setDebounceTimeout(newTimeout);
    };

    const handleSubmit = (callback: () => void) => {
        let newErrors: Record<string, string> = {};
        let hasErrors = false;

        Object.keys(values).forEach((key) => {
            const value = values[key].value; // Get the current value of the field
            const errorMessage = validateField(key, value); // Validate the field
            if (errorMessage) {
                newErrors[key] = errorMessage; // Store the error message
                hasErrors = true; // Mark that there are errors
            }
        });

        if (hasErrors) {
            setErrors(newErrors); // Update state with errors if any
            return; // Prevent callback execution if there are errors
        }

        callback(); // Call the provided callback function if no errors exist
    };

    return { values, errors, handleChange, handleSubmit, setErrors }; // Return setErrors here
};

export default useForm;
