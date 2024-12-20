import { FormData } from '../types/types';

export const validateForm = (fields: string[], values: FormData) => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
        const value = values[field]?.value;

        if (!value) {
            newErrors[field] = 'This field is required.';
        } else {

            const errorMessage = validateField(field, value, values);
            if (errorMessage) {
                newErrors[field] = errorMessage;
            }
        }
    });

    return newErrors;
};

const validateField = (name: string, value: string, values: FormData) => {
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
