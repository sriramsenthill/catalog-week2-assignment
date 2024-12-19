// src/hooks/useForm.ts
import { useState } from 'react';
import { FormData } from '../types/types';

const useForm = (initialValues: FormData) => {
    const [values, setValues] = useState<FormData>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: { ...prevValues[name], value }
        }));

        // Validate on change
        validateField(name, value);
    };

    const validateField = (name: string, value: any) => {
        const fieldRules = values[name]?.validationRules || [];
        let errorMessage = '';

        for (const rule of fieldRules) {
            if (!rule.rule(value)) {
                errorMessage = rule.message;
                break;
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };

    const handleSubmit = (callback: () => void) => {
        let hasErrors = false;

        Object.keys(values).forEach((key) => {
            const value = values[key].value;
            validateField(key, value);
            if (errors[key]) hasErrors = true;
        });

        if (!hasErrors) {
            callback();
        }
    };

    return { values, errors, handleChange, handleSubmit };
};

export default useForm;
