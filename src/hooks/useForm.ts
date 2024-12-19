// src/hooks/useForm.ts
import { useState } from 'react';

interface FormValues {
    [key: string]: any;
}

interface ValidationRule {
    rule: (value: any) => boolean;
    message: string;
}

interface FieldConfig {
    value: any;
    validationRules?: ValidationRule[];
}

const useForm = (initialValues: FormValues) => {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<FormValues>({});

    const handleChange = (name: string, value: any) => {
        setValues({ ...values, [name]: value });

        // Validate on change
        validateField(name, value);
    };

    const validateField = (name: string, value: any) => {
        const fieldConfig: FieldConfig = initialValues[name];
        if (fieldConfig?.validationRules) {
            const fieldErrors = fieldConfig.validationRules
                .filter(rule => !rule.rule(value))
                .map(rule => rule.message);
            setErrors({ ...errors, [name]: fieldErrors });
        }
    };

    const handleSubmit = (callback: (values: FormValues) => void) => {
        const newErrors: FormValues = {};
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
