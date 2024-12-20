// src/hooks/useForm.ts
import { useState, useEffect } from 'react';
import { FormData } from '../types/types';

const useForm = (initialValues: FormData) => {
    const [values, setValues] = useState<FormData>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    const validateField = (name: string, value: any) => {
        const fieldRules = values[name]?.validationRules || [];
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
            const value = values[key].value;
            const errorMessage = validateField(key, value);
            if (errorMessage) {
                newErrors[key] = errorMessage;
                hasErrors = true;
            }
        });

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        callback();
    };

    return { values, errors, handleChange, handleSubmit };
};

export default useForm;
